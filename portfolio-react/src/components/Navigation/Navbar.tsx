import "./NavBar.css"
import { Link } from "react-router-dom";
import { faHouse } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function NavBar() {
    return (
        <nav>
            <ul>
                <li><Link to="/"><FontAwesomeIcon icon={faHouse}></FontAwesomeIcon></Link></li>
                <li><Link to="/whatido">What I Do?</Link></li>
                <li><Link to="/work">Work</Link></li>
                <li><Link to="/projects">Projects</Link></li>
                <li><Link to="/education">Education</Link></li>
                <li><Link to="/awards">Awards</Link></li>
            </ul>
        </nav>
    );
}