"use client"

import { cn } from "@/lib/utils"
import { Moon, Sun } from "lucide-react"
import { motion, useScroll, useSpring, useTransform } from "motion/react"
import { usePathname } from "next/navigation"
import { useTheme } from "next-themes"
import { useEffect, useState } from "react"
import ReactGA from "react-ga4"

/* =========================================================================
   THEME SWITCHER
   ========================================================================= */

export function ThemeSwitcher() {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme, resolvedTheme } = useTheme()

  useEffect(() => {
    setMounted(true)
  }, [])

  const currentTheme = resolvedTheme || theme

  const handleClick = () => {
    if (currentTheme === "dark") {
      setTheme("light")
    } else {
      setTheme("dark")
    }
  }

  if (!mounted) {
    return (
      <div className="flex items-center justify-center rounded-md p-2">
        <div className="size-5" />
      </div>
    )
  }

  return (
    <button
      type="button"
      className="hover:bg-accent/50 text-foreground flex cursor-pointer items-center justify-center rounded-md p-2 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      onClick={handleClick}
      aria-label={`Switch to ${currentTheme === "dark" ? "light" : "dark"} mode`}
    >
      {currentTheme === "dark" ? (
        <Sun className="size-5" />
      ) : (
        <Moon className="size-5" />
      )}
    </button>
  )
}

/* =========================================================================
   PAGE VIEW ANALYTICS
   ========================================================================= */

const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID

export function PageViewAnalytics() {
  const pathname = usePathname()

  useEffect(() => {
    if (!GA_MEASUREMENT_ID) return
    ReactGA.initialize(GA_MEASUREMENT_ID)
  }, [])

  useEffect(() => {
    if (!pathname) return
    ReactGA.send({ hitType: "pageview", page: pathname })
  }, [pathname])

  return null
}

/* =========================================================================
   SCROLL BARS ANIMATION
   ========================================================================= */

const BAR_COUNT = 61
const SPREAD = 8

export function AnimatingScrollBars() {
  const [isDesktop, setIsDesktop] = useState(false)

  useEffect(() => {
    const media = window.matchMedia("(min-width: 1024px)")
    setIsDesktop(media.matches)
    const listener = (e: MediaQueryListEvent) => setIsDesktop(e.matches)
    media.addEventListener("change", listener)
    return () => media.removeEventListener("change", listener)
  }, [])

  if (!isDesktop) return null

  return <ScrollBarsContent />
}

function ScrollBarsContent() {
  const { scrollYProgress } = useScroll()

  const smoothScroll = useSpring(scrollYProgress, {
    stiffness: 200,
    damping: 20,
    bounce: 0,
  })

  const waveCenter = useTransform(
    smoothScroll,
    [0, 1],
    [-SPREAD, BAR_COUNT + SPREAD]
  )

  return (
    <section
      className={cn(
        "fixed top-1/2 left-0 hidden -translate-y-1/2 lg:inline-block"
      )}
    >
      {Array.from({ length: BAR_COUNT }).map((_, index) => (
        <Bar key={index} index={index} waveCenter={waveCenter} />
      ))}
    </section>
  )
}

const Bar = ({
  index,
  waveCenter,
}: {
  index: number
  waveCenter: ReturnType<typeof useTransform<number, number>>
}) => {
  const isLongerLine = index % 5 === 0
  const baseWidth = isLongerLine ? 50 : 40
  const peakWidth = isLongerLine ? 100 : 80
  const scalePeak = peakWidth / baseWidth

  const scaleX = useTransform(waveCenter, (center) => {
    const dist = index - center
    if (dist <= -SPREAD || dist >= SPREAD) return 1
    const progress = 1 - Math.abs(dist) / SPREAD
    return 1 + (scalePeak - 1) * progress
  })

  return (
    <motion.div
      style={{ width: baseWidth, scaleX, transformOrigin: "left" }}
      className={cn(
        "my-1.5 h-px bg-neutral-300 dark:bg-neutral-600",
        isLongerLine && "bg-neutral-400 dark:bg-neutral-500",
        "will-change-transform"
      )}
    />
  )
}
