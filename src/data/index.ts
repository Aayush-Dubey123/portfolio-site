import contributionsData from "./github-contributions.json"

/* =========================================================================
   USER & SITE INFO
   ========================================================================= */

export const USER = {
  name: "AAYUSH DUBEY",
  email: "aayushdubey2300@gmail.com",
  avatar: "/assets/profile-aavatar.jpg",
  firstName: "Aayush",
  lastName: "Dubey",
  fullName: "Aayush Chandrashekhar Dubey",
  username: "Aayush-Dubey123",
  gender: "Male",
  socials: [
    {
      name: "Gmail",
      href: "mailto:aayushdubey2300@gmail.com",
      icon: "/assets/gmail.webp",
      username: "aayushdubey2300@gmail.com",
    },
    {
      name: "Github",
      href: "https://github.com/Aayush-Dubey123",
      icon: "/assets/github.webp",
      username: "@Aayush-Dubey123",
    },
    {
      name: "LinkedIn",
      href: "https://www.linkedin.com/in/aayush-dubey-ab19a72b9/",
      icon: "/assets/linkedin.webp",
      username: "aayush-dubey-ab19a72b9",
    },
  ],
}

export const SITE_INFO = {
  siteName: "Aayush Dubey | Software & Systems Engineer",
  url: "https://ayushdubey.studio",
  name: "Aayush Chandrashekhar Dubey",
  description:
    "Official portfolio of Aayush Dubey (Aayush Chandrashekhar Dubey) — Software & Systems Engineer specializing in full-stack web development, cloud computing, and AI systems.",
  ogImage: "/og",
  keywords: [
    "Aayush Dubey",
    "Aayush Chandrashekhar Dubey",
    "Ayush Dubey",
    "Aayush Dubey Portfolio",
    "Software & Systems Engineer",
    "Web Developer",
    "Cloud Computing",
    "FastAPI",
    "React",
    "Next.js",
    "Python",
    "PostgreSQL",
    "MongoDB",
    "Docker",
    "AWS",
    "AI Systems",
    "MCP Integration",
  ],
  authors: [
    {
      name: USER.name,
      url: "https://ayushdubey.studio",
    },
  ],
}

export const TEXT_TO_ANIMATE = [
  "Building practical full-stack & cloud systems",
  "AI-Assisted Workflows & MCP Tools",
  "Web Development · Cloud · AI Systems",
  "CSBS @ St. Vincent Pallotti College, Nagpur",
]

export const NAV_ITEMS = [
  { name: "About", href: "/#about" },
  { name: "Projects", href: "/#projects" },
  { name: "Experience", href: "/#experience" },
  { name: "Journey", href: "/#journey" },
  { name: "Tech Stack", href: "/#tech-stack" },
  { name: "Connect", href: "/#connect" },
]

/* =========================================================================
   TECH STACK
   ========================================================================= */

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

/* =========================================================================
   BLOGS
   ========================================================================= */

export type Blog = {
  title: string
  url: string
  image: string
  date: Date
  tags: string[]
}

export const BLOGS: Blog[] = []

/* =========================================================================
   PROJECTS
   ========================================================================= */

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
    image: "/assets/wms.png",
    darkModeImage: "/assets/wms.png",
    githubLink: "https://github.com/Aayush-Dubey123/WMS",
    liveLink: "https://wms-indol-six.vercel.app",
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
    image: "/assets/hospital-system.png",
    darkModeImage: "/assets/hospital-system.png",
    githubLink: "https://github.com/Aayush-Dubey123/booking-system---hospital",
    liveLink: "https://booking-system-hospital.vercel.app",
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
    image: "/assets/cryowtimes.png",
    darkModeImage: "/assets/cryowtimes.png",
    githubLink: "https://github.com/Aayush-Dubey123/CryoW3TimeS",
    liveLink: "https://cryo-w3-time-s.vercel.app/",
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
    image: "/assets/golden.png",
    darkModeImage: "/assets/golden.png",
    githubLink: "https://github.com/Aayush-Dubey123/golden",
    liveLink: "https://golden-gold-zeta.vercel.app/",
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

/* =========================================================================
   EXPERIENCE
   ========================================================================= */

export type Experience = {
  company: string
  title: string
  type: "Full-time" | "Internship"
  logo: string | null
  from: Date
  to: Date | null
  descriptionList: string[]
  skills: string[]
  isExpanded: boolean
}

