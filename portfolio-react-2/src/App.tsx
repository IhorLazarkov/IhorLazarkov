import './App.css'
import {
  // faFacebookF,
  faGithub,
  faLinkedinIn,
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useRef } from 'react';
import { experiences, projects } from './data';
import ExperienceCard from './components/ExperienceCard';
import ProjectCard from './components/ProjectCard';
import ClientToAgent from './components/ClientToAgent/ClientToAgent';

function App() {
  const aboutRef = useRef<HTMLElement>(null);
  const projectsRef = useRef<HTMLElement>(null);
  const experienceRef = useRef<HTMLElement>(null);

  useEffect(() => {
    //Observer logic
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        const { id } = entry.target;
        if (entry.isIntersecting) {
          document.querySelector(`nav a[href='#${id}']`)!.classList.add('active');
        } else {
          document.querySelector(`nav a[href='#${id}']`)!.classList.remove('active');
        }
      });
    }, { threshold: 0.3 })
    //Mouse move effect
    const onMouseOver = (e: MouseEvent) => {
      const div = document.querySelector('.gradient-overlay') as HTMLDivElement;
      requestAnimationFrame(() => {
        div.style.setProperty('--gradientX', e.clientX - 250 + 'px');
        div.style.setProperty('--gradientY', e.clientY - 250 + 'px');
      })
    }
    //Wheel
    const onWheel = (e: WheelEvent) => {
      const container = document.querySelector('main') as HTMLDivElement;
      container.scrollTop += e.deltaY * 2;
    }
    if (!projectsRef.current || !aboutRef.current || !experienceRef.current) {
      return;
    }
    observer.observe(aboutRef.current);
    observer.observe(experienceRef.current);
    observer.observe(projectsRef.current);
    window.addEventListener('mouseover', onMouseOver);
    window.addEventListener('wheel', onWheel);

    //remove it when maintenance is over
    const warningTimeout = setTimeout(() => {
      document.querySelector('.banner')?.classList.add('maintenance-warning');
    }, 3000);

    // Cleanup on unmount
    return () => {
      observer.disconnect();
      window.removeEventListener('mouseover', onMouseOver);
      window.removeEventListener('wheel', onWheel);

      //remove it when maintenance is over
      clearTimeout(warningTimeout);
    }
  }, [])

  return (<div id="main">
    {/* //add warning here */}
    <div className="warning banner"
      style={{ width: "100%", height: "fit-content", position: "fixed", left: "0", zIndex: 100 }}>
      <svg xmlns="http://www.w3.org/2000/svg"
        viewBox="0 -960 960 960"
      ><path d="M330-120 120-330v-300l210-210h300l210 210v300L630-120H330Zm36-190 114-114 114 114 56-56-114-114 114-114-56-56-114 114-114-114-56 56 114 114-114 114 56 56Zm-2 110h232l164-164v-232L596-760H364L200-596v232l164 164Zm116-280Z" /></svg>
      <span>
        <div>Maintenance scheduled for this weekend (06/06 - 06/07): </div>
        <ul>
          <li>Upgrade of libraries</li>
          <li>OS update</li>
          <li>Agent migration to Qwen 3 model</li>
        </ul>
      </span>
    </div>
    <div className="gradient-overlay"></div>
    <header>
      <section>
        <div className="round-img-container">
          <div className="img-container">
            <img src='./title-photo.jpg' className="frame"></img>
          </div>
          <h1>Ihor Lazarkov</h1>
          <h2>Senior SDET & Automation Architect</h2>
        </div>
        <div>
          <p>Architecting automation and testing strategies to accelerate quality delivery.</p>
          <nav>
            <ul>
              <li><a href="#about">About</a></li>
              <li><a href="#experience">Experience</a></li>
              <li><a href="#projects">Projects</a></li>
            </ul>
          </nav>
        </div>

        <div id="agent-parent-container">
          {/* Example of warning */}
          {/* <div className="warning">
            <svg xmlns="http://www.w3.org/2000/svg"
              viewBox="0 -960 960 960"
            ><path d="M330-120 120-330v-300l210-210h300l210 210v300L630-120H330Zm36-190 114-114 114 114 56-56-114-114 114-114-56-56-114 114-114-114-56 56 114 114-114 114 56 56Zm-2 110h232l164-164v-232L596-760H364L200-596v232l164 164Zm116-280Z" /></svg>
            <span>Server temporarily is unavailable due to expired certificate.</span>
          </div> */}
          <ClientToAgent />
        </div>

        <div style={{
          display: "flex",
          gap: "1em",
          alignItems: "baseline",
        }}>
          <div>
            <a href="mailto:ilazarkov@gmail.com" style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: "0.5em",
              width: "fit-content",
              border: "1px solid var(--secondary-text)",
              paddingBlock: "0.5em",
              paddingInline: "1em",
              borderRadius: "20px",
              textDecoration: "none",
              color: "inherit"
            }}>
              <span>Email me</span>
              <svg xmlns="http://www.w3.org/2000/svg"
                height="24px"
                width="24px"
                viewBox="0 -960 960 960"
                style={{
                  cursor: "pointer",
                  fill: "var(--secondary-text)",
                }}>
                <path d="M160-160q-33 0-56.5-23.5T80-240v-480q0-33 23.5-56.5T160-800h640q33 0 56.5 23.5T880-720v480q0 33-23.5 56.5T800-160H160Zm320-280L160-640v400h640v-400L480-440Zm0-80 320-200H160l320 200ZM160-640v-80 480-400Z" />
              </svg>
            </a>
          </div>
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
            {/* <a
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Visit my facebook page"
              href="https://www.facebook.com/igor.lazarkov">
              <FontAwesomeIcon icon={faFacebookF} />
            </a> */}
            <svg xmlns="http://www.w3.org/2000/svg"
              height="24px" viewBox="0 -960 960 960"
              width="24px">
              <path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h280v80H200v560h560v-280h80v280q0 33-23.5 56.5T760-120H200Zm188-212-56-56 372-372H560v-80h280v280h-80v-144L388-332Z" /></svg>
          </div>
        </div>

      </section>
    </header>
    <main>
      {/* About me section */}
      <section ref={aboutRef} id="about" className="article">
        <p>I am a Senior SDET & Automation Architect focused on building cost-effective, scalable, and high-performance automation ecosystems. I have built my expertise over 8 years in the software production business.</p>
        <p><b>Currently</b> I work as a Senior SDET at Edward Jones, developing complex automation infrastructure, and as a Full Stack Engineer at LVC Solutions, building critical components and high-performant web pages.</p>
        <p><b>In the past</b> I architected testing software for distributed systems at Cisco Meraki and EPAM Systems, focusing on infrastructure integration, CI/CD, and advocating for quality engineering principles.</p>
        <p>In my spare time, I am an active runner in the adidas runners community and enjoy spending time with my family: playing games, watching movies, and engaging in outdoor activities.</p>
      </section>

      <section ref={experienceRef} id="experience" className="article">
        {experiences.map((exp, index) => (
          <ExperienceCard key={index} experience={exp} />
        ))}
      </section>

      <section ref={projectsRef} id="projects" className="article">
        {projects.map((proj, _) => (
          <ProjectCard key={proj.url} project={proj} />
        ))}
      </section>

    </main>
  </div>)
}

export default App
