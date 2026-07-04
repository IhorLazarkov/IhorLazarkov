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
}

type TState = {
  messages: ChatMessage[],
  topPrompts: { body: string }[],
}

const INIT_STATE: TState = { messages: [], topPrompts: [] }

function round(num: string): number {
  return Number.parseFloat(Number.parseFloat(num).toFixed(2))
}

function ClientToAgent() {

  const [lettersCount, setCount] = useState(0)

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
    const headers: HeadersInit = { "Content-Type": "application/json" }
    const reqBody: RequestInit = method == 'POST' ? { method, headers, body, signal } : { method, signal }

    const userMessage: ChatMessage = { role: 'user', content: value }

    try {
      const response = await fetch(uri, reqBody)

      // Request finished successfully, clear the ref
      controllerRef.current = null;

      // reset word count
      setCount(0)

      const data = await response.json();
      const replyMessage: ChatMessage = data.error
        ? { role: 'system-error', content: data.error }
        : {
          role: 'assistant',
          content: parseGemmaResponseToHtml(data.message),
          stats: { ...data.stats },
        }

      return {
        messages: [...prevState.messages, userMessage, replyMessage],
        topPrompts: [...data.queries],
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
    if (thread) thread.scrollTop = thread.scrollHeight
  }, [state.messages.length, isPending])

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
          {state.messages.map((message, i) => (
            <div key={i} className={`message message-${message.role}`}>
              <div className="bubble">{message.content}</div>
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
          ))}
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
            placeholder="Ask my agent ..."
            onChange={(e) => setCount(e.target.value.length)}></textarea>
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
