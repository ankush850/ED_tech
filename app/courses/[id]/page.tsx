import { Metadata } from "next"
import { Header } from "@/components/landing/header"
import { Footer } from "@/components/landing/footer"
import { CourseHero } from "@/components/courses/course-hero"
import { CourseCurriculum } from "@/components/courses/course-curriculum"
import { CourseInstructor } from "@/components/courses/course-instructor"
import { CourseReviews } from "@/components/courses/course-reviews"
import { CourseRequirements } from "@/components/courses/course-requirements"
import { CourseEnrollCard } from "@/components/courses/course-enroll-card"

import { prisma } from "@/lib/prisma"
import { notFound } from "next/navigation"

export default async function CourseDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const course = await prisma.course.findUnique({
    where: { id },
    include: {
      modules: {
        include: {
          lessons: {
            orderBy: { order: 'asc' }
          }
        },
        orderBy: { order: 'asc' }
      }
    }
  })

  if (!course) {
    notFound()
  }

  const allLessons = course.modules.flatMap(m => m.lessons)

  // Map database model to UI expectations
  const courseData = {
    id: course.id,
    title: course.title,
    subtitle: course.description,
    instructor: {
      name: "Instructor", 
      title: "Course Author",
      avatar: "I",
      rating: 4.8,
      students: 1200,
      courses: 5,
      bio: "An experienced instructor dedicated to sharing knowledge.",
    },
    rating: 4.8,
    reviews: 124,
    students: 0, // No enrolledCount in schema yet
    duration: "10 hours",
    lessons: allLessons.length,
    level: course.level,
    price: 0, // No price in schema yet
    originalPrice: 0,
    lastUpdated: course.createdAt.toLocaleDateString(),
    language: "English",
    features: [
      `${allLessons.length} lessons`,
      "Lifetime access",
      "Certificate of completion",
    ],
    requirements: [
      "Basic understanding of the subject",
      "A computer with internet access",
    ],
    whatYouWillLearn: [
      "Master the core concepts of this subject",
      "Build practical projects",
      "Gain industry-relevant skills",
    ],
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <CourseHero course={courseData} />
        
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col lg:flex-row gap-8">
            <div className="flex-1 space-y-8">
              <CourseRequirements
                requirements={courseData.requirements}
                whatYouWillLearn={courseData.whatYouWillLearn}
              />
              <CourseCurriculum modules={course.modules} />
              <CourseInstructor instructor={courseData.instructor} />
              <CourseReviews rating={courseData.rating} reviews={courseData.reviews} />
            </div>
            <div className="w-full lg:w-96 shrink-0">
              <div className="lg:sticky lg:top-20">
                <CourseEnrollCard course={courseData} />
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
