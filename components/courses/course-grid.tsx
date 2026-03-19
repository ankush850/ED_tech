"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Star, Clock, Users, BookOpen } from "lucide-react"
import { Spinner } from "@/components/ui/spinner"

import { useRouter } from "next/navigation"
import { useUser } from "@/lib/user-context"
import { toast } from "sonner"

export function CourseGrid() {
  const [courses, setCourses] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [sortBy, setSortBy] = useState("popular")
  const { id: userId, role, email, isLoading: userLoading } = useUser()
  const router = useRouter()

  useEffect(() => {
    fetch("/api/courses")
      .then(res => res.json())
      .then(data => {
        setCourses(Array.isArray(data) ? data : [])
        setIsLoading(false)
      })
      .catch(() => setIsLoading(false))
  }, [])

  const handleEnroll = async (e: React.MouseEvent, courseId: string) => {
    e.preventDefault()
    e.stopPropagation()
    
    if (!userId) {
      toast.error("Please log in to enroll")
      router.push(`/login?callbackUrl=/courses`)
      return
    }
    
    try {
      const res = await fetch(`/api/courses/${courseId}/enroll`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId }),
      })

      if (res.ok) {
        toast.success("Enrolled successfully!")
        router.push(`/learn/${courseId}/start`)
      } else {
        const data = await res.json()
        toast.error(data.error || "Failed to enroll")
      }
    } catch {
      toast.error("An error occurred")
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          Showing <span className="font-medium text-foreground">1-{courses.length}</span> of{" "}
          <span className="font-medium text-foreground">{courses.length}</span> courses
        </p>
        <Select value={sortBy} onValueChange={setSortBy}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="popular">Most Popular</SelectItem>
            <SelectItem value="rating">Highest Rated</SelectItem>
            <SelectItem value="newest">Newest</SelectItem>
            <SelectItem value="price-low">Price: Low to High</SelectItem>
            <SelectItem value="price-high">Price: High to Low</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-6">
        {isLoading ? (
          <div className="col-span-full py-12 flex justify-center">
            <Spinner />
          </div>
        ) : courses.length > 0 ? (
          courses.map((course) => (
            <Link key={course.id} href={`/courses/${course.id}`}>
              <Card className="group h-full overflow-hidden border-border/50 hover:border-border hover:shadow-sm transition-all">
                <div className="aspect-video bg-muted relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-primary/5" />
                  {course.bestseller && (
                    <Badge className="absolute top-3 left-3 bg-yellow-500 text-yellow-950 hover:bg-yellow-500">
                      Bestseller
                    </Badge>
                  )}
                  <Badge variant="secondary" className="absolute top-3 right-3">
                    {course.category || "Development"}
                  </Badge>
                </div>
                <CardContent className="p-4">
                  <h3 className="font-semibold line-clamp-2 group-hover:text-primary transition-colors">
                    {course.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    {course.level}
                  </p>
                  
                  <div className="flex items-center gap-2 mt-3">
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-yellow-500 text-yellow-500" />
                      <span className="text-sm font-bold">4.8</span>
                    </div>
                    <span className="text-muted-foreground text-sm">
                      ({(course._count?.reviews || 0)} reviews)
                    </span>
                  </div>

                  <div className="flex items-center gap-4 mt-3 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <BookOpen className="h-3.5 w-3.5" />
                      {course.modules?.reduce((acc: number, m: any) => acc + (m.lessons?.length || 0), 0) || 0} lessons
                    </span>
                    <span className="flex items-center gap-1">
                      <Users className="h-3.5 w-3.5" />
                      {course._count?.enrollments || 0} students
                    </span>
                  </div>

                  {course.category && (
                    <Badge variant="outline" className="mt-3 text-xs">
                      {course.category}
                    </Badge>
                  )}
                </CardContent>
                <CardFooter className="p-4 pt-0 flex items-center justify-between">
                  <div className="flex items-baseline gap-2">
                    <span className="text-lg font-bold">${course.price || "Free"}</span>
                    {course.originalPrice && (
                      <span className="text-sm text-muted-foreground line-through">
                        ${course.originalPrice}
                      </span>
                    )}
                  </div>
                  <Button size="sm" onClick={(e) => handleEnroll(e, course.id)}>Enroll</Button>
                </CardFooter>
              </Card>
            </Link>
          ))
        ) : (
          <div className="col-span-full py-12 text-center text-muted-foreground">
            No courses found. Check back later!
          </div>
        )}
      </div>

      <div className="flex justify-center">
        <Button variant="outline" size="lg">
          Load more courses
        </Button>
      </div>
    </div>
  )
}
