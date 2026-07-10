import {
  useActionState,
  startTransition,
  useEffect,
  useRef,
  useState
} from 'react'
import { parseGemmaResponseToHtml } from './AnswerProcessor';
import { PulseLoader } from "react-spinners";

import './ClientToAgent.css'

const BASE_URL = import.meta.env.VITE_AGENTIC_CLIENT_BASE_URL || "https://agentic.ihorlazarkov-swe.in"
const MODEL_NAME = import.meta.env.VITE_AGENTIC_MODEL || "qwen/qwen3-vl-4b"
const SESSION_STORAGE_KEY = "agentic_session_id"
const SESSION_MAX_AGE_MS = 60 * 60 * 1000 // 1 hour, matches the previous cookie's Max-Age

function readStoredSessionId(): string | null {
  const raw = localStorage.getItem(SESSION_STORAGE_KEY)
  if (!raw) return null
  try {
    const { id, expiresAt } = JSON.parse(raw)
    if (typeof id !== 'string' || typeof expiresAt !== 'number' || Date.now() >= expiresAt) {
      localStorage.removeItem(SESSION_STORAGE_KEY)
      return null
    }
    return id
  } catch {
    localStorage.removeItem(SESSION_STORAGE_KEY)
    return null
  }
}

function storeSessionId(id: string): void {
  localStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify({ id, expiresAt: Date.now() + SESSION_MAX_AGE_MS }))
}

type TStats = {
  input_tokens: string,
  tokens_per_second: string,
  total_output_tokens: string,
  time_to_first_token_seconds: string,
}

type ChatMessage = {
  role: 'user' | 'assistant' | 'system-error',
  content: React.ReactElement[] | string,
  stats?: TStats,
  rateLimited?: boolean,
}

type TState = {
  messages: ChatMessage[],
  topPrompts: { body: string }[],
}

const INIT_STATE: TState = { messages: [], topPrompts: [] }

function round(num: string): number {
  return Number.parseFloat(Number.parseFloat(num).toFixed(2))
}

function responseSeconds(stats: TStats): number {
  const timeToFirstToken = Number.parseFloat(stats.time_to_first_token_seconds) || 0
  const tokensPerSecond = Number.parseFloat(stats.tokens_per_second) || 0
  const totalOutputTokens = Number.parseFloat(stats.total_output_tokens) || 0
  const generationTime = tokensPerSecond > 0 ? totalOutputTokens / tokensPerSecond : 0
  return timeToFirstToken + generationTime
}

