import React, { useEffect, useState } from 'react';
import { FileText } from 'lucide-react';

interface NavbarProps {
  name: string;
  onOpenResume?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ name, onOpenResume }) => {
  const [activeSection, setActiveSection] = useState<string>('');
  const [scrollProgress, setScrollProgress] = useState<number>(0);

  useEffect(() => {
    const handleScroll = () => {
      // Calculate scroll progress percentage (0 to 1)
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? Math.min(1, Math.max(0, window.scrollY / docHeight)) : 0;
      setScrollProgress(progress);

      // Active section tracking
      const sections = ['education', 'skills', 'experience', 'projects', 'contact'];
      const scrollPosition = window.scrollY + 130;

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(sectionId);
            return;
          }
        }
      }
      if (window.scrollY < 180) {
        setActiveSection('');
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav aria-label="Main Navigation">
      <div className="wrap">
        <div className="nav-container">
          {/* Zone 1: Single line Brand wordmark */}
          <a
            href="#top"
            className="brand"
            onClick={(e) => scrollTo(e, 'top')}
            aria-label="Journey Forrest homepage"
          >
            <span className="brand-mask" aria-hidden="true">
              🎭
            </span>
            <span>{name}</span>
          </a>

          {/* Zone 2: Concise single-line navigation links */}
          <div className="nav-links">
            <a
              href="#education"
              className={activeSection === 'education' ? 'active' : ''}
              onClick={(e) => scrollTo(e, 'education')}
            >
              Education
            </a>
            <a
              href="#skills"
              className={activeSection === 'skills' ? 'active' : ''}
              onClick={(e) => scrollTo(e, 'skills')}
            >
              Skills
            </a>
            <a
              href="#experience"
              className={activeSection === 'experience' ? 'active' : ''}
              onClick={(e) => scrollTo(e, 'experience')}
            >
              Experience
            </a>
            <a
              href="#projects"
              className={activeSection === 'projects' ? 'active' : ''}
              onClick={(e) => scrollTo(e, 'projects')}
            >
              Projects
            </a>
            <a
              href="#contact"
              className={activeSection === 'contact' ? 'active' : ''}
              onClick={(e) => scrollTo(e, 'contact')}
            >
              Contact
            </a>
          </div>

          {/* Zone 3: 1 primary action */}
          <div className="nav-actions">
            {onOpenResume && (
              <button
                type="button"
                className="btn ghost"
                onClick={onOpenResume}
                style={{ padding: '0.4rem 0.85rem', fontSize: '0.85rem' }}
                title="View clean printable resume"
              >
                <FileText size={14} />
                <span>Resume</span>
              </button>
            )}
            <a
              href="#contact"
              className="btn main"
              onClick={(e) => scrollTo(e, 'contact')}
              style={{ padding: '0.4rem 0.95rem', fontSize: '0.85rem' }}
            >
              <span>Get In Touch</span>
            </a>
          </div>
        </div>
      </div>

      {/* Slim, fixed scroll progress bar pinned directly below navigation */}
      <div
        className="scroll-progress-container"
        role="progressbar"
        aria-valuenow={Math.round(scrollProgress * 100)}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label="Reading progress"
      >
        <div
          className="scroll-progress-bar"
          style={{ transform: `scaleX(${scrollProgress})` }}
        />
      </div>
    </nav>
  );
};
