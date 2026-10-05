import { HeaderTitle } from "./header-title"

export function About() {
  return (
    <section id="about" className="w-full scroll-mt-16">
      <HeaderTitle title="About" />
      <div className="p-3 sm:p-4">
        <div className="space-y-3.5 text-muted-foreground text-sm sm:text-base leading-relaxed">
          <p>
            Hello, and welcome. I’m Aayush Dubey, currently pursuing a B.Tech in Computer Science and Business Systems (CSBS). I have a strong interest in web development and cloud computing, and I enjoy learning through real-world projects and new technologies.
          </p>
          <p>
            My academic and internship experiences have given me hands-on exposure to building practical solutions, working with AI-assisted workflows, and exploring modern development and cloud technologies. These experiences have strengthened my technical skills while helping me grow in problem-solving, teamwork, discipline, and adaptability.
          </p>
        </div>
      </div>
    </section>
  )
}




