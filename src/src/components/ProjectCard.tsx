import type { IProject } from "../data";

interface ProjectCardProps {
  project: IProject;
}

const ProjectCard = ({ project }: ProjectCardProps) => {
  return (
    <div className="project-card">
      <a href={project.url} target="_blank" rel="noopener noreferrer">
        <div className='timeframe'><img src={project.imageUrl} alt={project.title} /></div>
        <div className="project-content">
          <div>
            <h4>{project.title}</h4>
            <svg xmlns="http://www.w3.org/2000/svg"
              viewBox="0 -960 960 960"
              fill="var(--border-color)"
              height="16px"
              width="16px">
              <path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h280v80H200v560h560v-280h80v280q0 33-23.5 56.5T760-120H200Zm188-212-56-56 372-372H560v-80h280v280h-80v-144L388-332Z" />
            </svg>
          </div>
          <p>{project.description}</p>
          <div className="tech-stack">
            {project.techStack.map(tech => <span key={tech}>{tech}</span>)}
          </div>
        </div>
      </a>
    </div>
  );
};

export default ProjectCard;