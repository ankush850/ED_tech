import { Header } from "@/components/landing/header"
import { Hero } from "@/components/landing/hero"
import { Stats } from "@/components/landing/stats"
import { Features } from "@/components/landing/features"
import { PopularCourses } from "@/components/landing/popular-courses"
import { LearningPaths } from "@/components/landing/learning-paths"
import { Testimonials } from "@/components/landing/testimonials"
import { InstructorCTA } from "@/components/landing/instructor-cta"
import { Footer } from "@/components/landing/footer"

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <Hero />
        {/* <Stats /> */}
        <Features />
        <PopularCourses />
        {/* <LearningPaths /> */}
        {/* <Testimonials /> */}
        <InstructorCTA />
      </main>
      <Footer />
    </div>
  )
}
