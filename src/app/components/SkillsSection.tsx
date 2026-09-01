'use client';

function ReactIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
      <ellipse cx="12" cy="12" rx="10" ry="4.5" transform="rotate(0 12 12)" />
      <ellipse cx="12" cy="12" rx="10" ry="4.5" transform="rotate(60 12 12)" />
      <ellipse cx="12" cy="12" rx="10" ry="4.5" transform="rotate(120 12 12)" />
      <circle cx="12" cy="12" r="1.5" fill="currentColor" />
    </svg>
  );
}

function TsIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect width="18" height="18" x="3" y="3" rx="4" />
      <path d="M8 9h4M10 9v7" />
      <path d="M14 13.5c.5.5 1.2.8 1.8.8.7 0 1.2-.4 1.2-1 0-1.2-3-1-3-2.5 0-.8.6-1.5 1.8-1.5.7 0 1.3.3 1.7.7" />
    </svg>
  );
}

function TailwindIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M6 12c.5-2 2-3.5 4.5-3.5 3.5 0 3.5 3 6.5 3 2 0 3-1 3.5-2-.5 2-2 3.5-4.5 3.5-3.5 0-3.5-3-6.5-3-2 0-3 1-3.5 2z" />
      <path d="M3.5 17.5c.5-2 2-3.5 4.5-3.5 3.5 0 3.5 3 6.5 3 2 0 3-1 3.5-2-.5 2-2 3.5-4.5 3.5-3.5 0-3.5-3-6.5-3-2 0-3 1-3.5 2z" />
    </svg>
  );
}

function NodeIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 2.5 4.5 6.8v8.6L12 21.5l7.5-6.1V6.8L12 2.5z" />
      <path d="M9 10h6v4H9z" />
    </svg>
  );
}

function MongoIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 2.5c0 0-6 4.5-6 10.5 0 4.5 3.5 8 6 8.5 2.5-.5 6-4 6-8.5 0-6-6-10.5-6-10.5z" />
      <path d="M12 2.5v19" />
    </svg>
  );
}

function DesignIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 2 2 7l10 5 10-5-10-5z" />
      <path d="m2 17 10 5 10-5" />
      <path d="m2 12 10 5 10-5" />
    </svg>
  );
}

const SKILLS_DATA = [
  {
    name: 'React / Next.js',
    percentage: '95%',
    icon: ReactIcon,
  },
  {
    name: 'Node.js',
    percentage: '90%',
    icon: NodeIcon,
  },
  {
    name: 'TypeScript',
    percentage: '90%',
    icon: TsIcon,
  },
  {
    name: 'MongoDB',
    percentage: '85%',
    icon: MongoIcon,
  },
  {
    name: 'Tailwind CSS',
    percentage: '95%',
    icon: TailwindIcon,
  },
  {
    name: 'UI / UX Design',
    percentage: '80%',
    icon: DesignIcon,
  },
] as const;

export default function SkillsSection() {
  return (
    <div className="skills-container">
      {/* Left Column: Heading & Subtitle */}
      <div className="skills-left">
        <h2 className="skills-title">Skills</h2>

        <p className="skills-subtitle">
          I work with a variety of technologies<br className="skills-br" /> to build fast, scalable and exceptional<br className="skills-br" /> digital experiences.
        </p>
      </div>

      {/* Right Column: 2-Column Skills Grid */}
      <div className="skills-right" role="list" aria-label="Technical Skills List">
        <div className="skills-bar-grid">
          {SKILLS_DATA.map((skill) => (
            <div className="skill-item" key={skill.name} role="listitem">
              <div className="skill-icon-wrapper" aria-hidden="true">
                <skill.icon size={20} />
              </div>

              <div className="skill-content">
                <div className="skill-header">
                  <span className="skill-name">{skill.name}</span>
                  <span className="skill-percentage">{skill.percentage}</span>
                </div>

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
