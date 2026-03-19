import { Metadata } from "next"
import { Header } from "@/components/landing/header"
import { Footer } from "@/components/landing/footer"
import { CourseFilters } from "@/components/courses/course-filters"
import { CourseGrid } from "@/components/courses/course-grid"
import { CourseSearch } from "@/components/courses/course-search"

export const metadata: Metadata = {
  title: "Courses - LearnHub",
  description: "Browse our catalog of expert-led courses",
}

export default function CoursesPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <section className="border-b bg-muted/30">
          <div className="container mx-auto px-4 py-12">
            <h1 className="text-3xl lg:text-4xl font-bold tracking-tight">
              Explore Courses
            </h1>
            <p className="text-muted-foreground mt-2 max-w-2xl">
              Discover courses taught by industry experts. Build real-world skills 
              with hands-on projects and earn certificates.
            </p>
            <div className="mt-6">
              <CourseSearch />
            </div>
          </div>
        </section>
        
        <section className="container mx-auto px-4 py-8">
          <div className="flex flex-col lg:flex-row gap-8">
            <aside className="w-full lg:w-64 shrink-0">
              <CourseFilters />
            </aside>
            <div className="flex-1">
              <CourseGrid />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
