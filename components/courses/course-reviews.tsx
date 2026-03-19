"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Star, ThumbsUp } from "lucide-react"

interface CourseReviewsProps {
  rating: number
  reviews: number
}

const reviewsData: any[] = []

const ratingBreakdown = [
  { stars: 5, percentage: 0 },
  { stars: 4, percentage: 0 },
  { stars: 3, percentage: 0 },
  { stars: 2, percentage: 0 },
  { stars: 1, percentage: 0 },
]

export function CourseReviews({ rating, reviews }: CourseReviewsProps) {
  const [showAll, setShowAll] = useState(false)

  return (
    <Card>
      <CardHeader>
        <CardTitle>Student Reviews</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col md:flex-row gap-8 mb-8">
          <div className="text-center md:text-left">
            <p className="text-5xl font-bold text-primary">{rating}</p>
            <div className="flex justify-center md:justify-start mt-2">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-5 w-5 ${
                    i < Math.floor(rating)
                      ? "fill-yellow-500 text-yellow-500"
                      : "text-muted-foreground/30"
                  }`}
                />
              ))}
            </div>
            <p className="text-sm text-muted-foreground mt-1">
              Course Rating • {reviews.toLocaleString()} reviews
            </p>
          </div>

          <div className="flex-1 space-y-2">
            {ratingBreakdown.map((item) => (
              <div key={item.stars} className="flex items-center gap-3">
                <div className="flex items-center gap-1 w-16">
                  {[...Array(item.stars)].map((_, i) => (
                    <Star key={i} className="h-3 w-3 fill-yellow-500 text-yellow-500" />
                  ))}
                </div>
                <Progress value={item.percentage} className="h-2 flex-1" />
                <span className="text-sm text-muted-foreground w-12">
                  {item.percentage}%
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          {reviewsData.length > 0 ? (
            reviewsData.map((review) => (
              <div key={review.id} className="border-b pb-6 last:border-0">
                <div className="flex items-start gap-3">
                  <Avatar>
                    <AvatarFallback className="bg-muted text-muted-foreground">
                      {review.avatar}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">{review.author}</p>
                        <div className="flex items-center gap-2">
                          <div className="flex">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`h-3 w-3 ${
                                  i < review.rating
                                    ? "fill-yellow-500 text-yellow-500"
                                    : "text-muted-foreground/30"
                                }`}
                              />
                            ))}
                          </div>
                          <span className="text-xs text-muted-foreground">
                            {review.date}
                          </span>
                        </div>
                      </div>
                    </div>
                    <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                      {review.content}
                    </p>
                    <Button variant="ghost" size="sm" className="mt-2 gap-1.5 text-xs">
                      <ThumbsUp className="h-3 w-3" />
                      Helpful ({review.helpful})
                    </Button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="p-8 text-center text-muted-foreground italic bg-muted/30 rounded-lg">
              No reviews yet for this course.
            </p>
          )}
        </div>

        <Button
          variant="outline"
          className="w-full mt-4"
          onClick={() => setShowAll(!showAll)}
        >
          {showAll ? "Show less" : "Show all reviews"}
        </Button>
      </CardContent>
    </Card>
  )
}