function ClientToAgent() {

  const [lettersCount, setCount] = useState(0)
  const [isRateLimited, setIsRateLimited] = useState(false)

  const controllerRef = useRef<AbortController | null>(null)
  const threadRef = useRef<HTMLDivElement | null>(null)

  function abortRequest() {
    controllerRef.current?.abort()
  }

  async function sendPrompt(prevState: TState, formData: FormData): Promise<TState> {
    const controller = new AbortController()
    const signal = controller.signal

    controllerRef.current = controller

    const value = formData.get('prompt') as string
    const uri = formData.get("uri") as string || `${BASE_URL}/api/generate`
    const method = formData.get("method") as string || 'POST'
    const body = method == 'POST'
      ? JSON.stringify({ body: { "model": MODEL_NAME, "input": value } })
      : {} as BodyInit
    const sessionId = readStoredSessionId()
    const headers: HeadersInit = {
      "Content-Type": "application/json",
      ...(sessionId ? { "X-Session-Id": sessionId } : {}),
    }
    const reqBody: RequestInit = method == 'POST' ? { method, headers, body, signal } : { method, headers, signal }

    const userMessage: ChatMessage = { role: 'user', content: value }

    try {
      const response = await fetch(uri, reqBody)

      // Request finished successfully, clear the ref
      controllerRef.current = null;

      // reset word count
      setCount(0)

      const data = await response.json();
      if (data.sessionId) storeSessionId(data.sessionId)
      const rateLimited = response.status === 429
      const replyMessage: ChatMessage = data.error
        ? { role: 'system-error', content: data.error, rateLimited }
        : {
          role: 'assistant',
          content: parseGemmaResponseToHtml(data.message),
          stats: { ...data.stats },
        }

      if (rateLimited) setIsRateLimited(true)

      return {
        messages: [...prevState.messages, userMessage, replyMessage],
        topPrompts: [...data.queries || prevState.topPrompts],
      };

    } catch (error) {
      controllerRef.current = null;

      const errorText = error instanceof Error && error.name === 'AbortError'
        ? "User Aborted."
        : error instanceof Error
          ? error.message
          : "An unknown error occurred."

      const errorMessage: ChatMessage = { role: 'system-error', content: errorText }

      return {
        messages: [...prevState.messages, userMessage, errorMessage],
        topPrompts: prevState.topPrompts,
      };
    }
  }

  function reAsk(prompt: string) {
    const form = new FormData()
    form.append('uri', `${BASE_URL}/api/generate`)
    form.append('method', 'POST')
    form.append('prompt', prompt)
    startTransition(() => askQuestion(form))
  }

  useEffect(() => {
    const form = document.createElement('form')
    const textarea = document.createElement('textarea')
    textarea.name = 'prompt'
    textarea.value = 'Hi. Please introduce yourself.'
    form.appendChild(textarea)

    const formData = new FormData(form)
    formData.append('uri', `${BASE_URL}/api/version`)
    formData.append('method', 'GET')
    startTransition(() => askQuestion(formData))

    return () => abortRequest()
  }, [])

  const [state, askQuestion, isPending] = useActionState(sendPrompt, INIT_STATE)

  useEffect(() => {
    const thread = threadRef.current
    if (!thread) return
    const arrLastUserRole = thread?.querySelectorAll('div.bubble[role="user"]')
    const lastUserDiv = arrLastUserRole[arrLastUserRole.length - 1] as HTMLElement | null;
    if (lastUserDiv && threadRef.current) {
      threadRef.current.scrollTop = lastUserDiv.offsetTop - thread.offsetTop;
    }
  }, [state.messages.length, isPending])

  const [remainAwaitMs, setRemainAwaitMs] = useState<number | null>(null);
  useEffect(() => {
    if (!isRateLimited) return

    setRemainAwaitMs(-1)
    const sessionId = readStoredSessionId()
    const liveEvents = new EventSource(`${BASE_URL}/api/countdown?session=${encodeURIComponent(sessionId ?? "")}`);
    liveEvents.onmessage = ({ data }) => {
      console.log({data});
      const msLeft = Number(data)
      setRemainAwaitMs(msLeft)
      if (msLeft === 0) {
        liveEvents.close()
        setIsRateLimited(false)
      }
    };
    return () => liveEvents.close()
  }, [isRateLimited])

  const button = !isPending
    ? <button type="submit">
      <svg xmlns="http://www.w3.org/2000/svg"
        height="16px" viewBox="0 -960 960 960"
        width="16px"
        fill="#e3e3e3"><path d="M120-160v-640l760 320-760 320Zm80-120 474-200-474-200v140l240 60-240 60v140Zm0 0v-400 400Z" /></svg>
    </button>
    : <button type="button" onClick={abortRequest}>
      <svg xmlns="http://www.w3.org/2000/svg"
        height="24px" viewBox="0 -960 960 960"
        width="24px" fill="#e3e3e3"><path d="M320-640v320-320Zm-80 400v-480h480v480H240Zm80-80h320v-320H320v320Z" /></svg>
    </button>

  const assistantResponseSeconds = state.messages
    .filter((message): message is ChatMessage & { stats: TStats } => message.role === 'assistant' && !!message.stats)
    .map((message) => responseSeconds(message.stats))

  const avgResponseSeconds = assistantResponseSeconds.length > 0
    ? assistantResponseSeconds.reduce((sum, seconds) => sum + seconds, 0) / assistantResponseSeconds.length
    : null

  const placeholder = avgResponseSeconds !== null
    ? `Ask my agent ... (avg response ~${avgResponseSeconds.toFixed(1)}s)`
    : "Ask my agent ..."

  const prompts = !isPending && state.topPrompts.length > 0 &&
    <div id="prompts-container">
      {state.topPrompts.map(({ body }, i) => (
        <span key={i} onClick={() => reAsk(body)}>{body}</span>
      ))}
    </div>

  return (
    <section className='agent-container'>
      <div id="agent-main">
        <div id="answer" ref={threadRef}>
          {state.messages.map((message, i) => {
            const rateLimitCleared = message.rateLimited && remainAwaitMs === 0
            return (
              <div key={i} className={`message message-${message.role}${rateLimitCleared ? ' rate-limit-cleared' : ''}`}>
                <div className="bubble" role={message.role}>
                  {rateLimitCleared
                    ? "You're free to ask now!"
                    : message.content}
                  {message.rateLimited && remainAwaitMs !== null && remainAwaitMs > 0 &&
                    ` ${Math.ceil(remainAwaitMs / 1000)} seconds remain until reset.`}
                </div>
                {message.role === 'assistant' && message.stats && (
                  <details className="message-stats">
                    <summary>stats</summary>
                    <span>input tokens: {round(message.stats.input_tokens)}</span>
                    <span>tokens per sec: {round(message.stats.tokens_per_second)}</span>
                    <span>total tokens: {round(message.stats.total_output_tokens)}</span>
                    <span>time to first token sec: {round(message.stats.time_to_first_token_seconds)}</span>
                  </details>
                )}
              </div>
            )
          })}
          {isPending && (
            <div className="message message-assistant message-pending">
              <div className="bubble">
                <PulseLoader
                  color="black"
                  loading={isPending}
                  cssOverride={{ marginInline: "0.4em" }}
                  size={5}
                  aria-label="Loading Spinner"
                  data-testid="loader" />
              </div>
            </div>
          )}
        </div>
        {prompts}
        <form action={askQuestion}>
          <textarea
            name="prompt"
            rows={3}
            maxLength={100}
            placeholder={placeholder}
            onChange={(e) => setCount(e.target.value.length)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
                e.preventDefault()
                e.currentTarget.form?.requestSubmit()
              }
            }}></textarea>
          <div className='action-toolbar'>
            <span>{lettersCount} / 100</span>
            {button}
          </div>
        </form>
      </div>
      <div style={{
        flex: "0 0 auto",
        textAlign: "center",
        fontSize: "0.5em",
        paddingTop: "0.5em"
      }}
      >powered by {MODEL_NAME}</div>
    </section>
  )
}

export default ClientToAgent
