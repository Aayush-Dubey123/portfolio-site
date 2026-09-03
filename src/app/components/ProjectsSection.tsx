'use client';

import { useState, useRef, useEffect } from 'react';

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

function ChevronLeftIcon({ size = 18 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="m15 18-6-6 6-6" />
    </svg>
  );
}

function ChevronRightIcon({ size = 18 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="m9 18 6-6-6-6" />
    </svg>
  );
}

/* ================================================================
   RESUME PROJECT MOCKUPS
   ================================================================ */

function WarehouseWmsMockup() {
  return (
    <div className="project-mockup-inner">
      {/* Mockup Header */}
      <div className="mockup-header-row">
        <div className="mockup-header-title flex items-center gap-1.5">
          <svg
            width="13"
            height="13"
            viewBox="0 0 24 24"
            fill="none"
            stroke="rgba(255,255,255,0.7)"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect width="18" height="18" x="3" y="3" rx="2" />
          </svg>
          <span className="text-white font-bold tracking-wider">WAREHOUSE</span>
          <span className="text-purple-400 font-bold tracking-wider">WMS</span>
        </div>
        <span className="mockup-header-index">01 / 06</span>
      </div>

      {/* Mockup Dashboard Body */}
      <div className="mockup-screen-container">
        <div className="mockup-sub-heading">Warehouse Overview • 5 Workflows</div>
        {/* Metric Triplet */}
        <div className="mockup-metrics-grid">
          <div className="mockup-metric-card">
            <span className="mockup-metric-label">Orders</span>
            <span className="mockup-metric-number">120</span>
          </div>
          <div className="mockup-metric-card">
            <span className="mockup-metric-label">Shipments</span>
            <span className="mockup-metric-number">85</span>
          </div>
          <div className="mockup-metric-card">
            <span className="mockup-metric-label">Inventory</span>
            <span className="mockup-metric-number">1,240</span>
          </div>
        </div>

        {/* Purple Spline Wave Chart */}
        <div className="mockup-wave-container">
          <svg
            className="mockup-wave-svg"
            viewBox="0 0 160 32"
            preserveAspectRatio="none"
          >
            <defs>
              <linearGradient id="purpleGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#c084fc" stopOpacity="0.4" />
                <stop offset="100%" stopColor="#a855f7" stopOpacity="0" />
              </linearGradient>
            </defs>
            <path
              d="M0,24 Q20,28 40,16 T80,18 T120,8 T160,14 L160,32 L0,32 Z"
              fill="url(#purpleGrad)"
            />
            <path
              d="M0,24 Q20,28 40,16 T80,18 T120,8 T160,14"
              fill="none"
              stroke="#c084fc"
              strokeWidth="2"
            />
          </svg>
        </div>
      </div>
    </div>
  );
}

