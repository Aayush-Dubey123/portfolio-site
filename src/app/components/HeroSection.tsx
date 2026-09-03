'use client';

import { ArrowRight } from 'lucide-react';

interface HeroSectionProps {
  onViewWork: () => void;
  onAboutMe: () => void;
}

export default function HeroSection({ onViewWork, onAboutMe }: HeroSectionProps) {
  return (
    <div className="hero-content">
      <div className="hero-eyebrow">HELLO, I&apos;M</div>

      <h1 className="hero-name">
        <span className="hero-name-line">Aayush</span>
        <span className="hero-name-line">Dubey</span>
      </h1>

      <p className="hero-tagline">
        Full Stack Developer &amp;<br className="tagline-br" /> Cloud Enthusiast.
      </p>

      <p className="hero-description">
        B.Tech CSBS student building end-to-end web platforms,<br className="desc-br" /> AI-assisted workflows, and scalable cloud<br className="desc-br" /> infrastructure with React, FastAPI &amp; Python.
      </p>

      <div className="hero-actions">
        <button
          className="hero-btn hero-btn-primary"
          onClick={onViewWork}
          id="hero-view-work-btn"
          aria-label="View my projects"
        >
          <span>VIEW MY WORK</span>
          <ArrowRight size={14} strokeWidth={2} aria-hidden="true" />
        </button>

        <button
          className="hero-btn hero-btn-secondary"
          onClick={onAboutMe}
          id="hero-about-btn"
          aria-label="Learn more about me"
        >
          <span>ABOUT ME</span>
        </button>
      </div>
    </div>
  );
}
