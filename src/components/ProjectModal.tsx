import React, { useEffect } from 'react';
import { ProjectItem } from '../data/portfolio';
import { X, ExternalLink, Code2 } from 'lucide-react';

interface ProjectModalProps {
  project: ProjectItem | null;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!project) return null;

  return (
    <div
      className="modal-overlay"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button
          type="button"
          className="modal-close"
          onClick={onClose}
          aria-label="Close project modal"
        >
          <X size={18} />
        </button>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.4rem' }}>
          <Code2 size={20} color="var(--red-soft)" />
          <span style={{ fontSize: '0.85rem', color: 'var(--pink)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            {project.isUpcoming ? 'Upcoming Project Roadmap' : 'Coursework & Architecture'}
          </span>
        </div>

        <h3 id="modal-title" style={{ fontSize: '1.6rem', margin: '0 0 0.8rem' }}>
          {project.title}
        </h3>

        <p style={{ color: 'var(--muted)', fontSize: '1.02rem', lineHeight: 1.6, marginBottom: '1.4rem' }}>
          {project.description}
        </p>

        {project.isUpcoming ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{ background: 'var(--panel2)', border: '1px solid var(--line)', padding: '1.2rem' }}>
              <h4 style={{ margin: '0 0 0.5rem', color: 'var(--pink)', fontFamily: 'var(--serif)' }}>
                1. 2D / Casual Game
              </h4>
              <p style={{ margin: 0, color: 'var(--muted)', fontSize: '0.92rem' }}>
                Developing a browser-based gameplay experience using TypeScript and canvas state management, incorporating collision mechanics and custom sound design.
              </p>
            </div>

            <div style={{ background: 'var(--panel2)', border: '1px solid var(--line)', padding: '1.2rem' }}>
              <h4 style={{ margin: '0 0 0.5rem', color: 'var(--pink)', fontFamily: 'var(--serif)' }}>
                2. Motion & Animation Showreel
              </h4>
              <p style={{ margin: 0, color: 'var(--muted)', fontSize: '0.92rem' }}>
                Showcasing digital animation and post-production workflows crafted in Adobe After Effects, highlighting keyframing, typography in motion, and audio synchronization.
              </p>
            </div>

            <div style={{ background: 'var(--panel2)', border: '1px solid var(--line)', padding: '1.2rem' }}>
              <h4 style={{ margin: '0 0 0.5rem', color: 'var(--pink)', fontFamily: 'var(--serif)' }}>
                3. Personal Workflow Utility
              </h4>
              <p style={{ margin: 0, color: 'var(--muted)', fontSize: '0.92rem' }}>
                A custom developer productivity tool addressing daily student schedules, academic milestone tracking, and task execution.
              </p>
            </div>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
            <div>
              <h4 style={{ margin: '0 0 0.6rem', color: 'var(--pink)', fontFamily: 'var(--serif)' }}>
                Key Competencies & Topics
              </h4>
              <ul style={{ margin: 0, paddingLeft: '1.2rem', color: 'var(--muted)', fontSize: '0.95rem' }}>
                <li style={{ marginBottom: '0.4rem' }}>
                  <strong>Object-Oriented Design Principles</strong>: Encapsulation, abstraction, inheritance, polymorphism, and SOLID design rules.
                </li>
                <li style={{ marginBottom: '0.4rem' }}>
                  <strong>UML Modeling</strong>: Class diagrams, sequence diagrams, and state machine modeling before code implementation.
                </li>
                <li style={{ marginBottom: '0.4rem' }}>
                  <strong>Testing & Quality</strong>: Unit testing, defensive programming, and test-driven design techniques in Java.
                </li>
              </ul>
            </div>

            {project.tags && (
              <div>
                <span style={{ fontSize: '0.82rem', color: 'var(--muted)', display: 'block', marginBottom: '0.4rem' }}>
                  Technologies & Methodologies
                </span>
                <div className="tags">
                  {project.tags.map((t) => (
                    <span key={t} className="tag">
                      {t}
                    </span>
                  ))}
                  <span className="tag">Java</span>
                  <span className="tag">Design Patterns</span>
                  <span className="tag">UML</span>
                </div>
              </div>
            )}

            {project.link && (
              <div style={{ marginTop: '0.5rem' }}>
                <a
                  href={project.link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn main"
                  style={{ width: '100%', justifyContent: 'center' }}
                >
                  <span>Explore Repository on GitHub</span>
                  <ExternalLink size={16} />
                </a>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
