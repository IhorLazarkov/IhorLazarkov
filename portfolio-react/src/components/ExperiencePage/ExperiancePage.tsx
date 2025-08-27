import "./Experiance.css"

function ExperiancePage() {
    return (<section className="article">
        <div id="accenture" className="work-tile">
            <div className="work-tile-head">
                <h4>Software Engineer, Testing | Accenture | May 2024 - Present</h4>
                <hr />
            </div>
            <div className="work-tile-body">
                Worked as Senior Software Engineer in Test in a team of 6
                engineers. Responsible for delivering software for automation
                testing of functional and integration tests with following
                integration into CI/CD. Communication with product ownership to
                learn functionality, demo of completed work, gather feedback and
                deliver improvements.
            </div>
            <div>
                <p>
                    <i>Tech stack:</i>Java, Selenium WB, Serenity BDD, Cucumber,
                    Applitools, Gradle, Jenkins, Git
                </p>
            </div>
            <ul style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                <li>
                    Contributed to software for automation testing with
                    development of architectural solutions and best practices by
                    utilization of OOP principles (e.g. polymorphism, inheritance,
                    encapsulation) programming design patterns (e.g. Builder,
                    Singletone, Factory, Commander or Strategy, Facade) and
                    decoupling implementation and encapsulation via abstract
                    methods, interfaces and functional interfaces;
                </li>
                <li>
                    Developed reliable software for automation testing of
                    Web-pages and solved high-complex problems by thorough
                    analysis of HTML, CSS and JavaScript via effective use of
                    Dev-tools to identify mechanism of functioning of components
                    of the page;
                </li>
                <li>
                    Design test scenarios in Gherkin language using parametrizable
                    instructions, DataTables, Scenario Outline for reusability
                    with maximum level of readability for non-technical people as
                    well as with exhaustive level of details to make test valuable
                    assets and source of truth;
                </li>
                <li>
                    Development of glue code (executable code associated with each
                    command in feature file) and organizing it in clear per web
                    page and/or per functionality manner to establish clear
                    ownership and responsibilities to avoid code duplication and
                    improve maintenance;
                </li>
                <li>
                    Meticulous code analysis of transitioned project by debugging,
                    executing of tests, gaining ownership of a code-base,
                    refactoring and as a result stability improvements, decrease
                    of duplicated code by ~1800 lines and tests execution time by
                    up to 40%;
                </li>
            </ul>
        </div>

        <div id="cisco" className="work-tile">
            <div className="work-tile-head">
                <h4>Software Engineer, Testing | Cisco Meraki | Feb 2022 - Apr 2024</h4>
                <hr />
            </div>
            <div>
                <p>
                    <i>Tech stack:</i>JavaScript, TypeScript, Cypress,
                    WebDriverIO, Applitools, GitLab, Git
                </p>
            </div>
            <div className="work-tile-body">
                Worked as Senior Software Engineer in Test, and software test
                engineer in a team of 5. Developed software for functional, E2E
                and API testing using in-house and new automation test
                frameworks. Completed test planning and test design. Established
                testing standards and processes.
                <ul style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                    <li>
                        Successfully accomplished thorough testing of an application
                        during pivotal change of the business model of the company
                        by developing and execution of a test plan that consisted of
                        multiple phases to accommodate and deliver KPIs;
                    </li>
                    <li>
                        Developed software from scratch for functional and
                        integration testing of front-end and back-end;
                    </li>
                    <li>
                        Defined, together with the team, and developed quality gates
                        for the functional changes that drastically improved
                        stability of builds and prevented several critical defects
                        of being promoted to production which saved the company’s
                        reputation and improved productivity of teams what would
                        switch for bug fix otherwise;
                    </li>
                    <li>
                        Effective communication with team members by defining a
                        clear agenda, questions and timeframe for meetings.
                    </li>
                </ul>
            </div>
        </div>

        <div id="epam" className="work-tile ">
            <div className="work-tile-head">
                <h4>Senior Automation Test Engineer | EPAM Systems LLC | Oct 2008 - Feb 2022</h4>
                <hr />
            </div>
            <div className="work-tile-body">
                Worked in a fast-paced, agile environment on multiple complex
                projects, with multiple teams of 5 employees each. Developed
                test standards and strategies for new releases, defined the
                scope of testing, and collaborated with technical teams and
                product owners to discuss functional details. Designed and
                executed Java-based automation testing and performance tests
                frameworks and tools such as Selenium WD, Cucumber, FitNesse,
                TestNG, Rest Assured and JMeter etc. for web applications and
                RESTful application programming interface (API) services.
                <ul style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                    <li>
                        Leveraged technical expertise to design an automation test
                        framework to validate databases and messages across all
                        projects and tests for a client, resulting in 4-times faster
                        test execution, decreased support time, and improved
                        visibility of software quality using proficient programming
                        skills, expertise in Java, programming design patterns
                    </li>
                    <li>
                        Expanded testing coverage and capabilities by introducing
                        new automation testing technology and transitioning away
                        from the legacy system, which enabled cleaner tests and
                        optimized readability, maintenance, and enhancements
                    </li>
                    <li>
                        Led a decrease in regression execution time and enabled
                        monitoring of software stability by implementing a necessary
                        code base and new Gradle tasks to enhance reliability and
                        integration of automation test frameworks into CI/CD
                        processes
                    </li>
                    <li>
                        Delivered reliable and scalable software by designing and
                        integrating a new software project from scratch, including
                        web applications, automation test frameworks, libraries, and
                        plugins, to test front-end, back-end, and RESTful APIs. o
                        Utilized Cucumber, Selenium, REST Assured, and numerous best
                        practices, including configurability, reusability of
                        components, object-oriented programming (OOP) concepts, Java
                        design patterns, and functional programming.
                    </li>
                    <li>
                        Decreased the time required for test preparation, test
                        investigation, and QA environment health monitoring by
                        developing web applications to facilitate testing using
                        Spring Boot MVC, JavaScript, HTML, and CSS
                    </li>
                </ul>
            </div>
        </div>

    </section>);
}

export default ExperiancePage;