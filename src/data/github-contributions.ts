import contributionsData from "./github-contributions.json"

export type ContributionLevel = 0 | 1 | 2 | 3 | 4

export type ContributionDay = {
  date: string
  count: number
  level: ContributionLevel
  weekday: number
}

export type ContributionWeek = {
  days: ContributionDay[]
}

export type ContributionMonth = {
  name: string
  year: number
  firstDay: string
  totalWeeks: number
}

export type GitHubContributionsData = {
  updatedAt: string
  username: string
  totalContributions: number
  weeks: ContributionWeek[]
  months: ContributionMonth[]
}

export const GITHUB_CONTRIBUTIONS = contributionsData as GitHubContributionsData
