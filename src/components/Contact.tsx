import React, { useState } from 'react';
import { Mail, Check, ExternalLink, Copy, Send, MessageSquare } from 'lucide-react';

interface ContactProps {
  email: string;
  linkedinUrl: string;
}

export const Contact: React.FC<ContactProps> = ({ email, linkedinUrl }) => {
  const [copied, setCopied] = useState<boolean>(false);
  const [activeTemplate, setActiveTemplate] = useState<string>('internship');

  const templates: Record<string, { label: string; subject: string; body: string }> = {
    internship: {
      label: 'Internship Opportunity',
      subject: 'Internship Opportunity for Journey Forrest',
      body: `Hi Journey,\n\nWe came across your portfolio and coursework at Texas State University. We would love to discuss an internship opportunity with our software engineering team.\n\nBest regards,`,
    },
    collab: {
      label: 'Project Collaboration',
      subject: 'Collaborating on a Project',
      body: `Hi Journey,\n\nI was impressed by your work in Java OOP and your background in technical theatre. I'd love to chat about collaborating on a project!\n\nBest,`,
    },
    chat: {
      label: 'Coffee / General Chat',
      subject: 'Connecting with Journey Forrest',
      body: `Hi Journey,\n\nI'd love to connect and chat about your experiences in computer science, game dev, and technical theatre at Texas State.\n\nCheers,`,
    },
  };

  const currentTemplate = templates[activeTemplate];
  const mailtoLink = `mailto:${email}?subject=${encodeURIComponent(
    currentTemplate.subject
  )}&body=${encodeURIComponent(currentTemplate.body)}`;

  const handleCopyEmail = (e: React.MouseEvent) => {
    e.preventDefault();
    navigator.clipboard
      .writeText(email)
      .then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2500);
      })
      .catch(() => {
        window.location.href = `mailto:${email}`;
      });
  };

  return (
    <section className="contact" id="contact">
      <div className="wrap">
        <h2 style={{ justifyContent: 'center' }}>Get In Touch</h2>
        <p>
          Have an internship opening, a creative project, or a technical inquiry? I'd love to hear from you!
        </p>

        <div className="btns">
          <a className="btn main" href={mailtoLink}>
            <Mail size={16} />
            <span>{email}</span>
          </a>
          <button
            type="button"
            className="btn ghost"
            onClick={handleCopyEmail}
            title="Copy email address"
            aria-label="Copy email address"
          >
            {copied ? <Check size={16} color="var(--red-soft)" /> : <Copy size={16} />}
            <span>{copied ? 'Copied to Clipboard!' : 'Copy Email'}</span>
          </button>
          <a
            className="btn ghost"
            href={linkedinUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            <span>LinkedIn</span>
            <ExternalLink size={14} />
          </a>
        </div>

        {/* Quick Message Launcher */}
        <div className="contact-quick-draft">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.8rem' }}>
            <MessageSquare size={16} color="var(--red-soft)" />
            <h4 style={{ margin: 0 }}>Quick Inquiry Launcher</h4>
          </div>
          <p style={{ margin: '0 0 1rem', fontSize: '0.9rem', color: 'var(--muted)' }}>
            Choose a conversation starter to launch your email client with a pre-formatted message:
          </p>

          <div className="draft-pills">
            {Object.entries(templates).map(([key, item]) => (
              <button
                key={key}
                type="button"
                className={`draft-pill-btn ${activeTemplate === key ? 'active' : ''}`}
                onClick={() => setActiveTemplate(key)}
              >
                {item.label}
              </button>
            ))}
          </div>

          <div
            style={{
              background: 'var(--panel2)',
              border: '1px solid var(--line)',
              padding: '1rem',
              fontSize: '0.88rem',
              color: 'var(--muted)',
              fontFamily: 'monospace',
              whiteSpace: 'pre-wrap',
              marginBottom: '1rem',
              maxHeight: '120px',
              overflowY: 'auto',
            }}
          >
            <strong>Subject: {currentTemplate.subject}</strong>
            {'\n\n'}
            {currentTemplate.body}
          </div>

          <a
            className="btn main"
            href={mailtoLink}
            style={{ width: '100%', justifyContent: 'center', fontSize: '0.9rem' }}
          >
            <Send size={15} />
            <span>Open Email Draft in Client</span>
          </a>
        </div>

        {copied && (
          <div className="copied-toast" role="status" aria-live="polite">
            <Check size={15} color="var(--red-soft)" />
            <span>Copied {email} to clipboard!</span>
          </div>
        )}
      </div>
    </section>
  );
};