function HospitalHmsMockup() {
  return (
    <div className="project-mockup-inner">
      {/* Mockup Header */}
      <div className="mockup-header-row">
        <div className="mockup-header-title flex items-center gap-1.5">
          <span className="mockup-blue-dot" />
          <span className="text-white font-bold tracking-wider">HOSPITAL</span>
          <span className="text-blue-400 font-bold tracking-wider">HMS</span>
        </div>
        <span className="mockup-header-index">02 / 06</span>
      </div>

      {/* Mockup Dashboard Body */}
      <div className="mockup-screen-container">
        <div className="mockup-sub-heading">AI Booking &amp; Telegram MCP</div>
        {/* Glowing Progress Meter */}
        <div className="mockup-meter-track">
          <div className="mockup-meter-fill-blue" style={{ width: '74%' }} />
        </div>

        <div className="mockup-sub-heading mt-2.5">Automated Workflows</div>
        <div className="mockup-actions-grid">
          {/* Telegram Chat Icon */}
          <div className="mockup-action-tile" title="Telegram MCP Booking">
            <svg
              width="15"
              height="15"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#60a5fa"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
            </svg>
          </div>

          {/* CLI Readiness Check */}
          <div className="mockup-action-tile" title="CLI Readiness Check">
            <svg
              width="15"
              height="15"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#38bdf8"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="16 18 22 12 16 6" />
              <polyline points="8 6 2 12 8 18" />
            </svg>
          </div>

          {/* Verification Badge */}
          <div className="mockup-action-tile action-tile-check" title="Verified Operational">
            <svg
              width="15"
              height="15"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#4ade80"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

function CryoW3timesMockup() {
  return (
    <div className="project-mockup-inner">
      {/* Mockup Header */}
      <div className="mockup-header-row">
        <div className="mockup-header-title flex items-center gap-1.5">
          <span className="mockup-amber-dot" />
          <span className="text-white font-bold tracking-wider">CRYO</span>
          <span className="text-amber-400 font-bold tracking-wider">W3TIMES</span>
        </div>
        <span className="mockup-header-index">03 / 06</span>
      </div>

      {/* Mockup Dashboard Body */}
      <div className="mockup-screen-container">
        <div className="mockup-sub-heading">Crypto News Pipeline &amp; NextAuth</div>
        <div className="mockup-widgets-grid-rival">
          {/* Left: News Ingestion Bar Chart */}
          <div className="mockup-insight-box">
            <span className="mockup-micro-label">News Ingestion Rate</span>
            <div className="mockup-bars-container">
              <div className="mockup-bar mockup-bar-1" />
              <div className="mockup-bar mockup-bar-2" />
              <div className="mockup-bar mockup-bar-3" />
              <div className="mockup-bar mockup-bar-4 active-bar" />
              <div className="mockup-bar mockup-bar-5" />
              <div className="mockup-bar mockup-bar-6" />
            </div>
          </div>

          {/* Right: Radial Gauge 92% Persistence */}
          <div className="mockup-gauge-box">
            <div className="mockup-radial-wrap">
              <svg className="mockup-radial-svg" viewBox="0 0 44 44">
                <circle
                  cx="22"
                  cy="22"
                  r="18"
                  className="mockup-radial-bg"
                />
                <circle
                  cx="22"
                  cy="22"
                  r="18"
                  className="mockup-radial-fg-red"
                  strokeDasharray="113.1"
                  strokeDashoffset="11.3"
                />
              </svg>
              <span className="mockup-radial-val text-white">92%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function FoodOrderingMockup() {
  return (
    <div className="project-mockup-inner">
      <div className="mockup-header-row">
        <div className="mockup-header-title flex items-center gap-1.5">
          <span className="mockup-cyan-dot" />
          <span className="text-white font-bold tracking-wider">GOLDEN</span>
          <span className="text-cyan-400 font-bold tracking-wider">KULCHA</span>
        </div>
        <span className="mockup-header-index">04 / 06</span>
      </div>

      <div className="mockup-screen-container">
        <div className="mockup-sub-heading">Food Ordering &amp; Admin Review</div>
        <div className="mockup-canvas-preview">
          <div className="mockup-palette-row">
            <span className="palette-dot bg-rose-500" title="Order Processing" />
            <span className="palette-dot bg-amber-400" title="Inventory Sync" />
            <span className="palette-dot bg-cyan-400" title="Feedback Review" />
            <span className="palette-dot bg-purple-500" title="Billing Movement" />
          </div>
          <div className="mockup-cursor-tag">
            <span className="cursor-indicator" />
            <span className="cursor-text">3 Live Workflows</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function EigiAiMockup() {
  return (
    <div className="project-mockup-inner">
      <div className="mockup-header-row">
        <div className="mockup-header-title flex items-center gap-1.5">
          <span className="mockup-emerald-dot" />
          <span className="text-white font-bold tracking-wider">EIGI</span>
          <span className="text-emerald-400 font-bold tracking-wider">AI AGENTS</span>
        </div>
        <span className="mockup-header-index">05 / 06</span>
      </div>

      <div className="mockup-screen-container">
        <div className="mockup-sub-heading flex justify-between items-center">
          <span>Gen-AI Winner • Agents</span>
          <span className="mockup-badge-emerald">1st Place</span>
        </div>
        <div className="mockup-stream-container">
          <svg
            className="mockup-wave-svg"
            viewBox="0 0 160 32"
            preserveAspectRatio="none"
          >
            <defs>
              <linearGradient id="emeraldGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#34d399" stopOpacity="0.4" />
                <stop offset="100%" stopColor="#10b981" stopOpacity="0" />
              </linearGradient>
            </defs>
            <path
              d="M0,20 Q25,6 50,18 T100,10 T140,24 T160,12 L160,32 L0,32 Z"
              fill="url(#emeraldGrad)"
            />
            <path
              d="M0,20 Q25,6 50,18 T100,10 T140,24 T160,12"
              fill="none"
              stroke="#34d399"
              strokeWidth="2"
            />
          </svg>
        </div>
      </div>
    </div>
  );
}

function AgroErpMockup() {
  return (
    <div className="project-mockup-inner">
      <div className="mockup-header-row">
        <div className="mockup-header-title flex items-center gap-1.5">
          <span className="mockup-amber-dot" />
          <span className="text-white font-bold tracking-wider">AGRO</span>
          <span className="text-amber-400 font-bold tracking-wider">ERP</span>
        </div>
        <span className="mockup-header-index">06 / 06</span>
      </div>

      <div className="mockup-screen-container">
        <div className="mockup-sub-heading">Procurement &amp; Sales Pipelines</div>
        <div className="mockup-metrics-grid">
          <div className="mockup-metric-card">
            <span className="mockup-metric-label">Procure</span>
            <span className="mockup-metric-number">100%</span>
          </div>
          <div className="mockup-metric-card">
            <span className="mockup-metric-label">Billing</span>
            <span className="mockup-metric-number text-amber-300">Verified</span>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ================================================================
   PROJECTS DATA DEFINITION (FROM REAL RESUME)
   ================================================================ */

interface ProjectItem {
  id: string;
  index: string;
  title: string;
  description: string;
  tags: string[];
  mockup: React.ComponentType;
  link: string;
}

const PROJECTS_DATA: ProjectItem[] = [
  {
    id: 'warehouse-management-system',
    index: '01 / 06',
    title: 'Warehouse Management System',
    description:
      'End-to-end warehouse platform across 5+ workflows (inventory, orders, receiving, picking, dispatch) with role-specific access, 10+ endpoints with AI/MCP tooling, and 3 workspaces on Vercel and Render.',
    tags: ['FastAPI', 'MongoDB', 'React', 'Vite', 'Vercel', 'Render'],
    mockup: WarehouseWmsMockup,
    link: 'https://github.com/Aayush-Dubey123',
  },
  {
    id: 'hospital-management-system',
    index: '02 / 06',
    title: 'Hospital Management System',
    description:
      'AI-assisted appointment booking with conversational interface, Telegram MCP integration across 5 hospital workflows, and a CLI-based readiness system for operational checks.',
    tags: ['FastAPI', 'PostgreSQL', 'React', 'Vite', 'MCP', 'Telegram'],
    mockup: HospitalHmsMockup,
    link: 'https://github.com/Aayush-Dubey123',
  },
  {
    id: 'cryow3times',
    index: '03 / 06',
    title: 'CryoW3times',
    description:
      'Real-time cryptocurrency news aggregator backend using Next.js API Routes, MongoDB and Prisma. Features API-driven news ingestion pipelines and NextAuth session authentication.',
    tags: ['Next.js', 'MongoDB', 'React', 'TypeScript', 'Prisma', 'NextAuth'],
    mockup: CryoW3timesMockup,
    link: 'https://github.com/Aayush-Dubey123',
  },
  {
    id: 'golden-kulcha-ordering',
    index: '04 / 06',
    title: 'Food Ordering & ERP System',
    description:
      'Full-stack food ordering platform covering menu browsing, order placement, order tracking, and feedback workflow connecting customer submissions to admin review with inventory sync.',
    tags: ['React', 'Node.js', 'ERP', 'Inventory Tracking'],
    mockup: FoodOrderingMockup,
    link: 'https://github.com/Aayush-Dubey123',
  },
  {
    id: 'eigi-ai-agents',
    index: '05 / 06',
    title: 'Eigi.AI Platform (Hackathon Winner)',
    description:
      'Intelligent AI Agent platform for automated action orchestration, multi-agent workflows, and tool execution. Winner of the GEN-AI Bootcamp/Hackathon.',
    tags: ['GEN-AI', 'FastAPI', 'Python', 'OpenAI', 'MCP'],
    mockup: EigiAiMockup,
    link: 'https://github.com/Aayush-Dubey123',
  },
  {
    id: 'agro-erp-pipelines',
    index: '06 / 06',
    title: 'Agro Tech ERP Workflows',
    description:
      'Enterprise resource planning system translating operational requirements into structured workflows for procurement, sales transactions, and billing records.',
    tags: ['ERP', 'Excel Workflows', 'Analytics', 'Reporting'],
    mockup: AgroErpMockup,
    link: 'https://github.com/Aayush-Dubey123',
  },
];

export default function ProjectsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [cardsPerView, setCardsPerView] = useState(3);
  const containerRef = useRef<HTMLDivElement>(null);

  // Responsive cards per view
  useEffect(() => {
    function handleResize() {
      if (window.innerWidth < 768) {
        setCardsPerView(1);
      } else if (window.innerWidth < 1140) {
        setCardsPerView(2);
      } else {
        setCardsPerView(3);
      }
    }

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const maxIndex = Math.max(0, PROJECTS_DATA.length - cardsPerView);

  const handlePrev = () => {
    setCurrentIndex((prev) => Math.max(0, prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => Math.min(maxIndex, prev + 1));
  };

  const handleDotClick = (idx: number) => {
    const target = Math.min(idx, maxIndex);
    setCurrentIndex(target);
  };

  return (
    <div className="projects-container">
      {/* Left Column: Heading, Subtitle, CTA */}
      <div className="projects-left">
        <h2 className="projects-title">Featured<br />Projects</h2>

        <p className="projects-subtitle">
          Real-world applications built with<br />
          FastAPI, React, Next.js, and cloud<br />
          infrastructure.
        </p>

        <a
          href="https://github.com/Aayush-Dubey123"
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

      {/* Right Column: Interactive Projects Carousel */}
      <div className="projects-right">
        <div className="projects-carousel-wrapper" ref={containerRef}>
          {/* Navigation Arrow Left */}
          <button
            type="button"
            className="carousel-nav-btn carousel-nav-prev"
            onClick={handlePrev}
            disabled={currentIndex === 0}
            aria-label="Previous Projects"
          >
            <ChevronLeftIcon size={18} />
          </button>

          {/* Cards Slider Viewport */}
          <div className="projects-slider-viewport">
            <div
              className="projects-slider-track"
              style={{
                transform: `translateX(-${currentIndex * (100 / cardsPerView)}%)`,
              }}
            >
              {PROJECTS_DATA.map((project) => {
                const MockupComponent = project.mockup;
                return (
                  <div
                    key={project.id}
                    className="projects-slider-item"
                    style={{ flex: `0 0 ${100 / cardsPerView}%` }}
                  >
                    <article
                      className="featured-project-card"
                      role="listitem"
                      aria-label={`${project.title} project card`}
                    >
                      {/* Top Mockup Dashboard Area */}
                      <div className="project-banner">
                        <MockupComponent />
                      </div>

                      {/* Bottom Info Details Area */}
                      <div className="project-card-body">
                        <h3 className="featured-project-title">{project.title}</h3>
                        <p className="featured-project-desc">{project.description}</p>

                        {/* Tech Stack Pills */}
                        <div className="project-tags-list" aria-label="Technologies used">
                          {project.tags.map((tag) => (
                            <span key={tag} className="project-tech-pill">
                              {tag}
                            </span>
                          ))}
                        </div>

                        {/* View Project CTA */}
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
                  </div>
                );
              })}
            </div>
          </div>

          {/* Navigation Arrow Right */}
          <button
            type="button"
            className="carousel-nav-btn carousel-nav-next"
            onClick={handleNext}
            disabled={currentIndex >= maxIndex}
            aria-label="Next Projects"
          >
            <ChevronRightIcon size={18} />
          </button>
        </div>

        {/* Carousel Pagination Dots */}
        <div className="projects-pagination-dots" role="tablist" aria-label="Project slides">
          {PROJECTS_DATA.map((project, idx) => {
            const isPrimary = idx === currentIndex;
            return (
              <button
                key={project.id}
                type="button"
                className={`pagination-dot ${isPrimary ? 'dot-active' : ''}`}
                onClick={() => handleDotClick(idx)}
                aria-label={`Go to project ${idx + 1}: ${project.title}`}
                role="tab"
                aria-selected={isPrimary}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
