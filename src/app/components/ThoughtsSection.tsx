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

const THOUGHTS_DATA = [
  {
    title: 'Building with Purpose',
    excerpt: 'Why I believe great software comes from solving real problems.',
    date: 'May 20, 2025',
    readTime: '5 min read',
    image: '/frames/frame-01.png',
    link: '#',
  },
  {
    title: 'The Dev Mindset',
    excerpt: 'Lessons learned as a developer on my journey.',
    date: 'April 12, 2025',
    readTime: '4 min read',
    image: '/frames/frame-05.png',
    link: '#',
  },
  {
    title: 'Designing Better Experiences',
    excerpt: 'Balancing aesthetics and usability in modern interfaces.',
    date: 'March 3, 2025',
    readTime: '6 min read',
    image: '/frames/frame-08.png',
    link: '#',
  },
] as const;

export default function ThoughtsSection() {
  return (
    <div className="thoughts-container">
      {/* Left Column: Heading, Subtitle, CTA */}
      <div className="thoughts-left">
        <h2 className="thoughts-title">Thoughts</h2>

        <p className="thoughts-subtitle">
          I write about tech, design and<br className="thoughts-br" /> the process of building things<br className="thoughts-br" /> that matter.
        </p>

        <a
          href="#"
          className="thoughts-cta-btn"
          id="thoughts-read-blog-btn"
          aria-label="Read My Blog"
        >
          <span>READ MY BLOG</span>
          <ArrowRightIcon size={13} />
        </a>
      </div>

      {/* Right Column: 3 Article List Rows */}
      <div className="thoughts-right" role="list" aria-label="Articles and Thoughts List">
        <div className="thoughts-rows-list">
          {THOUGHTS_DATA.map((thought) => (
            <article className="thought-row-item" key={thought.title} role="listitem">
              {/* Thumbnail */}
              <div className="thought-thumb-box">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={thought.image}
                  alt={thought.title}
                  className="thought-thumb-img"
                  loading="lazy"
                />
              </div>

              {/* Text Center */}
              <div className="thought-text-content">
                <h3 className="thought-item-title">{thought.title}</h3>
                <p className="thought-item-excerpt">{thought.excerpt}</p>
              </div>

              {/* Date & Read Time Right */}
              <div className="thought-meta-col">
                <span className="thought-meta-date">{thought.date}</span>
                <span className="thought-meta-read">{thought.readTime}</span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
