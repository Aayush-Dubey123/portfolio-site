'use client';

function ArrowRightIcon({ size = 13 }: { size?: number }) {
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

function RivalXpMockup() {
  return (
    <div className="project-mockup project-mockup-rival">
      <div className="mockup-brand">
        <span className="brand-accent">RIVAL</span>
        <span className="brand-light">XP</span>
      </div>
      <div className="mockup-ui-preview">
        <div className="mockup-panel mockup-panel-left">
          <div className="mockup-line-sm" />
          <div className="mockup-metric-box" />
        </div>
        <div className="mockup-panel mockup-panel-right">
          <div className="mockup-chart-bar" />
          <div className="mockup-chart-bar h-8" />
          <div className="mockup-chart-bar h-12" />
        </div>
      </div>
    </div>
  );
}

function EigiMockup() {
  return (
    <div className="project-mockup project-mockup-eigi">
      <div className="mockup-brand mockup-brand-eigi">
        <span className="brand-eigi-dot" />
        <span className="brand-eigi-text">EIGI</span>
      </div>
      <div className="mockup-ui-preview">
        <div className="mockup-code-block">
          <div className="mockup-code-line w-16" />
          <div className="mockup-code-line w-24" />
          <div className="mockup-code-line w-20" />
        </div>
      </div>
    </div>
  );
}

function WhitfieldMockup() {
  return (
    <div className="project-mockup project-mockup-wms">
      <div className="mockup-top-bar">
        <div className="mockup-dot-sm" />
        <div className="mockup-dot-sm" />
        <div className="mockup-dot-sm" />
      </div>
      <div className="mockup-ui-preview mockup-ui-wms">
        <div className="mockup-wms-card" />
        <div className="mockup-wms-card wms-highlight" />
        <div className="mockup-wms-card" />
      </div>
    </div>
  );
}

const PROJECTS_DATA = [
  {
    title: 'RivalXP',
    description: 'AI-powered coaching platform for athletes.',
    mockup: RivalXpMockup,
    link: 'https://github.com/aayushdubey',
  },
  {
    title: 'EIGI',
    description: 'AI Agent Platform for intelligent automation.',
    mockup: EigiMockup,
    link: 'https://github.com/aayushdubey',
  },
  {
    title: 'Whitfield WMS',
    description: 'Warehouse management system for efficient operations.',
    mockup: WhitfieldMockup,
    link: 'https://github.com/aayushdubey',
  },
] as const;

export default function ProjectsSection() {
  return (
    <div className="projects-container">
      {/* Left Column: Heading, Subtitle, CTA */}
      <div className="projects-left">
        <h2 className="projects-title">Featured Projects</h2>

        <p className="projects-subtitle">
          A selection of projects I&apos;m proud of.<br className="projects-br" /> Each one crafted with care and<br className="projects-br" /> attention to detail.
        </p>

        <a
          href="https://github.com/aayushdubey"
          className="projects-cta-btn"
          id="projects-view-all-btn"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="View All Projects on GitHub"
        >
          <span>VIEW ALL PROJECTS</span>
          <ArrowRightIcon size={13} />
        </a>
      </div>

      {/* Right Column: 3 Project Cards */}
      <div className="projects-right" role="list" aria-label="Featured Projects List">
        <div className="projects-cards-grid">
          {PROJECTS_DATA.map((project) => (
            <article className="featured-project-card" key={project.title} role="listitem">
              <div className="project-banner" aria-hidden="true">
                <project.mockup />
              </div>

              <div className="project-card-body">
                <h3 className="featured-project-title">{project.title}</h3>
                <p className="featured-project-desc">{project.description}</p>

                <a
                  href={project.link}
                  className="featured-project-link"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`View project ${project.title}`}
                >
                  <span>VIEW PROJECT</span>
                  <ArrowRightIcon size={12} />
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
