import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Star, Users, BookOpen } from "lucide-react"

interface CourseInstructorProps {
  instructor: {
    name: string
    title: string
    avatar: string
    rating: number
    students: number
    courses: number
    bio: string
  }
}

export function CourseInstructor({ instructor }: CourseInstructorProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>About the Instructor</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex gap-4">
          <Avatar className="h-20 w-20">
            <AvatarFallback className="text-xl bg-primary text-primary-foreground">
              {instructor.avatar}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <h3 className="font-semibold text-lg">{instructor.name}</h3>
            <p className="text-sm text-muted-foreground">{instructor.title}</p>
            
            <div className="flex flex-wrap items-center gap-4 mt-3 text-sm">
              <span className="flex items-center gap-1">
                <Star className="h-4 w-4 fill-yellow-500 text-yellow-500" />
                {instructor.rating} Instructor Rating
              </span>
              <span className="flex items-center gap-1">
                <Users className="h-4 w-4 text-muted-foreground" />
                {(instructor.students / 1000).toFixed(0)}k Students
              </span>
              <span className="flex items-center gap-1">
                <BookOpen className="h-4 w-4 text-muted-foreground" />
                {instructor.courses} Courses
              </span>
            </div>
          </div>
        </div>
        
        <p className="mt-4 text-sm text-muted-foreground leading-relaxed">
          {instructor.bio}
        </p>
      </CardContent>
    </Card>
  )
}
