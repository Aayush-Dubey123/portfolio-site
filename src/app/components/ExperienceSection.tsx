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
    period: 'Apr 2026 – Now',
    role: 'Intern — WordPress CMS',
    company: 'House Of Ruvi',
    description:
      'Managed 100+ product listings and promotional content through WordPress CMS. Automated product uploads, reducing repetitive catalog management effort, and optimized product presentation to improve customer engagement.',
  },
  {
    period: 'Mar 2026 – May 2026',
    role: 'Forward Development Engineer Intern',
    company: 'Golden-Kulcha & Co',
    description:
      'Developed a full-stack food ordering system covering menu browsing, order placement, and order tracking. Built an automated feedback workflow (customer submissions → admin review) and integrated a unified inventory and billing system.',
  },
  {
    period: 'Jun 2025 – Jul 2025',
    role: 'Enterprise Resource Planning Intern',
    company: 'Ira - Agro Tech Pvt. Ltd',
    description:
      'Supported ERP planning and client coordination, translating operational requirements into structured Excel-based workflows. Maintained records and reports for decision-making across procurement, sales, and billing.',
  },
] as const;

export default function ExperienceSection() {
  return (
    <div className="experience-container">
      {/* Left Column: Title, Subtitle, CTA */}
      <div className="experience-left">
        <h2 className="experience-title">Experience</h2>

        <p className="experience-subtitle">
          Professional engineering internships<br className="experience-br" /> delivering full-stack platforms, ERP systems,<br className="experience-br" /> and automated workflows.
        </p>

        <a
          href="/resume.pdf"
          className="experience-cta-btn"
          id="experience-cta-btn"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="View Full Experience Resume"
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
