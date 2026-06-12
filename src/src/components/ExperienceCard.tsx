import type { IExperience } from "../data";

interface ExperienceCardProps {
  experience: IExperience;
}

const ExperienceCard = ({ experience }: ExperienceCardProps) => {
  return (
    <div className="experience-card">
      <a href={experience.url} target="_blank" rel="noopener noreferrer">
        <div className='timeframe'>{experience.timeframe}</div>
        <div className="experience-content">
          <div>
            <h4>{experience.title} @ {experience.company}</h4>
            <svg xmlns="http://www.w3.org/2000/svg"
              viewBox="0 -960 960 960"
              fill="var(--border-color)"
              height="16px"
              width="16px">
              <path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h280v80H200v560h560v-280h80v280q0 33-23.5 56.5T760-120H200Zm188-212-56-56 372-372H560v-80h280v280h-80v-144L388-332Z" />
            </svg>
          </div>
          <p>{experience.description}</p>
          <div className='tech-stack'>
            {experience.techStack.map(tech => <span key={tech}>{tech}</span>)}
          </div>
        </div>
      </a>
    </div>
  );
};

export default ExperienceCard;
