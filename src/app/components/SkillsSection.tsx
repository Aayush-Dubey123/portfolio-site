'use client';

function CodeIcon({ size = 20 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <polyline points="16 18 22 12 16 6" />
      <polyline points="8 6 2 12 8 18" />
    </svg>
  );
}

function GlobeIcon({ size = 20 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="10" />
      <line x1="2" y1="12" x2="22" y2="12" />
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </svg>
  );
}

function CloudIcon({ size = 20 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z" />
    </svg>
  );
}

function DatabaseIcon({ size = 20 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <ellipse cx="12" cy="5" rx="9" ry="3" />
      <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
      <path d="M3 12c0 1.66 4 3 9 3s9-1.34 9-3" />
    </svg>
  );
}

function ToolIcon({ size = 20 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M3 3v18h18" />
      <path d="m19 9-5 5-4-4-3 3" />
    </svg>
  );
}

function CpuIcon({ size = 20 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect width="16" height="16" x="4" y="4" rx="2" />
      <rect width="6" height="6" x="9" y="9" rx="1" />
      <path d="M15 2v2" />
      <path d="M15 20v2" />
      <path d="M2 15h2" />
      <path d="M2 9h2" />
      <path d="M20 15h2" />
      <path d="M20 9h2" />
      <path d="M9 2v2" />
      <path d="M9 20v2" />
    </svg>
  );
}

const SKILLS_DATA = [
  {
    category: 'Languages',
    name: 'C, C++, Python',
    percentage: '92%',
    icon: CodeIcon,
  },
  {
    category: 'Web Development',
    name: 'React, Vite, FastAPI, REST API',
    percentage: '95%',
    icon: GlobeIcon,
  },
  {
    category: 'DevOps & Cloud',
    name: 'Git, Docker, AWS, GCP, Vercel, Render, Ansible',
    percentage: '88%',
    icon: CloudIcon,
  },
  {
    category: 'Databases',
    name: 'PostgreSQL, MongoDB',
    percentage: '86%',
    icon: DatabaseIcon,
  },
  {
    category: 'Tools & Platforms',
    name: 'Excel, Power BI, Word',
    percentage: '85%',
    icon: ToolIcon,
  },
  {
    category: 'Core Concepts',
    name: 'DSA in C++, Web Development Fundamentals',
    percentage: '90%',
    icon: CpuIcon,
  },
] as const;

export default function SkillsSection() {
  return (
    <div className="skills-container">
      {/* Left Column: Heading & Subtitle */}
      <div className="skills-left">
        <h2 className="skills-title">Skills</h2>

        <p className="skills-subtitle">
          Technologies and core engineering<br className="skills-br" /> concepts I use to develop reliable,<br className="skills-br" /> high-performance systems.
        </p>
      </div>

      {/* Right Column: 2-Column Skills Grid */}
      <div className="skills-right" role="list" aria-label="Technical Skills List">
        <div className="skills-bar-grid">
          {SKILLS_DATA.map((skill) => (
            <div className="skill-item" key={skill.category} role="listitem">
              <div className="skill-icon-wrapper" aria-hidden="true">
                <skill.icon size={20} />
              </div>

              <div className="skill-content">
                <div className="skill-header">
                  <span className="skill-category-tag">{skill.category}</span>
                  <span className="skill-percentage">{skill.percentage}</span>
                </div>

                <div className="skill-name-text">{skill.name}</div>

                <div className="skill-track" aria-hidden="true">
                  <div
                    className="skill-fill"
                    style={{ width: skill.percentage }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
