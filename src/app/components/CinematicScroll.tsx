'use client';

import { useCallback, useEffect, useRef } from 'react';
import CinematicCanvas, { type CinematicCanvasHandle } from './CinematicCanvas';
import SiteHeader from './SiteHeader';
import SectionProgressRail, { type SectionProgressRailHandle } from './SectionProgressRail';
import SocialRail from './SocialRail';
import ScrollIndicator from './ScrollIndicator';
import HeroSection from './HeroSection';
import AboutSection from './AboutSection';
import ExperienceSection from './ExperienceSection';
import SkillsSection from './SkillsSection';
import ProjectsSection from './ProjectsSection';
import ThoughtsSection from './ThoughtsSection';
import ContactSection from './ContactSection';

// ── Scroll container height ────────────────────────────────────────
//
//  9 frames means 8 transitions.
//  300vh per transition × 8 = 2400vh of scroll range.
//  Container = 2400vh + 100vh (one viewport) = 2500vh.
//
const CINEMA_HEIGHT = '2500vh';

// ── Helpers ────────────────────────────────────────────────────────
function clamp(v: number, lo = 0, hi = 1) {
  return Math.max(lo, Math.min(hi, v));
}

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

function smoothstep(a: number, b: number, v: number) {
  if (b === a) return v >= b ? 1 : 0;
  const t = clamp((v - a) / (b - a));
  return t * t * (3 - 2 * t);
}

/** Compute opacity for a section that fades in [inA, inB] and fades
 *  out [outA, outB]. All values are scroll progress fractions [0,1]. */
function sectionFade(
  p: number,
  inA: number, inB: number,
  outA?: number, outB?: number,
): number {
  const fadeIn  = smoothstep(inA, inB, p);
  if (outA === undefined || outB === undefined) return fadeIn;
  const fadeOut = smoothstep(outA, outB, p);
  return fadeIn * (1 - fadeOut);
}

/** Apply opacity + vertical shift directly to a DOM element.
 *  Zero React re-renders — all mutation is imperative. */
function applySection(el: HTMLElement | null, opacity: number, yShift = 28) {
  if (!el) return;
  const op = clamp(opacity);
  el.style.opacity        = String(op);
  el.style.transform      = `translateY(${(1 - op) * yShift}px)`;
  el.style.pointerEvents  = op > 0.05 ? 'auto' : 'none';
}

// ── Section visibility timing ──────────────────────────────────────
const SECTION_TIMING = {
  hero:       { inA: 0.00,  inB: 0.00,  outA: 0.18,  outB: 0.27 },
  about:      { inA: 0.20,  inB: 0.28,  outA: 0.36,  outB: 0.44 },
  experience: { inA: 0.36,  inB: 0.44,  outA: 0.50,  outB: 0.58 },
  skills:     { inA: 0.50,  inB: 0.58,  outA: 0.64,  outB: 0.72 },
  projects:   { inA: 0.63,  inB: 0.71,  outA: 0.76,  outB: 0.84 },
  thoughts:   { inA: 0.75,  inB: 0.83,  outA: 0.88,  outB: 0.94 },
  contact:    { inA: 0.87,  inB: 0.94 },
} as const;

// ── Explicit settled cinematic-progress targets ────────────────────
const SECTION_SETTLED_TARGETS: Record<string, number> = {
  hero:       0.00,
  about:      0.32,
  experience: 0.47,
  skills:     0.605,
  projects:   0.735,
  thoughts:   0.855,
  contact:    0.97,
};

