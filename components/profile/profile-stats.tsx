import { Card, CardContent } from "@/components/ui/card"
import { BookOpen, Award, Code, Flame } from "lucide-react"

const stats = [
  {
    label: "Courses Completed",
    value: "0",
    icon: BookOpen,
    change: "",
  },
  {
    label: "Certificates Earned",
    value: "0",
    icon: Award,
    change: "",
  },
  {
    label: "Problems Solved",
    value: "0",
    icon: Code,
    change: "",
  },
  {
    label: "Learning Streak",
    value: "0 days",
    icon: Flame,
    change: "",
  },
]

export function ProfileStats() {
  return (
    <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => (
        <Card key={stat.label}>
          <CardContent className="p-5">
            <div className="flex items-center justify-between">
              <stat.icon className="h-5 w-5 text-muted-foreground" />
            </div>
            <div className="mt-3">
              <div className="text-2xl font-bold">{stat.value}</div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
              <div className="mt-1 text-xs text-emerald-600">{stat.change}</div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
