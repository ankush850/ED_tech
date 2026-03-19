import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Star, Clock, ArrowRight } from "lucide-react"

const recommendations: any[] = []

export function RecommendedCourses() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Recommended for You</CardTitle>
        <Link href="/courses">
          <Button variant="ghost" size="sm" className="gap-1">
            Browse all
            <ArrowRight className="h-4 w-4" />
          </Button>
        </Link>
      </CardHeader>
      <CardContent>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {recommendations.length > 0 ? (
            recommendations.map((course) => (
              <Link
                key={course.id}
                href={`/courses/${course.id}`}
                className="group block"
              >
                <div className="p-4 rounded-lg border bg-card hover:bg-accent/50 transition-colors h-full">
                  <div className="aspect-video rounded-md bg-muted mb-3 flex items-center justify-center">
                    <span className="text-2xl font-bold text-muted-foreground/30">
                      {course.title.charAt(0)}
                    </span>
                  </div>
                  <h4 className="font-semibold text-sm line-clamp-2 group-hover:text-primary transition-colors">
                    {course.title}
                  </h4>
                  <p className="text-xs text-muted-foreground mt-1">
                    {course.instructor}
                  </p>
                  <div className="flex items-center gap-2 mt-2">
                    <div className="flex items-center gap-1">
                      <Star className="h-3 w-3 fill-yellow-500 text-yellow-500" />
                      <span className="text-xs font-medium">{course.rating}</span>
                    </div>
                    <span className="text-muted-foreground text-xs">•</span>
                    <span className="text-xs text-muted-foreground flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {course.duration}
                    </span>
                  </div>
                  <Badge variant="outline" className="mt-2 text-xs">
                    {course.level}
                  </Badge>
                  <p className="text-xs text-muted-foreground mt-2 line-clamp-1">
                    {course.reason}
                  </p>
                </div>
              </Link>
            ))
          ) : (
            <p className="text-muted-foreground text-center py-4 col-span-full">No recommendations available at the moment.</p>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
