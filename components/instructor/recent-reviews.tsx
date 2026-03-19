import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Star, MessageSquare } from "lucide-react"

const reviews: any[] = []

export function RecentReviews() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-lg">Recent Reviews</CardTitle>
        <Button variant="outline" size="sm">View All</Button>
      </CardHeader>
      <CardContent className="space-y-6">
        {reviews.length > 0 ? (
          reviews.map((review) => (
            <div key={review.id} className="flex gap-4">
              <Avatar className="h-10 w-10">
                <AvatarImage src={review.student.avatar} />
                <AvatarFallback>
                  {review.student.name.split(" ").map((n: string) => n[0]).join("")}
                </AvatarFallback>
              </Avatar>
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="font-medium">{review.student.name}</span>
                  <div className="flex items-center">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${
                          i < review.rating
                            ? "fill-amber-400 text-amber-400"
                            : "text-muted"
                        }`}
                      />
                    ))}
                  </div>
                  {review.replied && (
                    <Badge variant="secondary" className="text-xs">
                      Replied
                    </Badge>
                  )}
                </div>
                <p className="mt-0.5 text-sm text-muted-foreground">
                  {review.course} • {review.timestamp}
                </p>
                <p className="mt-2 text-sm">{review.comment}</p>
                {!review.replied && (
                  <Button variant="ghost" size="sm" className="mt-2 h-8 gap-1.5 px-2">
                    <MessageSquare className="h-3.5 w-3.5" />
                    Reply
                  </Button>
                )}
              </div>
            </div>
          ))
        ) : (
          <p className="text-muted-foreground text-center py-6 text-sm italic">No reviews yet.</p>
        )}
      </CardContent>
    </Card>
  )
}
