import React, { useState } from 'react';
import { GitHubCalendar } from 'react-github-calendar';
import { ExternalLink, RefreshCw, Code2, Sparkles } from 'lucide-react';

interface GitHubActivityProps {
  username?: string;
}

const GithubIcon: React.FC<{ size?: number }> = ({ size = 20 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true"
    style={{ display: 'inline-block', verticalAlign: 'middle' }}
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
    />
  </svg>
);

const crimsonCalendarTheme = {
  dark: ['#21100f', '#59161e', '#8f1224', '#d7263d', '#ff6b81'],
  light: ['#21100f', '#59161e', '#8f1224', '#d7263d', '#ff6b81'],
};

export const GitHubActivity: React.FC<GitHubActivityProps> = ({
  username = 'nforre',
}) => {
  const [selectedYear, setSelectedYear] = useState<'last' | number>('last');
  const [hasError, setHasError] = useState<boolean>(false);
  const [refreshKey, setRefreshKey] = useState<number>(0);

  const handleRetry = () => {
    setHasError(false);
    setRefreshKey((k) => k + 1);
  };

  return (
    <div className="github-activity-card">
      <div className="github-activity-header">
        <div className="github-title-group">
          <GithubIcon size={24} />
          <div>
            <h3>Open Source & Code Activity</h3>
            <p className="when" style={{ margin: 0 }}>
              Live public commits and code activity for <strong>@{username}</strong>
            </p>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
          <div className="stage-btn-group">
            <button
              type="button"
              className={`stage-btn ${selectedYear === 'last' ? 'active' : ''}`}
              onClick={() => setSelectedYear('last')}
            >
              Past 12 Months
            </button>
            <button
              type="button"
              className={`stage-btn ${selectedYear === 2026 ? 'active' : ''}`}
              onClick={() => setSelectedYear(2026)}
            >
              2026
            </button>
            <button
              type="button"
              className={`stage-btn ${selectedYear === 2025 ? 'active' : ''}`}
              onClick={() => setSelectedYear(2025)}
            >
              2025
            </button>
          </div>

          <a
            href={`https://github.com/${username}`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn ghost"
            style={{ padding: '0.35rem 0.8rem', fontSize: '0.85rem' }}
          >
            <span>GitHub Profile</span>
            <ExternalLink size={14} />
          </a>
        </div>
      </div>

      <div className="github-calendar-wrapper">
        {hasError ? (
          <div
            style={{
              padding: '2rem 1rem',
              textAlign: 'center',
              background: 'var(--panel2)',
              border: '1px dashed var(--line)',
              width: '100%',
            }}
          >
            <p style={{ color: 'var(--muted)', marginBottom: '0.8rem' }}>
              Activity graph could not connect to GitHub API proxy right now.
            </p>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '0.8rem' }}>
              <button
                type="button"
                className="btn ghost"
                onClick={handleRetry}
                style={{ padding: '0.4rem 0.9rem', fontSize: '0.85rem' }}
              >
                <RefreshCw size={14} /> Retry connection
              </button>
              <a
                href={`https://github.com/${username}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn main"
                style={{ padding: '0.4rem 0.9rem', fontSize: '0.85rem' }}
              >
                View on GitHub
              </a>
            </div>
          </div>
        ) : (
          <div key={`gh-cal-${refreshKey}-${selectedYear}`}>
            <GitHubCalendar
              username={username}
              colorScheme="dark"
              theme={crimsonCalendarTheme}
              year={selectedYear}
              blockSize={12}
              blockMargin={4}
              fontSize={12}
              throwOnError={false}
              errorMessage="Unable to load GitHub contribution history at this time."
              labels={{
                totalCount: '{{count}} contributions in {{year}}',
              }}
            />
          </div>
        )}
      </div>

      {/* Highlights & Verified Repositories strip */}
      <div className="github-stats-row">
        <div className="github-stat-item">
          <span className="github-stat-label">Featured Repository</span>
          <a
            href="https://github.com/nforre/CS_3354_OOP"
            target="_blank"
            rel="noopener noreferrer"
            style={{ fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: '0.3rem' }}
          >
            <Code2 size={14} color="var(--red-soft)" /> CS_3354_OOP
          </a>
          <span style={{ fontSize: '0.82rem', color: 'var(--muted)' }}>
            Design patterns & Java OOP coursework
          </span>
        </div>

        <div className="github-stat-item">
          <span className="github-stat-label">Web Portfolio</span>
          <a
            href="https://github.com/nforre/nforre.github.io"
            target="_blank"
            rel="noopener noreferrer"
            style={{ fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: '0.3rem' }}
          >
            <Sparkles size={14} color="var(--red-soft)" /> nforre.github.io
          </a>
          <span style={{ fontSize: '0.82rem', color: 'var(--muted)' }}>
            React, Vite & Theatrical UI architecture
          </span>
        </div>

        <div className="github-stat-item">
          <span className="github-stat-label">Primary Languages</span>
          <div className="tags" style={{ marginTop: '0.2rem' }}>
            <span className="tag">Java</span>
            <span className="tag">C++</span>
            <span className="tag">Python</span>
            <span className="tag">TypeScript</span>
          </div>
        </div>
      </div>
    </div>
  );
};
