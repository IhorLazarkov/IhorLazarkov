import type { ReactElement } from "react";

const fsEngineer: ReactElement = <div id="fs-article">
    <h1>Full Stack Developer</h1>
    <p>I have 10+ projects under my belt for e-commerce and web applications as tools to facilitate software development.</p>
    <p>In these projects, I developed interactive web pages with created from scratch reusable React components, utilizing optimal React hooks, communicating to the backend via REST calls over HTTP(S)1.1 and real-time updates via WebSockets (WSS/WS) events using sync/async functions, try/catch blocks to handle errors and transfer them to error handling middleware.</p>
    <p>I integrated ORM systems to establish persistence of a client state by creating models with validators and relations (e.g. one-to-one, one-to-many, many-to-many), versioned migrations to create database tables and schemas, and seed files to populate values in the database for testing or demos.</p>
    <p>Also, I support release processes together with DevOps team by observing and consulting installation process. Perform critical rollback activities in case of failure.</p>
    <p>I am passionate about designing and implementing innovative programmatic solutions. My goal is to deliver efficient, user-friendly, and scalable applications tailored to meet client needs.</p>
</div>

const aboutMe: ReactElement = <div id="aboutMe-article">
    <h1>About Me</h1>
    <p>
        I'm Full Stack Engineer / Senior Software Engineer in Test (10+ years) / Senior Software Automaton Engineer (13+ years)
        with a focus on building scalable, high-performance web apps and helping the firms to establish trust with its customers
        by providing high-quality services. My strategy is to split work in phases that concentrated on
        fast delivery of business critical functionality within high-quality standards and improve gradually.
    </p>
    <p>
        I am product centric - regardless of position in a team I aspire to contribute and to be a supportive, transparent team player to deliver meaningful product.
        Therefore, I've developed my expertise in software development as well as quality control.
    </p>
    <p>I am client centric. I often find my self spending extra time with a software for inspiration of innovation to make software better for client.</p>
    <p>I believe in software should be simple.</p>

    <div style={{
        marginBlock: "1em",
        display: "flex",
        flexDirection: "column",
        gap: "1",
        border: "1px solid var(--border-color)",
        padding: "1em"
    }}>
        <h4 style={{ margin: "0" }}>Notable accomplishments & achievements</h4>
        <ul style={{ margin: "0" }}>
            <li>Architected, designed and implemented POC of automation tool using Java Core, JavaEE, Spring Boot, Hibernate for ELT testing that laid a foundation for future success and growth of the team.</li>
            <li>Prevent numerous bugs escaping to production what prevented damaging of firm's reputation and hours and hours of work of several teams to investigate, fix and rollback.</li>
            <li>Drastic improvement of legacy automation framework of application with distributed services architecture
                by design and implementation of adaptors to perform robust validation of database state persistence and EMS messages. Resulted in
                60% decrease of automation execution time and 50% reliability improvement.
            </li>
            <li>Meticulous code analysis of a transitioned project by debugging,
                gaining ownership of a code-base, refactoring and results are: stability improvements,
                decrease of duplicated code by ~1800 lines, tests execution time is up by 40%.
            </li>
        </ul>
    </div>

</div>

const skills: ReactElement = <div id="skills-article">
    <h3><i>Soft skills</i></h3>
    <div style={{ display: "flex", flexWrap: "wrap", gap: "1em" }}>
        <span>COMMUNICATION</span>
        <span>PROBLEM SOLVING</span>
        <span>CRITICAL THINKING</span>
        <span>CREATIVITY</span>
        <span>NEW TECH LEARNER</span>
    </div>
    <h3><i>Hard skills</i></h3>
    <ul>
        <li><strong>Languages </strong><div style={{ marginTop: "0.3em" }}>Java, JavaScript, TypeScript, Python</div></li>
        <li><strong>Front end development</strong><div style={{ marginTop: "0.3em" }}>HTML, CSS3, React.JS, Bootstrap, jQuery, Redux, Spring Boot MVC, Flask, Browser APIs</div></li>
        <li><strong>Backend / DB development</strong><div style={{ marginTop: "0.3em" }}>Sequelize, Alembic, SQLAlchemy, Spring Boot Application, Hibernate, Oracle, PostgreSQL, NodeJS, HTTP(S)1.1/2, TLS, gRPC, WebRTC, WebSockets, REST</div></li>
        <li><strong>Testing / Automation</strong> <div style={{ marginTop: "0.3em" }}>Playwright, Cypress, WebDriverIO, Mocha, TestNG, JUnit, Selenium WebDriver, Postman, RestAssured, Cucumber, Serenity BDD, Gherkin</div></li>
        <li><strong>Message/Notification Technologies</strong><div style={{ marginTop: "0.3em" }}>Kafka, IBM MQ, Tibco EMS, RabbitMQ</div></li>
        <li><strong>DevOps / Hosting</strong><div style={{ marginTop: "0.3em" }}>AWS, Jenkins, GitLab CI, TeamCity, Docker, Kubernetes, Elasticsearch, Grafana</div></li>
        <li><strong>AI</strong><div style={{ marginTop: "0.3em" }}>Ollama, Gemma3:4b, FAISS, SentenceTransformers</div></li>
    </ul>