export const EXPERIENCE: Experience[] = [
  {
    company: "House Of Ruvi",
    title: "WordPress CMS Intern",
    type: "Internship",
    logo: null,
    from: new Date("2026-04-01"),
    to: null,
    descriptionList: [
      "Managed 100+ product listings and promotional content through WordPress CMS.",
      "Automated product uploads, reducing repetitive catalog management effort.",
      "Optimized product presentation and promotional content to improve customer engagement.",
    ],
    skills: ["WordPress", "CMS", "Content Automation", "Catalog Management"],
    isExpanded: true,
  },
  {
    company: "Golden-Kulcha & Co",
    title: "Web Developer Intern",
    type: "Internship",
    logo: null,
    from: new Date("2026-03-01"),
    to: new Date("2026-05-31"),
    descriptionList: [
      "Developed a full-stack food ordering system covering 3 core workflows - menu browsing, order placement and order tracking.",
      "Built a feedback workflow connecting customer submissions -> admin review, reducing manual follow-up across the platform.",
      "Integrated a unified operational system, linking inventory movement with sales transactions and billing records for operational tracking.",
    ],
    skills: ["React", "FastAPI", "PostgreSQL", "Full-Stack Development", "REST API"],
    isExpanded: true,
  },
  {
    company: "Ira - Agro Tech Pvt. Ltd",
    title: "Enterprise Resource Planning Intern",
    type: "Internship",
    logo: null,
    from: new Date("2025-06-01"),
    to: new Date("2025-07-31"),
    descriptionList: [
      "Supported ERP planning and client coordination, translating operational requirements into structured Excel-based workflows.",
      "Managed and maintained records and reports to support accurate tracking and decision-making.",
      "Assisted in understanding client requirements, coordinating across procurement, sales, and billing processes.",
    ],
    skills: ["ERP", "Microsoft Excel", "Process Operations", "Client Coordination"],
    isExpanded: true,
  },
]

/* =========================================================================
   JOURNEY
   ========================================================================= */

export type JourneyItem = {
  id: string
  date: string
  title: string
  description: string
  image: string
  imageAlt: string
  tags?: string[]
  link?: { label: string; href: string }
  imageFit?: "cover" | "contain"
}

export const JOURNEY: JourneyItem[] = [
  {
    id: "eigi-hackathon",
    date: "2026",
    title: "1st Place - Eigi.AI GEN-AI Hackathon",
    description:
      "Honoured to win 1st prize at the Eigi hackathon, building an AI-assisted solution under tight time constraints.",
    image: "/journey/eigi-hackathon.jpg",
    imageAlt: "1st Place at Eigi.AI GEN-AI Hackathon",
    tags: ["Hackathon", "GenAI", "Winner"],
    link: {
      label: "View LinkedIn post",
      href: "https://www.linkedin.com/posts/aayush-dubey-ab19a72b9_hackathon-buildinpublic-genai-activity-7499096855192981504-c6KI",
    },
  },
  {
    id: "arcade-legend",
    date: "Jul 2025 - Jan 2026",
    title: "Arcade Legend",
    description:
      "Took part in the Arcade program and earned Arcade Legend status, gaining hands-on cloud exposure along with the prestige and goodies that came with it.",
    image: "/journey/arcade-legend.jpg",
    imageAlt: "Arcade Legend cloud achievement milestone",
    tags: ["Cloud", "Learning"],
    imageFit: "contain",
  },
  {
    id: "bitzlab",
    date: "Mar 2025",
    title: "BitzLab - Delivered a Product",
    description:
      "Worked as part of the enterpreneurship cell and delivered a working product, learning collaboration and shipping under real deadlines.",
    image: "/journey/bitzlab.jpg",
    imageAlt: "BitzLab product delivery collaboration",
    tags: ["Team", "Product Delivery"],
  },
  {
    id: "top-7-recognition",
    date: "Dec 2024",
    title: "Top 7 Among 100+ Participants",
    description: "Secured a top-7 position among over a hundred participants.",
    image: "/journey/top-7.jpg",
    imageAlt: "Top 7 finalist recognition",
    tags: ["Competition"],
    link: {
      label: "View LinkedIn post",
      href: "https://www.linkedin.com/posts/aayush-dubey-ab19a72b9_securing-a-top-7-position-amongs-the-100s-activity-7287673150333444096-0aH1",
    },
  },
]

/* =========================================================================
   GITHUB CONTRIBUTIONS
   ========================================================================= */

export const GITHUB_CONTRIBUTIONS = contributionsData
