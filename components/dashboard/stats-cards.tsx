import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BookOpen, Clock, Trophy, Flame } from "lucide-react"

const stats = [
  {
    title: "Courses Enrolled",
    value: "0",
    change: "0 this month",
    icon: BookOpen,
  },
  {
    title: "Hours Learned",
    value: "0",
    change: "0 this week",
    icon: Clock,
  },
  {
    title: "Certificates",
    value: "0",
    change: "0 this month",
    icon: Trophy,
  },
  {
    title: "Day Streak",
    value: "0",
    change: "Start learning!",
    icon: Flame,
  },
]

export function StatsCards() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => (
        <Card key={stat.title}>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {stat.title}
            </CardTitle>
            <stat.icon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stat.value}</div>
            <p className="text-xs text-muted-foreground mt-1">{stat.change}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
