export type Project = {
  title: string
  href: string
  description: string
  image: string
  darkModeImage: string
  githubLink: string
  liveLink: string
  skills: string[]
  descriptionList: string[]
}

export const PROJECTS: Project[] = [
  {
    title: "Warehouse Management System",
    href: "/projects/warehouse-management-system",
    description:
      "End-to-end warehouse platform spanning 5+ core workflows—inventory, orders, receiving, picking, and dispatch—with dedicated role-based access and AI/MCP integration.",
    image: "/assets/dsamrr-light.png",
    darkModeImage: "/assets/dsamrr-dark.png",
    githubLink: "https://github.com/Aayush-Dubey123/warehouse-management-system",
    liveLink: "https://warehouse-management-system.vercel.app",
    skills: [
      "FastAPI",
      "MongoDB",
      "React",
      "Vite",
      "Python",
      "Vercel",
      "Render",
      "MCP Tooling",
    ],
    descriptionList: [
      "Role-Specific Access & 5+ Core Workflows: Unified warehouse operations covering inventory control, order processing, goods receiving, picking, and dispatch",
      "AI & MCP Tooling Integration: Integrated 10+ endpoints with database and AI/MCP interfaces to query live operations, surface insights, and automate routine warehouse actions",
      "Deployed & Scalable Infrastructure: Full-stack application featuring 3 dedicated workspaces, secure authentication, analytics, and responsive interfaces deployed on Vercel & Render",
    ],
  },
  {
    title: "Hospital Management System",
    href: "/projects/hospital-management-system",
    description:
      "AI-assisted hospital readiness and appointment platform featuring conversational booking, Telegram MCP integration, and CLI readiness diagnostics.",
    image: "/assets/domainyourlink-light.png",
    darkModeImage: "/assets/domainyourlink-dark.png",
    githubLink: "https://github.com/Aayush-Dubey123/hospital-management-system",
    liveLink: "https://hospital-management-system.vercel.app",
    skills: [
      "FastAPI",
      "PostgreSQL",
      "React",
      "Vite",
      "Python",
      "Telegram MCP",
      "CLI Tools",
    ],
    descriptionList: [
      "Conversational AI Booking Workflow: Single conversational interface reducing manual appointment-booking steps by ~40% through automated assistance",
      "Telegram MCP Integration: Connected MCP to Telegram across 5 hospital workflows, enabling patients to access booking and hospital services directly via chat",
      "CLI Operational Readiness System: Built a CLI-based diagnostic tool for hospital owners to execute preparedness checks and operational verifications",
    ],
  },
  {
    title: "CryoW3times",
    href: "/projects/cryow3times",
    description:
      "Real-time cryptocurrency news aggregator with automated API pipelines, Next.js API Routes, MongoDB, Prisma ORM, and secure authentication.",
    image: "/assets/callverse-light.png",
    darkModeImage: "/assets/callverse-dark.png",
    githubLink: "https://github.com/Aayush-Dubey123/CryoW3times",
    liveLink: "https://cryow3times.vercel.app",
    skills: [
      "Next.js",
      "MongoDB",
      "React",
      "TypeScript",
      "Prisma",
      "NextAuth.js",
      "Tailwind CSS",
    ],
    descriptionList: [
      "API-Driven Ingestion Pipeline: Real-time crypto news aggregator ingesting external market data streams and persisting structured data to MongoDB via Prisma",
      "Controlled Content Publishing: Automated news processing and user-facing content distribution with high performance API routes",
      "Secure Session & Role Management: Integrated NextAuth for developer authentication, session control, and publishing workflows",
    ],
  },
  {
    title: "Golden-Kulcha Food & Inventory System",
    href: "/projects/food-ordering-system",
    description:
      "Full-stack food ordering platform covering browsing, order placement, order tracking, customer feedback workflows, and inventory-sales integration.",
    image: "/assets/aurafit-light.png",
    darkModeImage: "/assets/aurafit-dark.png",
    githubLink: "https://github.com/Aayush-Dubey123/food-ordering-system",
    liveLink: "https://golden-kulcha.vercel.app",
    skills: [
      "React",
      "FastAPI",
      "PostgreSQL",
      "Tailwind CSS",
      "REST API",
      "Python",
    ],
    descriptionList: [
      "3 Core Ordering Workflows: Seamless customer ordering experience covering digital menu browsing, real-time order placement, and live order status tracking",
      "Automated Customer Feedback Loop: Direct channel linking customer submissions to admin reviews, reducing manual operational follow-ups",
      "Unified Inventory & Billing Synchronization: Linked inventory movement with sales transactions and billing records for end-to-end operational visibility",
    ],
  },
]



