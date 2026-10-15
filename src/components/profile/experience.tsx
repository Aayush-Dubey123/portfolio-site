import { EXPERIENCE } from "@/data/experience"
import { ExperienceItem } from "./experience-item"
import { HeaderTitle } from "./header-title"

export function Experience() {
  if (!EXPERIENCE.length) return null

  return (
    <>
      <section id="experience" className="w-full scroll-mt-16">
        <HeaderTitle title="Experience" />
        <div className="grid w-full">
          {EXPERIENCE.map((item) => {
            return <ExperienceItem key={item.title} experience={item} />
          })}
        </div>
      </section>
    </>
  )
}
