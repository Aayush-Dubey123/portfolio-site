'use client';

function CalendarIcon({ size = 18 }: { size?: number }) {
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
      <path d="M8 2v4" />
      <path d="M16 2v4" />
      <rect width="18" height="18" x="3" y="4" rx="2" />
      <path d="M3 10h18" />
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
    icon: CalendarIcon,
    value: '23 march, 2005',
    label: 'Birthday',
  },
  {
    icon: MapPinIcon,
    value: 'Nagpur ,India',
    label: 'Location',
  },
  {
    icon: GraduationCapIcon,
    value: 'B.Tech CSCS',
    label: 'Education',
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
            I&apos;m a passionate Full Stack Developer based in India.
          </p>
          <p className="about-paragraph">
            I love building beautiful, accessible and<br className="about-br" /> high-performance websites.
          </p>
          <p className="about-paragraph">
            When I&apos;m not coding, you&apos;ll find me exploring<br className="about-br" /> new places and capturing moments.
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
      <div className="about-right" role="list" aria-label="Personal Information">
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
