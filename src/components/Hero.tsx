import React, { useRef, useEffect } from 'react';
import { ExternalLink, RotateCcw, Theater, Sliders } from 'lucide-react';
import confetti from 'canvas-confetti';

interface HeroProps {
  name: string;
  role: string;
  intro: string;
  githubUrl: string;
  linkedinUrl: string;
  curtainKey: number;
  onCurtainReplay: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  name,
  role,
  intro,
  githubUrl,
  linkedinUrl,
  curtainKey,
  onCurtainReplay,
}) => {
  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const hero = heroRef.current;
    if (!hero) return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    const handlePointerMove = (e: PointerEvent) => {
      const rect = hero.getBoundingClientRect();
      hero.style.setProperty('--x', `${e.clientX - rect.left}px`);
      hero.style.setProperty('--y', `${e.clientY - rect.top}px`);
    };

    hero.addEventListener('pointermove', handlePointerMove);
    return () => {
      hero.removeEventListener('pointermove', handlePointerMove);
    };
  }, []);

  const handleCurtainCallWithConfetti = () => {
    onCurtainReplay();
    try {
      confetti({
        particleCount: 45,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#d7263d', '#ff6b81', '#ffc2cd'],
      });
    } catch {
      // ignore
    }
  };

  const scrollToProjects = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const el = document.getElementById('projects');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSpotlightRadius = (radius: string) => {
    document.documentElement.style.setProperty('--spotlight-radius', radius);
  };

  return (
    <header className="hero" id="top" ref={heroRef}>
      {/* Signature Crimson Theatrical Curtains */}
      <div key={`curtain-l-${curtainKey}`} className="curtain l" aria-hidden="true" />
      <div key={`curtain-r-${curtainKey}`} className="curtain r" aria-hidden="true" />

      <div className="wrap">
        <div className="hero-subhead">
          <Theater size={16} />
          <span>Stagecraft × Computer Science</span>
        </div>

        <h1>{name}</h1>
        <p className="role">{role}</p>
        <p className="intro">{intro}</p>

        <div className="btns">
          <a className="btn main" href="#projects" onClick={scrollToProjects}>
            See my projects
          </a>
          <a
            className="btn ghost"
            href={githubUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub <ExternalLink size={14} />
          </a>
          <a
            className="btn ghost"
            href={linkedinUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            LinkedIn <ExternalLink size={14} />
          </a>
        </div>

        {/* Theatrical Spotlight Controls (single crimson palette) */}
        <div className="stage-toolbar" role="region" aria-label="Stage Spotlight Controls">
          <div className="stage-toolbar-title">
            <Sliders size={14} />
            <span>Spotlight Beam</span>
          </div>

          <div className="stage-btn-group">
            <button
              type="button"
              className="stage-btn"
              onClick={() => handleSpotlightRadius('180px')}
              title="Pinspot focus"
            >
              Pin
            </button>
            <button
              type="button"
              className="stage-btn active"
              onClick={() => handleSpotlightRadius('280px')}
              title="Standard spotlight"
            >
              Spot
            </button>
            <button
              type="button"
              className="stage-btn"
              onClick={() => handleSpotlightRadius('450px')}
              title="Wide stage flood"
            >
              Flood
            </button>
          </div>

          <button
            type="button"
            className="stage-btn"
            onClick={handleCurtainCallWithConfetti}
            style={{
              marginLeft: '0.6rem',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.35rem',
              color: 'var(--pink)',
              fontWeight: 600,
            }}
            title="Replay theatrical curtain opening"
          >
            <RotateCcw size={13} />
            <span>Curtain Call</span>
          </button>
        </div>
      </div>
    </header>
  );
};
