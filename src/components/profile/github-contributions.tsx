"use client"

import { useMemo, useRef, useEffect } from "react"
import { ArrowUpRight, GitCommit } from "lucide-react"
import { HeaderTitle } from "./header-title"
import { GITHUB_CONTRIBUTIONS } from "@/data/github-contributions"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { cn } from "@/lib/utils"

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

  // Filter weeks to strictly display February 2026 through October 2026
  const displayWeeks = useMemo(() => {
    return data.weeks.filter((week) =>
      week.days.some((d) => d.date >= "2026-02-01" && d.date <= "2026-10-31") &&
      !week.days.some((d) => d.date < "2026-01-01")
    )
  }, [data.weeks])

  // Total contributions within the February - October period
  const totalInPeriod = useMemo(() => {
    return displayWeeks.reduce(
      (sum, week) =>
        sum +
        week.days.reduce((dSum, d) => {
          return d.date >= "2026-02-01" && d.date <= "2026-10-31"
            ? dSum + (d.count || 0)
            : dSum
        }, 0),
      0
    )
  }, [displayWeeks])

  // Scroll to current date (end of scrollbar) on small screens if overflowing
  useEffect(() => {
    if (scrollContainerRef.current) {
      const el = scrollContainerRef.current
      if (el.scrollWidth > el.clientWidth) {
        el.scrollLeft = el.scrollWidth - el.clientWidth
      }
    }
  }, [displayWeeks])

  // Process weeks to compute month labels
  const monthLabels = useMemo(() => {
    const labels: (string | null)[] = []
    let lastMonth = ""

    displayWeeks.forEach((week) => {
      const validDay = week.days.find((d) => d.date >= "2026-02-01")
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
          {/* Top Info Bar */}
          <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-2">
              <div className="bg-primary/10 text-primary flex size-7 items-center justify-center rounded-md border border-primary/20">
                <GitCommit className="size-4" />
              </div>
              <div>
                <p className="text-sm font-semibold text-foreground">
                  <span className="text-primary font-bold">{totalInPeriod}</span> contributions (Feb – Oct)
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

          {/* Calendar Grid Container with horizontal scroll and center alignment */}
          <TooltipProvider delayDuration={50}>
            <div
              ref={scrollContainerRef}
              className="w-full overflow-x-auto pb-3 pt-1 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-border/60"
            >
              <div className="flex w-full justify-center min-w-fit">
                <div className="flex flex-col gap-1 select-none">
                {/* Month labels row */}
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

                {/* Day rows with day-of-week labels on left */}
                <div className="flex gap-2 items-start">
                  {/* Day labels column */}
                  <div className="flex flex-col gap-[3px] text-[10px] text-muted-foreground/75 font-medium shrink-0 w-4 sm:w-5 justify-between py-[1px]">
                    <span className="h-[11px] sm:h-[12px] opacity-0 select-none">S</span>
                    <span className="h-[11px] sm:h-[12px] leading-tight">Mon</span>
                    <span className="h-[11px] sm:h-[12px] opacity-0 select-none">T</span>
                    <span className="h-[11px] sm:h-[12px] leading-tight">Wed</span>
                    <span className="h-[11px] sm:h-[12px] opacity-0 select-none">T</span>
                    <span className="h-[11px] sm:h-[12px] leading-tight">Fri</span>
                    <span className="h-[11px] sm:h-[12px] opacity-0 select-none">S</span>
                  </div>

                  {/* Week Columns */}
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

          {/* Bottom Footer Legend */}
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
