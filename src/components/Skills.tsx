import React, { useState } from 'react';
import { SkillCategory } from '../data/portfolio';
import { Code, Film, Wrench, Sparkles } from 'lucide-react';

interface SkillsProps {
  categories: SkillCategory[];
}

export const Skills: React.FC<SkillsProps> = ({ categories }) => {
  const [selectedFilter, setSelectedFilter] = useState<string>('all');
  const [selectedSkill, setSelectedSkill] = useState<string | null>(null);

  const filterOptions = [
    { id: 'all', label: 'All Domains' },
    { id: 'Programming', label: 'Programming' },
    { id: 'Creative', label: 'Creative Media' },
    { id: 'Other', label: 'Stagecraft & Systems' },
  ];

  const filteredCategories =
    selectedFilter === 'all'
      ? categories
      : categories.filter((c) => c.title.toLowerCase() === selectedFilter.toLowerCase());

  const getSkillContext = (skill: string) => {
    switch (skill) {
      case 'C++':
        return 'Applied in foundational CS data structures, memory management, and game systems.';
      case 'Java':
        return 'Applied extensively in CS 3354 OOP for SOLID architectural design patterns and object models.';
      case 'Python':
        return 'Used for data manipulation, algorithmic problem solving, and rapid automation scripting.';
      case 'AI development':
        return 'Exploring machine learning concepts, heuristic state space search, and AI integration.';
      case 'Adobe After Effects':
        return 'Motion graphics design, digital asset keyframing, and video post-production.';
      case 'Video editing':
        return 'Pacing, narrative sequence assembly, visual rhythm, and sound mixing.';
      case 'Technical theatre (sound and lights)':
        return 'Live stage DMX lighting boards, cue sequencing, acoustic balancing, and stagecraft mechanics.';
      case 'Game development':
        return '2D gameplay mechanics, character state machines, collision detection, and interactive loops.';
      case 'Microsoft Excel':
        return 'Structured data analysis, formula calculations, and business administration coursework.';
      case 'Spanish':
        return 'Bilingual communication capabilities.';
      default:
        return 'Key technical and practical capability developed through coursework and creative practice.';
    }
  };

  const getCategoryIcon = (title: string) => {
    switch (title.toLowerCase()) {
      case 'programming':
        return <Code size={18} />;
      case 'creative':
        return <Film size={18} />;
      default:
        return <Wrench size={18} />;
    }
  };

  return (
    <section id="skills">
      <h2>Skills & Competencies</h2>

      {/* Interactive filter tabs */}
      <div className="skills-filter">
        {filterOptions.map((opt) => (
          <button
            key={opt.id}
            type="button"
            className={selectedFilter === opt.id ? 'active' : ''}
            onClick={() => setSelectedFilter(opt.id)}
          >
            {opt.label}
          </button>
        ))}
      </div>

      <div className="skills-grid">
        {filteredCategories.map((cat) => (
          <div key={cat.title} className="skill-category-card">
            <h3>
              {getCategoryIcon(cat.title)}
              <span>{cat.title}</span>
            </h3>
            <div className="tags">
              {cat.skills.map((skill) => (
                <button
                  key={skill}
                  type="button"
                  className="tag"
                  style={{
                    cursor: 'pointer',
                    background: selectedSkill === skill ? 'var(--red)' : 'var(--panel2)',
                    color: selectedSkill === skill ? '#fff' : 'var(--pink)',
                    borderColor: selectedSkill === skill ? 'var(--red-soft)' : 'var(--line)',
                  }}
                  onClick={() => setSelectedSkill(selectedSkill === skill ? null : skill)}
                  title={`Click to view context for ${skill}`}
                >
                  {skill}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Skill Context Box */}
      {selectedSkill && (
        <div
          style={{
            marginTop: '1.25rem',
            padding: '1.2rem',
            background: 'var(--panel)',
            border: '1px solid var(--red-soft)',
            display: 'flex',
            alignItems: 'flex-start',
            gap: '0.8rem',
            animation: 'fadeIn 0.2s ease',
          }}
        >
          <Sparkles size={20} color="var(--red-soft)" style={{ flexShrink: 0, marginTop: 2 }} />
          <div>
            <div style={{ fontWeight: 700, color: 'var(--text)', marginBottom: '0.2rem' }}>
              {selectedSkill} in Practice
            </div>
            <p style={{ margin: 0, color: 'var(--muted)', fontSize: '0.92rem' }}>
              {getSkillContext(selectedSkill)}
            </p>
          </div>
          <button
            type="button"
            onClick={() => setSelectedSkill(null)}
            style={{
              marginLeft: 'auto',
              background: 'transparent',
              border: 'none',
              color: 'var(--muted)',
              cursor: 'pointer',
              fontSize: '0.8rem',
            }}
          >
            Dismiss
          </button>
        </div>
      )}
    </section>
  );
};
