import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { Play, CheckCircle2 } from "lucide-react"

const courses: any[] = []

export function ProfileCourses() {
  const completedCourses = courses.filter(c => c.completed)
  const inProgressCourses = courses.filter(c => !c.completed)

  return (
    <div className="space-y-8">
      {inProgressCourses.length === 0 && completedCourses.length === 0 ? (
        <p className="text-muted-foreground text-center py-10">You haven't enrolled in any courses yet.</p>
      ) : (
        <>
          {inProgressCourses.length > 0 && (
            <div>
              <h3 className="mb-4 text-lg font-semibold">In Progress</h3>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {inProgressCourses.map((course) => (
                  <Card key={course.id} className="overflow-hidden">
                    <div className="aspect-video bg-muted" />
                    <CardContent className="p-4">
                      <h4 className="font-semibold leading-tight">{course.title}</h4>
                      <p className="mt-1 text-sm text-muted-foreground">
                        {course.instructor}
                      </p>
                      <div className="mt-3">
                        <div className="mb-1.5 flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">Progress</span>
                          <span className="font-medium">{course.progress}%</span>
                        </div>
                        <Progress value={course.progress} className="h-2" />
                      </div>
                      <Button className="mt-4 w-full gap-2">
                        <Play className="h-4 w-4" />
                        Continue
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {completedCourses.length > 0 && (
            <div>
              <h3 className="mb-4 text-lg font-semibold">Completed</h3>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {completedCourses.map((course) => (
                  <Card key={course.id} className="overflow-hidden">
                    <div className="relative aspect-video bg-muted">
                      <div className="absolute inset-0 flex items-center justify-center bg-emerald-500/10">
                        <CheckCircle2 className="h-12 w-12 text-emerald-500" />
                      </div>
                    </div>
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <h4 className="font-semibold leading-tight">{course.title}</h4>
                          <p className="mt-1 text-sm text-muted-foreground">
                            {course.instructor}
                          </p>
                        </div>
                        <Badge variant="secondary" className="shrink-0">
                          Completed
                        </Badge>
                      </div>
                      <p className="mt-2 text-xs text-muted-foreground">
                        Completed on {course.completedDate}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  )
}
