import { Metadata } from "next"
import { ProfileCourses } from "@/components/profile/profile-courses"

export const metadata: Metadata = {
  title: "My Courses - LearnHub",
  description: "Manage your enrolled courses",
}

export default function MyCoursesPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">My Courses</h1>
        <p className="text-muted-foreground">
          Track your progress and continue learning
        </p>
      </div>

      <div className="rounded-xl border bg-card p-6">
        <ProfileCourses />
      </div>
    </div>
  )
}
