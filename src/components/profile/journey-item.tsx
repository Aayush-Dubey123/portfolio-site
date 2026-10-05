"use client"

import { useState } from "react"
import Image from "next/image"
import { ArrowUpRight, ImageIcon } from "lucide-react"
import { motion, useReducedMotion } from "motion/react"
import type { JourneyItem as JourneyItemType } from "@/data/journey"
import { cn } from "@/lib/utils"

export function JourneyItem({
  item,
  isFirst = false,
  isNewest = false,
  isLast = false,
}: {
  item: JourneyItemType
  isFirst?: boolean
  isNewest?: boolean
  isLast?: boolean
}) {
  const [hasImageError, setHasImageError] = useState(false)
  const shouldReduceMotion = useReducedMotion()

  const fitMode = item.imageFit ?? "cover"

  return (
    <motion.li
      initial={
        shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }
      }
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className="group/row relative list-none pl-7 sm:pl-9"
    >
      {/* Timeline spine line and node dot */}
      <div
        className="absolute top-0 bottom-0 left-0 flex w-5 sm:w-6 justify-center"
        aria-hidden="true"
      >
        {/* Continuous timeline line */}
        <div
          className={cn(
            "bg-border/60 absolute w-[2px]",
            isFirst ? "top-3.5" : "top-0",
            !isLast ? "bottom-[-40px] sm:bottom-[-56px]" : "bottom-3.5"
          )}
        />

        {/* Timeline node dot aligned with date badge level */}
        <div
          className={cn(
            "absolute top-3.5 z-10 flex shrink-0 items-center justify-center rounded-full border-2 border-background shadow-xs transition-colors",
            isNewest
              ? "bg-foreground size-3.5 ring-4 ring-primary/20"
              : "bg-muted-foreground/80 size-3"
          )}
        />
      </div>

      {/* Row content grid: Left clean text, Right rounded image */}
      <div className="grid grid-cols-1 items-start gap-6 md:grid-cols-2 md:gap-8">
        {/* LEFT: Clean text content without card box */}
        <div className="flex flex-col justify-center py-1">
          {/* Date Badge */}
          <div className="mb-3">
            <span className="inline-flex items-center rounded-full bg-secondary/80 px-3.5 py-1 text-xs font-medium text-secondary-foreground border border-border/40">
              <time dateTime={item.date}>{item.date}</time>
            </span>
          </div>

          {/* Title */}
          <h3 className="text-foreground text-xl font-bold tracking-tight leading-snug sm:text-2xl mb-3">
            {item.title}
          </h3>

          {/* Description */}
          <p className="text-muted-foreground text-sm leading-relaxed sm:text-base mb-4">
            {item.description}
          </p>

          {/* Tags */}
          {item.tags && item.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-3">
              {item.tags.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center rounded-full bg-secondary/50 px-3 py-1 text-xs font-medium text-muted-foreground border border-border/30"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          {/* Link */}
          {item.link && (
            <div className="pt-1">
              <a
                href={item.link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group/link text-foreground hover:text-primary focus-visible:ring-ring inline-flex items-center gap-1.5 rounded-sm text-xs font-medium transition-colors focus-visible:ring-2 focus-visible:outline-none"
              >
                <span>{item.link.label}</span>
                <ArrowUpRight className="size-3.5 transition-transform duration-200 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
                <span className="sr-only">(opens in a new tab)</span>
              </a>
            </div>
          )}
        </div>

        {/* RIGHT: Image container with rounded corners */}
        <div className="relative w-full aspect-[16/10] sm:aspect-auto md:h-full min-h-[220px] sm:min-h-[260px] overflow-hidden rounded-2xl border border-border/40 bg-muted/30 group-hover/row:border-border/80 transition-colors select-none">
          {!hasImageError ? (
            fitMode === "contain" ? (
              <>
                {/* Ambient halo backdrop layer */}
                <div
                  className="pointer-events-none absolute inset-0 overflow-hidden select-none"
                  aria-hidden="true"
                >
                  <Image
                    src={item.image}
                    alt=""
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 540px"
                    className="scale-120 object-cover opacity-45 blur-md dark:opacity-35"
                  />
                  <div className="bg-background/60 absolute inset-0 dark:bg-black/60" />
                </div>

                {/* Foreground image centered with contain fit */}
                <div className="relative z-10 flex h-full w-full items-center justify-center p-4 select-none">
                  <div className="relative flex h-full w-full items-center justify-center">
                    <Image
                      src={item.image}
                      alt={item.imageAlt}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 540px"
                      className="max-h-[94%] max-w-[94%] rounded-lg object-contain drop-shadow-xl transition-transform duration-500 ease-out md:group-hover/row:scale-[1.03]"
                      onError={() => setHasImageError(true)}
                    />
                  </div>
                </div>
              </>
            ) : (
              <Image
                src={item.image}
                alt={item.imageAlt}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 540px"
                className="object-cover transition-transform duration-500 ease-out md:group-hover/row:scale-[1.03]"
                onError={() => setHasImageError(true)}
              />
            )
          ) : (
            <div className="bg-muted/50 text-muted-foreground flex h-full w-full flex-col items-center justify-center gap-2 p-4 text-center min-h-[220px]">
              <ImageIcon className="size-8 opacity-40" />
              <p className="text-xs font-medium opacity-70">{item.title}</p>
            </div>
          )}
        </div>
      </div>
    </motion.li>
  )
}
