import "./Education.css"

function EducationPage() {
    return (<section className="article">
        <h1>Univercity</h1>
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
    </section>);
}

export default EducationPage;