export interface IExperience {
  url: string;
  timeframe: string;
  title: string;
  company: string;
  description: string;
  techStack: string[];
}

export const experiences: IExperience[] = [
  {
    url: "https://www.lvc-solutions.com",
    timeframe: "2025 - Present",
    title: "Full Stack Engineer",
    company: "LVC Solutions",
    description: "Build critical components, responsive, high-performant pages with state management on front-end. Also, on the back-end I build routs to server CRUD request. Work closely with the founder to accept requirements and provide professional feedback as well as with with engineers to implement and advocate best practices in software engineering.",
    techStack: ["html", "css", "react.js", "next.js", "javascript", "typescript", "firebase"],
  },
  {
    url: "https://www.accenture.com/us-en",
    timeframe: "2024 - Present",
    title: "Senior Software Engineer in Test",
    company: "Accenture",
    description: "Developed automation testing of a complex test scenarios of operations team in finance. Integrated automation into ci/cd with setup of testing on daily, weekly cadence. Close communication with operations team to gather and implement requirements.",
    techStack: ["java", "selenium", "serenity", "jenkins", "html", "css", "javascript"],
  },
  {
    url: "https://meraki.cisco.com",
    timeframe: "2022 - 2024",
    title: "Senior Software Engineer in Test",
    company: "Cisco Meraki",
    description: "Architect and integrate software for testing into ci/cd of web app with distributed systems. Created convenient tasks in build file for seamless quality check before and after merge of code changes. Communicate with development team to advocate testing principles and created education materials.",
    techStack: ["webdriver.io", "cypress.io", "html", "css", "javascript", "typescript", "python", "kuberneties"],
  },
  {
    url: "https://www.epam.com",
    timeframe: "2008 - 2022",
    title: "Senior Software Engineer in Test",
    company: "EPAM Systems",
    description: "Worked in a team of 5 engineers to create software for testing of desktop and application with distributed architecture. Developed services to connect to various messaging management systems, databases. Implemented automation testing of complex scenarios involved validation of state in database and messages in topic and queue.",
    techStack: ["java", "fitnesse", "imb mq", "tibco ems", "sql", "docker"],
  },
];

export interface IProject {
  url: string;
  imageUrl: string;
  title: string;
  description: string;
  techStack: string[];
}

export const projects: IProject[] = [
  {
    url: "https://lvcfairjob.com/",
    imageUrl: "./lvcfairjob.png",
    title: "Fair Job Portal",
    description: "Platform for job seekers and employers with mature identity verification of both sides to eliminate fake profiles and jobs.",
    techStack: ["typescript", "react.js", "next.js", "firebase"],
  },
  {
    url: "http://lvcspotlightmedia.com/",
    imageUrl: "./lvcspotlightmedia.png",
    title: "LVC SpotlIght Media",
    description: "Platform for marketing team to advertise their publishing services.",
    techStack: ["html", "css", "react.js", "javascript", "express.js"],
  },
  {
    url: "https://fornoroma.ihorlazarkov-swe.in",
    imageUrl: "./fornoroma.png",
    title: "Forno Roma",
    description: "On-line pizza shop with  voice assistant and live tracker of orders.",
    techStack: ["html", "css", "javascript", "react.js", "redux", "sequelize", "express.js", "https server", "websocket server secure", "postgres", "sqlight", "nginx"],
  },
  {
    url: "https://rrh.ihorlazarkov-swe.in",
    imageUrl: "./rrh.png",
    title: "Rental Residence Hub",
    description: "Platform to advertise and rent apartments with geo location. Clients can provide feedback, rate and mark favorites.",
    techStack: ["html", "css", "javascript", "react.js", "redux", "sequelize", "express.js", "https server", "websocket secure server", "postgres", "sqlight", "nginx"],
  },
  {
    url: "https://wwt.ihorlazarkov-swe.in",
    imageUrl: "./wwt.png",
    title: "Wood Working Tools",
    description: "E-commerce project of online shop.",
    techStack: ["html", "css", "javascript", "react.js", "python", "alembic", "sqlalchemy", "postgres", "sqlight", "nginx"],
  },
];