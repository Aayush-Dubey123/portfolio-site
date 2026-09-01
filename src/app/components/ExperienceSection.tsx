'use client';

function ArrowRightIcon({ size = 14 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M5 12h14" />
      <path d="m12 5 7 7-7 7" />
    </svg>
  );
}

const EXPERIENCES = [
  {
    period: '2023 – Present',
    role: 'Full Stack Developer',
    company: 'Freelance',
    description: 'Building modern web apps with Next.js, Node.js and MongoDB.',
  },
  {
    period: '2022 – 2023',
    role: 'Frontend Developer',
    company: 'TechNova Solutions',
    description: 'Developed responsive interfaces and improved web performance.',
  },
  {
    period: '2021 – 2022',
    role: 'Web Developer Intern',
    company: 'CodeCraft Labs',
    description: 'Worked on client projects and learned industry best practices.',
  },
] as const;

export default function ExperienceSection() {
  return (
    <div className="experience-container">
      {/* Left Column: Title, Subtitle, CTA */}
      <div className="experience-left">
        <h2 className="experience-title">Experience</h2>

        <p className="experience-subtitle">
          Over the years, I&apos;ve worked with amazing<br className="experience-br" /> people and built solutions for startups,<br className="experience-br" /> agencies and global brands.
        </p>

        <a
          href="/resume.pdf"
          className="experience-cta-btn"
          id="experience-cta-btn"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="View Full Experience"
        >
          <span>VIEW FULL EXPERIENCE</span>
          <ArrowRightIcon size={14} />
        </a>
      </div>

      {/* Right Column: Timeline */}
      <div className="experience-right" role="list" aria-label="Work Experience Timeline">
        <div className="experience-timeline">
          {/* Continuous vertical timeline track */}
          <div className="experience-track-line" aria-hidden="true" />

          {EXPERIENCES.map((exp) => (
            <div className="experience-item" key={exp.company + exp.period} role="listitem">
              {/* Timeline Dot marker */}
              <div className="experience-dot" aria-hidden="true" />

              {/* Item details */}
              <div className="experience-item-grid">
                <div className="experience-meta">
                  <span className="experience-period">{exp.period}</span>
                  <h3 className="experience-role">{exp.role}</h3>
                  <span className="experience-company">{exp.company}</span>
                </div>

                <div className="experience-desc-col">
                  <p className="experience-desc">{exp.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
