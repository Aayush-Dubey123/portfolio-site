"use client"

import { useState } from "react"
import Image from "next/image"
import { ArrowUpRight, ImageIcon } from "lucide-react"
import { motion, useReducedMotion } from "motion/react"
import { Badge } from "@/components/ui/badge"
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
  const yearMatch = item.date.match(/\b\d{4}\b/g)
  const watermarkYear = yearMatch ? yearMatch[yearMatch.length - 1] : item.date

  return (
    <motion.li
      initial={
        shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }
      }
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className="group/row relative list-none pl-7 sm:pl-8"
    >
      {/* Timeline spine and vertically centered dot */}
      <div
        className="absolute top-0 bottom-0 left-0 flex w-6 justify-center"
        aria-hidden="true"
      >
        {/* Continuous timeline line connecting between rows */}
        <div
          className={cn(
            "bg-border/80 absolute w-px",
            isFirst ? "top-1/2" : "top-0",
            !isLast ? "bottom-[-32px] sm:bottom-[-40px]" : "bottom-1/2"
          )}
        />

        {/* Small accent-colored dot vertically centered on row */}
        <div
          className={cn(
            "absolute top-1/2 flex shrink-0 -translate-y-1/2 items-center justify-center rounded-full transition-colors",
            isNewest
              ? "bg-primary ring-primary/25 size-3 shadow-xs ring-4"
              : "bg-primary/75 ring-primary/10 size-2.5 ring-4"
          )}
        >
          {/* Slow, subtle pulse for the newest entry */}
          {isNewest && !shouldReduceMotion && (
            <motion.span
              className="bg-primary/25 absolute -inset-1 rounded-full"
              animate={{ scale: [1, 1.5, 1], opacity: [0.45, 0.08, 0.45] }}
              transition={{
                duration: 2.8,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              aria-hidden="true"
            />
          )}
        </div>
      </div>

      {/* Row grid with items-stretch ensuring content card and image frame are equal height */}
      <div className="grid min-h-[300px] grid-cols-1 items-stretch gap-4 md:min-h-[320px] md:grid-cols-2 md:gap-6">
        {/* LEFT: Content card with 2px accent left border, generous padding, vertically centered content */}
        <div className="border-border border-l-primary/75 bg-card/60 md:hover:border-foreground/30 relative flex h-full flex-col justify-between overflow-hidden rounded-[10px] border border-l-2 p-6 transition-all duration-300 sm:p-8 md:hover:-translate-y-0.5 md:hover:shadow-sm">
          {/* Year Watermark: faint, large watermark in top-right corner at ~5% opacity */}
          <span
            className="text-foreground pointer-events-none absolute top-4 right-6 z-0 text-5xl leading-none font-black tracking-tighter opacity-[0.05] select-none sm:text-6xl dark:opacity-[0.06]"
            aria-hidden="true"
          >
            {watermarkYear}
          </span>
          {/* Top & Middle Content (vertically centered in remaining space) */}
          <div className="z-10 my-auto flex flex-1 flex-col justify-center gap-3 py-1">
            <div>
              <Badge
                variant="outline"
                className="border-primary/40 text-primary bg-primary/5 dark:bg-primary/10 text-xs font-medium"
              >
                <time dateTime={item.date}>{item.date}</time>
              </Badge>
            </div>

            <h3 className="text-primary text-xl leading-snug font-semibold tracking-tight sm:text-2xl">
              {item.title}
            </h3>

            <p className="text-muted-foreground text-sm leading-relaxed sm:text-base">
              {item.description}
            </p>
          </div>

          {/* Bottom pinned content (tags and link) */}
          <div className="z-10 mt-auto flex flex-col gap-3 pt-4">
            {item.tags && item.tags.length > 0 && (
              <div className="flex flex-wrap gap-1.5">
                {item.tags.map((tag) => (
                  <Badge
                    key={tag}
                    variant="outline"
                    className="text-muted-foreground text-[11px] font-normal"
                  >
                    {tag}
                  </Badge>
                ))}
              </div>
            )}

            {item.link && (
              <div className="pt-0.5">
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
        </div>

        {/* RIGHT: Image frame matching card height with items-stretch */}
        <div className="border-border flex h-full min-h-[260px] w-full rounded-[10px] border p-[4px] md:min-h-[320px]">
          <div className="bg-muted border-border relative flex h-full min-h-[260px] w-full items-center justify-center overflow-hidden rounded-[6px] border select-none md:min-h-[310px]">
            {!hasImageError ? (
              fitMode === "contain" ? (
                <>
                  {/* Backdrop layer with reduced blur and darkened overlay */}
                  <div
                    className="pointer-events-none absolute inset-0 overflow-hidden select-none"
                    aria-hidden="true"
                  >
                    <Image
                      src={item.image}
                      alt=""
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 480px"
                      className="scale-110 object-cover opacity-40 blur-sm dark:opacity-30"
                    />
                    <div className="bg-background/55 absolute inset-0 dark:bg-black/65" />
                  </div>

                  {/* Foreground image filling ~92% height in object-contain */}
                  <div className="relative z-10 flex h-full w-full items-center justify-center p-3 select-none">
                    <div className="relative flex h-full w-full items-center justify-center">
                      <Image
                        src={item.image}
                        alt={item.imageAlt}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 480px"
                        className="max-h-[92%] max-w-[92%] rounded-md object-contain drop-shadow-md transition-transform duration-500 ease-out md:group-hover/row:scale-[1.03]"
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
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 480px"
                  className="object-cover transition-transform duration-500 ease-out md:group-hover/row:scale-[1.03]"
                  onError={() => setHasImageError(true)}
                />
              )
            ) : (
              <div className="bg-muted/50 text-muted-foreground flex h-full w-full flex-col items-center justify-center gap-2 p-4 text-center">
                <ImageIcon className="size-8 opacity-40" />
                <p className="text-xs font-medium opacity-70">{item.title}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.li>
  )
}
