import { SITE_INFO } from "@/data"
import { PROJECTS } from "@/data/projects"
import type { MetadataRoute } from "next"

export const dynamic = "force-static"

export default function sitemap(): MetadataRoute.Sitemap {
  const BASE_URL = SITE_INFO.url

  const primaryRoutes: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: "https://github.com/Aayush-Dubey123",
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: "https://www.linkedin.com/in/aayush-dubey-ab19a72b9/",
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
  ]

  const projectRoutes: MetadataRoute.Sitemap = PROJECTS.flatMap((project) => {
    const entries: MetadataRoute.Sitemap = []

    if (project.liveLink) {
      entries.push({
        url: project.liveLink,
        lastModified: new Date(),
        changeFrequency: "weekly",
        priority: 0.8,
      })
    }

    if (project.githubLink) {
      entries.push({
        url: project.githubLink,
        lastModified: new Date(),
        changeFrequency: "weekly",
        priority: 0.8,
      })
    }

    entries.push({
      url: `${BASE_URL}${project.href}`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.7,
      images: [`${BASE_URL}${project.image}`],
    })

    return entries
  })

  return [...primaryRoutes, ...projectRoutes]
}
