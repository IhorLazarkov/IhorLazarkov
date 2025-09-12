import "./AiAgent.css"
import { answers } from "./answers"
import { useReducer, useRef, useState, type ReactElement } from "react";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrambleTextPlugin } from "gsap/ScrambleTextPlugin";

gsap.registerPlugin(ScrambleTextPlugin);

const initAnswers = {
    "Greeting": <div className="answer"> Hello! Welcome to Ihor Lazarkov’s website.
        I’m an AI agent, here to explore ideas and answer your questions.
        <p>I’m a mock version at the moment, but I’m powered by Google’s PaLM 2 model and running on Google’s Vertex AI platform.</p>
        <p>I’m excited to learn and grow with you. Welcome!</p>
    </div>
}

const reducer = (state: ReactElement[], action: { type: string, payload: string }) => {
    switch (action.type) {
        case "ADD_ANSWER":
            const question = <div
                className="question"
                style={{ border: "1px solid var(--bg-color)" }}
            >
                {action.payload}
            </div>
            return [...state, question, answers[action.payload]]
        case "CLEAR":
            return []
        default:
            return state;
    }
}

function AiAgentPage() {
    function qHandler(e: React.MouseEvent<HTMLElement>) {
        const target = e.target as HTMLElement
        setIsShowGreeting(false)
        window.scrollTo(0, 0)
        dispatch({ type: "CLEAR", payload: "" });
        dispatch({ type: "ADD_ANSWER", payload: target.textContent as string })
    }
    const [answers, dispatch] = useReducer(reducer, Object.values(initAnswers))
    const [isShowGreeting, setIsShowGreeting] = useState(true)
    const container = useRef(null)

    useGSAP(() => {
        const mm = gsap.matchMedia()
        mm.add("(prefers-reduced-motion: no-preference)", () => {
            const tl = gsap.timeline()
            tl.from(".question", { opacity: 0, duration: 1 })

            const items = gsap.utils.toArray(".answer h4, .answer p, .answer ul li, button")
            items.forEach((element) => {
                tl.from(element as HTMLElement, { opacity: 0, duration: 0.5 })
            })
        })
    }, {
        dependencies: [answers]
    })

    return (<section className="ai-agent-container">
        <div ref={container}
            className="answers-container"
            style={{ padding: "1em" }}
        >
            {isShowGreeting && <div style={{
                border: "1px solid var(--info)",
                marginBlock: "0.3em",
                padding: "0.6em",
                color: "var(--info)",
                marginBottom: "1em"
            }}>
                <svg style={{ marginRight: "0.5em" }} xmlns="http://www.w3.org/2000/svg" height="18px" viewBox="0 -960 960 960" width="18px" fill="var(--info)">
                    <path d="M440-280h80v-240h-80v240Zm40-320q17 0 28.5-11.5T520-640q0-17-11.5-28.5T480-680q-17 0-28.5 11.5T440-640q0 17 11.5 28.5T480-600Zm0 520q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z" />
                </svg>
                Welcome valuable visitor! I am Ihor and I'd like to explain what's this and how it's done?
                Main idea is to use GPT model to help with analyze of all the data from this site. I used GPT model Gemma3:4b spinning on Ollama.
                Why? I think it's insightful to get such opinion because the model uses math and numbers don't lie.
            </div>
            }
            {answers.map((answer, i) => <div key={i}>{answer}</div>)}
            <div className="actions-toolbar">
                <button onClick={qHandler}>Tell me about Ihor.</button><br />
                <button onClick={qHandler}>How suitable Ihor is for Software Engineer position?</button><br />
                <button onClick={qHandler}>How suitable Ihor is for Full Stack Engineer position?</button><br />
                <button onClick={qHandler}>What’s Ihor’s weak areas in Software Engineering?</button>
            </div>
        </div>
    </section>);
}

export default AiAgentPage;