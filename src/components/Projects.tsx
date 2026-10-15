import React, { useState } from 'react';
import { ProjectItem } from '../data/portfolio';
import { ExternalLink, Info } from 'lucide-react';
import { GitHubActivity } from './GitHubActivity';
import { ProjectModal } from './ProjectModal';

interface ProjectsProps {
  projects: ProjectItem[];
}

export const Projects: React.FC<ProjectsProps> = ({ projects }) => {
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);

  return (
    <section id="projects">
      <h2>Projects & Engineering</h2>

      {/* Main projects grid */}
      <div className="grid">
        {projects.map((proj) =>
          proj.isUpcoming ? (
            <article
              key={proj.id}
              className="card soon"
              style={{ cursor: 'pointer' }}
              onClick={() => setSelectedProject(proj)}
              tabIndex={0}
              role="button"
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  setSelectedProject(proj);
                }
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h3>{proj.title}</h3>
                <span className="tag" style={{ fontSize: '0.75rem' }}>
                  Roadmap
                </span>
              </div>
              <p>{proj.description}</p>
              <div className="links">
                <span style={{ fontSize: '0.88rem', color: 'var(--pink)', display: 'inline-flex', alignItems: 'center', gap: '0.3rem' }}>
                  <Info size={14} /> View upcoming project details
                </span>
              </div>
            </article>
          ) : (
            <article key={proj.id} className="card">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                <h3>{proj.title}</h3>
                <span className="when">Fall 2026</span>
              </div>
              <p>{proj.description}</p>

              {proj.tags && proj.tags.length > 0 && (
                <div className="tags">
                  {proj.tags.map((tag) => (
                    <span key={tag} className="tag">
                      {tag}
                    </span>
                  ))}
                </div>
              )}

              <div className="links">
                {proj.link && (
                  <a
                    href={proj.link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}
                  >
                    {proj.link.label} <ExternalLink size={14} />
                  </a>
                )}
                <button
                  type="button"
                  onClick={() => setSelectedProject(proj)}
                  style={{
                    background: 'transparent',
                    border: 'none',
                    color: 'var(--muted)',
                    cursor: 'pointer',
                    fontSize: '0.88rem',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.3rem',
                    fontFamily: 'inherit',
                    padding: 0,
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--pink)')}
                  onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--muted)')}
                >
                  <Info size={14} /> Inspect architecture
                </button>
              </div>
            </article>
          )
        )}
      </div>

      {/* GitHub Contributions Visualizer */}
      <GitHubActivity username="nforre" />

      {/* Project details modal */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
};
