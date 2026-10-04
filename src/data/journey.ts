export type JourneyItem = {
  id: string
  date: string // display text, e.g. "2026" or "Jul 2025 - Jan 2026"
  title: string
  description: string // 1-3 short sentences, first person
  image: string // path under /public/journey/
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
