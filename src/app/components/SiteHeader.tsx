'use client';

import { useState } from 'react';
import { ArrowRight } from 'lucide-react';

interface SiteHeaderProps {
  onNavClick: (sectionId: string) => void;
  activeSection?: string;
}

export const NAV_ITEMS = [
  { label: 'ABOUT',      id: 'about'      },
  { label: 'EXPERIENCE', id: 'experience' },
  { label: 'SKILLS',     id: 'skills'     },
  { label: 'PROJECTS',   id: 'projects'   },
  { label: 'THOUGHTS',   id: 'thoughts'   },
  { label: 'CONTACT',    id: 'contact'    },
] as const;

export default function SiteHeader({ onNavClick, activeSection = 'hero' }: SiteHeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  function handleLogoClick() {
    onNavClick('hero');
    setMenuOpen(false);
  }

  function handleNavClick(id: string) {
    onNavClick(id);
    setMenuOpen(false);
  }

  return (
    <header className="site-header" role="banner">
      {/* Left: AD logo/monogram */}
      <button
        className="header-monogram-box"
        onClick={handleLogoClick}
        aria-label="Aayush Dubey — Back to top"
        id="site-logo-btn"
      >
        <span className="monogram-text">AD</span>
      </button>

      {/* Center: Desktop Navigation */}
      <nav className="header-nav-container" aria-label="Primary navigation">
        <ul className="header-nav-list">
          {NAV_ITEMS.map(({ label, id }) => (
            <li key={id}>
              <a
                href={`#${id}`}
                id={`nav-${id}`}
                className={`header-nav-item ${activeSection === id ? 'active' : ''}`}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(id);
                }}
              >
                {label}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      {/* Right: CTA Button */}
      <button
        className="header-connect-btn"
        onClick={() => handleNavClick('contact')}
        id="header-connect-btn"
        aria-label="Let's Connect"
      >
        <span>LET&apos;S CONNECT</span>
        <ArrowRight size={13} strokeWidth={2} aria-hidden="true" />
      </button>

      {/* Mobile menu toggle */}
      <button
        className="mobile-menu-btn"
        onClick={() => setMenuOpen(!menuOpen)}
        aria-expanded={menuOpen}
        aria-label={menuOpen ? 'Close navigation' : 'Open navigation'}
        id="mobile-menu-btn"
      >
        {menuOpen ? '✕' : '☰'}
      </button>

      {/* Mobile Dropdown */}
      {menuOpen && (
        <nav className="mobile-nav-dropdown" aria-label="Mobile navigation">
          <ul className="mobile-nav-list">
            {NAV_ITEMS.map(({ label, id }) => (
              <li key={id}>
                <a
                  href={`#${id}`}
                  className="mobile-nav-item"
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(id);
                  }}
                >
                  {label}
                </a>
              </li>
            ))}
            <li>
              <button
                onClick={() => handleNavClick('contact')}
                className="mobile-connect-btn"
              >
                LET&apos;S CONNECT →
              </button>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}
