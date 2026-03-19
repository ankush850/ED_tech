"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, Clock, Users, Bell, BellOff, ExternalLink } from "lucide-react"

const upcomingClasses: any[] = []

const levelColors: Record<string, string> = {
  Beginner: "bg-emerald-50 text-emerald-700 border-emerald-200",
  Intermediate: "bg-amber-50 text-amber-700 border-amber-200",
  Advanced: "bg-rose-50 text-rose-700 border-rose-200",
}

export function UpcomingLiveClasses() {
  const [notified, setNotified] = useState<Record<number, boolean>>(
    upcomingClasses.reduce((acc, c) => ({ ...acc, [c.id]: c.isNotified }), {})
  )

  const toggleNotification = (id: number) => {
    setNotified((prev) => ({ ...prev, [id]: !prev[id] }))
  }

  return (
    <div className="space-y-4">
      {upcomingClasses.length > 0 ? (
        upcomingClasses.map((liveClass) => (
          <Card key={liveClass.id}>
            {/* ... card content from above ... */}
          </Card>
        ))
      ) : (
        <div className="flex flex-col items-center justify-center rounded-xl border-2 border-dashed p-12 text-center">
          <Calendar className="h-12 w-12 text-muted-foreground/50" />
          <h3 className="mt-4 text-lg font-semibold">No upcoming classes</h3>
          <p className="text-muted-foreground">Check back later for new scheduled sessions.</p>
        </div>
      )}
    </div>
  )
}
