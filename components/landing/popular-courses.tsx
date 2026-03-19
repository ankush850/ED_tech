"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Star, Clock, Users, ArrowRight } from "lucide-react"
import { Spinner } from "@/components/ui/spinner"

export function PopularCourses() {
  const [courses, setCourses] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetch("/api/courses")
      .then(res => res.json())
      .then(data => {
        setCourses(Array.isArray(data) ? data : [])
        setIsLoading(false)
      })
      .catch(() => setIsLoading(false))
  }, [])

  return (
    <section className="py-20 lg:py-28 bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-12">
          <div>
            <span className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
              Featured
            </span>
            <h2 className="mt-2 text-3xl lg:text-4xl font-bold tracking-tight">
              Popular courses
            </h2>
          </div>
          <Link href="/courses">
            <Button variant="outline" className="gap-2">
              View all courses
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
        
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {isLoading ? (
            <div className="col-span-full flex justify-center py-12">
              <Spinner />
            </div>
          ) : courses.length > 0 ? (
            courses.map((course) => (
              <Card key={course.id} className="group overflow-hidden border-border/50 hover:border-border transition-colors">
                <div className="aspect-video bg-muted relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-primary/5" />
                  <Badge className="absolute top-3 left-3" variant="secondary">
                    {course.category || "Development"}
                  </Badge>
                </div>
                <CardContent className="p-4">
                  <h3 className="font-semibold line-clamp-2 group-hover:text-primary transition-colors">
                    {course.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mt-1">{course.level || "Course"}</p>
                  <div className="flex items-center gap-2 mt-3">
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-yellow-500 text-yellow-500" />
                      <span className="text-sm font-medium">4.8</span>
                    </div>
                    <span className="text-muted-foreground">•</span>
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <Users className="h-3.5 w-3.5" />
                      {course._count?.enrollments || 0} students
                    </div>
                  </div>
                  <div className="flex items-center gap-3 mt-2 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Clock className="h-3.5 w-3.5" />
                      {course.modules?.reduce((acc: number, m: any) => acc + (m.lessons?.length || 0), 0) || 0} lessons
                    </span>
                    {course.category && (
                      <Badge variant="outline" className="text-xs">
                        {course.category}
                      </Badge>
                    )}
                  </div>
                </CardContent>
                <CardFooter className="p-4 pt-0 flex items-center justify-between">
                  <span className="text-lg font-bold">${course.price || "Free"}</span>
                  <Link href={`/courses/${course.id}`}>
                    <Button size="sm" variant="secondary">
                      Enroll
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            ))
          ) : (
            <p className="text-muted-foreground text-center py-10 col-span-full">No featured courses available.</p>
          )}
        </div>
      </div>
    </section>
  )
}
