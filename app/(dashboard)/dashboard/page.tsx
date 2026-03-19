"use client"

import { StatsCards } from "@/components/dashboard/stats-cards"
import { RecentCourses } from "@/components/dashboard/recent-courses"
import { LearningProgress } from "@/components/dashboard/learning-progress"
import { LearningStreak } from "@/components/dashboard/learning-streak"
import { RecommendedCourses } from "@/components/dashboard/recommended-courses"
import { UpcomingClasses } from "@/components/dashboard/upcoming-classes"
import { useUser } from "@/lib/user-context"

export default function DashboardPage() {
  const { name } = useUser()
  const firstName = name.split(" ")[0]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight uppercase">Welcome back, {firstName}</h1>
        <p className="text-muted-foreground">
          Continue your learning journey
        </p>
      </div>

      <StatsCards />

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          <RecentCourses />
          <LearningProgress />
        </div>
        <div className="space-y-6">
          <LearningStreak />
          <UpcomingClasses />
        </div>
      </div>

      <RecommendedCourses />
    </div>
  )
}
