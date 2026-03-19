import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Video, Clock, Users } from "lucide-react"

const upcomingClasses: any[] = []

export function UpcomingClasses() {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2">
          <Video className="h-5 w-5 text-primary" />
          Live Classes
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {upcomingClasses.length > 0 ? (
          upcomingClasses.map((classItem) => (
            <div
              key={classItem.id}
              className="p-3 rounded-lg border bg-card space-y-2"
            >
              <div className="flex items-start justify-between gap-2">
                <h4 className="font-medium text-sm line-clamp-1">
                  {classItem.title}
                </h4>
                {classItem.status === "live-soon" && (
                  <Badge variant="destructive" className="text-xs">
                    Soon
                  </Badge>
                )}
              </div>
              <p className="text-xs text-muted-foreground">
                {classItem.instructor}
              </p>
              <div className="flex items-center gap-3 text-xs text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  {classItem.time}
                </span>
                <span className="flex items-center gap-1">
                  <Users className="h-3 w-3" />
                  {classItem.attendees}
                </span>
              </div>
              <Link href={`/dashboard/live/${classItem.id}`}>
                <Button size="sm" variant="outline" className="w-full mt-2">
                  {classItem.status === "live-soon" ? "Join Now" : "Set Reminder"}
                </Button>
              </Link>
            </div>
          ))
        ) : (
          <p className="text-muted-foreground text-center py-4 text-sm">No upcoming live classes.</p>
        )}
      </CardContent>
    </Card>
  )
}
