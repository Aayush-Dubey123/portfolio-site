# Aayush Dubey — Software & Systems Engineer

[![Portfolio](https://img.shields.io/badge/Live-ayushdubey.studio-111827?style=flat-square)](https://ayushdubey.studio)
![Next.js](https://img.shields.io/badge/Next.js-15-black?logo=nextdotjs)
![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?logo=tailwindcss&logoColor=white)

My personal engineering portfolio, documenting the systems I build, the problems they solve, my professional experience and my journey through software engineering.

I am Aayush Chandrashekhar Dubey, a Computer Science and Business Systems student at St. Vincent Pallotti College of Engineering and Technology, Nagpur, focused on full-stack development, cloud computing, automation and AI-assisted systems.

**Explore the portfolio at [ayushdubey.studio](https://ayushdubey.studio).**

## Featured projects

The portfolio contains eight projects with dedicated detail pages, engineering descriptions, technology stacks, source links and live demos.

| Project | What it does | Links |
| --- | --- | --- |
| **AutoFiller AI** | Privacy-focused Windows desktop form automation with local encrypted values, AI field mapping and human-controlled submission. | [Case study](https://ayushdubey.studio/projects/autofiller-ai) · [Code](https://github.com/Aayush-Dubey123/autofiller) |
| **AudioPipeline** | Hindi and English TTS and voice-cloning studio optimized for a 6 GB laptop GPU, with measured latency and memory results. | [Case study](https://ayushdubey.studio/projects/audiopipeline) · [Code](https://github.com/Aayush-Dubey123/audiopipeline) |
| **HeatSafe Nagpur** | Landsat-based 30 m surface-temperature estimates, uncertainty ranges, locality rankings and nearby cooling places in three languages. | [Case study](https://ayushdubey.studio/projects/heatsafe-nagpur) · [Code](https://github.com/Aayush-Dubey123/heatsafe-ML) |
| **PrepAI** | Voice-first technical interview simulation with adaptive questioning, browser-based proctoring and diagnostic reports. | [Case study](https://ayushdubey.studio/projects/prepai) · [Code](https://github.com/Aayush-Dubey123/PrepAI) |
| **Warehouse Management System** | Inventory, receiving, orders, picking and dispatch workflows with role-based access and AI/MCP integration. | [Case study](https://ayushdubey.studio/projects/warehouse-management-system) · [Code](https://github.com/Aayush-Dubey123/WMS) |
| **Hospital Management System** | Conversational appointment booking, Telegram MCP integration and CLI readiness diagnostics. | [Case study](https://ayushdubey.studio/projects/hospital-management-system) · [Code](https://github.com/Aayush-Dubey123/booking-system---hospital) |
| **CryoW3times** | Real-time cryptocurrency news aggregation with API-driven ingestion, MongoDB, Prisma and authentication. | [Case study](https://ayushdubey.studio/projects/cryow3times) · [Code](https://github.com/Aayush-Dubey123/CryoW3TimeS) |
| **Golden-Kulcha Food & Inventory System** | Food ordering, customer feedback, inventory and sales/billing integration. | [Case study](https://ayushdubey.studio/projects/food-ordering-system) · [Code](https://github.com/Aayush-Dubey123/golden) |

## Professional experience

| Organization | Role | Period |
| --- | --- | --- |
| House Of Ruvi | WordPress CMS Intern — catalog management and content automation | Apr 2026 onward (as listed) |
| Golden-Kulcha & Co | Web Developer Intern — full-stack ordering and inventory workflows | Mar–May 2026 |
| Ira - Agro Tech Pvt. Ltd | ERP Intern — operational planning, Excel workflows and client coordination | Jun–Jul 2025 |

## Journey & achievements

- GenAI presentation and demo with Eigi.AI at IIM Nagpur (2026).
- First place at the Eigi.AI GEN-AI Hackathon (2026).
- Arcade Legend cloud-learning milestone (July 2025–January 2026).
- BitzLab product delivery through the entrepreneurship cell (March 2025).
- Top-seven recognition among 100+ participants (December 2024).

### Copyright applications

The portfolio includes supporting documentation and official verification links for two computer-software copyright applications. The statuses below reflect the portfolio data, not an independent live registry check.

| Work | Diary number | Listed status |
| --- | --- | --- |
| CryoW3 – Web Aggregation Web Application | SW-50898/2025-CO | Pending for Hearing |
| AI interview system | SW-49239/2026-CO | Waiting |

These are applications, not claims of granted registrations. [Official status lookup](https://copyright.gov.in/frmStatusGenUser.aspx).

## Website features

- Profile, project showcase, experience, journey, categorized skills and contact sections.
- Dedicated project routes generated from centralized project data.
- GitHub contribution calendar backed by a local JSON snapshot, refreshed through a daily GitHub Actions workflow.
- System-aware light/dark theme, motion effects and responsive UI.
- Contact API with Resend email delivery, input validation, origin checks, honeypot and timing-based spam checks, and per-instance in-memory rate limiting.
- SEO metadata, canonical URL, Open Graph and Twitter cards, and Person/ProfilePage JSON-LD.
- Analytics integration, including optional Umami tracking.
- Blog section supported by the data model but hidden while its entries are empty.

## Architecture & technology

The portfolio itself uses Next.js 15.4.10 (App Router), React 19.1, TypeScript 5, Tailwind CSS 4, Motion 12, Radix UI primitives, Lucide icons and next-themes. The technologies listed in the portfolio's skills section describe my broader engineering experience, not necessarily dependencies of this website.

```text
src/
├── app/
│   ├── (root)/
│   │   ├── page.tsx                 # Main portfolio
│   │   └── projects/[href]/page.tsx # Project detail route
│   ├── api/contact/route.ts         # Contact endpoint
│   ├── layout.tsx                   # Metadata, providers and analytics
│   └── globals.css
├── components/
│   ├── profile/                     # Portfolio sections
│   ├── site/                        # Site-level UI
│   ├── providers/                   # Theme provider
│   └── ui/                          # Reusable UI primitives
└── data/
    ├── index.ts                     # Profile, projects, experience and milestones
    └── github-contributions.json    # Contribution snapshot
scripts/
└── fetch-github-contributions.mjs
.github/workflows/
└── update-contributions.yml
```

## Local development

Node.js 20+ and npm are recommended.

```bash
git clone https://github.com/Aayush-Dubey123/portfolio-site.git
cd portfolio-site
npm ci
npm run dev
```

Open [http://localhost:3001](http://localhost:3001). The development script uses Turbopack on port 3001.

```bash
npm run build                 # Production build
npm start                     # Start production server
npm run format                # Format source
npm run fetch:contributions   # Refresh GitHub contribution snapshot
```

### Environment configuration

Set these in a local `.env.local` or your deployment environment as needed. Never commit secret values.

| Variable | Purpose |
| --- | --- |
| `RESEND_API_KEY` | Required for real contact email delivery |
| `CONTACT_FROM_EMAIL` | Optional sender override; use a Resend-authorized sender |
| `CONTACT_TO_EMAIL` | Optional recipient override |
| `GH_CONTRIBUTION_TOKEN` | Optional token for the contribution-fetching script; otherwise it uses a public mirror |
| `NEXT_PUBLIC_UMAMI_WEBSITE_ID` | Optional Umami website identifier |

Without a Resend key, the contact endpoint logs submissions in development and returns a service-unavailable response in production. The contribution workflow runs daily at 00:00 UTC and can also be triggered manually.

To update portfolio content, edit `src/data/index.ts` rather than duplicating information across components.

## Connect

[Portfolio](https://ayushdubey.studio) · [GitHub](https://github.com/Aayush-Dubey123) · [LinkedIn](https://www.linkedin.com/in/aayush-dubey-ab19a72b9/) · [Email](mailto:aayushdubey2300@gmail.com)
