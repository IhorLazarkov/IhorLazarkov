import "./Education.css"

function EducationPage() {
    return (<section className="article">
        <h1>University</h1>
        <div className="education-container">
            <div className="education-tile">
                <img src="diploma-gold.svg" alt="diploma image" />
                <span>
                    <h3>Odessa National University I.I. Mechnikov</h3>
                    <h4>Masters in Computer Systems and Networks</h4>
                    <span>2005 - 2006</span>
                </span>
            </div>
            <div className="education-tile">
                <img src="diploma.svg" alt="diploma image" />
                <span>
                    <h3>Odessa National University I.I. Mechnikov</h3>
                    <h4>Bachelor in Computer Systems and Networks</h4>
                    <span>2001 - 2005</span>
                </span>
            </div>
        </div>
        <h1>Post Second Education</h1>
        <div className="education-tile">
            <img src="SE_Diploma.png" alt="diploma image" />
            <span>
                <h3>App academy</h3>
                <h4>Software Engineer</h4>
                <span>2024 - 2025</span>
            </span>
        </div>
        <h1>Courses</h1>
        <div className="education-container">
            <div className="education-tile">
                <img
                    src="performance-cert.jpeg"
                    alt="ceritiface image"
                />
                <span>
                    <h4>Performance Testing Course</h4>
                    <span>Oct - Dec 2021</span>
                </span>
            </div>
            <div className="education-tile">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 -960 960 960"
                >
                    <path d="M480-120 200-272v-240L40-600l440-240 440 240v320h-80v-276l-80 44v240L480-120Zm0-332 274-148-274-148-274 148 274 148Zm0 241 200-108v-151L480-360 280-470v151l200 108Zm0-241Zm0 90Zm0 0Z" /></svg>
                <span>
                    <h4>AI-Engineer & Intelligent Agent</h4>
                    <span>July 2025 - Present</span>
                </span>
            </div>
        </div>
    </section>);
}

export default EducationPage;