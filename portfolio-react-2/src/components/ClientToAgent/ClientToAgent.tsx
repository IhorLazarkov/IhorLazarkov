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

function ClientToAgent() {

  const BASE_URL = 'https://agentic.ihorlazarkov-swe.in'
  const [lettersCount, setCount] = useState(0)

  const controllerRef = useRef<AbortController | null>(null)

  function abortRequest() {
    controllerRef.current?.abort()
  }

  type TResponse = {
    response: React.ReactElement[],
    topPrompts: { body: string }[]
  }

  async function sendPrompt(_: TResponse, formData: FormData): Promise<TResponse> {
    const controller = new AbortController()
    const signal = controller.signal

    controllerRef.current = controller

    const value = formData.get('prompt') as string
    const uri = formData.get("uri") as string || `${BASE_URL}/api/generate`
    const method = formData.get("method") as string || 'POST'
    const body = method == 'POST'
      ? JSON.stringify({ "model": "gemma3:4b", "prompt": value, "stream": false })
      : {} as BodyInit
    const headers: HeadersInit = { "Content-Type": "application/json" }
    const reqBody: RequestInit = method == 'POST' ? { method, headers, body, signal } : { method, signal }

    try {
      const response = await fetch(uri, reqBody)

      // Request finished successfully, clear the ref
      controllerRef.current = null;

      // reset word count
      setCount(0)

      const data = await response.json();
      return {
        response: [
          <span className='question-area'>Visitor: {value}</span>,
          ...parseGemmaResponseToHtml(data.response)
        ],
        topPrompts: [...data.queries]
      };

    } catch (error) {
      controllerRef.current = null;

      if (error instanceof Error && error.name === 'AbortError') {
        return { response: [<span>Request Aborted by User.</span>], topPrompts: [] };
      } else if (error instanceof Error) {
        return { response: [<span>{error.message}</span>], topPrompts: [] };
      }
      return { response: [<span>An unknown error occurred.</span>], topPrompts: [] };
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

  const [answers, askQuestion, isPending] = useActionState(sendPrompt, { response: [], topPrompts: [] } as TResponse)
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
  const prompts = <details id="prompts-container">
    <summary style={{ color: "var(--border-color)" }}>Trading questions</summary>
    <div >
      {
        !isPending
        && answers.topPrompts.length > 0
        && answers.topPrompts.map(({ body }, i) => (
          <span key={i} onClick={() => reAsk(body)}>{body}</span>
        ))}
    </div>
  </details>
  return (
    <section className='agent-container'>
      {/* Top prompts */}
      {prompts}
      <div id="agent-main">
        <div id="answer">
          {isPending
            ? <div style={{
              backgroundColor: "grey",
              borderRadius: "10px",
              width: "fit-content",
              padding: "0.1em"
            }}>
              <PulseLoader
                color="black"
                loading={isPending}
                cssOverride={{ marginInline: "0.4em" }}
                size={5}
                aria-label="Loading Spinner"
                data-testid="loader" />
            </div>
            : <>{answers.response.map((answer, i) => <span key={i}>{answer}</span>)}</>
          }
        </div>
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
        textAlign: "center",
        fontSize: "0.5em",
        paddingTop: "0.5em"
      }}
      >powered by Gemma3:4b</div>
    </section>
  )
}

export default ClientToAgent
