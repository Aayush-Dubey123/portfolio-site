'use client';

function GraduationCapIcon({ size = 18 }: { size?: number }) {
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
      <path d="M21.42 10.922a1 1 0 0 0-.019-1.838L12.83 5.18a2 2 0 0 0-1.66 0L2.6 9.08a1 1 0 0 0 0 1.832l8.57 3.908a2 2 0 0 0 1.66 0z" />
      <path d="M22 10v6" />
      <path d="M6 12.5V16a6 3 0 0 0 12 0v-3.5" />
    </svg>
  );
}

function SchoolIcon({ size = 18 }: { size?: number }) {
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
      <path d="M3 21h18" />
      <path d="M5 21V7l7-4 7 4v14" />
      <path d="M9 10a2 2 0 1 0 0-4 2 2 0 0 0 0 4z" />
      <path d="M9 21v-4a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v4" />
    </svg>
  );
}

function MapPinIcon({ size = 18 }: { size?: number }) {
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
      <path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}

function MailIcon({ size = 18 }: { size?: number }) {
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
      <rect width="20" height="16" x="2" y="4" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  );
}

function DownloadIcon({ size = 14 }: { size?: number }) {
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
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="7 10 12 15 17 10" />
      <line x1="12" y1="15" x2="12" y2="3" />
    </svg>
  );
}

interface PersonalInfoItem {
  icon: ({ size }: { size?: number }) => React.JSX.Element;
  value: string;
  label: string;
  href?: string;
}

const PERSONAL_INFO: PersonalInfoItem[] = [
  {
    icon: GraduationCapIcon,
    value: 'B.Tech – CSBS (CGPA 9.0)',
    label: 'Degree & Score',
  },
  {
    icon: SchoolIcon,
    value: 'St. Vincent Pallotti College, Nagpur (2027)',
    label: 'Institution & Year',
  },
  {
    icon: MapPinIcon,
    value: 'Nagpur, India',
    label: 'Location',
  },
  {
    icon: MailIcon,
    value: 'aayushdubey2300@gmail.com',
    label: 'Email',
    href: 'mailto:aayushdubey2300@gmail.com',
  },
];

export default function AboutSection() {
  return (
    <div className="about-container">
      {/* Left Column: Heading, Paragraphs, Resume CTA */}
      <div className="about-left">
        <h2 className="about-title">About Me</h2>

        <div className="about-description">
          <p className="about-paragraph">
            I&apos;m a Full Stack Developer pursuing B.Tech in Computer Science &amp; Business Systems at St. Vincent Pallotti College of Engineering and Technology, Nagpur.
          </p>
          <p className="about-paragraph">
            I specialize in building full-stack platforms using Python, FastAPI, React, MongoDB, and PostgreSQL, backed by cloud deployment tools including Docker, AWS, Vercel, and Render.
          </p>
          <p className="about-paragraph">
            Experienced in creating AI-assisted workflows, integrating MCP with Telegram, and developing robust operational tools that solve real-world problems.
          </p>
        </div>

        <a
          href="/resume.pdf"
          className="about-resume-btn"
          id="about-resume-btn"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Download Resume"
        >
          <span>DOWNLOAD RESUME</span>
          <DownloadIcon size={14} />
        </a>
      </div>

      {/* Right Column: 4 Clean Personal Info Rows */}
      <div className="about-right" role="list" aria-label="Education and Contact Information">
        {PERSONAL_INFO.map((item) => (
          <div className="about-info-row" key={item.label} role="listitem">
            <div className="about-info-icon-box" aria-hidden="true">
              <item.icon size={18} />
            </div>

            <div className="about-info-text">
              {item.href ? (
                <a
                  href={item.href}
                  className="about-info-value about-info-link"
                >
                  {item.value}
                </a>
              ) : (
                <span className="about-info-value">{item.value}</span>
              )}
              <span className="about-info-label">{item.label}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
