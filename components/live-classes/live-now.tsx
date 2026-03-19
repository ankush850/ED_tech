"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Play, Users, Clock, Radio } from "lucide-react"

const liveClasses: any[] = []

export function LiveNow() {
  if (liveClasses.length === 0) {
    return null
  }

  return (
    <div>
      <div className="mb-4 flex items-center gap-2">
        <Radio className="h-5 w-5 animate-pulse text-rose-500" />
        <h2 className="text-xl font-semibold">Live Now</h2>
      </div>
      
      <div className="grid gap-6 md:grid-cols-2">
        {liveClasses.map((liveClass) => (
          <Card key={liveClass.id} className="overflow-hidden">
            <div className="relative aspect-video bg-muted">
              <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-primary/20 to-primary/5">
                <Button size="lg" className="gap-2 rounded-full">
                  <Play className="h-5 w-5" />
                  Join Live
                </Button>
              </div>
              <Badge className="absolute left-3 top-3 gap-1 bg-rose-500">
                <span className="h-2 w-2 animate-pulse rounded-full bg-white" />
                LIVE
              </Badge>
              <div className="absolute bottom-3 left-3 flex items-center gap-2">
                <Badge variant="secondary" className="gap-1">
                  <Users className="h-3 w-3" />
                  {liveClass.viewers} watching
                </Badge>
                <Badge variant="secondary" className="gap-1">
                  <Clock className="h-3 w-3" />
                  {liveClass.startedAt}
                </Badge>
              </div>
            </div>
            <CardContent className="p-4">
              <Badge variant="outline" className="mb-2">
                {liveClass.category}
              </Badge>
              <h3 className="font-semibold leading-tight">
                {liveClass.title}
              </h3>
              <div className="mt-3 flex items-center gap-2">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={liveClass.instructor.avatar} />
                  <AvatarFallback>
                    {liveClass.instructor.name.split(" ").map(n => n[0]).join("")}
                  </AvatarFallback>
                </Avatar>
                <span className="text-sm text-muted-foreground">
                  {liveClass.instructor.name}
                </span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
