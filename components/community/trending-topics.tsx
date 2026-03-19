import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { TrendingUp } from "lucide-react"

const topics: any[] = []

export function TrendingTopics() {
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-lg">
          <TrendingUp className="h-5 w-5 text-primary" />
          Trending Topics
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-2">
          {topics.length > 0 ? (
            topics.map((topic) => (
              <Badge
                key={topic.name}
                variant="secondary"
                className="cursor-pointer transition-colors hover:bg-primary hover:text-primary-foreground"
              >
                {topic.name}
                <span className="ml-1.5 rounded bg-background/50 px-1.5 py-0.5 text-xs">
                  {topic.count}
                </span>
              </Badge>
            ))
          ) : (
            <p className="text-sm text-muted-foreground py-4 w-full text-center italic">No trending topics yet.</p>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
