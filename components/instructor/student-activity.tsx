import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

const activities = [
  {
    id: 1,
    student: {
      name: "Sarah Chen",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    action: "enrolled",
    course: "React Masterclass",
    time: "2 min ago",
  },
  {
    id: 2,
    student: {
      name: "Mike Johnson",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    action: "completed",
    course: "TypeScript Basics",
    time: "15 min ago",
  },
  {
    id: 3,
    student: {
      name: "Emily Roberts",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    action: "reviewed",
    course: "Node.js API",
    time: "1 hour ago",
  },
  {
    id: 4,
    student: {
      name: "David Kim",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    action: "enrolled",
    course: "React Masterclass",
    time: "2 hours ago",
  },
  {
    id: 5,
    student: {
      name: "Alex Turner",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    action: "completed",
    course: "CSS Grid",
    time: "3 hours ago",
  },
]

const actionStyles: Record<string, string> = {
  enrolled: "bg-blue-50 text-blue-700 border-blue-200",
  completed: "bg-emerald-50 text-emerald-700 border-emerald-200",
  reviewed: "bg-amber-50 text-amber-700 border-amber-200",
}

export function StudentActivity() {
  return (
    <Card className="h-full">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">Recent Activity</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {activities.map((activity) => (
          <div key={activity.id} className="flex items-start gap-3">
            <Avatar className="h-8 w-8">
              <AvatarImage src={activity.student.avatar} />
              <AvatarFallback>
                {activity.student.name.split(" ").map(n => n[0]).join("")}
              </AvatarFallback>
            </Avatar>
            <div className="min-w-0 flex-1">
              <p className="text-sm">
                <span className="font-medium">{activity.student.name}</span>
                {" "}
                <Badge variant="outline" className={`text-xs ${actionStyles[activity.action]}`}>
                  {activity.action}
                </Badge>
              </p>
              <p className="truncate text-sm text-muted-foreground">
                {activity.course}
              </p>
              <p className="text-xs text-muted-foreground">{activity.time}</p>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
