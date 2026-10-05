"use client"

import { cn } from "@/lib/utils"

export function AdMonogram({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "ring-border ring-offset-edge relative flex size-28 shrink-0 items-center justify-center rounded-full bg-card ring-1 ring-offset-2 shadow-md transition-all duration-300 hover:scale-105 select-none overflow-hidden group/monogram",
        className
      )}
      aria-label="AD Monogram"
      role="img"
    >
      {/* Background subtle grid pattern matching profile header visual language */}
      <div
        className="absolute inset-0 [background-image:radial-gradient(var(--edge)_1px,transparent_0)] [background-size:6px_6px] opacity-40 transition-opacity duration-300 group-hover/monogram:opacity-60"
        aria-hidden="true"
      />

      {/* Editorial AD Monogram SVG */}
      <svg
        viewBox="0 0 112 112"
        className="relative z-10 size-full p-[8%]"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Subtle Outer Dashed Hairline Ring */}
        <circle
          cx="56"
          cy="56"
          r="50"
          className="stroke-border/60 group-hover/monogram:stroke-foreground/40 transition-colors duration-300"
          strokeWidth="1"
          strokeDasharray="3 3"
        />

        {/* Solid Inner Fine Frame */}
        <circle
          cx="56"
          cy="56"
          r="46"
          className="stroke-border/30 group-hover/monogram:stroke-border/60 transition-colors duration-300"
          strokeWidth="0.75"
        />

        {/* Interlocked AD Monogram Graphic */}
        <g className="transition-transform duration-300 group-hover/monogram:scale-[1.03]">
          {/* --- LETTER D (Base stroke) --- */}
          <path
            d="M 44 32 H 60 C 73 32 80 41 80 56 C 80 71 73 80 60 80 H 44 V 32 Z"
            fill="none"
            className="stroke-foreground/90"
            strokeWidth="4.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* --- INTERLOCK MASK (Erases D stroke where A's right leg overlaps) --- */}
          <path
            d="M 44 32 L 62 80"
            fill="none"
            className="stroke-card"
            strokeWidth="9"
            strokeLinecap="round"
          />

          {/* --- LETTER A (Foreground Interlocking Strokes) --- */}
          {/* Left leg of A */}
          <path
            d="M 26 80 L 44 32"
            fill="none"
            className="stroke-foreground"
            strokeWidth="4.5"
            strokeLinecap="round"
          />

          {/* Right leg of A (Weaves over D) */}
          <path
            d="M 44 32 L 62 80"
            fill="none"
            className="stroke-foreground"
            strokeWidth="4.5"
            strokeLinecap="round"
          />

          {/* Crossbar of A */}
          <path
            d="M 32 63 H 55"
            fill="none"
            className="stroke-foreground"
            strokeWidth="3.5"
            strokeLinecap="round"
          />

          {/* Refined Geometric Apex Accent Dot */}
          <circle
            cx="44"
            cy="32"
            r="2.25"
            className="fill-foreground"
          />
        </g>
      </svg>
    </div>
  )
}
