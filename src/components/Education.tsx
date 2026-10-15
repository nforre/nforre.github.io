import React from 'react';
import { EducationItem } from '../data/portfolio';

interface EducationProps {
  education: EducationItem[];
  certifications: string[];
}

export const Education: React.FC<EducationProps> = ({ education, certifications }) => {
  return (
    <section id="education">
      <h2>Education</h2>
      <div className="grid">
        {education.map((item) => (
          <article
            key={item.id}
            className={`card ${item.isWide ? 'wide' : ''}`}
          >
            <h3>{item.institution}</h3>
            <div className="when">{item.period}</div>
            <p>{item.description}</p>
          </article>
        ))}
        <article className="card">
          <h3>Certifications</h3>
          <ul>
            {certifications.map((cert) => (
              <li key={cert}>{cert}</li>
            ))}
          </ul>
        </article>
      </div>
    </section>
  );
};
