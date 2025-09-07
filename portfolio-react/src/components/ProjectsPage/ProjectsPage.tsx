import { Link } from "react-router-dom";
import "./Projects.css"
import {
    faGithub,
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


function ProjectsPage() {
    return (<section className="article">
        <h3>Medium projects</h3>
        <div className="project-tile">
            <video
                src="demo-1.mov"
                // type="video/mov"
                loop
                controls
                preload="auto"
                muted></video>
            <div className="project-description">

                <a href="https://99.98.183.163:3003/"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <h4>Forno Roma</h4>
                    <svg xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 -960 960 960">
                        <path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h280v80H200v560h560v-280h80v280q0 33-23.5 56.5T760-120H200Zm188-212-56-56 372-372H560v-80h280v280h-80v-144L388-332Z" />
                    </svg>
                </a>
                <p>
                    This is complete online pizzeria where user can view menu,
                    create orders with add-ons (except paying of course). User can
                    observe order status in-live and many more. I completed this
                    project in 3 weeks. The UI/UX design, frontend and backend,
                    html, css etc are completely mine work whereas chat GPT really
                    helped me to select colors, fonts and name.
                </p>
                <p>
                    Innovative thing in this project is an agent that understands
                    voice and add pizzas to a cart.
                </p>
                <p>Its layout tailored for desktops only for now!</p>
                <div className="tech-details">Tech stack:
                    <div>HTTP(S)/1.1</div>
                    <div>WS(S)</div>
                    <div>javascript</div>
                    <div>css</div>
                    <div>react</div>
                    <div>redux</div>
                    <div>express</div>
                    <div>websocket</div>
                    <div>speech recognition API</div>
                    <div>sqlite</div>
                    <div>postgres</div>
                    <div>vite</div>
                </div>
                <div style={{
                    display: "flex",
                    justifyContent: "space-between"
                }}>
                    <span>
                        <FontAwesomeIcon style={{ width: "18px", height: "18px", verticalAlign: "middle" }} icon={faGithub} />
                        <Link to="https://github.com/IhorLazarkov/FronoPizza">Source code is here</Link>
                    </span>
                    <span>Status: 🟢</span>
                </div>
            </div>
        </div>

        <div className="project-tile">
            <video
                src="rrh-1.mov"
                controls
                loop
                preload="auto"
                muted
            ></video>
            <div className="project-description">

                <a href="https://99.98.183.163:3001/"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <h4>Rental Residences Hub</h4>
                    <svg xmlns="http://www.w3.org/2000/svg"
                        height="24px" viewBox="0 -960 960 960"
                        width="24px">
                        <path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h280v80H200v560h560v-280h80v280q0 33-23.5 56.5T760-120H200Zm188-212-56-56 372-372H560v-80h280v280h-80v-144L388-332Z" />
                    </svg>
                </a>
                <p>
                    The application designed to help users find vacation rentals
                    effortlessly. Intuitive use, filtering of available
                    properties, view detailed descriptions and reviews.
                </p>
                <p>
                    There were 60 pages of requirements regarding UI that were
                    implemented in 3 weeks, and I am proud of the result.
                    Minimalistic design, blue and white colors patterns and live
                    geolocation make it light and pleasant to use.
                </p>
                <p>The layout supports both desktop and mobile.</p>
                <div className="tech-details">Tech stack:
                    <div>HTTP(S)/1.1</div>
                    <div>react</div>
                    <div>redux</div>
                    <div>javascript</div>
                    <div>html</div>
                    <div>css</div>
                    <div>express</div>
                    <div>sequelize</div>
                    <div>geolocation API</div>
                    <div>Google Map API</div>
                    <div>sqlite</div>
                    <div>postgresql</div>
                    <div>vite</div>
                </div>
                <div style={{
                    display: "flex",
                    justifyContent: "space-between"
                }}>
                    <span>
                        <FontAwesomeIcon style={{ width: "18px", height: "18px", verticalAlign: "middle" }} icon={faGithub} />
                        <Link to="https://github.com/IhorLazarkov/rental-residences-hub">Source code is here</Link>
                    </span>
                    <span>Status: 🟢</span>
                </div>
            </div>
        </div>

        <div className="project-tile">
            <div>
                <img src="psw.png" alt="Woodworking tool app" />
            </div>
            <div className="project-description">

                <a href="https://99.98.183.163:3002/"
                    target="_blank"
                    rel="noopener noreferrer">
                    <h4>Woodworking tool</h4>
                    <svg xmlns="http://www.w3.org/2000/svg"
                        height="24px" viewBox="0 -960 960 960"
                        width="24px">
                        <path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h280v80H200v560h560v-280h80v280q0 33-23.5 56.5T760-120H200Zm188-212-56-56 372-372H560v-80h280v280h-80v-144L388-332Z" /></svg>

                </a>
                <p>
                    This online store is a product of team of 4 people what we
                    made for 2 weeks. A customer may review all information about
                    a product (e.g. description, reviews), add to a cart, rate
                    and leave a review.
                </p>
                <p>
                    During work on this project I am proud of being all for my
                    team: contribute in design, support, issue analysis and fix.
                </p>
                <p>Its layout tailored for desktops only for now!</p>
                <div className="tech-details">Tech stack:
                    <div>react</div>
                    <div>redux</div>
                    <div>css</div>
                    <div>flask</div>
                    <div>wtform</div>
                    <div>alembic</div>
                    <div>sqlalchemy</div>
                    <div>sqlite</div>
                    <div>postgresql</div>
                    <div>vite</div>
                </div>
                <div style={{
                    display: "flex",
                    justifyContent: "space-between"
                }}>
                    <span>
                        <FontAwesomeIcon style={{ width: "18px", height: "18px", verticalAlign: "middle" }} icon={faGithub} />
                        <Link to="https://github.com/IhorLazarkov/ps_woodworking">Source code is here</Link>
                    </span>
                    <span>Status: 🟢</span>
                </div>
            </div>
        </div>
        <h4>Small projects/prototypes</h4>
        <div className="project-tile">
            <div>
                <img src="https://media.licdn.com/dms/image/v2/D4E22AQEqCak_rd8jEg/feedshare-shrink_800/B4EZgAa08RGwAg-/0/1752353690220?e=1759363200&v=beta&t=qWwFfTOyWFYwBmistiFARTCyzTYOeRP5yPolEQ0Q8yE" alt="" />
            </div>
            <div className="project-description">
                <h3>Wordle</h3>
                <div>
                    <FontAwesomeIcon style={{ width: "24px", height: "24px", verticalAlign: "middle" }} icon={faGithub} />
                    <Link to="https://github.com/IhorLazarkov/wordle">Source code is here</Link>
                </div>
                <p>My goal wasn't just to make a clone; I aimed to explore and solve specific challenges:</p>
                <ul style={{ listStyle: "outside" }}>
                    <li>Dynamic Grid Rendering: I tackled this by segmenting the board into three distinct React components: one for completed attempts, one for the current input row, and one for the empty cells. Each cell uses a key in the format: for reliable reconciliation.</li>
                    <li>Flexible User Input: I implemented a robust mechanism allowing users to make entries via both a virtual keyboard and their physical keyboard. This involved creating a custom context to inject event handlers effectively.</li>
                </ul>
                <p>I extensively leveraged core #ReactHooks like useContext, useEffect, useReducer, useRef, and useState to manage state and side effects. I also honed my #TypeScript skills by meticulously defining types for React components and their props, ensuring robust type safety and maintainable code. I particularly enjoyed implementing cleanup functions, like aborting fetch requests on unmount – a critical practice for performance and preventing memory leaks!</p>
            </div>
        </div>
        <div className="project-tile">
            <div>
                <img src="notification-manager.png" alt="" />
            </div>
            <div className="project-description">
                <h4>Notification Manager</h4>
                <div>
                    <FontAwesomeIcon style={{ width: "24px", height: "24px", verticalAlign: "middle" }} icon={faGithub} />
                    <Link to="https://github.com/IhorLazarkov/notify-kaleidoscope">Source code is here</Link>
                </div>

                <p>This project was inspired by AWS and I wanted to challenge myself to implement a similar concept and explore its functionality.</p>

                <p>One of the pain points with notifications is they disappear quickly and there are not many can fit on the screen. While this works for some cases, it can be very inconvenient, especially when you need to troubleshoot an issue.

                    This project handles up to 80 one-liner notifications without them ever clearing on their own. Here's how it works:
                </p>
                <ul>
                    <li>Persistent Display: Nothing disappears on a timeout, so you can review notifications at your own pace.</li>
                    <li>Grouped Management: Notifications are organized into logical groups for easy navigation and management.</li>
                    <li>Flexible Clearing: Users can clear notifications one-by-one or clear an entire group at once.</li>
                    <li>Intuitive Navigation: You can easily switch between different notification groups.</li>
                </ul>
                <p>
                    It was built with React. This was a fantastic opportunity to work with my favorite useReducer hook. The core functionality relies on useReducer and useState, which made handling the complex state logic a joy.
                </p>
            </div>
        </div>
    </section>
    );
}

export default ProjectsPage;