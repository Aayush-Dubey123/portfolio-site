import { ProjectCardFrame, Separator } from "@/components/profile"
import { BackButton, ContainerWrapper } from "@/components/site"
import { Card, SkillBadgeList } from "@/components/ui"
import { PROJECTS, SITE_INFO } from "@/data"
import { cn } from "@/lib/utils"
import { ArrowRight, ArrowUpRight, GithubIcon, LinkIcon } from "lucide-react"
import type { Metadata } from "next"
import Link from "next/link"

export function generateStaticParams() {
  return PROJECTS.map((project) => ({
    href: project.href.replace(/^\/projects\//, ""),
  }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ href: string }>
}): Promise<Metadata> {
  const resolvedParams = await params
  const href = resolvedParams?.href || "warehouse-management-system"
  const project = PROJECTS.find((project) => project.href.endsWith(href))
  if (!project) {
    return {
      title: "Project Not Found",
      description: "The requested project could not be found.",
    }
  }

  const title = `${project.title} | Aayush Dubey`
  const description = `${project.title} — ${project.description}`
  const canonicalUrl = `${SITE_INFO.url}${project.href}`

  return {
    title: project.title,
    description,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      type: "article",
      images: [
        {
          url: project.image,
          width: 1200,
          height: 630,
          alt: `${project.title} - Project by Aayush Dubey`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [project.image],
    },
  }
}

const ProjectPage = async ({
  params,
}: {
  params: Promise<{ href: string }>
}) => {
  const href = (await params)?.href || "warehouse-management-system"
  const project = PROJECTS.find((project) => project.href.endsWith(href))
  if (!project) {
    return (
      <ContainerWrapper>
        <Separator />
        <BackButton title="Projects" href="/" />
        <Separator />
        <div className="flex items-center justify-center">
          <p className="text-muted-foreground">Project not found</p>
        </div>
      </ContainerWrapper>
    )
  }
  const links = [
    {
      name: "GitHub",
      description: "View on GitHub",
      href: project.githubLink,
      icon: <GithubIcon />,
    },
    {
      name: "Live",
      description: "View Live",
      href: project.liveLink,
      icon: <LinkIcon />,
    },
  ].filter((item) => Boolean(item.href))

  const canonicalUrl = `${SITE_INFO.url}${project.href}`
  const projectStructuredData = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: project.title,
    description: project.description,
    url: project.liveLink || canonicalUrl,
    applicationCategory: "WebApplication",
    operatingSystem: "All",
    author: {
      "@type": "Person",
      name: "Aayush Dubey",
      url: SITE_INFO.url,
      sameAs: [
        "https://www.linkedin.com/in/aayush-dubey-ab19a72b9/",
        "https://github.com/Aayush-Dubey123",
      ],
    },
    ...(project.githubLink ? { codeRepository: project.githubLink } : {}),
    ...(project.liveLink ? { installUrl: project.liveLink } : {}),
    image: `${SITE_INFO.url}${project.image}`,
  }

  return (
    <ContainerWrapper>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(projectStructuredData),
        }}
      />
      <Separator />
      <BackButton title="Projects" href="/" />
      <Separator />
      <div className="p-2 md:p-4">
        <Card className={cn("group p-2")}>
          <ProjectCardFrame
            title={project.title}
            image={project.image}
            darkModeImage={project.darkModeImage}
            innerClassName="w-[90%] sm:h-[90%] group-hover:h-[85%]"
          />
        </Card>
      </div>
      {/* Links Section */}
      <div className="flex w-full gap-x-4 p-2 md:p-4">
        {links.map((item) => {
          return (
            <a
              key={item.name}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              className="border-edge group relative flex w-1/2 cursor-pointer flex-row rounded-sm border-[1px] border-dashed"
            >
              <div
                key={item.name}
                className="flex w-full items-center gap-x-2 p-2"
              >
                <div className="flex h-full items-center justify-center overflow-hidden md:size-10">
                  {item.icon}
                </div>
                <div className="border-edge h-[80%] border-r-[1px] border-dashed" />
                <div className="flex-1">
                  <h3 className="text-primary text-[14px] font-medium">
                    {item.name}
                  </h3>
                  <p className="text-muted-foreground hidden text-sm sm:block">
                    {item.description}
                  </p>
                </div>
                <div className="opacity-0 transition-all delay-50 group-hover:opacity-100">
                  <ArrowUpRight className="text-primary h-4 w-4 text-xl" />
                </div>
              </div>
            </a>
          )
        })}
      </div>
      <Separator />
      {/* Bottom Section */}
      <div className="flex flex-col gap-2 p-2 sm:p-4">
        <h1 className="text-primary/90 text-base font-bold sm:text-xl md:text-2xl">
          {project.title}
        </h1>
        <p className="text-primary/90 font-mono text-xs sm:text-sm">
          {project.description}
        </p>
        <div className="space-y-2">
          {project.descriptionList.length > 0 && (
            <ul className="flex list-disc flex-col gap-1.5 pl-5">
              {project.descriptionList.map((item, index) => (
                <li key={index} className="text-muted-foreground">
                  <p className="text-primary text-sm">{item}</p>
                </li>
              ))}
            </ul>
          )}
        </div>
        <SkillBadgeList skills={project.skills} />
      </div>
      <Separator />
      {/* Internal linking: Other Projects by Aayush Dubey */}
      <div className="flex flex-col gap-3 p-2 sm:p-4">
        <h2 className="text-primary/90 text-sm font-semibold tracking-wide uppercase">
          More Projects by Aayush Dubey
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
          {PROJECTS.filter((p) => !p.href.endsWith(href))
            .slice(0, 3)
            .map((p) => (
              <Link
                key={p.href}
                href={p.href}
                className="border-edge group flex flex-col justify-between rounded-md border-[1px] border-dashed p-3 transition-colors hover:border-foreground/30 hover:bg-accent/40"
              >
                <div>
                  <p className="text-foreground text-sm font-medium group-hover:text-primary transition-colors">
                    {p.title}
                  </p>
                  <p className="text-muted-foreground line-clamp-2 text-xs mt-1">
                    {p.description}
                  </p>
                </div>
                <div className="flex items-center gap-1 text-xs text-muted-foreground mt-3 group-hover:text-foreground">
                  <span>Explore project</span>
                  <ArrowRight className="size-3 transition-transform duration-200 group-hover:translate-x-0.5" />
                </div>
              </Link>
            ))}
        </div>
      </div>
      <Separator />
    </ContainerWrapper>
  )
}

export default ProjectPage
