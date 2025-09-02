import "./NavBar.css"
import { Link } from "react-router-dom";
import { faHouse } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function NavBar() {
    return (
        <nav>
            <ul>
                <li><Link to="/IhorLazarkov/"><FontAwesomeIcon icon={faHouse}></FontAwesomeIcon></Link></li>
                <li><Link to="/IhorLazarkov/whatido">What I Do?</Link></li>
                <li><Link to="/IhorLazarkov/experience">Experience</Link></li>
                <li><Link to="/IhorLazarkov/projects">Projects</Link></li>
                <li><Link to="/IhorLazarkov/education">Education</Link></li>
                <li><Link to="/IhorLazarkov/recognition">Recognition</Link></li>
            </ul>
        </nav>
    );
}