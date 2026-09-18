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
    isExpanded: false,
  },
]


