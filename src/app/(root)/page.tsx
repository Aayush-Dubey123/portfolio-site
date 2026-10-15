import {
  About,
  Blogs,
  Connect,
  Experience,
  GitHubContributions,
  Journey,
  ProfileHeader,
  Projects,
  Separator,
  TechStack,
} from "@/components/profile"
import { AnimatingScrollBars, ContainerWrapper } from "@/components/site"
import { BLOGS, EXPERIENCE, JOURNEY, PROJECTS } from "@/data"

const Page = () => {
  return (
    <ContainerWrapper className="">
      <ProfileHeader />
      <Separator />

      <About />

      {PROJECTS.length > 0 && (
        <>
          <Separator />
          <Projects />
        </>
      )}

      {EXPERIENCE.length > 0 && (
        <>
          <Separator />
          <Experience />
        </>
      )}

      <Separator />
      <GitHubContributions />

      {JOURNEY.length > 0 && (
        <>
          <Separator />
          <Journey />
        </>
      )}

      <Separator />
      <TechStack />

      {BLOGS.length > 0 && (
        <>
          <Separator />
          <Blogs />
        </>
      )}

      <Separator />
      <Connect />

      <Separator />
      <AnimatingScrollBars />
    </ContainerWrapper>
  )
}

export default Page
