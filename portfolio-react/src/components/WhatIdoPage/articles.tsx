import type { ReactElement } from "react";

const fsEngineer: ReactElement = <div id="fs-article">
    <h1>Full Stack Developer</h1>
    <p>I have 10+ projects under my belt for e-commerce and web applications as tools to facilitate software development.</p>
    <p>In these projects, I developed interactive web pages with created from scratch reusable React components, utilizing optimal React hooks, communicating to the backend via REST calls over HTTP(S)1.1 and real-time updates via WebSockets (WSS/WS) events using sync/async functions, try/catch blocks to handle errors and transfer them to error handling middleware.</p>
    <p>I integrated ORM systems to establish persistence of a client state by creating models with validators and relations (e.g. one-to-one, one-to-many, many-to-many), versioned migrations to create database tables and schemas, and seed files to populate values in the database for testing or demos.</p>
    <p>Also, I support release processes together with DevOps team by observing and consulting installation process. Perform critical rollback activities in case of failure.</p>
    <p>I am passionate about designing and implementing innovative programmatic solutions. My goal is to deliver efficient, user-friendly, and scalable applications tailored to meet client needs.</p>
</div>

const seEngineer: ReactElement = <div id="se-article">
    <h1>Software Engineer</h1>
    <p>I've been Software Engineer for 9+ years and created software to test desktop, web-application including frontend and backend.</p>
    <p>Even thought on June 2025 I graduated at App Academy and became certified Software Engineer.</p>
    <p>My skill set encompasses Full Stack Engineering what complemented by substantial experience in Software Engineering in Test – skills that have prepared me for a successful and productive Mid-Senior Software Engineer position.</p>
    <p>My technological stack includes:</p>
    <ul style={{ listStyle: "outside" }}>
        <li><strong>Programming Languages:</strong> Java, JavaScript, TypeScript, Python</li>
        <li><strong>Network Technologies:</strong> HTTP(S)1.1/2, TLS, gRPC, WebRTC, WebSockets, REST, NodeJS, Browser APIs</li>
        <li><strong>Frameworks:</strong> React, Bootstrap, jQuery, Redux, Spring Boot, Flask</li>
        <li><strong>ORM:</strong> Sequelize, Alembic, SQLAlchemy, Hibernate</li>
        <li><strong>Databases:</strong> Oracle, PostgreSQL</li>
        <li><strong>Message/Notification Technologies:</strong> Kafka, IBM MQ, Tibco EMS, RabbitMQ</li>
        <li><strong>Testing:</strong> Playwright, Cypress, WebDriverIO, Mocha, TestNG, JUnit, Selenium WebDriver, Postman, RestAssured, Cucumber, Serenity BDD, Gherkin</li>
        <li><strong>CI/CD:</strong> Jenkins, GitLab CI, TeamCity</li>
        <li><strong>AI:</strong> Ollama, Gemma3:4b, FAISS, SentenceTransformers</li>
        <li><strong>Version Control:</strong> Git, GitHub</li>
        <li><strong>Virtualization Technologies:</strong> Docker, Kubernetes</li>
        <li><strong>Cloud:</strong> AWS</li>
        <li><strong>Project Management Tools:</strong> npm, pip/pipenv, Gradle</li>
        <li><strong>Logging & Monitoring:</strong> Elasticsearch, Grafana</li>
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
    "Software Engineer": { ref: "se-article", element: seEngineer },
    "Full Stack Developer": { ref: "fs-article", element: fsEngineer },
    "Software Engineer in Test": { ref: "set-article", element: setEngineer },
    "Automation Test Engineer": { ref: "ate-article", element: ateEngineer },
    "DevOps": { ref: "devops-article", element: devOps }
}
