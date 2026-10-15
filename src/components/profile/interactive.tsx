"use client"

import { useState, useMemo, useRef, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion, AnimatePresence } from "motion/react"
import {
  ArrowRight,
  ArrowUp,
  ArrowUpRight,
  GitCommit,
  GithubIcon,
  LinkIcon,
  CheckCircle2,
  Loader2,
  Send,
  AlertCircle,
} from "lucide-react"
import { toast } from "sonner"
import { GITHUB_CONTRIBUTIONS, PROJECTS, type Project } from "@/data"
import { cn } from "@/lib/utils"
import {
  Button,
  CardDescription,
  HeaderTitle,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui"

/* =========================================================================
   PROJECT CARD FRAME
   ========================================================================= */

type ProjectCardFrameProps = {
  title: string
  image: string
  darkModeImage: string
  innerClassName?: string
  className?: string
}

export function ProjectCardFrame({
  title,
  image,
  darkModeImage,
  innerClassName,
  className,
}: ProjectCardFrameProps) {
  const isSameImage = !darkModeImage || image === darkModeImage

  return (
    <div
      className={cn(
        "bg-muted border-border relative aspect-video w-full overflow-hidden rounded-[6px] border select-none",
        "bg-[repeating-linear-gradient(315deg,var(--pattern-foreground)_0,var(--pattern-foreground)_1px,transparent_0,transparent_50%)] bg-size-[10px_10px] transition-all duration-300 [--pattern-foreground:var(--color-edge)]/0 group-hover:[--pattern-foreground:var(--color-border)]/90",
        className
      )}
    >
      <span className="text-muted-foreground absolute top-2 left-2 text-xs font-medium transition-all duration-300 group-hover:left-1/2 group-hover:-translate-x-1/2 sm:text-sm">
        {title}
      </span>
      <div
        className={cn(
          "bg-background absolute bottom-0 left-1/2 h-[80%] w-[80%] -translate-x-1/2 rounded-t-[6px] p-[2px] pb-0 transition-all duration-300 group-hover:h-[75%]",
          innerClassName
        )}
      >
        <div className="h-full w-full overflow-hidden rounded-t-[4px]">
          {isSameImage ? (
            <div className="h-full w-full">
              <Image
                src={image}
                alt={`${title} preview screenshot - Aayush Dubey`}
                loading="lazy"
                width={1000}
                height={1000}
                decoding="async"
                className="h-full w-full object-cover"
              />
            </div>
          ) : (
            <>
              <div className="hidden dark:block h-full w-full">
                <Image
                  alt={`${title} preview screenshot (dark mode) - Aayush Dubey`}
                  loading="lazy"
                  width={1000}
                  height={1000}
                  decoding="async"
                  className="h-full w-full object-cover"
                  src={darkModeImage}
                />
              </div>
              <div className="block dark:hidden h-full w-full">
                <Image
                  src={image}
                  alt={`${title} preview screenshot (light mode) - Aayush Dubey`}
                  loading="lazy"
                  width={1000}
                  height={1000}
                  decoding="async"
                  className="h-full w-full object-cover"
                />
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

/* =========================================================================
   PROJECTS SECTION
   ========================================================================= */

const INITIAL_FEATURED_COUNT = 2

export function Projects() {
  const [isExpanded, setIsExpanded] = useState(false)
  if (!PROJECTS.length) return null

  const featuredProjects = PROJECTS.slice(0, INITIAL_FEATURED_COUNT)
  const additionalProjects = PROJECTS.slice(INITIAL_FEATURED_COUNT)
  const hasMoreProjects = additionalProjects.length > 0

  return (
    <section id="projects" className="w-full scroll-mt-16">
      <HeaderTitle title="Projects" />
      <div className="grid grid-cols-1 gap-2 py-4 sm:grid-cols-2">
        {featuredProjects.map((project) => (
          <SingleProject key={project.title} project={project} />
        ))}
      </div>

      {hasMoreProjects && (
        <AnimatePresence initial={false}>
          {isExpanded && (
            <motion.div
              key="additional-projects"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="overflow-hidden"
            >
              <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 pb-2">
                {additionalProjects.map((project) => (
                  <SingleProject key={project.title} project={project} />
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      )}

      {hasMoreProjects && (
        <div className="flex justify-center pt-2 pb-6">
          <button
            type="button"
            onClick={() => setIsExpanded((prev) => !prev)}
            className="group inline-flex cursor-pointer items-center justify-center gap-2 rounded-full border border-border/80 bg-background/60 hover:bg-accent hover:border-foreground/30 px-5 py-2.5 text-sm font-medium text-foreground transition-all duration-200 shadow-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <span>{isExpanded ? "Show Less" : "View More Projects"}</span>
            {isExpanded ? (
              <ArrowUp className="size-4 transition-transform duration-200 group-hover:-translate-y-0.5" />
            ) : (
              <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-0.5" />
            )}
          </button>
        </div>
      )}
    </section>
  )
}

export function SingleProject({ project }: { project: Project }) {
  return (
    <div className="relative z-10 p-3">
      <div className="group flex w-full cursor-pointer flex-col gap-2">
        <Link
          href={project.href}
          className="border-border rounded-[10px] border p-[4px]"
        >
          <ProjectCardFrame
            title={project.title}
            image={project.image}
            darkModeImage={project.darkModeImage}
          />
        </Link>
        <div className="flex flex-col gap-1 px-2">
          <Link href={project.href}>
            <div className="flex items-center justify-between">
              <h3 className="text-primary text-base font-medium">
                {project.title}
              </h3>
              <ArrowRight className="text-muted-foreground size-4 -rotate-45 transition-all duration-300 group-hover:rotate-0" />
            </div>
          </Link>
          <CardDescription className="line-clamp-2 text-xs">
            {project.description}
          </CardDescription>
        </div>
        <div className="flex gap-x-2 px-2">
          {project.githubLink && (
            <Tooltip>
              <TooltipTrigger asChild>
                <a
                  href={project.githubLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-foreground"
                >
                  <GithubIcon className="size-4" />
                </a>
              </TooltipTrigger>
              <TooltipContent>View Code</TooltipContent>
            </Tooltip>
          )}
          {project.liveLink && (
            <Tooltip>
              <TooltipTrigger asChild>
                <a
                  href={project.liveLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-foreground"
                >
                  <LinkIcon className="size-4" />
                </a>
              </TooltipTrigger>
              <TooltipContent>Live Demo</TooltipContent>
            </Tooltip>
          )}
        </div>
      </div>
    </div>
  )
}

/* =========================================================================
   GITHUB CONTRIBUTIONS SECTION
   ========================================================================= */

const LEVEL_CLASSES = [
  "bg-muted/40 border border-border/40 hover:border-foreground/40",
  "bg-emerald-500/25 border border-emerald-500/35 hover:border-emerald-400",
  "bg-emerald-500/50 border border-emerald-500/55 hover:border-emerald-300",
  "bg-emerald-500/75 border border-emerald-400/75 hover:border-emerald-200",
  "bg-emerald-400 border border-emerald-300 hover:brightness-110",
]

function formatDate(dateStr: string): string {
  try {
    const [year, month, day] = dateStr.split("-").map(Number)
    const date = new Date(Date.UTC(year, month - 1, day))
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      timeZone: "UTC",
    })
  } catch {
    return dateStr
  }
}

export function GitHubContributions() {
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const data = GITHUB_CONTRIBUTIONS

  const displayWeeks = useMemo(() => {
    // Show active weeks from the current calendar year onwards, or trailing 38 weeks
    const activeWeeks = data.weeks.filter((week) =>
      week.days.some((d) => d.date >= "2026-01-01")
    )
    return activeWeeks.length > 0 ? activeWeeks : data.weeks.slice(-38)
  }, [data.weeks])

  const totalInPeriod = useMemo(() => {
    return displayWeeks.reduce(
      (sum, week) =>
        sum +
        week.days.reduce((dSum, d) => {
          return dSum + (d.count || 0)
        }, 0),
      0
    )
  }, [displayWeeks])

  const periodLabel = useMemo(() => {
    if (!displayWeeks.length) return ""
    const firstDay = displayWeeks[0]?.days.find((d) => Boolean(d.date))?.date
    const lastDay = displayWeeks[displayWeeks.length - 1]?.days.slice(-1)[0]?.date
    if (!firstDay || !lastDay) return ""
    const fMonth = new Date(firstDay + "T00:00:00Z").toLocaleDateString("en-US", { month: "short", timeZone: "UTC" })
    const lMonth = new Date(lastDay + "T00:00:00Z").toLocaleDateString("en-US", { month: "short", timeZone: "UTC" })
    return `${fMonth} – ${lMonth}`
  }, [displayWeeks])

  useEffect(() => {
    if (scrollContainerRef.current) {
      const el = scrollContainerRef.current
      if (el.scrollWidth > el.clientWidth) {
        el.scrollLeft = el.scrollWidth - el.clientWidth
      }
    }
  }, [displayWeeks])

  const monthLabels = useMemo(() => {
    const labels: (string | null)[] = []
    let lastMonth = ""

    displayWeeks.forEach((week) => {
      const validDay = week.days.find((d) => Boolean(d.date))
      if (!validDay) {
        labels.push(null)
        return
      }

      const monthName = new Date(validDay.date + "T00:00:00Z").toLocaleDateString(
        "en-US",
        { month: "short", timeZone: "UTC" }
      )

      if (monthName !== lastMonth) {
        labels.push(monthName)
        lastMonth = monthName
      } else {
        labels.push(null)
      }
    })

    return labels
  }, [displayWeeks])

  return (
    <section id="contributions" className="w-full scroll-mt-16">
      <HeaderTitle title="Contributions" />

      <div className="p-3 sm:p-4">
        <div className="border-border/70 bg-card/40 relative rounded-[10px] border p-4 sm:p-6 backdrop-blur-xs shadow-xs">
          <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-2">
              <div className="bg-primary/10 text-primary flex size-7 items-center justify-center rounded-md border border-primary/20">
                <GitCommit className="size-4" />
              </div>
              <div>
                <p className="text-sm font-semibold text-foreground">
                  <span className="text-primary font-bold">{totalInPeriod}</span> contributions{periodLabel ? ` (${periodLabel})` : ""}
                </p>
                <p className="text-xs text-muted-foreground">
                  Live activity synced daily via GitHub GraphQL
                </p>
              </div>
            </div>

            <a
              href={`https://github.com/${data.username}`}
              target="_blank"
              rel="noopener noreferrer"
              className="group/gh inline-flex items-center gap-1.5 self-start sm:self-auto text-xs font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              <span>@{data.username}</span>
              <ArrowUpRight className="size-3.5 transition-transform duration-200 group-hover/gh:translate-x-0.5 group-hover/gh:-translate-y-0.5" />
            </a>
          </div>

          <TooltipProvider delayDuration={50}>
            <div
              ref={scrollContainerRef}
              className="w-full overflow-x-auto pb-3 pt-1 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-border/60"
            >
              <div className="flex w-full justify-center min-w-fit">
                <div className="flex flex-col gap-1 select-none">
                  <div className="flex gap-[3px] pl-6 sm:pl-7 text-[11px] font-medium text-muted-foreground h-4">
                    {displayWeeks.map((_, weekIdx) => {
                      const label = monthLabels[weekIdx]
                      return (
                        <div key={weekIdx} className="w-[11px] sm:w-[12px] relative shrink-0">
                          {label && (
                            <span className="absolute left-0 top-0 whitespace-nowrap">
                              {label}
                            </span>
                          )}
                        </div>
                      )
                    })}
                  </div>

                  <div className="flex gap-2 items-start">
                    <div className="flex flex-col gap-[3px] text-[10px] text-muted-foreground/75 font-medium shrink-0 w-4 sm:w-5 justify-between py-[1px]">
                      <span className="h-[11px] sm:h-[12px] opacity-0 select-none">S</span>
                      <span className="h-[11px] sm:h-[12px] leading-tight">Mon</span>
                      <span className="h-[11px] sm:h-[12px] opacity-0 select-none">T</span>
                      <span className="h-[11px] sm:h-[12px] leading-tight">Wed</span>
                      <span className="h-[11px] sm:h-[12px] opacity-0 select-none">T</span>
                      <span className="h-[11px] sm:h-[12px] leading-tight">Fri</span>
                      <span className="h-[11px] sm:h-[12px] opacity-0 select-none">S</span>
                    </div>

                    <div className="flex gap-[3px] shrink-0">
                      {displayWeeks.map((week, weekIdx) => (
                        <div key={weekIdx} className="flex flex-col gap-[3px]">
                          {[0, 1, 2, 3, 4, 5, 6].map((dayOfWeek) => {
                            const day = week.days.find((d) => d.weekday === dayOfWeek)

                            if (!day) {
                              return (
                                <div
                                  key={dayOfWeek}
                                  className="size-[11px] sm:size-[12px] opacity-0"
                                  aria-hidden="true"
                                />
                              )
                            }

                            const formattedDate = formatDate(day.date)
                            const tooltipText =
                              day.count === 0
                                ? `No contributions on ${formattedDate}`
                                : `${day.count} contribution${day.count === 1 ? "" : "s"} on ${formattedDate}`

                            return (
                              <Tooltip key={day.date}>
                                <TooltipTrigger asChild>
                                  <div
                                    tabIndex={0}
                                    className={cn(
                                      "size-[11px] sm:size-[12px] rounded-[2px] transition-all duration-150 cursor-pointer focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring",
                                      LEVEL_CLASSES[day.level] ?? LEVEL_CLASSES[0]
                                    )}
                                    aria-label={tooltipText}
                                  />
                                </TooltipTrigger>
                                <TooltipContent
                                  side="top"
                                  className="bg-popover text-popover-foreground border border-border shadow-md px-2.5 py-1 text-xs"
                                >
                                  {tooltipText}
                                </TooltipContent>
                              </Tooltip>
                            )
                          })}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </TooltipProvider>

          <div className="mt-3 pt-3 border-t border-border/40 flex flex-wrap items-center justify-between gap-3 text-xs text-muted-foreground">
            <span className="text-[11px]">
              {data.updatedAt ? `Last updated: ${formatDate(data.updatedAt.split("T")[0])}` : "Daily automated sync"}
            </span>

            <div className="flex items-center gap-1.5 text-[11px]">
              <span>Less</span>
              <div className="flex items-center gap-1">
                {LEVEL_CLASSES.map((cls, idx) => (
                  <div
                    key={idx}
                    className={cn("size-[10px] rounded-[2px]", cls)}
                    aria-label={`Level ${idx}`}
                  />
                ))}
              </div>
              <span>More</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

/* =========================================================================
   CONNECT FORM SECTION
   ========================================================================= */

const QUICK_INTERESTS = [
  "Full-Stack Collaboration",
  "Cloud & DevOps Architecture",
  "AI & MCP Systems",
  "Software Engineering Opportunity",
]

export function Connect() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [interest, setInterest] = useState("")
  const [message, setMessage] = useState("")
  const [honeypot, setHoneypot] = useState("")
  const [formStartedAt, setFormStartedAt] = useState<number>(0)

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  useEffect(() => {
    setFormStartedAt(Date.now())
  }, [])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setErrorMessage(null)

    const trimmedName = name.trim()
    const trimmedInterest = interest.trim()
    const trimmedMessage = message.trim()
    const trimmedEmail = email.trim()

    if (!trimmedName) {
      setErrorMessage("Please enter your name.")
      return
    }

    if (!trimmedInterest) {
      setErrorMessage("Please share what interested you or what you'd like to discuss.")
      return
    }

    if (!trimmedMessage || trimmedMessage.length < 5) {
      setErrorMessage("Please enter a message with at least 5 characters.")
      return
    }

    if (trimmedEmail && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
      setErrorMessage("Please enter a valid email address.")
      return
    }

    setIsSubmitting(true)

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: trimmedName,
          email: trimmedEmail,
          interest: trimmedInterest,
          message: trimmedMessage,
          website_hp: honeypot,
          formStartedAt,
        }),
      })

      const result = await response.json().catch(() => null)

      if (!response.ok || !result?.success) {
        const errorText =
          result?.error || "Failed to send message. Please try again or reach out via Gmail."
        setErrorMessage(errorText)
        toast.error(errorText)
        return
      }

      setIsSuccess(true)
      setName("")
      setEmail("")
      setInterest("")
      setMessage("")
      toast.success("Message sent! I'll get back to you soon.")
    } catch (err) {
      console.error("Submission error:", err)
      const fallbackErr = "Network error. Please try again or reach out directly via Gmail."
      setErrorMessage(fallbackErr)
      toast.error(fallbackErr)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleReset = () => {
    setIsSuccess(false)
    setErrorMessage(null)
    setFormStartedAt(Date.now())
  }

  return (
    <section id="connect" className="w-full scroll-mt-16">
      <HeaderTitle title="Let’s Connect" id="connect-heading" />
      <div className="p-3 sm:p-5">
        <div className="mb-4">
          <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
            Have a project in mind, an opportunity, or a shared interest in cloud architecture, full-stack systems, or AI tooling? Send a direct message below.
          </p>
        </div>

        {isSuccess ? (
          <div className="border-edge bg-muted/40 rounded-lg border p-5 sm:p-6 text-center space-y-3 transition-all">
            <div className="mx-auto flex size-10 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-500 dark:bg-emerald-500/20">
              <CheckCircle2 className="size-6" />
            </div>
            <h3 className="text-primary font-semibold text-base sm:text-lg">
              Message Delivered!
            </h3>
            <p className="text-muted-foreground text-sm max-w-md mx-auto">
              Thank you for reaching out. Your note has been received and routed to{" "}
              <span className="font-mono text-xs text-primary">aayushdubey2300@gmail.com</span>. I&apos;ll get back to you promptly.
            </p>
            <div className="pt-2">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={handleReset}
                className="text-xs"
              >
                Send Another Message
              </Button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="hidden" aria-hidden="true">
              <label htmlFor="website_hp">Leave this empty</label>
              <input
                id="website_hp"
                type="text"
                name="website_hp"
                tabIndex={-1}
                autoComplete="off"
                value={honeypot}
                onChange={(e) => setHoneypot(e.target.value)}
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              <div className="space-y-1.5">
                <label
                  htmlFor="contact-name"
                  className="text-primary text-xs font-medium uppercase tracking-wider block"
                >
                  Name <span className="text-destructive">*</span>
                </label>
                <input
                  id="contact-name"
                  type="text"
                  required
                  disabled={isSubmitting}
                  placeholder="Your Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="border-edge bg-background/50 focus:border-ring focus:ring-ring/20 text-primary placeholder:text-muted-foreground/60 w-full rounded-md border px-3 py-2 text-sm transition-colors focus:ring-2 focus:outline-none disabled:opacity-50"
                />
              </div>

              <div className="space-y-1.5">
                <label
                  htmlFor="contact-email"
                  className="text-primary text-xs font-medium uppercase tracking-wider block"
                >
                  Email <span className="text-muted-foreground text-[11px] font-normal lowercase">(for reply)</span>
                </label>
                <input
                  id="contact-email"
                  type="email"
                  disabled={isSubmitting}
                  placeholder="your.email@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="border-edge bg-background/50 focus:border-ring focus:ring-ring/20 text-primary placeholder:text-muted-foreground/60 w-full rounded-md border px-3 py-2 text-sm transition-colors focus:ring-2 focus:outline-none disabled:opacity-50"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label
                htmlFor="contact-interest"
                className="text-primary text-xs font-medium uppercase tracking-wider block"
              >
                Interest / What Interested You <span className="text-destructive">*</span>
              </label>
              <input
                id="contact-interest"
                type="text"
                required
                disabled={isSubmitting}
                placeholder="e.g. Full-Stack Project, AI Systems & MCP, Job Opportunity, Collaboration..."
                value={interest}
                onChange={(e) => setInterest(e.target.value)}
                className="border-edge bg-background/50 focus:border-ring focus:ring-ring/20 text-primary placeholder:text-muted-foreground/60 w-full rounded-md border px-3 py-2 text-sm transition-colors focus:ring-2 focus:outline-none disabled:opacity-50"
              />

              <div className="flex flex-wrap items-center gap-1.5 pt-1">
                <span className="text-muted-foreground text-[11px]">Quick fill:</span>
                {QUICK_INTERESTS.map((item) => (
                  <button
                    key={item}
                    type="button"
                    disabled={isSubmitting}
                    onClick={() => setInterest(item)}
                    className="border-edge hover:border-foreground/30 hover:bg-accent/60 text-muted-foreground hover:text-primary rounded-full border border-dashed px-2 py-0.5 text-[11px] transition-colors"
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-1.5">
              <label
                htmlFor="contact-message"
                className="text-primary text-xs font-medium uppercase tracking-wider block"
              >
                Message <span className="text-destructive">*</span>
              </label>
              <textarea
                id="contact-message"
                required
                rows={4}
                disabled={isSubmitting}
                placeholder="Tell me about what you're working on, questions, or how we could work together..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="border-edge bg-background/50 focus:border-ring focus:ring-ring/20 text-primary placeholder:text-muted-foreground/60 w-full resize-y rounded-md border px-3 py-2 text-sm transition-colors focus:ring-2 focus:outline-none disabled:opacity-50"
              />
            </div>

            {errorMessage && (
              <div className="flex items-center gap-2 rounded-md border border-destructive/30 bg-destructive/10 p-2.5 text-xs text-destructive">
                <AlertCircle className="size-4 shrink-0" />
                <span>{errorMessage}</span>
              </div>
            )}

            <div className="flex items-center justify-between pt-1">
              <span className="text-muted-foreground font-mono text-[11px]">
                Deliveries routed to aayushdubey2300@gmail.com
              </span>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="cursor-pointer gap-2 font-medium"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="size-4 animate-spin" />
                    <span>Sending...</span>
                  </>
                ) : (
                  <>
                    <span>Send Message</span>
                    <Send className="size-3.5" />
                  </>
                )}
              </Button>
            </div>
          </form>
        )}
      </div>
    </section>
  )
}
