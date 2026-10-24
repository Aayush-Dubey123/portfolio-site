"use client"

import * as React from "react"
import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import {
  ArrowRight,
  ArrowUpRight,
  Briefcase,
  CalendarIcon,
  ChevronsDownUpIcon,
  ChevronsUpDownIcon,
  ImageIcon,
} from "lucide-react"
import { AnimatePresence, motion, useReducedMotion, Transition, Variants } from "motion/react"
import {
  BLOGS,
  EXPERIENCE,
  JOURNEY,
  TECH_STACK,
  TEXT_TO_ANIMATE,
  USER,
  type Blog,
  type Experience as ExperienceType,
  type JourneyItem as JourneyItemType,
} from "@/data"
import { cn, formatMonthYear } from "@/lib/utils"
import {
  Badge,
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
  HeaderTitle,
  SkillBadgeList,
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui"

export { HeaderTitle } from "@/components/ui"

/* =========================================================================
   SEPARATOR
   ========================================================================= */

export function Separator({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "overflow-hidden relative flex h-8 w-full",
        "border-edge border-y-[1px]",
        "bg-[repeating-linear-gradient(315deg,var(--pattern-foreground)_0,var(--pattern-foreground)_1px,transparent_0,transparent_50%)] bg-size-[10px_10px] [--pattern-foreground:var(--color-border)]/70",
        className
      )}
    />
  )
}

/* =========================================================================
   AD MONOGRAM
   ========================================================================= */

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
      <div
        className="absolute inset-0 [background-image:radial-gradient(var(--edge)_1px,transparent_0)] [background-size:6px_6px] opacity-40 transition-opacity duration-300 group-hover/monogram:opacity-60"
        aria-hidden="true"
      />
      <svg
        viewBox="0 0 112 112"
        className="relative z-10 size-full p-[8%]"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle
          cx="56"
          cy="56"
          r="50"
          className="stroke-border/60 group-hover/monogram:stroke-foreground/40 transition-colors duration-300"
          strokeWidth="1"
          strokeDasharray="3 3"
        />
        <circle
          cx="56"
          cy="56"
          r="46"
          className="stroke-border/30 group-hover/monogram:stroke-border/60 transition-colors duration-300"
          strokeWidth="0.75"
        />
        <g className="transition-transform duration-300 group-hover/monogram:scale-[1.03]">
          <path
            d="M 44 32 H 60 C 73 32 80 41 80 56 C 80 71 73 80 60 80 H 44 V 32 Z"
            fill="none"
            className="stroke-foreground/90"
            strokeWidth="4.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M 44 32 L 62 80"
            fill="none"
            className="stroke-card"
            strokeWidth="9"
            strokeLinecap="round"
          />
          <path
            d="M 26 80 L 44 32"
            fill="none"
            className="stroke-foreground"
            strokeWidth="4.5"
            strokeLinecap="round"
          />
          <path
            d="M 44 32 L 62 80"
            fill="none"
            className="stroke-foreground"
            strokeWidth="4.5"
            strokeLinecap="round"
          />
          <path
            d="M 32 63 H 55"
            fill="none"
            className="stroke-foreground"
            strokeWidth="3.5"
            strokeLinecap="round"
          />
          <circle cx="44" cy="32" r="2.25" className="fill-foreground" />
        </g>
      </svg>
    </div>
  )
}

/* =========================================================================
   WORD LOOP
   ========================================================================= */

export type WordLoopProps = {
  texts: string[]
  className?: string
  interval?: number
  transition?: Transition
  wordStagger?: number
  wordVariants?: Variants
  onIndexChange?: (index: number) => void
  trigger?: boolean
}

const defaultWordVariants: Variants = {
  initial: { y: 18, opacity: 0, filter: "blur(4px)" },
  animate: () => ({ y: 0, opacity: 1, filter: "blur(0px)" }),
  exit: () => ({ y: -18, opacity: 0, filter: "blur(4px)" }),
}