// ── Component ─────────────────────────────────────────────────────
export default function CinematicScroll() {
  // The tall scroll container — its height defines the scroll range
  const containerRef  = useRef<HTMLElement>(null);

  // Imperative handle to the canvas renderer
  const canvasHandle  = useRef<CinematicCanvasHandle>(null);

  // Imperative handle to the section progress rail
  const railHandle    = useRef<SectionProgressRailHandle>(null);

  // Scroll indicator DOM ref
  const indicatorRef  = useRef<HTMLDivElement>(null);

  // Section DOM refs — mutated directly by RAF, never via React state
  const heroRef       = useRef<HTMLElement>(null);
  const aboutRef      = useRef<HTMLElement>(null);
  const experienceRef = useRef<HTMLElement>(null);
  const skillsRef     = useRef<HTMLElement>(null);
  const projectsRef   = useRef<HTMLElement>(null);
  const thoughtsRef   = useRef<HTMLElement>(null);
  const contactRef    = useRef<HTMLElement>(null);

  // Internal RAF state — all refs, zero React renders
  const rafIdRef    = useRef<number | null>(null);
  const smoothRef   = useRef(0);    // smoothed scroll position (px)
  const prevPRef    = useRef(-1);   // previous progress value (for change detection)
  const rmRef       = useRef(false); // prefers-reduced-motion

  // ── Nav: scroll to settled section target by id ───────────────
  const scrollToSection = useCallback((id: string) => {
    const container = containerRef.current;
    if (!container) return;
    const maxScroll = container.offsetHeight - window.innerHeight;
    if (maxScroll < 1) return;
    const targetProgress = SECTION_SETTLED_TARGETS[id] ?? 0;
    window.scrollTo({
      top: Math.round(maxScroll * targetProgress),
      behavior: rmRef.current ? 'auto' : 'smooth',
    });
  }, []);

  // ── RAF engine ────────────────────────────────────────────────
  useEffect(() => {
    // Detect prefers-reduced-motion once on mount
    rmRef.current = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Set initial section visibility (hero fully visible, rest hidden)
    applySection(heroRef.current, 1);
    applySection(aboutRef.current, 0);
    applySection(experienceRef.current, 0);
    applySection(skillsRef.current, 0);
    applySection(projectsRef.current, 0);
    applySection(thoughtsRef.current, 0);
    applySection(contactRef.current, 0);

    function tick() {
      rafIdRef.current = requestAnimationFrame(tick);

      const container = containerRef.current;
      if (!container) return;

      const maxScroll = container.offsetHeight - window.innerHeight;
      if (maxScroll < 1) return;

      // ── Scroll inertia ───────────────────────────────────────
      const rawY  = window.scrollY || window.pageYOffset || 0;
      const targetY = clamp(rawY, 0, maxScroll);

      const factor = rmRef.current ? 1 : 0.10;
      smoothRef.current = lerp(smoothRef.current, targetY, factor);

      if (Math.abs(smoothRef.current - targetY) < 1.0) {
        smoothRef.current = targetY;
      }

      // Normalise to [0, 1]
      const p = clamp(smoothRef.current / maxScroll);

      // ── Skip repaint if progress hasn't changed meaningfully ─
      if (Math.abs(p - prevPRef.current) < 0.00001) return;
      prevPRef.current = p;

      // ── Drive canvas ─────────────────────────────────────────
      canvasHandle.current?.setProgress(p);

      // ── Drive section overlays ───────────────────────────────
      const t = SECTION_TIMING;
      applySection(heroRef.current,
        sectionFade(p, t.hero.inA,       t.hero.inB,       t.hero.outA,       t.hero.outB));
      applySection(aboutRef.current,
        sectionFade(p, t.about.inA,      t.about.inB,      t.about.outA,      t.about.outB));
      applySection(experienceRef.current,
        sectionFade(p, t.experience.inA, t.experience.inB, t.experience.outA, t.experience.outB));
      applySection(skillsRef.current,
        sectionFade(p, t.skills.inA,     t.skills.inB,     t.skills.outA,     t.skills.outB));
      applySection(projectsRef.current,
        sectionFade(p, t.projects.inA,   t.projects.inB,   t.projects.outA,   t.projects.outB));
      applySection(thoughtsRef.current,
        sectionFade(p, t.thoughts.inA,   t.thoughts.inB,   t.thoughts.outA,   t.thoughts.outB));
      applySection(contactRef.current,
        sectionFade(p, t.contact.inA,    t.contact.inB));

      // ── Drive section progress rail ──────────────────────────
      let secIndex = 0;
      let secKey = 'hero';
      if (p < 0.20) {
        secIndex = 0; secKey = 'hero';
      } else if (p < 0.36) {
        secIndex = 1; secKey = 'about';
      } else if (p < 0.50) {
        secIndex = 2; secKey = 'experience';
      } else if (p < 0.63) {
        secIndex = 3; secKey = 'skills';
      } else if (p < 0.75) {
        secIndex = 4; secKey = 'projects';
      } else if (p < 0.87) {
        secIndex = 5; secKey = 'thoughts';
      } else {
        secIndex = 6; secKey = 'contact';
      }
      railHandle.current?.setSection(secKey, secIndex, p);

      // ── Drive bottom scroll indicator visibility ─────────────
      if (indicatorRef.current) {
        const indOp = 1 - smoothstep(0.04, 0.16, p);
        indicatorRef.current.style.opacity = String(indOp);
        indicatorRef.current.style.pointerEvents = indOp > 0.05 ? 'auto' : 'none';
        indicatorRef.current.style.transform = `translateX(-50%) translateY(${(1 - indOp) * 12}px)`;
      }

      // ── Expose CSS custom properties ─────────────────────────
      document.documentElement.style.setProperty('--scroll-progress',    String(p));
      document.documentElement.style.setProperty('--cinematic-progress', String(p));
    }

    rafIdRef.current = requestAnimationFrame(tick);

    return () => {
      if (rafIdRef.current !== null) cancelAnimationFrame(rafIdRef.current);
    };
  }, []);

  return (
    <section
      id="cinema"
      className="cinema-scroll"
      ref={containerRef}
      style={{ height: CINEMA_HEIGHT }}
      aria-label="Cinematic portfolio"
    >
      {/* Sticky full-viewport stage */}
      <div className="stage">

        {/* Cinematic frame canvas — z:0, behind everything */}
        <div className="cinematic-sequence" aria-hidden="true">
          <CinematicCanvas ref={canvasHandle} />
        </div>

        {/* UI overlay — z:10 */}
        <div className="overlay">

          {/* Top Header */}
          <SiteHeader onNavClick={scrollToSection} />

          {/* Left Vertical Section-Progress Rail */}
          <SectionProgressRail ref={railHandle} onSectionClick={scrollToSection} />

          {/* Right Social Icon Rail */}
          <SocialRail />

          {/* Bottom Scroll Indicator */}
          <div ref={indicatorRef} className="scroll-indicator-wrapper">
            <ScrollIndicator onClick={() => scrollToSection('about')} />
          </div>

          {/* Hero Section */}
          <section
            className="portfolio-section hero-section"
            id="hero"
            ref={heroRef}
            aria-label="Introduction"
          >
            <HeroSection
              onViewWork={() => scrollToSection('projects')}
              onAboutMe={() => scrollToSection('about')}
            />
          </section>

          {/* About Section */}
          <section
            className="portfolio-section about-section"
            id="about"
            ref={aboutRef}
            aria-label="About"
          >
            <AboutSection />
          </section>

          {/* Experience Section */}
          <section
            className="portfolio-section experience-section"
            id="experience"
            ref={experienceRef}
            aria-label="Experience"
          >
            <ExperienceSection />
          </section>

          {/* Skills Section */}
          <section
            className="portfolio-section skills-section"
            id="skills"
            ref={skillsRef}
            aria-label="Skills"
          >
            <SkillsSection />
          </section>

          {/* Projects Section */}
          <section
            className="portfolio-section projects-section"
            id="projects"
            ref={projectsRef}
            aria-label="Projects"
          >
            <ProjectsSection />
          </section>

          {/* Thoughts Section */}
          <section
            className="portfolio-section thoughts-section"
            id="thoughts"
            ref={thoughtsRef}
            aria-label="Thoughts and articles"
          >
            <ThoughtsSection />
          </section>

          {/* Contact Section */}
          <section
            className="portfolio-section contact-section"
            id="contact"
            ref={contactRef}
            aria-label="Contact"
          >
            <ContactSection />
          </section>

        </div>
      </div>
    </section>
  );
}
