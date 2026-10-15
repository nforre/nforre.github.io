import React from 'react';
import { ExperienceItem } from '../data/portfolio';

interface ExperienceProps {
  experiences: ExperienceItem[];
}

export const Experience: React.FC<ExperienceProps> = ({ experiences }) => {
  return (
    <section id="experience">
      <h2>Experience</h2>
      <div>
        {experiences.map((exp) => (
          <div key={exp.id} className="role">
            <h3>
              {exp.role}, {exp.company}
            </h3>
            <div className="when">{exp.period}</div>
            <p>{exp.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};
