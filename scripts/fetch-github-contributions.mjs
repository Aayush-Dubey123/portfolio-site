import fs from "node:fs/promises"
import path from "node:path"
import { fileURLToPath } from "node:url"

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const OUTPUT_FILE = path.resolve(__dirname, "../src/data/github-contributions.json")
const USERNAME = "Aayush-Dubey123"

const GRAPHQL_QUERY = `
query($userName: String!) {
  user(login: $userName) {
    contributionsCollection {
      contributionCalendar {
        totalContributions
        weeks {
          contributionDays {
            contributionCount
            date
            weekday
            contributionLevel
          }
        }
        months {
          name
          year
          firstDay
          totalWeeks
        }
      }
    }
  }
}
`

function mapContributionLevel(level) {
  if (typeof level === "number") return Math.min(Math.max(level, 0), 4)
  switch (level) {
    case "FIRST_QUARTILE":
      return 1
    case "SECOND_QUARTILE":
      return 2
    case "THIRD_QUARTILE":
      return 3
    case "FOURTH_QUARTILE":
      return 4
    case "NONE":
    default:
      return 0
  }
}

async function fetchFromGraphQL(token) {
  console.log(`[GitHub API] Fetching contribution calendar for ${USERNAME} via GraphQL...`)
  const response = await fetch("https://api.github.com/graphql", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token.trim()}`,
      "Content-Type": "application/json",
      "User-Agent": "portfolio-github-calendar",
    },
    body: JSON.stringify({
      query: GRAPHQL_QUERY,
      variables: { userName: USERNAME },
    }),
  })

  if (!response.ok) {
    const errorText = await response.text()
    throw new Error(`GitHub GraphQL HTTP ${response.status}: ${errorText}`)
  }

  const result = await response.json()
  if (result.errors && result.errors.length > 0) {
    throw new Error(`GitHub GraphQL error: ${JSON.stringify(result.errors)}`)
  }

  const calendar = result.data?.user?.contributionsCollection?.contributionCalendar
  if (!calendar) {
    throw new Error(`No contributionCalendar found for user ${USERNAME}`)
  }

  const weeks = calendar.weeks.map((week) => ({
    days: week.contributionDays.map((d) => ({
      date: d.date,
      count: d.contributionCount,
      level: mapContributionLevel(d.contributionLevel),
      weekday: d.weekday,
    })),
  }))

  const months = (calendar.months || []).map((m) => ({
    name: m.name,
    year: m.year,
    firstDay: m.firstDay,
    totalWeeks: m.totalWeeks,
  }))

  return {
    updatedAt: new Date().toISOString(),
    username: USERNAME,
    totalContributions: calendar.totalContributions,
    weeks,
    months,
  }
}

async function fetchFromPublicMirror() {
  console.log(`[Public Mirror] No GH_CONTRIBUTION_TOKEN detected. Fetching public contributions for ${USERNAME}...`)
  const response = await fetch(`https://github-contributions-api.jogruber.de/v4/${USERNAME}?y=last`, {
    headers: { "User-Agent": "portfolio-github-calendar" },
  })

  if (!response.ok) {
    throw new Error(`Public mirror returned HTTP ${response.status}`)
  }

  const data = await response.json()
  const daysList = data.contributions || []

  // Group into weeks by weekday (0 = Sunday to 6 = Saturday)
  const weeks = []
  let currentWeek = []

  for (const item of daysList) {
    const dateObj = new Date(item.date)
    const weekday = dateObj.getUTCDay()

    if (weekday === 0 && currentWeek.length > 0) {
      weeks.push({ days: currentWeek })
      currentWeek = []
    }

    currentWeek.push({
      date: item.date,
      count: item.count,
      level: mapContributionLevel(item.level),
      weekday,
    })
  }

  if (currentWeek.length > 0) {
    weeks.push({ days: currentWeek })
  }

  // Derive months
  const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
  const months = []
  let lastMonthIndex = -1

  for (let w = 0; w < weeks.length; w++) {
    const firstDayOfWeek = weeks[w].days[0]
    if (firstDayOfWeek) {
      const monthIdx = new Date(firstDayOfWeek.date).getUTCMonth()
      const year = new Date(firstDayOfWeek.date).getUTCFullYear()
      if (monthIdx !== lastMonthIndex) {
        months.push({
          name: monthNames[monthIdx],
          year,
          firstDay: firstDayOfWeek.date,
          totalWeeks: 1,
        })
        lastMonthIndex = monthIdx
      } else if (months.length > 0) {
        months[months.length - 1].totalWeeks += 1
      }
    }
  }

  const totalContributions = typeof data.total?.lastYear === "number"
    ? data.total.lastYear
    : daysList.reduce((acc, d) => acc + (d.count || 0), 0)

  return {
    updatedAt: new Date().toISOString(),
    username: USERNAME,
    totalContributions,
    weeks,
    months,
  }
}

async function main() {
  const token = process.env.GH_CONTRIBUTION_TOKEN || process.env.GITHUB_TOKEN

  let data
  if (token && token.trim().length > 0) {
    try {
      data = await fetchFromGraphQL(token)
    } catch (err) {
      console.warn(`[Warning] GraphQL fetch failed: ${err.message}. Falling back to public mirror...`)
      data = await fetchFromPublicMirror()
    }
  } else {
    data = await fetchFromPublicMirror()
  }

  await fs.mkdir(path.dirname(OUTPUT_FILE), { recursive: true })
  await fs.writeFile(OUTPUT_FILE, JSON.stringify(data, null, 2) + "\n", "utf-8")
  console.log(`[Success] Saved ${data.totalContributions} contributions (${data.weeks.length} weeks) to ${OUTPUT_FILE}`)
}

main().catch((err) => {
  console.error("[Fatal Error]", err)
  process.exit(1)
})
