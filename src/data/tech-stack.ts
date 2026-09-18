export type TechStack = {
  key: string
  title: string
  theme?: boolean
  category?: string
  ext?: string
  image?: string
}

export const TECH_STACK: TechStack[] = [
  // Languages & Core
  { key: "python", title: "Python", category: "Languages" },
  { key: "typescript", title: "TypeScript", category: "Languages" },
  { key: "cpp", title: "C / C++", category: "Languages" },
  { key: "html", title: "HTML5", category: "Languages" },
  { key: "css", title: "CSS3", category: "Languages" },

  // Web Frameworks & APIs
  { key: "react", title: "React", category: "Web & Frameworks" },
  { key: "nextjs2", title: "Next.js", theme: true, category: "Web & Frameworks" },
  { key: "fastapi", title: "FastAPI", category: "Web & Frameworks" },
  { key: "vite", title: "Vite", category: "Web & Frameworks" },

  // Databases & Cloud
  { key: "postgresql", title: "PostgreSQL", category: "Databases & Cloud" },
  { key: "mongodb", title: "MongoDB", category: "Databases & Cloud" },
  { key: "docker", title: "Docker", category: "Databases & Cloud" },
  { key: "aws", title: "AWS", category: "Databases & Cloud" },

  // DevOps & Platforms
  { key: "git", title: "Git & GitHub", category: "DevOps & Platforms" },
  { key: "vercel", title: "Vercel", category: "DevOps & Platforms" },
  { key: "render", title: "Render", category: "DevOps & Platforms" },

  // Tools & Analytics
  { key: "powerbi", title: "Power BI", category: "Tools & Analytics" },
  { key: "excel", title: "Microsoft Excel", category: "Tools & Analytics" },
]



