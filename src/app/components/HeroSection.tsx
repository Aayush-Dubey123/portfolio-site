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
        I build digital experiences<br className="tagline-br" /> that are meaningful &amp; impactful.
      </p>

      <p className="hero-description">
        I&apos;m a developer who loves crafting clean,<br className="desc-br" /> intuitive and performance-driven web<br className="desc-br" /> experiences.
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
