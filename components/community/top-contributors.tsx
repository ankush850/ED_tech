import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Trophy, Medal } from "lucide-react"

const contributors: any[] = []

const rankColors: Record<number, string> = {
  1: "text-amber-500",
  2: "text-slate-400",
  3: "text-amber-700",
}

export function TopContributors() {
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-lg">
          <Trophy className="h-5 w-5 text-amber-500" />
          Top Contributors
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {contributors.length > 0 ? (
          contributors.map((contributor) => (
            <div key={contributor.rank} className="flex items-center gap-3">
              <div className={`w-6 text-center font-bold ${rankColors[contributor.rank] || "text-muted-foreground"}`}>
                {contributor.rank <= 3 ? (
                  <Medal className="h-5 w-5" />
                ) : (
                  contributor.rank
                )}
              </div>
              <Avatar className="h-9 w-9">
                <AvatarImage src={contributor.avatar} />
                <AvatarFallback>
                  {contributor.name.split(" ").map((n: string) => n[0]).join("")}
                </AvatarFallback>
              </Avatar>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <span className="truncate text-sm font-medium">
                    {contributor.name}
                  </span>
                  <Badge variant="outline" className="text-xs">
                    {contributor.badge}
                  </Badge>
                </div>
                <div className="text-xs text-muted-foreground">
                  {contributor.points.toLocaleString()} points
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-muted-foreground text-center py-4 text-sm">No contributors yet.</p>
        )}
      </CardContent>
    </Card>
  )
}
