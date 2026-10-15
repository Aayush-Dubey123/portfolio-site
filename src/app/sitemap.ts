import { PROJECTS, SITE_INFO } from "@/data"
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
  ]

  const projectRoutes: MetadataRoute.Sitemap = PROJECTS.map((project) => ({
    url: `${BASE_URL}${project.href.startsWith("/") ? project.href : `/${project.href}`}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.8,
    images: project.image
      ? [`${BASE_URL}${project.image.startsWith("/") ? project.image : `/${project.image}`}`]
      : undefined,
  }))

  return [...primaryRoutes, ...projectRoutes]
}
