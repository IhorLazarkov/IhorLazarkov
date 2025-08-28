import "./HomePage.css"
import {
    faFacebookF,
    faGithub,
    faLinkedinIn,
} from "@fortawesome/free-brands-svg-icons";
import { faMobile, faMailBulk, faCopy } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";


export default function HomePage() {
    return (
        <div className="intro-container">
            <div className="round-img-container">
                <div className="frame"
                    style={{ backgroundImage: `url(./public/profile.png)` }}
                ></div>
            </div>
            <h1>Ihor Lazarkov</h1>
            <h2><i>Software Engineer</i></h2>
            <div className="media-icons">
                <Link
                    target="_blank"
                    rel="noopener noreferrer"
                    to="https://github.com/ihorLazarkov">
                    <FontAwesomeIcon icon={faGithub} />
                </Link>
                <Link
                    target="_blank"
                    rel="noopener noreferrer"
                    to="https://linkedin.com/in/ihorlazarkov">
                    <FontAwesomeIcon icon={faLinkedinIn} />
                </Link>
                <Link
                    target="_blank"
                    rel="noopener noreferrer"
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
            <ul>
               <li><FontAwesomeIcon icon={faMobile}/> (615) 506 - 9411 <FontAwesomeIcon icon={faCopy}/></li>
               <li><FontAwesomeIcon icon={faMailBulk}/> ilazarkov@gmail.com <FontAwesomeIcon icon={faCopy}/></li> 
            </ul>
        </div>
    );
}