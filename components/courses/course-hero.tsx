import { Badge } from "@/components/ui/badge"
import { Star, Clock, Users, BookOpen, Globe, Calendar } from "lucide-react"

interface CourseHeroProps {
  course: {
    title: string
    subtitle: string
    rating: number
    reviews: number
    students: number
    duration: string
    lessons: number
    level: string
    lastUpdated: string
    language: string
    instructor: {
      name: string
    }
  }
}

export function CourseHero({ course }: CourseHeroProps) {
  return (
    <section className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-3xl">
          <Badge variant="secondary" className="mb-4">
            Bestseller
          </Badge>
          
          <h1 className="text-3xl lg:text-4xl font-bold tracking-tight">
            {course.title}
          </h1>
          
          <p className="mt-4 text-primary-foreground/80 text-lg leading-relaxed">
            {course.subtitle}
          </p>

          <div className="flex flex-wrap items-center gap-4 mt-6">
            <div className="flex items-center gap-1">
              <span className="font-bold text-yellow-400">{course.rating}</span>
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-4 w-4 ${
                      i < Math.floor(course.rating)
                        ? "fill-yellow-400 text-yellow-400"
                        : "text-primary-foreground/30"
                    }`}
                  />
                ))}
              </div>
              <span className="text-sm text-primary-foreground/70">
                ({course.reviews.toLocaleString()} reviews)
              </span>
            </div>
            <span className="text-sm text-primary-foreground/70">
              {course.students.toLocaleString()} students
            </span>
          </div>

          <p className="mt-4 text-sm text-primary-foreground/80">
            Created by{" "}
            <span className="text-primary-foreground underline underline-offset-2">
              {course.instructor.name}
            </span>
          </p>

          <div className="flex flex-wrap items-center gap-4 mt-4 text-sm text-primary-foreground/70">
            <span className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              Last updated {course.lastUpdated}
            </span>
            <span className="flex items-center gap-1">
              <Globe className="h-4 w-4" />
              {course.language}
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-4 mt-6 text-sm">
            <span className="flex items-center gap-1.5 bg-primary-foreground/10 px-3 py-1.5 rounded-full">
              <Clock className="h-4 w-4" />
              {course.duration}
            </span>
            <span className="flex items-center gap-1.5 bg-primary-foreground/10 px-3 py-1.5 rounded-full">
              <BookOpen className="h-4 w-4" />
              {course.lessons} lessons
            </span>
            <span className="flex items-center gap-1.5 bg-primary-foreground/10 px-3 py-1.5 rounded-full">
              <Users className="h-4 w-4" />
              {course.level}
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}
