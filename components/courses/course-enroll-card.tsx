"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Spinner } from "@/components/ui/spinner"
import { Play, Heart, Share2, Check, Clock } from "lucide-react"

import { useUser } from "@/lib/user-context"

interface CourseEnrollCardProps {
  course: {
    id: string
    price: number
    originalPrice: number
    features: string[]
  }
}

export function CourseEnrollCard({ course }: CourseEnrollCardProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [isWishlisted, setIsWishlisted] = useState(false)
  const { id: userId } = useUser()

  const discountValue = course.originalPrice > 0 
    ? Math.round(((course.originalPrice - course.price) / course.originalPrice) * 100)
    : 0

  const handleEnroll = async () => {
    if (!userId) {
      window.location.href = `/login?callbackUrl=/courses/${course.id}`
      return
    }

    setIsLoading(true)
    try {
      const res = await fetch(`/api/courses/${course.id}/enroll`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId })
      })
      if (res.ok) {
        window.location.href = `/learn/${course.id}`
      }
    } catch (e) {
      console.error(e)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card className="overflow-hidden">
      <div className="aspect-video bg-muted relative">
        <div className="absolute inset-0 flex items-center justify-center">
          <Button size="lg" variant="secondary" className="gap-2 rounded-full">
            <Play className="h-5 w-5" />
            Preview Course
          </Button>
        </div>
      </div>
      <CardContent className="p-6">
        <div className="flex items-baseline gap-2">
          <span className="text-3xl font-bold">${course.price}</span>
          <span className="text-lg text-muted-foreground line-through">
            ${course.originalPrice}
          </span>
          <span className="text-sm font-medium text-green-600">{discountValue}% off</span>
        </div>

        <div className="flex items-center gap-2 mt-2 text-sm text-destructive">
          <Clock className="h-4 w-4" />
          <span className="font-medium">2 days left at this price!</span>
        </div>

        <div className="mt-6 space-y-3">
          <Button
            className="w-full"
            size="lg"
            onClick={handleEnroll}
            disabled={isLoading}
          >
            {isLoading ? <Spinner className="mr-2" /> : null}
            {isLoading ? "Processing..." : "Enroll Now"}
          </Button>
          <Button variant="outline" className="w-full" size="lg">
            Add to Cart
          </Button>
        </div>

        <p className="text-center text-xs text-muted-foreground mt-3">
          30-Day Money-Back Guarantee
        </p>

        <Separator className="my-6" />

        <div>
          <h4 className="font-semibold mb-3">This course includes:</h4>
          <ul className="space-y-2">
            {course.features.map((feature, index) => (
              <li key={index} className="flex items-center gap-2 text-sm">
                <Check className="h-4 w-4 text-green-600" />
                {feature}
              </li>
            ))}
          </ul>
        </div>

        <Separator className="my-6" />

        <div className="flex gap-2">
          <Button
            variant="outline"
            className="flex-1 gap-2"
            onClick={() => setIsWishlisted(!isWishlisted)}
          >
            <Heart
              className={`h-4 w-4 ${isWishlisted ? "fill-red-500 text-red-500" : ""}`}
            />
            {isWishlisted ? "Wishlisted" : "Wishlist"}
          </Button>
          <Button variant="outline" className="flex-1 gap-2">
            <Share2 className="h-4 w-4" />
            Share
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
