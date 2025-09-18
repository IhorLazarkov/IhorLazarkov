import "./AiAgent.css"
import { answers as answersFromFile } from "./answers"
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
            return [...state, question, answersFromFile[action.payload]]
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

    const closeInfo = () => {
        gsap.matchMedia()
            .add("(prefers-reduced-motion: no-preference)", () => {
                gsap.to('.rationale', {
                    y: -20, opacity: 0, duration: 0.3, ease: "expo.out", onComplete: () => {
                        setIsShowGreeting(false)
                    }
                })
            }).add("(prefers-reduced-motion: reduce)", () => {
                setIsShowGreeting(false)
            })
    }

    useGSAP(() => {
        const mm = gsap.matchMedia()
        mm.add("(prefers-reduced-motion: no-preference)", () => {
            const tl = gsap.timeline()
            tl.from(".question", { opacity: 0, duration: 1 })

            const items = gsap.utils.toArray(".answer h1, .answer h2, .answer p, .answer ul li, .answer ol li, button")
            items.forEach((element) => {
                tl.from(element as HTMLElement, { opacity: 0, duration: 0.5 })
            })
            tl.fromTo(".rationale", { y: -20, opacity: 0, duration: 0.3}, { y: 0, opacity: 1, ease:"expo.in" })
        })
    }, {
        dependencies: [answers]
    })

    return (<section className="ai-agent-container">
        <div ref={container}
            className="answers-container"
            style={{ padding: "1em" }}
        >
            {answers.map((answer, i) => <div key={i}>{answer}</div>)}
            <div className="actions-toolbar">
                {Object.keys(answersFromFile).map((q, i) => <button key={i} onClick={qHandler}>{q}</button>)}
            </div>
        </div>
        {isShowGreeting && <div
            className="rationale"
            style={{
                position: "absolute",
                zIndex:"1",
                top: "20%",
                backgroundColor: "var(--bg-color)",
                border: "1px solid var(--info)",
                marginBlock: "0.3em",
                padding: "0.6em",
                color: "var(--info)",
                marginBottom: "1em",
            }}>
            <a style={{ margin: "0.5em", cursor: "pointer" }} onClick={closeInfo}>[X]</a>
            Welcome valuable visitor! I am Ihor and I'd like to explain what's this and how it's done?
            Main idea is to use GPT model to help with analyze of all the data from this site. I used GPT model Gemma3:4b spinning on Ollama.
            Why? I think it's insightful to get such opinion because the model uses math and numbers don't lie.
        </div>
        }
    </section>);
}

export default AiAgentPage;