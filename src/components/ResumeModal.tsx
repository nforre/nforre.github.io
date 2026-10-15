import React, { useEffect } from 'react';
import { portfolioData } from '../data/portfolio';
import { X, Printer, GraduationCap, Briefcase, Code, Award } from 'lucide-react';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ResumeModal: React.FC<ResumeModalProps> = ({ isOpen, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div
      className="modal-overlay"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Resume of Journey Forrest"
    >
      <div
        className="modal-content"
        onClick={(e) => e.stopPropagation()}
        style={{ maxWidth: '780px' }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.2rem' }}>
          <div style={{ display: 'flex', gap: '0.6rem' }}>
            <button
              type="button"
              className="btn ghost"
              onClick={handlePrint}
              style={{ padding: '0.35rem 0.8rem', fontSize: '0.85rem' }}
            >
              <Printer size={14} /> Print / Save PDF
            </button>
          </div>
          <button
            type="button"
            className="modal-close"
            onClick={onClose}
            aria-label="Close resume"
            style={{ position: 'static' }}
          >
            <X size={18} />
          </button>
        </div>

        <div style={{ borderBottom: '1px solid var(--line)', paddingBottom: '1.2rem', marginBottom: '1.5rem' }}>
          <h2 style={{ margin: '0 0 0.3rem', fontSize: '2rem' }}>{portfolioData.name}</h2>
          <p style={{ margin: '0 0 0.6rem', color: 'var(--pink)', fontWeight: 500 }}>
            {portfolioData.role}
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', fontSize: '0.9rem', color: 'var(--muted)' }}>
            <span>✉️ {portfolioData.email}</span>
            <span>🔗 github.com/nforre</span>
            <span>📍 Texas State University</span>
          </div>
        </div>

        {/* Education */}
        <section style={{ padding: '0 0 1.5rem' }}>
          <h3 style={{ fontSize: '1.15rem', color: 'var(--red-soft)', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <GraduationCap size={16} /> Education
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '0.8rem' }}>
            {portfolioData.education.map((edu) => (
              <div key={edu.id}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 600 }}>
                  <span>{edu.institution}</span>
                  <span className="when">{edu.period}</span>
                </div>
                <p style={{ margin: '0.2rem 0 0', color: 'var(--muted)', fontSize: '0.92rem' }}>
                  {edu.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Skills */}
        <section style={{ padding: '0 0 1.5rem' }}>
          <h3 style={{ fontSize: '1.15rem', color: 'var(--red-soft)', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <Code size={16} /> Technical Skills & Tools
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', marginTop: '0.8rem' }}>
            {portfolioData.skills.map((s) => (
              <div key={s.title} style={{ fontSize: '0.92rem' }}>
                <strong style={{ color: 'var(--pink)' }}>{s.title}: </strong>
                <span style={{ color: 'var(--muted)' }}>{s.skills.join(', ')}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Projects */}
        <section style={{ padding: '0 0 1.5rem' }}>
          <h3 style={{ fontSize: '1.15rem', color: 'var(--red-soft)', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <Award size={16} /> Academic Projects
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem', marginTop: '0.8rem' }}>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 600 }}>
                <span>CS 3354 Object-Oriented Programming Coursework</span>
                <span className="when">Fall 2026</span>
              </div>
              <p style={{ margin: '0.2rem 0 0', color: 'var(--muted)', fontSize: '0.92rem' }}>
                Engineered object-oriented applications covering inheritance hierarchies, encapsulation, polymorphism, UML class design, and Gang of Four design patterns in Java.
              </p>
            </div>
          </div>
        </section>

        {/* Experience */}
        <section style={{ padding: '0 0 1.5rem' }}>
          <h3 style={{ fontSize: '1.15rem', color: 'var(--red-soft)', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <Briefcase size={16} /> Professional Experience
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '0.8rem' }}>
            {portfolioData.experiences.map((exp) => (
              <div key={exp.id}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 600 }}>
                  <span>{exp.role} — {exp.company}</span>
                  <span className="when">{exp.period}</span>
                </div>
                <p style={{ margin: '0.2rem 0 0', color: 'var(--muted)', fontSize: '0.92rem' }}>
                  {exp.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Certifications */}
        <section style={{ padding: 0 }}>
          <h3 style={{ fontSize: '1.15rem', color: 'var(--red-soft)' }}>Certifications</h3>
          <ul style={{ margin: '0.6rem 0 0', paddingLeft: '1.2rem', color: 'var(--muted)', fontSize: '0.92rem' }}>
            {portfolioData.certifications.map((c) => (
              <li key={c}>{c}</li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
};
