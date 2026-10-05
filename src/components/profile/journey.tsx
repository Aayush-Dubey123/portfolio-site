import { JOURNEY } from "@/data/journey"
import { HeaderTitle } from "./header-title"
import { JourneyItem } from "./journey-item"

export function Journey() {
  if (!JOURNEY.length) return null

  return (
    <section
      id="journey"
      aria-labelledby="journey-heading"
      className="w-full scroll-mt-16"
    >
      <HeaderTitle title="Journey" id="journey-heading" />
      <div className="p-3 sm:p-4">
        <ol className="flex flex-col gap-10 sm:gap-14">
          {JOURNEY.map((item, index) => (
            <JourneyItem
              key={item.id}
              item={item}
              isFirst={index === 0}
              isNewest={index === 0}
              isLast={index === JOURNEY.length - 1}
            />
          ))}
        </ol>
      </div>
    </section>
  )
}
