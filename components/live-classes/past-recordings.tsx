import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Play, Clock, Eye, Download } from "lucide-react"

const recordings: any[] = []

export function PastRecordings() {
  return (
    <>
      {recordings.length > 0 ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {recordings.map((recording) => (
            <Card key={recording.id} className="overflow-hidden">
              <div className="group relative aspect-video bg-muted">
                <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-primary/10 to-primary/5 opacity-0 transition-opacity group-hover:opacity-100">
                  <Button size="lg" className="gap-2 rounded-full">
                    <Play className="h-5 w-5" />
                    Watch
                  </Button>
                </div>
                <div className="absolute bottom-2 right-2">
                  <Badge variant="secondary" className="gap-1 bg-background/80 backdrop-blur">
                    <Clock className="h-3 w-3" />
                    {recording.duration}
                  </Badge>
                </div>
              </div>
              <CardContent className="p-4">
                <Badge variant="outline" className="mb-2">
                  {recording.category}
                </Badge>
                <h3 className="line-clamp-2 font-semibold leading-tight">
                  {recording.title}
                </h3>
                <div className="mt-3 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Avatar className="h-7 w-7">
                      <AvatarImage src={recording.instructor.avatar} />
                      <AvatarFallback>
                        {recording.instructor.name.split(" ").map(n => n[0]).join("")}
                      </AvatarFallback>
                    </Avatar>
                    <span className="text-sm text-muted-foreground">
                      {recording.instructor.name}
                    </span>
                  </div>
                </div>
                <div className="mt-3 flex items-center justify-between text-xs text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Eye className="h-3.5 w-3.5" />
                    {recording.views.toLocaleString()} views
                  </span>
                  <span>{recording.date}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center rounded-xl border-2 border-dashed p-12 text-center col-span-full">
          <Play className="h-12 w-12 text-muted-foreground/50" />
          <h3 className="mt-4 text-lg font-semibold">No recordings available</h3>
          <p className="text-muted-foreground">Recorded sessions will appear here after they conclude.</p>
        </div>
      )}
    </>
  )
}