</div>

const setEngineer: ReactElement = <div id="set-article">
    <h1>Software Engineer in Test</h1>
    <p>I’ve worked 9+ years as a Software Engineer in Test on 10+ projects across financial and networking businesses.</p>
    <p>My responsibilities included the architecture and implementation of software for automated testing (an automation testing framework) of both frontend and backend applications.</p>
    <p>Each isolated automation testing framework is similar to a production software project. It encompasses source code, resources, configurations, and tests (when internal services/functionalities – such as converters, readers, and extractors – need to be tested). Therefore, an engineer must apply programming patterns and best practices:</p>
    <ul style={{ listStyle: "outside" }}>
        <li><strong>Data structures</strong> (e.g., Set, List, Map, Queue, Stack) with different implementations (e.g., LinkedList, Hash)</li>
        <li><strong>Understanding</strong> the pros and cons of object-oriented and functional programming paradigms, and their application.</li>
        <li><strong>Decoupling</strong> solves architectural problems related to testability, technology migration, maintenance/bug fixing, and new feature development.</li>
        <li><strong>SOLID</strong> – a set of architectural concepts that I consistently apply to my architectural solutions.</li>
        <li><strong>Design patterns</strong> (e.g., Singleton, Builder, Factory, Facade, Executor, Adapter)</li>
    </ul>
    <p>When testing backend applications, it's crucial to verify that messages sent and received through Queue Management systems (e.g., Kafka, IBM MQ, Tibco EMS, RabbitMQ) are expected and in the correct order. To achieve this, I implemented code to connect to a broker and subscribe to topics or queues.</p>
    <p>This connection can be implemented as a connection pool, or as a Singleton (which is frequently utilized for automation testing). Furthermore, remember to perform thorough validation on the database side to ensure that the state is properly persisted. I’ve worked extensively with Oracle and PostgreSQL databases, writing numerous SQL queries utilizing Inner/Left/Outer joins and filtering/grouping. I developed a progressive wrapper that acted as a poller, executing SQL queries in a loop within a defined time interval. This significantly reduced test execution time and dramatically improved test reliability.</p>
    <p>When testing frontend applications, the Page Object Model (POM) design pattern is commonly applied, alongside the previously mentioned patterns. POM isolates the implementation of user actions for different pages, which simplifies maintenance when user interactions on a page are modified. Specifically, if a page is updated, the POM should be updated accordingly, and this change will automatically be reflected in all tests where that page is utilized.</p>
    <p>An ATF (Automation Test Framework) should be configurable for different environments and securely manage secrets using a vault.</p>
</div>

const ateEngineer: ReactElement = <div id="ate-article">
    <h1>Automation Test Engineer</h1>
    <p>
        As an Automation Test Engineer, I design and implement automation frameworks to perform functional testing
        of end-to-end scenarios for both front-end and back-end applications. By analyzing functional requirements,
        I create robust and efficient test case designs to ensure comprehensive and reliable automated testing.
    </p>
</div>

const devOps: ReactElement = <div id="devops-article">
    <h1>DevOps</h1>
    <p>
        As a DevOps specialist, I integrate software projects into CI/CD pipelines by creating and maintaining
        efficient build scripts to automate workflows for building, testing, and releasing applications.
        I schedule script executions, configure custom triggers, and ensure seamless deployment processes to
        accelerate delivery speed and reliability.
    </p>
</div>

// exportdoEn
type TArticle = { ref: string, element: ReactElement }
export const articles: Record<string, TArticle> = {
    "About Me": { ref: "aboutMe-article", element: aboutMe },
    "Skills": { ref: "skills-article", element: skills },
    "Full Stack Developer": { ref: "fs-article", element: fsEngineer },
    "Software Engineer in Test": { ref: "set-article", element: setEngineer },
    "Automation Test Engineer": { ref: "ate-article", element: ateEngineer },
    "DevOps": { ref: "devops-article", element: devOps }
}
