import { HeaderTitle } from "./header-title"

export function About() {
  return (
    <section className="w-full">
      <HeaderTitle title="About" />
      <div className="p-3">
        <ul className="space-y-3">
          <li className="flex items-start gap-2.5 text-primary/90 text-sm sm:text-base leading-relaxed">
            <span className="mt-2 size-1.5 shrink-0 rounded-full bg-primary" />
            <span>
              <strong className="font-semibold text-primary">Computer Science &amp; Business Systems:</strong> B.Tech CSBS student at St. Vincent Pallotti College of Engineering and Technology, Nagpur (CGPA: 8.85), connecting technology with real-world problems.
            </span>
          </li>
          <li className="flex items-start gap-2.5 text-primary/90 text-sm sm:text-base leading-relaxed">
            <span className="mt-2 size-1.5 shrink-0 rounded-full bg-primary" />
            <span>
              <strong className="font-semibold text-primary">Full-Stack &amp; AI Systems:</strong> Experienced in building web applications using React, FastAPI, Next.js, Python, PostgreSQL, MongoDB, and AI/MCP conversational workflows.
            </span>
          </li>
          <li className="flex items-start gap-2.5 text-primary/90 text-sm sm:text-base leading-relaxed">
            <span className="mt-2 size-1.5 shrink-0 rounded-full bg-primary" />
            <span>
              <strong className="font-semibold text-primary">Cloud &amp; Automation:</strong> Hands-on experience with Docker, AWS, Google Cloud, Vercel, Render, and building CLI operational tools for automated workflows.
            </span>
          </li>
          <li className="flex items-start gap-2.5 text-primary/90 text-sm sm:text-base leading-relaxed">
            <span className="mt-2 size-1.5 shrink-0 rounded-full bg-primary" />
            <span>
              <strong className="font-semibold text-primary">Hackathons &amp; Achievements:</strong> Winner of GEN-AI Bootcamp/Hackathon (Eigi.AI).
            </span>
          </li>
        </ul>
      </div>
    </section>
  )
}