export function WordLoop({
  texts,
  className,
  interval = 3,
  transition = { duration: 0.22, ease: "easeOut" },
  wordStagger = 0.08,
  wordVariants,
  onIndexChange,
  trigger = true,
}: WordLoopProps) {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    if (!trigger) return
    const id = setInterval(() => {
      setCurrentIndex((cur) => {
        const next = (cur + 1) % texts.length
        onIndexChange?.(next)
        return next
      })
    }, interval * 1000)
    return () => clearInterval(id)
  }, [texts.length, interval, onIndexChange, trigger])

  const variants = wordVariants || defaultWordVariants
  const words = texts[currentIndex].split(" ")

  return (
    <span className={cn("inline-flex flex-wrap gap-x-[0.3em]", className)}>
      <AnimatePresence mode="popLayout" initial={false}>
        {words.map((word, i) => (
          <motion.span
            key={`${currentIndex}-${i}`}
            custom={i}
            variants={variants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ ...transition, delay: i * wordStagger }}
            className="inline-block"
          >
            {word}
          </motion.span>
        ))}
      </AnimatePresence>
    </span>
  )
}

/* =========================================================================
   PROFILE HEADER
   ========================================================================= */

export function ProfileHeader() {
  return (
    <div className="relative flex h-full min-h-[200px] justify-center sm:justify-between pb-6">
      <div
        className={cn(
          "h-[45%] w-full sm:h-[50%]",
          "absolute inset-0",
          "[background-image:radial-gradient(var(--edge)_1.5px,transparent_0)] [background-size:10px_10px] bg-repeat-round"
        )}
      />
      <div className="z-40 mt-10 grid w-full grid-cols-1 gap-y-4 px-4 sm:grid-cols-3">
        <div className="col-span-2 space-y-1">
          <div className="relative flex w-full justify-center sm:justify-start">
            <Image
              src={USER.avatar}
              alt="Aayush Dubey - Software & Systems Engineer"
              width={300}
              height={300}
              fetchPriority="high"
              className="ring-border ring-offset-edge size-28 rounded-full ring-1 ring-offset-2 select-none object-cover object-[center_15%] shadow-md transition-transform duration-300 hover:scale-105"
            />
          </div>
          <div className="flex items-center justify-center gap-1 sm:mt-2 sm:justify-start">
            <h1 className="text-primary text-center text-xl font-bold sm:text-left md:text-2xl">
              {USER.name}
            </h1>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 22 22"
              className="size-5"
            >
              <path
                d="M20.396 11c-.018-.646-.215-1.275-.57-1.816-.354-.54-.852-.972-1.438-1.246.223-.607.27-1.264.14-1.897-.131-.634-.437-1.218-.882-1.687-.47-.445-1.053-.75-1.687-.882-.633-.13-1.29-.083-1.897.14-.273-.587-.704-1.086-1.245-1.44S11.647 1.62 11 1.604c-.646.017-1.273.213-1.813.568s-.969.854-1.24 1.44c-.608-.223-1.267-.272-1.902-.14-.635.13-1.22.436-1.69.882-.445.47-.749 1.055-.878 1.688-.13.633-.08 1.29.144 1.896-.587.274-1.087.705-1.443 1.245-.356.54-.555 1.17-.574 1.817.02.647.218 1.276.574 1.817.356.54.856.972 1.443 1.245-.224.606-.274 1.263-.144 1.896.13.634.433 1.218.877 1.688.47.443 1.054.747 1.687.878.633.132 1.29.084 1.897-.136.274.586.705 1.084 1.246 1.439.54.354 1.17.551 1.816.569.647-.016 1.276-.213 1.817-.567s.972-.854 1.245-1.44c.604.239 1.266.296 1.903.164.636-.132 1.22-.447 1.68-.907.46-.46.776-1.044.908-1.681s.075-1.299-.165-1.903c.586-.274 1.084-.705 1.439-1.246.354-.54.551-1.17.569-1.816zM9.662 14.85l-3.429-3.428 1.293-1.302 2.072 2.072 4.4-4.794 1.347 1.246z"
                fill="#1d9bf0"
              />
            </svg>
          </div>
          <h2 className="text-muted-foreground text-center text-sm sm:text-left md:text-base flex flex-col sm:flex-row items-center sm:items-center gap-0.5 sm:gap-1.5 min-h-[44px] sm:min-h-0">
            <span className="shrink-0 font-medium">Software &amp; Systems Engineer</span>
            <span className="hidden sm:inline">|</span>
            <div className="h-6 flex items-center justify-center sm:justify-start overflow-hidden">
              <WordLoop
                texts={TEXT_TO_ANIMATE}
                transition={{
                  type: "spring",
                  stiffness: 800,
                  damping: 80,
                  mass: 10,
                }}
                interval={4}
                wordStagger={0.05}
              />
            </div>
          </h2>
        </div>

        <div className="mx-2 my-2 flex flex-col items-center sm:items-end sm:justify-end">
          <div className="border-edge group relative grid w-full max-w-[260px] cursor-pointer grid-cols-3 rounded-sm sm:w-auto sm:gap-x-6 sm:py-1">
            {USER.socials.map((item) => {
              const isConnect =
                item.name.toLowerCase() === "gmail" ||
                item.href.includes("connect")
              const isExternal =
                !isConnect &&
                !item.href.startsWith("/#") &&
                !item.href.startsWith("#")

              const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
                if (isConnect) {
                  const el = document.getElementById("connect")
                  if (el) {
                    e.preventDefault()
                    el.scrollIntoView({ behavior: "smooth" })
                    window.history.pushState(null, "", "#connect")
                    const nameInput = document.getElementById("contact-name")
                    if (nameInput) {
                      setTimeout(() => {
                        nameInput.focus({ preventScroll: true })
                      }, 500)
                    }
                  }
                }
              }

              return (
                <Tooltip key={item.name}>
                  <TooltipTrigger asChild>
                    <Link
                      key={item.name}
                      href={isConnect ? "/#connect" : item.href}
                      target={isExternal ? "_blank" : undefined}
                      rel={isExternal ? "noopener noreferrer" : undefined}
                      onClick={handleClick}
                      aria-label={
                        isConnect
                          ? "Navigate to Connect section"
                          : `${item.name} - Aayush Dubey`
                      }
                      className="border-edge flex h-full items-center justify-center overflow-hidden border-dashed p-1.5 [&:not(:first-child)]:border-l-[1px] transition-colors hover:bg-accent/40"
                    >
                      <Image
                        src={item.icon}
                        alt={`${item.name} - Aayush Dubey`}
                        width={48}
                        height={48}
                        fetchPriority="high"
                        className="size-7 rounded-sm transition-transform duration-200 group-hover:scale-105"
                      />
                    </Link>
                  </TooltipTrigger>
                  <TooltipContent
                    className="bg-secondary"
                    arrowClassName="bg-secondary fill-secondary"
                  >
                    <p className="text-foreground text-sm font-medium">
                      {isConnect ? "Connect" : item.name}
                    </p>
                  </TooltipContent>
                </Tooltip>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

/* =========================================================================
   ABOUT SECTION
   ========================================================================= */

export function About() {
  return (
    <section id="about" className="w-full scroll-mt-16">
      <HeaderTitle title="About" />
      <div className="p-3 sm:p-5">
        <div className="space-y-4 text-justify [text-justify:inter-word] [hyphens:auto] [text-wrap:pretty] text-muted-foreground text-sm sm:text-base leading-relaxed sm:leading-7">
          <p>
            Hello, and welcome. I’m Aayush Dubey, currently pursuing a B.Tech in
            Computer Science and Business Systems (CSBS). I have a strong
            interest in web development and cloud computing, and I enjoy
            learning through real-world projects and new technologies.
          </p>
          <p>
            My academic and internship experiences have given me hands-on
            exposure to building practical solutions, working with AI-assisted
            workflows, and exploring modern development and cloud technologies.
            These experiences have strengthened my technical skills while
            helping me grow in problem-solving, teamwork, discipline, and
            adaptability.
          </p>
        </div>
      </div>
    </section>
  )
}

/* =========================================================================
   TECH STACK SECTION
   ========================================================================= */

export function TechStack() {
  return (
    <section id="tech-stack" className="w-full scroll-mt-16">
      <HeaderTitle title="Tech Stack" />
      <div className="my-2 grid w-full grid-cols-4 gap-2 p-2 lg:grid-cols-6">
        {TECH_STACK.map((item) => {
          const ext = item.ext || "svg"
          return (
            <div
              key={item.key}
              className="flex items-center justify-center sm:justify-start"
            >
              {item.theme ? (
                <>
                  <Image
                    src={`/assets/tech-stack/${item.key}-light.${ext}`}
                    alt={item.title}
                    width={48}
                    height={48}
                    quality={100}
                    unoptimized
                    loading="lazy"
                    className="h-8 w-8 rounded-sm dark:hidden"
                  />
                  <Image
                    src={`/assets/tech-stack/${item.key}-dark.${ext}`}
                    alt={item.title}
                    width={48}
                    height={48}
                    quality={100}
                    unoptimized
                    loading="lazy"
                    className="hidden h-8 w-8 rounded-sm dark:block"
                  />
                </>
              ) : (
                <Image
                  src={item.image || `/assets/tech-stack/${item.key}.${ext}`}
                  alt={item.title}
                  width={48}
                  height={48}
                  quality={100}
                  unoptimized
                  loading="lazy"
                  className="h-8 w-8 rounded-sm"
                />
              )}
              <span className="text-foreground/90 ml-2 hidden text-sm font-medium sm:inline-block">
                {item.title}
              </span>
            </div>
          )
        })}
      </div>
    </section>
  )
}

/* =========================================================================
   EXPERIENCE SECTION
   ========================================================================= */

export function Experience() {
  if (!EXPERIENCE.length) return null

  return (
    <section id="experience" className="w-full scroll-mt-16">
      <HeaderTitle title="Experience" />
      <div className="grid w-full">
        {EXPERIENCE.map((item) => (
          <ExperienceItem key={item.title} experience={item} />
        ))}
      </div>
    </section>
  )
}

export function ExperienceItem({
  className,
  experience,
}: {
  className?: string
  experience: ExperienceType
}) {
  return (
    <Collapsible defaultOpen={experience.isExpanded} asChild>
      <div
        className={cn(
          className,
          "border-edge w-full border-b-[1px] last:border-b-0"
        )}
      >
        <div className="flex items-center">
          {experience.logo ? (
            <Image
              src={experience.logo}
              alt={experience.title}
              width={32}
              height={32}
              quality={100}
              className="mx-3 flex aspect-square size-5 shrink-0 rounded-full object-contain sm:size-6"
              unoptimized
              aria-hidden="true"
            />
          ) : (
            <div
              className="bg-muted/70 border-border mx-3 flex size-7 shrink-0 items-center justify-center rounded-full border shadow-xs sm:size-8"
              aria-hidden="true"
            >
              <Briefcase className="size-3.5 text-primary/90 sm:size-4" />
            </div>
          )}

          <div className="border-edge flex-1 border-l border-dashed">
            <CollapsibleTrigger
              className={cn(
                "group/project flex w-full items-center gap-4 p-2 pr-2 text-left select-none"
              )}
              asChild
            >
              <div>
                <div className="h-full flex-1 items-center">
                  <h3 className="text-primary/95 mb-1 text-sm leading-snug font-medium text-balance sm:text-base">
                    {experience.title}
                  </h3>

                  <div className="flex h-full w-full flex-row items-center gap-x-2">
                    <div className="border-edge hidden border-r-[1px] pr-2 sm:block">
                      <Badge variant={"outline"} className="text-xs">
                        {experience.company}
                      </Badge>
                    </div>
                    <Badge variant={"outline"} className="text-xs">
                      {experience.type}
                    </Badge>
                    <div className="border-edge border-l-[1px] pl-2">
                      <div className="flex flex-row items-center space-x-2">
                        <p className="text-muted-foreground text-xs">
                          {formatMonthYear(experience.from)}
                        </p>
                        <span className="text-muted-foreground text-xs">
                          {"-"}
                        </span>
                        {experience.to ? (
                          <p className="text-muted-foreground text-xs">
                            {formatMonthYear(experience.to)}
                          </p>
                        ) : (
                          <span className="text-muted-foreground text-xs font-medium">
                            Present
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  className="text-muted-foreground shrink-0 [&_svg]:size-4"
                  aria-hidden
                >
                  <ChevronsDownUpIcon className="hidden group-data-[state=open]/project:block" />
                  <ChevronsUpDownIcon className="hidden group-data-[state=closed]/project:block" />
                </div>
              </div>
            </CollapsibleTrigger>
          </div>
        </div>

        <CollapsibleContent className="data-[state=closed]:animate-collapsible-up data-[state=open]:animate-collapsible-down overflow-hidden duration-300">
          <div className="border-edge space-y-4 border-t border-dashed p-4">
            <div className="space-y-2">
              {experience.descriptionList.length > 0 && (
                <ul className="flex list-disc flex-col gap-1.5 pl-5">
                  {experience.descriptionList.map((item, index) => (
                    <li key={index} className="text-muted-foreground">
                      <p className="text-primary text-sm">{item}</p>
                    </li>
                  ))}
                </ul>
              )}
            </div>
            <div className="space-y-2">
              <SkillBadgeList skills={experience.skills} />
            </div>
          </div>
        </CollapsibleContent>
      </div>
    </Collapsible>
  )
}

/* =========================================================================
   JOURNEY SECTION
   ========================================================================= */

export function Journey() {
  if (!JOURNEY.length) return null

  return (
    <section
      id="journey"
      aria-labelledby="journey-heading"
      className="w-full scroll-mt-16"
    >
      <HeaderTitle title="Journey" id="journey-heading" />
      <div className="p-3 sm:p-4">
        <ol className="flex flex-col gap-10 sm:gap-14">
          {JOURNEY.map((item, index) => (
            <JourneyItem
              key={item.id}
              item={item}
              isFirst={index === 0}
              isNewest={index === 0}
              isLast={index === JOURNEY.length - 1}
            />
          ))}
        </ol>
      </div>
    </section>
  )
}

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
      <div
        className="absolute top-0 bottom-0 left-0 flex w-5 sm:w-6 justify-center"
        aria-hidden="true"
      >
        <div
          className={cn(
            "bg-border/60 absolute w-[2px]",
            isFirst ? "top-3.5" : "top-0",
            !isLast ? "bottom-[-40px] sm:bottom-[-56px]" : "bottom-3.5"
          )}
        />
        <div
          className={cn(
            "absolute top-3.5 z-10 flex shrink-0 items-center justify-center rounded-full border-2 border-background shadow-xs transition-colors",
            isNewest
              ? "bg-foreground size-3.5 ring-4 ring-primary/20"
              : "bg-muted-foreground/80 size-3"
          )}
        />
      </div>

      <div className="grid grid-cols-1 items-start gap-6 md:grid-cols-2 md:gap-8">
        <div className="flex flex-col justify-center py-1">
          <div className="mb-3">
            <span className="inline-flex items-center rounded-full bg-secondary/80 px-3.5 py-1 text-xs font-medium text-secondary-foreground border border-border/40">
              <time dateTime={item.date}>{item.date}</time>
            </span>
          </div>
          <h3 className="text-foreground text-xl font-bold tracking-tight leading-snug sm:text-2xl mb-3">
            {item.title}
          </h3>
          <p className="text-muted-foreground text-sm leading-relaxed sm:text-base mb-4">
            {item.description}
          </p>
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

        <div className="relative w-full aspect-[16/10] sm:aspect-auto md:h-full min-h-[220px] sm:min-h-[260px] overflow-hidden rounded-2xl border border-border/40 bg-muted/30 group-hover/row:border-border/80 transition-colors select-none">
          {!hasImageError ? (
            fitMode === "contain" ? (
              <>
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

/* =========================================================================
   BLOGS SECTION
   ========================================================================= */

export function Blogs() {
  if (!BLOGS.length) return null

  return (
    <section id="blogs" className="w-full">
      <HeaderTitle title="Recent Posts" />
      <div className="flex w-full flex-col">
        {BLOGS.map((blog, index) => (
          <SingleBlog key={index} blog={blog} />
        ))}
      </div>
    </section>
  )
}

export function SingleBlog({ blog }: { blog: Blog }) {
  return (
    <Link
      href={blog.url}
      target="_blank"
      rel="noopener noreferrer"
      className="border-edge group w-full border-b-[1px] p-1 last:border-b-0 hover:cursor-pointer"
    >
      <div className="hover:bg-accent flex w-full flex-col gap-y-1 rounded-[10px] p-2">
        <div>
          <h3 className="text-primary/95 mb-1 text-sm leading-snug font-medium text-balance sm:text-base">
            {blog.title}
          </h3>
        </div>
        <div className="flex flex-row items-center justify-between pb-1">
          <div className="flex flex-row items-center">
            <CalendarIcon className="text-muted-foreground size-3 sm:size-4" />
            <span className="ml-2 text-[14px]">
              {formatMonthYear(blog.date)}
            </span>
          </div>
          <div>
            <ArrowRight className="text-muted-foreground size-3 -rotate-45 transition-all duration-300 group-hover:rotate-0 sm:size-4" />
          </div>
        </div>
        <div>
          <SkillBadgeList skills={blog.tags} />
        </div>
      </div>
    </Link>
  )
}

/* =========================================================================
   RE-EXPORT INTERACTIVE COMPONENTS
   ========================================================================= */

export * from "./interactive"
