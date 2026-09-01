'use client';

import { forwardRef, useImperativeHandle, useRef, useState } from 'react';

export interface SectionProgressRailHandle {
  setSection: (sectionKey: string, sectionIndex: number, progressRatio: number) => void;
}

interface SectionProgressRailProps {
  onSectionClick?: (sectionKey: string) => void;
}

const SECTIONS = [
  { key: 'hero',       num: '01', label: 'INTRO'      },
  { key: 'about',      num: '02', label: 'ABOUT'      },
  { key: 'experience', num: '03', label: 'EXPERIENCE' },
  { key: 'skills',     num: '04', label: 'SKILLS'     },
  { key: 'projects',   num: '05', label: 'PROJECTS'   },
  { key: 'thoughts',   num: '06', label: 'THOUGHTS'   },
  { key: 'contact',    num: '07', label: 'CONTACT'    },
] as const;

const SectionProgressRail = forwardRef<SectionProgressRailHandle, SectionProgressRailProps>(
  function SectionProgressRail({ onSectionClick }, ref) {
    const numRef = useRef<HTMLSpanElement>(null);
    const labelRef = useRef<HTMLSpanElement>(null);
    const dotRef = useRef<HTMLDivElement>(null);
    const lineRef = useRef<HTMLDivElement>(null);

    const [activeKey, setActiveKey] = useState<string>('hero');

    useImperativeHandle(ref, () => ({
      setSection(sectionKey: string, sectionIndex: number, progressRatio: number) {
        const sec = SECTIONS[sectionIndex] || SECTIONS[0];
        if (numRef.current && numRef.current.textContent !== sec.num) {
          numRef.current.textContent = sec.num;
        }
        if (labelRef.current && labelRef.current.textContent !== sec.label) {
          labelRef.current.textContent = sec.label;
        }
        if (dotRef.current) {
          // Travel the dot along the rail line based on overall or section progress
          const clamped = Math.max(0, Math.min(1, progressRatio));
          dotRef.current.style.transform = `translateY(${clamped * 100}%)`;
        }
        setActiveKey(sec.key);
      },
    }));

    return (
      <aside className="section-progress-rail" aria-label="Section navigation rail">
        <div className="rail-content">
          <div className="rail-indicator">
            <span className="rail-num" ref={numRef} aria-hidden="true">
              01
            </span>
            <span className="rail-label" ref={labelRef}>
              INTRO
            </span>
          </div>

          <div className="rail-track" ref={lineRef}>
            <div className="rail-track-line" />
            <div className="rail-dot" ref={dotRef} />
          </div>
        </div>
      </aside>
    );
  }
);

export default SectionProgressRail;
