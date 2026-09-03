'use client';

function TrophyIcon({ size = 20 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="#fbbf24"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
      <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
      <path d="M4 22h16" />
      <path d="M10 14.66V17c0 .55-.45 1-1 1H7v4h10v-4h-2c-.55 0-1-.45-1-1v-2.34" />
      <path d="M6 4h12a2 2 0 0 1 2 2v3a6 6 0 0 1-6 6h0a6 6 0 0 1-6-6V6a2 2 0 0 1 2-2z" />
    </svg>
  );
}

function AwardIcon({ size = 20 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="#60a5fa"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <circle cx="12" cy="8" r="6" />
      <path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11" />
    </svg>
  );
}

function ShieldCheckIcon({ size = 20 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="#34d399"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  );
}

function CloudCheckIcon({ size = 20 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="#a855f7"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z" />
      <path d="m10 13 2 2 4-4" />
    </svg>
  );
}

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

const ACHIEVEMENTS_DATA = [
  {
    title: 'GEN-AI Bootcamp / Hackathon — Winner',
    excerpt:
      'Secured 1st place in the GEN-AI Bootcamp/Hackathon building intelligent multi-agent automation pipelines with Eigi.AI.',
    badge: '1st Place Winner',
    org: 'Eigi.AI',
    icon: TrophyIcon,
    bgClass: 'bg-amber-500/10 border-amber-500/20',
  },
  {
    title: 'Envision — Inter-College Hackathon',
    excerpt:
      'Ranked in the Top 10 finalists among 1,000+ applicants across colleges in Nagpur for innovative system engineering.',
    badge: 'Top 10 / 1000',
    org: 'Hackathon Nagpur',
    icon: AwardIcon,
    bgClass: 'bg-blue-500/10 border-blue-500/20',
  },
  {
    title: 'Ministry of Electronics & IT (MeitY) DII',
    excerpt:
      'Shortlisted through 3 out of 4 intensive selection rounds for the prestigious Digital India Internship (DII) scheme.',
    badge: 'Shortlisted (3/4)',
    org: 'Govt. of India',
    icon: ShieldCheckIcon,
    bgClass: 'bg-emerald-500/10 border-emerald-500/20',
  },
  {
    title: 'AWS Solutions Architect Exam-Course',
    excerpt:
      'Completed comprehensive AWS Solutions Architect exam-course covering VPCs, cloud infrastructure, and deployment architecture.',
    badge: 'Certified',
    org: 'GeeksForGeeks',
    icon: CloudCheckIcon,
    bgClass: 'bg-purple-500/10 border-purple-500/20',
  },
] as const;

export default function ThoughtsSection() {
  return (
    <div className="thoughts-container">
      {/* Left Column: Heading, Subtitle, CTA */}
      <div className="thoughts-left">
        <h2 className="thoughts-title">Achievements</h2>

        <p className="thoughts-subtitle">
          Recognitions, national hackathons,<br className="thoughts-br" /> and cloud certifications earned<br className="thoughts-br" /> throughout my engineering journey.
        </p>

        <a
          href="/resume.pdf"
          className="thoughts-cta-btn"
          id="thoughts-read-blog-btn"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="View Resume Certifications"
        >
          <span>VIEW CERTIFICATIONS</span>
          <ArrowRightIcon size={13} />
        </a>
      </div>

      {/* Right Column: 4 Achievement List Rows */}
      <div className="thoughts-right" role="list" aria-label="Achievements and Certifications">
        <div className="thoughts-rows-list">
          {ACHIEVEMENTS_DATA.map((item) => (
            <article className="thought-row-item" key={item.title} role="listitem">
              {/* Icon Badge Container */}
              <div className={`thought-thumb-box flex items-center justify-center ${item.bgClass}`} aria-hidden="true">
                <item.icon size={24} />
              </div>

              {/* Text Center */}
              <div className="thought-text-content">
                <h3 className="thought-item-title">{item.title}</h3>
                <p className="thought-item-excerpt">{item.excerpt}</p>
              </div>

              {/* Badge & Org Right */}
              <div className="thought-meta-col">
                <span className="thought-meta-date">{item.badge}</span>
                <span className="thought-meta-read">{item.org}</span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
