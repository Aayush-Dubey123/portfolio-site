'use client';

import { ChevronDown } from 'lucide-react';

interface ScrollIndicatorProps {
  onClick?: () => void;
}

export default function ScrollIndicator({ onClick }: ScrollIndicatorProps) {
  return (
    <div className="scroll-indicator" onClick={onClick} role="button" tabIndex={0} aria-label="Scroll down to explore">
      <span className="scroll-indicator-text">SCROLL TO EXPLORE</span>
      <ChevronDown className="scroll-indicator-arrow" size={16} strokeWidth={2} aria-hidden="true" />
    </div>
  );
}
