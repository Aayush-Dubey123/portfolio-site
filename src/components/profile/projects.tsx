"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "motion/react"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import type { Project } from "@/data/projects"
import { PROJECTS } from "@/data/projects"
import { cn } from "@/lib/utils"

import { ArrowRight, ArrowUp, GithubIcon, LinkIcon } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { CardDescription } from "../ui/card"
import { HeaderTitle } from "./header-title"

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
      {/* Link */}
      <div className="group flex w-full cursor-pointer flex-col gap-2">
        <Link
          href={project.href}
          className="border-border rounded-[10px] border p-[4px]"
        >
          <div
            className={cn(
              "bg-muted border-border relative aspect-video w-full overflow-hidden rounded-[6px] border select-none",
              "bg-[repeating-linear-gradient(315deg,var(--pattern-foreground)_0,var(--pattern-foreground)_1px,transparent_0,transparent_50%)] bg-size-[10px_10px] transition-all duration-300 [--pattern-foreground:var(--color-edge)]/0 group-hover:[--pattern-foreground:var(--color-border)]/90"
            )}
          >
            <span className="text-muted-foreground absolute top-2 left-2 text-xs font-medium transition-all duration-300 group-hover:left-1/2 group-hover:-translate-x-1/2">
              {project.title}
            </span>
            <div className="bg-background absolute bottom-0 left-1/2 h-[80%] w-[80%] -translate-x-1/2 rounded-t-[6px] p-[2px] pb-0 transition-all duration-300 group-hover:h-[75%]">
              <div className="h-full w-full overflow-hidden rounded-t-[4px]">
                <div className="hidden dark:block">
                  <Image
                    alt={`${project.title} preview screenshot (dark mode) - Aayush Dubey`}
                    loading="lazy"
                    width="1000"
                    height="1000"
                    decoding="async"
                    data-nimg="1"
                    className="h-full w-full object-cover"
                    src={project.darkModeImage}
                  />
                </div>
                <div className="block dark:hidden">
                  <Image
                    src={project.image}
                    alt={`${project.title} preview screenshot (light mode) - Aayush Dubey`}
                    loading="lazy"
                    width="1000"
                    height="1000"
                    decoding="async"
                    data-nimg="1"
                    className="h-full w-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </Link>
        <div className="flex flex-col gap-1 px-2">
          <Link href={project.href}>
            <div className="flex items-center justify-between">
              <h3 className="text-primary/95 mb-1 text-sm leading-snug font-medium text-balance sm:text-base">
                {project.title}
              </h3>
            </div>
            <CardDescription className="text-muted-foreground min-h-[40px] text-sm">
              {project.description}
            </CardDescription>
          </Link>

          <div className="flex items-center justify-between gap-1 py-1 select-none">
            <div className="flex gap-x-2">
              {project.liveLink && (
                <Tooltip>
                  <TooltipTrigger asChild>
                    <a
                      className="text-muted-foreground hover:text-foreground flex size-6 shrink-0 items-center justify-center"
                      href={project.liveLink}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <LinkIcon className="pointer-events-none size-4" />
                      <span className="sr-only">Open Project Link</span>
                    </a>
                  </TooltipTrigger>
                  <TooltipContent>Open Project Link</TooltipContent>
                </Tooltip>
              )}

              {project.githubLink && (
                <Tooltip>
                  <TooltipTrigger asChild>
                    <a
                      className="text-muted-foreground hover:text-foreground flex size-6 shrink-0 items-center justify-center"
                      href={project.githubLink}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <GithubIcon className="ring-muted-foreground pointer-events-none size-4" />
                      <span className="sr-only">Open GitHub Link</span>
                    </a>
                  </TooltipTrigger>
                  <TooltipContent>Open GitHub Link</TooltipContent>
                </Tooltip>
              )}
            </div>
            <Link href={project.href} className="flex">
              <p className="text-foreground text-xs transition-colors duration-300">
                View Project
              </p>
              <ArrowRight className="text-foreground ml-1 size-3 -rotate-45 transition-all duration-300 group-hover:rotate-0 sm:size-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

