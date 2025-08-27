import type { ReactElement } from "react";

const fsEngineer: ReactElement = <div id="fs-article">
    <h1>Full Stack Developer</h1>
    <p>I have 10+ projects under my belt for e-commers and web-applications as tools to facilitate software development.</p>
    <p>In these projects I developed interactive web-pages with developed reusable React components with optimal utilization of react hooks,
        communicating to backend via REST calls via HTTP(s) and realtime updates via WS(S) (WebSocket) events
        using sync/async functions, try/catch blocks to catch errors and transfer them to error handling middlewares.
    </p>
    <p>Integrated ORM systems to establish persistence of state of web-service by creating models with validators and
        dependencies (e.g. one-to-one, one-to-many, many-to-many), versioned migrations to create tables in database and schema, and seed files to populate values in database to perform testing or demos.
    </p>
    <p> I am passionate about designing and implementing innovative programmatic solutions.
        My goal is to deliver efficient, user-friendly, and scalable applications tailored to meet client needs.
    </p>
</div>

const seEngineer: ReactElement = <div id="se-article">
    <h1>Software Engineer</h1>
    <p>As a certified Software Engineer I become on June 2025 from App Academy.</p>
    <p>I've been captivated by this profession from my teen years, but I had an oportunity in software testing
        which I'd taken. At present I'd like to move on as Software Enginner and
        that's why I got my Post Second education in Software Engineering. <b>At this time I have experiance in Full Stack Development in addition
            to my substential experiance in Software Engineering in Test which has given me honed skills to be successful
            and productive Mid-Sr. Software Engineer.</b> Please refere to <b><a href="#set-article">Softwere Engineer in Test</a></b> article for details.
    </p>
    <p>My technological stack is:</p>
    <ul style={{ listStyle: "outside" }}>
        <li><b>Programming language:</b> Java, JavaScript, TypeScript, Python</li>
        <li><b>Network technologies:</b> HTTP(S)1.1/2, TLS, gRPC, WebRTC, WebSockets, REST, NodeJS, Browser API</li>
        <li><b>Frameworks:</b> React, Bootstrap, jQuery, Redux, Spring Boot, Flask</li>
        <li><b>ORM:</b> Sequelize, Alembic, SQLAlchemy, Hibernate</li>
        <li><b>DB:</b> Oracle, Postgreas</li>
        <li><b>Message/Notification technologies:</b> Kafka, IBM MQ, Tibco EMS, Rebit MQ</li>
        <li><b>Testing: </b>Playwrigth, Cypress, WebdriverIO, Mocha, TextNG, JUnit, Selenium WebDriver</li>
        <li><b>CI/CD:</b> Jenkins, Gitlab CI, TeamCity</li>
        <li><b>AI:</b> Ollama, Gemma3:4b, FAISS, SentenceTransformers</li>
        <li><b>Version control:</b> Git, GitHub</li>
        <li><b>Virtualization technologies:</b> Docker, Kubernetes</li>
        <li><b>Cloud:</b> AWS</li>
        <li><b>Project management:</b> npm, pip/pipenv, gradle</li>
        <li><b>Logging & Monitoring:</b> ElasticSearch, Grafana</li>
    </ul>
</div>

const setEngineer: ReactElement = <div id="set-article">
    <h1>Software Engineer in Test</h1>
    <p>I've been working 9+ years as Software Engineer in Test on 10+ projects in finecial and networking business.</p>
    <p>My responsibilities were architecture and implementation of software for testing (automation testing framework) of frontend and backend applications.</p>
    <p>Each isolated <i>automation testing framework</i> is similar to production software project. It also has <i>source code</i>, <i>resources</i>, <i>configurations</i>, <i>tests (when there is a need to test internal services/functionalities eg. converters, readers, extractors etc).</i>
        Therefore, an engineer has to apply programming patterns and best practices:</p>
    <ul style={{ listStyle: "outside" }}>
        <li>Data stractues eg. Set, List, Map, Queue, Stack with different implementations eg. LinkedList or Hash</li>
        <li>Know pros/cons of OOP and functional programming paradigms and apply</li>
        <li>Decoupling solves architecture problems realted to testability, migration to newer technologies, maintenance/bugfix, new feature developement.</li>
        <li>SOLID - set of architectural concepts that I apply in my achitecral solutions.</li>
        <li>Design patterns eg. Singletone, Builder, Factory, Facade, Executor, Adaptor.</li>
    </ul>
    <p>When testing backend application it's important to check that messages, which were send and recieved in/from Queue Management (eg. Kafka, IBM MQ, Tibco EMS, Rebit MQ), are expected and in correct order.
        In order to do that I implemented code to connect to a broker and subscribe eather to a topic or queue.
        Connection can be implemented as connection pool but also as Singleton (for automation testing this way is unusualy most utilized).
        Also, don't forget validation on Database side to make sure that state is properly persisted. I worked with Oracle, PostgreSQL databases, wrote numerous SQL queries with Inner/Left/Outter joins and with filtering and grouping.
        I wrote progressive wrapper that worked as poller of DB by executed SQL queries in loop withing expected time interval. That was
        a bigdeal because it decreased test execution time and improved reliability of tests drastically.
    </p>
    <p>When testing frontend application most common to apply POM (Page Object Model) design pattern, in addition to mentioned ones, which isolates implementation of user actions for different pages from test.
        Which makes maintenance easier in case the user actions on a page is changed. Meaning, when page was changed which affected the way how user
        interacted with it, POM should be updated accordigly, and it will be reflected automatically in all tests where that page was used.
    </p>
    <p>An ATF should be configurable for different environments and safly work with vault of secrets.</p>
</div>

const ateEngineer: ReactElement = <div id="ate-article">
    <h1>Automation Test Engineer</h1>
    <p>
        As a Test Automation Engineer, I design and implement
        automation frameworks to perform functional testing of
        end-to-end scenarios for both front-end and back-end
        applications. By analyzing functional requirements, I create
        robust and efficient test case designs to ensure comprehensive
        and reliable automated testing.
    </p>
</div>

const devOps: ReactElement = <div id="devops-article">
    <h1>DevOps</h1>
    <p>
        As a DevOps specialist, I integrate software projects into
        CI/CD pipelines by creating and maintaining efficient build
        scripts to automate workflows for building, testing, and
        releasing applications. I schedule script executions,
        configure custom triggers, and ensure seamless deployment
        processes to enhance delivery speed and reliability
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
