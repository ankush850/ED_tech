import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  BookOpen,
  Award,
  Code,
  MessageSquare,
  ThumbsUp,
  CheckCircle2,
  Play,
} from "lucide-react"

const activities: any[] = []

const difficultyColors: Record<string, string> = {
  Easy: "bg-emerald-50 text-emerald-700 border-emerald-200",
  Medium: "bg-amber-50 text-amber-700 border-amber-200",
  Hard: "bg-rose-50 text-rose-700 border-rose-200",
}

export function ProfileActivity() {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="relative space-y-0">
          {activities.length > 0 ? (
            activities.map((activity, index) => (
              <div
                key={activity.id}
                className="relative flex gap-4 pb-6 last:pb-0"
              >
                {index < activities.length - 1 && (
                  <div className="absolute left-5 top-10 h-full w-px bg-border" />
                )}
                <div
                  className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-muted ${activity.iconColor}`}
                >
                  <activity.icon className="h-5 w-5" />
                </div>
                <div className="min-w-0 flex-1 pt-1.5">
                  <p className="text-sm font-medium">{activity.title}</p>
                  <div className="mt-1 flex items-center gap-2">
                    <span className="text-xs text-muted-foreground">
                      {activity.timestamp}
                    </span>
                    {activity.meta && (
                      <Badge
                        variant="outline"
                        className={`text-xs ${difficultyColors[activity.meta] || ""}`}
                      >
                        {activity.meta}
                      </Badge>
                    )}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-muted-foreground text-center py-4">No recent activity.</p>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
