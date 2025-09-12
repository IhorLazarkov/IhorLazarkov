import "./HomePage.css"
import {
    faFacebookF,
    faGithub,
    faLinkedinIn,
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, useNavigate } from "react-router-dom";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export default function HomePage() {
    const navigation = useNavigate()

    useGSAP(() => {
        const lt = gsap.timeline()
        lt.from(".morph-container, #morph", { opacity: 0, y: -10, scale: 0.8, duration: 1 })
            .from("div.try-agent", { y: 20, opacity: 0, duration: 1, delay: 0 })
    })

    return (
        <div className="intro-container">
            <div className="round-img-container">
                <div className="frame"
                    style={{ backgroundImage: `url(./public/profile.webp)` }}
                ></div>
            </div>
            <div className="title-container">
                <h1><i>Ihor Lazarkov</i></h1>
                <h1>Software Engineer</h1>
            </div>
            <div className="media-icons">
                <Link
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Visit my github profile"
                    to="https://github.com/ihorLazarkov">
                    <FontAwesomeIcon icon={faGithub} />
                </Link>
                <Link
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Visit my linkedin page"
                    to="https://linkedin.com/in/ihorlazarkov">
                    <FontAwesomeIcon icon={faLinkedinIn} />
                </Link>
                <Link
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Visit my facebook page"
                    to="https://www.facebook.com/igor.lazarkov">
                    <FontAwesomeIcon icon={faFacebookF} />
                </Link>
                <div>
                    <svg xmlns="http://www.w3.org/2000/svg"
                        height="24px" viewBox="0 -960 960 960"
                        width="24px">
                        <path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h280v80H200v560h560v-280h80v280q0 33-23.5 56.5T760-120H200Zm188-212-56-56 372-372H560v-80h280v280h-80v-144L388-332Z" /></svg>
                </div>
            </div>
            <div className="morph-container"
                onClick={() => navigation("/IhorLazarkov/agent")}>
                <div id="morph"></div>
                <span>AI</span>
            </div>
            <div className="try-agent" style={{ marginTop: "0.5em", fontSize: "0.9em" }}>try agent</div>
            <div style={{
                position: "absolute",
                bottom: "0",
                fontSize: "0.5em"
            }}>
                © {new Date().getFullYear()} Ihor Lazarkov. All rights reserved.
            </div>
        </div>
    );
}