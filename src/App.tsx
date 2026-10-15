import React, { useState } from 'react';
import { portfolioData } from './data/portfolio';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Education } from './components/Education';
import { Skills } from './components/Skills';
import { Experience } from './components/Experience';
import { Projects } from './components/Projects';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { ResumeModal } from './components/ResumeModal';

export const App: React.FC = () => {
  const [curtainKey, setCurtainKey] = useState<number>(0);
  const [isResumeOpen, setIsResumeOpen] = useState<boolean>(false);

  const handleCurtainReplay = () => {
    setCurtainKey((prev) => prev + 1);
  };

  return (
    <div className="portfolio-app">
      <Navbar
        name={portfolioData.name}
        onOpenResume={() => setIsResumeOpen(true)}
      />

      <Hero
        name={portfolioData.name}
        role={portfolioData.role}
        intro={portfolioData.status}
        githubUrl={portfolioData.links.github}
        linkedinUrl={portfolioData.links.linkedin}
        curtainKey={curtainKey}
        onCurtainReplay={handleCurtainReplay}
      />

      <main className="wrap">
        <Education
          education={portfolioData.education}
          certifications={portfolioData.certifications}
        />
        <Skills categories={portfolioData.skills} />
        <Experience experiences={portfolioData.experiences} />
        <Projects projects={portfolioData.projects} />
      </main>

      <Contact
        email={portfolioData.email}
        linkedinUrl={portfolioData.links.linkedin}
      />

      <Footer />

      <ResumeModal
        isOpen={isResumeOpen}
        onClose={() => setIsResumeOpen(false)}
      />
    </div>
  );
};

export default App;
