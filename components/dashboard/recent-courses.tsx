"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Play, Clock } from "lucide-react"
import { Spinner } from "@/components/ui/spinner"
import { useUser } from "@/lib/user-context"

export function RecentCourses() {
  const { id: userId, role, email } = useUser()
  const [courses, setCourses] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (!userId) {
      setCourses([])
      setIsLoading(false)
      return
    }

    fetch(`/api/user/courses?userId=${encodeURIComponent(userId)}`)
      .then(res => res.json())
      .then(data => {
        setCourses(Array.isArray(data) ? data : [])
        setIsLoading(false)
      })
      .catch(() => {
        setCourses([])
        setIsLoading(false)
      })
  }, [userId])

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Continue Learning</CardTitle>
        <Link href="/courses">
          <Button variant="ghost" size="sm">
            Browse All
          </Button>
        </Link>
      </CardHeader>
      <CardContent className="space-y-4">
        {isLoading ? (
          <div className="flex justify-center py-4">
            <Spinner />
          </div>
        ) : courses.length > 0 ? (
          courses.slice(0, 3).map((course) => (
            <Link 
              key={course.id} 
              href={`/learn/${course.id}/${course.nextVideoId || "start"}`}
              className="flex flex-col sm:flex-row gap-4 p-4 rounded-lg border bg-card hover:bg-accent/50 transition-colors"
            >
              <div className="flex-shrink-0 w-full sm:w-32 h-20 rounded-md bg-muted flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-primary/5" />
                <Play className="h-8 w-8 text-muted-foreground relative z-10" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h3 className="font-semibold line-clamp-1">{course.title}</h3>
                    <p className="text-sm text-muted-foreground">
                      {course.level} • {course.category}
                    </p>
                  </div>
                  <Badge variant="secondary" className="hidden sm:inline-flex">
                    {course.progress === 100 ? "Completed" : "In Progress"}
                  </Badge>
                </div>
                <div className="mt-3">
                  <div className="flex items-center justify-between text-sm mb-1">
                    <span className="text-muted-foreground">
                      Next: {course.nextVideoTitle}
                    </span>
                    <span className="font-medium">{course.progress}%</span>
                  </div>
                  <Progress value={course.progress} className="h-2" />
                </div>
              </div>
            </Link>
          ))
        ) : (
          <div className="text-center py-8 space-y-3">
            <p className="text-muted-foreground">You haven't started any courses yet.</p>
            <Link href="/courses">
              <Button variant="outline" size="sm">Explore Catalog</Button>
            </Link>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
