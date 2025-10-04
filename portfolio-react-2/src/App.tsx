import './App.css'
import {
  faFacebookF,
  faGithub,
  faLinkedinIn,
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function App() {
  return (<div id="main">
    <header>
      <section>
        <h1>Ihor Lazarkov</h1>
        <h2>Software Engineer</h2>
        <p>I build cost effective systems from ground-up for small and medium business.</p>
        <nav>
          <ul>
            <li><a href="#about"></a>about</li>
            <li><a href="#experience"></a>experience</li>
            <li><a href="#projects"></a>projects</li>
          </ul>
        </nav>

        <div className="media-icons">
          <a
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Visit my github profile"
            href="https://github.com/ihorLazarkov">
            <FontAwesomeIcon icon={faGithub} />
          </a>
          <a
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Visit my linkedin page"
            href="https://linkedin.com/in/ihorlazarkov">
            <FontAwesomeIcon icon={faLinkedinIn} />
          </a>
          <a
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Visit my facebook page"
            href="https://www.facebook.com/igor.lazarkov">
            <FontAwesomeIcon icon={faFacebookF} />
          </a>
          <svg xmlns="http://www.w3.org/2000/svg"
            height="24px" viewBox="0 -960 960 960"
            width="24px">
            <path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h280v80H200v560h560v-280h80v280q0 33-23.5 56.5T760-120H200Zm188-212-56-56 372-372H560v-80h280v280h-80v-144L388-332Z" /></svg>
        </div>

      </section>
    </header>
    <main>
      {/* About me section */}
      <section id="about" className="article">
        <p>I am Full Stack Engineer and my focus is to build cost-effective, scalable, maintainable and high-performance systems.
          I have build my expertise over the course of 16 years in software production business.
        </p>
        <p><b>Currently</b> I work as Full Stack Engineer at LVC Solutions and as open-source contributor at Layer 5.
          I contribute to the creation and maintenance of front-end and back-end components. Ensuring our platforms have convenient user experience
          by implementing best practices and standards.
        </p>
        <p>Also, I work as Software Developer in Test at Accenture where I contribute to building streamlined automation testing infrastructure
          and software, ensuring high-confidence in quality of shippable software.
        </p>
        <p><b>In the past</b> I had opportunity to work as Senior Software Engineer in Test to establishing infrastructure and creation of software for testing
          for complex, distributed systems in finance and networking business in large corporations.
        </p>
        <p>In my spare time, I am a runner, participating in virtual running events within adidas runners community,
          spend time with my family: playing games, watching movies, outdoors activities.</p>
      </section>

      {/* Experience */}
      <section id="experience" className="article">

        {/* LVC Solutions */}
        <div className="experience-card">
          <a href="https://www.lvc-solutions.com"
            target="_blank"
            rel="noopener noreferrer">
            <div className='timeframe'>2025 - Present</div>
            <div className="experience-content">
              <div>
                <h4>Full Stack Engineer @ LVC Solutions</h4>
                <svg xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 -960 960 960"
                  fill="var(--border-color)"
                  height="16px"
                  width="16px">
                  <path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h280v80H200v560h560v-280h80v280q0 33-23.5 56.5T760-120H200Zm188-212-56-56 372-372H560v-80h280v280h-80v-144L388-332Z" />
                </svg>
              </div>
              <p>Build critical components, responsive, high-performant pages with state management on front-end.
                Also, on the back-end I build routs to server CRUD request.
                Work closely with the founder to accept requirements and provide professional feedback as well as with
                with engineers to implement and advocate best practices in software engineering.
              </p>
              <div className='tech-stack'>
                <span>html</span><span>css</span><span>react.js</span><span>next.js</span>
                <span>javascript</span><span>typescript</span><span>firebase</span>
              </div>
            </div>
          </a>
        </div>

        {/* Accenture*/}
        <div className="experience-card">
          <a href="https://www.accenture.com/us-en"
            target="_blank"
            rel="noopener noreferrer">
            <div className='timeframe'>2024 - Present</div>
            <div className="experience-content">

              <div>
                <h4>Senior Software Engineer in Test @ Accenture</h4>
                <svg xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 -960 960 960"
                  fill="var(--border-color)"
                  height="16px"
                  width="16px">
                  <path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h280v80H200v560h560v-280h80v280q0 33-23.5 56.5T760-120H200Zm188-212-56-56 372-372H560v-80h280v280h-80v-144L388-332Z" />
                </svg>
              </div>
              <p>Developed automation testing of a complex test scenarios of operations team in finance.
                Integrated automation into ci/cd with setup of testing on daily, weekly cadence. Close communication
                with operations team to gather and implement requirements.
              </p>
              <div className="tech-stack">
                <span>java</span><span>selenium</span><span>serenity</span>
                <span>jenkins</span><span>html</span><span>css</span>
                <span>javascript</span>
              </div>
            </div>
          </a>
        </div>

        {/* Cisco Meraki */}
        <div className="experience-card">
          <a href="https://meraki.cisco.com"
            target="_blank"
            rel="noopener noreferrer">
            <div className='timeframe'>2022 - 2024</div>
            <div className="experience-content">

              <div>
                <h4>Senior Software Engineer in Test @ Cisco Meraki</h4>
                <svg xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 -960 960 960"
                  fill="var(--border-color)"
                  height="16px"
                  width="16px">
                  <path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h280v80H200v560h560v-280h80v280q0 33-23.5 56.5T760-120H200Zm188-212-56-56 372-372H560v-80h280v280h-80v-144L388-332Z" />
                </svg>
              </div>
              <p>Architect and integrate software for testing into ci/cd of web app with distributed systems.
                Created convenient tasks in build file for seamless quality check before and after merge of code changes.
                Communicate with development team to advocate testing principles and created education materials.</p>
              <div className="tech-stack">
                <span>webdriver.io</span><span>cypress.io</span><span>html</span>
                <span>css</span><span>javascript</span><span>typescript</span>
                <span>python</span><span>docker</span><span>kuberneties</span>
              </div>
            </div>
          </a>
        </div>

        {/* EPAM Systems */}
        <div className="experience-card">
          <a href="https://www.epam.com"
            target="_blank"
            rel="noopener noreferrer">
            <div className='timeframe'>2008 - 2022</div>
            <div className="experience-content">

              <div>
                <h4>Senior Software Engineer in Test @ EPAM Systems</h4>
                <svg xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 -960 960 960"
                  fill="var(--border-color)"
                  height="16px"
                  width="16px">
                  <path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h280v80H200v560h560v-280h80v280q0 33-23.5 56.5T760-120H200Zm188-212-56-56 372-372H560v-80h280v280h-80v-144L388-332Z" />
                </svg>
              </div>
              <p>Worked in a team of 5 engineers to create software for testing of desktop and application with distributed
                architecture. Developed services to connect to various messaging management systems, databases.
                Implemented automation testing of complex scenarios involved validation of state in database and messages in topic and queue.
              </p>
              <div className="tech-stack">
                <span>java</span><span>fitnesse</span><span>imb mq</span>
                <span>tbinco ems</span><span>sql</span><span>oracle</span>
                <span>docker</span>
              </div>
            </div>
          </a>
        </div>

      </section>

      {/* Projects */}
      <section id="projects" className="article">

        <div className="project-card">
          <a href="https://lvcfairjob.com/"
            target="_blank"
            rel="noopener noreferrer">
            <div className='timeframe'><img src="lvcfairjob.png" alt="" /></div>
            <div className="project-content">
              <div>
                <h4>LVC SpotlIght Media</h4>
                <svg xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 -960 960 960"
                  fill="var(--border-color)"
                  height="16px"
                  width="16px">
                  <path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h280v80H200v560h560v-280h80v280q0 33-23.5 56.5T760-120H200Zm188-212-56-56 372-372H560v-80h280v280h-80v-144L388-332Z" />
                </svg>
              </div>
              <p>Platform for job seekers and employers with mature identity verification
                of both sides to eliminate fake profiles and jobs. </p>
              <div className="tech-stack">
                <span>typescript</span><span>react.js</span><span>next.js</span>
                <span>firebase</span>
              </div>
            </div>
          </a>
        </div>

        <div className="project-card">
          <a href="http://lvcspotlightmedia.com/"
            target="_blank"
            rel="noopener noreferrer">
            <div className='timeframe'><img src="lvcspotlightmedia.png" alt="" /></div>
            <div className="project-content">
              <div>
                <h4>LVC SpotlIght Media</h4>
                <svg xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 -960 960 960"
                  fill="var(--border-color)"
                  height="16px"
                  width="16px">
                  <path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h280v80H200v560h560v-280h80v280q0 33-23.5 56.5T760-120H200Zm188-212-56-56 372-372H560v-80h280v280h-80v-144L388-332Z" />
                </svg>
              </div>
              <p>Platform for marketing team to advertise their publishing services.</p>
              <div className="tech-stack">
                <span>html</span><span>css</span>
                <span>react.js</span><span>javascript</span><span>express.js</span>
              </div>
            </div>
          </a>
        </div>

        <div className="project-card">
          <a href="https://fornoroma.ihorlazarkov-swe.in"
            target="_blank"
            rel="noopener noreferrer">
            <div className='timeframe'><img src="fornoroma.png" alt="" /></div>
            <div className="project-content">
              <div>
                <h4>Forno Roma</h4>
                <svg xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 -960 960 960"
                  fill="var(--border-color)"
                  height="16px"
                  width="16px">
                  <path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h280v80H200v560h560v-280h80v280q0 33-23.5 56.5T760-120H200Zm188-212-56-56 372-372H560v-80h280v280h-80v-144L388-332Z" />
                </svg>
              </div>
              <p>On-line pizza shop with  voice assistant and live tracker of orders.</p>
              <div className="tech-stack">
                <span>html</span><span>css</span><span>javascript</span><span>react.js</span>
                <span>redux</span><span>sequelize</span>
                <span>express.js</span><span>https server</span><span>websocket secure server</span>
                <span>postgres</span><span>sqlight</span>
                <span>nginx</span>
              </div>
            </div>
          </a>
        </div>

        <div className="project-card">
          <a href="https://rrh.ihorlazarkov-swe.in"
            target="_blank"
            rel="noopener noreferrer">
            <div className='timeframe'><img src="rrh.png" alt="" /></div>
            <div className="project-content">
              <div>
                <h4>Rental Residence Hub</h4>
                <svg xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 -960 960 960"
                  fill="var(--border-color)"
                  height="16px"
                  width="16px">
                  <path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h280v80H200v560h560v-280h80v280q0 33-23.5 56.5T760-120H200Zm188-212-56-56 372-372H560v-80h280v280h-80v-144L388-332Z" />
                </svg>
              </div>
              <p>Platform to advertise and rent apartments with geo location. Clients can provide feedback, rate and mark favorites.</p>
              <div className="tech-stack">
                <span>html</span><span>css</span><span>javascript</span><span>react.js</span>
                <span>redux</span><span>sequelize</span>
                <span>express.js</span><span>https server</span><span>websocket secure server</span>
                <span>postgres</span><span>sqlight</span>
                <span>nginx</span>
              </div>
            </div>
          </a>
        </div>

        <div className="project-card">
          <a href="https://wwt.ihorlazarkov-swe.in"
            target="_blank"
            rel="noopener noreferrer">
            <div className='timeframe'><img src="wwt.png" alt="" /></div>
            <div className="project-content">
              <div>
                <h4>Wood Working Tools</h4>
                <svg xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 -960 960 960"
                  fill="var(--border-color)"
                  height="16px"
                  width="16px">
                  <path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h280v80H200v560h560v-280h80v280q0 33-23.5 56.5T760-120H200Zm188-212-56-56 372-372H560v-80h280v280h-80v-144L388-332Z" />
                </svg>
              </div>
              <p>E-commerce project of online shop.</p>
              <div className="tech-stack">
                <span>html</span><span>css</span><span>javascript</span><span>react.js</span>
                <span>python</span><span>alembic</span><span>sqlalchemy</span>
                <span>postgres</span><span>sqlight</span>
                <span>nginx</span>
              </div>
            </div>
          </a>
        </div>

      </section>

    </main>
    {/* <footer></footer> */}
  </div>)
}

export default App
