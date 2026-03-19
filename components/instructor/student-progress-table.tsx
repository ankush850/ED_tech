"use client"

import { useEffect, useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Spinner } from "@/components/ui/spinner"
import { CheckCircle2, XCircle, Clock, Trophy, Users } from "lucide-react"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

interface VideoProgress {
  courseTitle: string
  videoTitle: string
  watchedSec: number
  completed: boolean
  quizScore: number | null
  quizPassed: boolean | null
  quizAttempts: number
}

interface StudentData {
  student: { id: string; name: string; email: string }
  videoProgress: VideoProgress[]
}

function formatTime(sec: number) {
  const m = Math.floor(sec / 60)
  const s = sec % 60
  return `${m}m ${s}s`
}

export function StudentProgressTable({ teacherId }: { teacherId?: string }) {
  const [data, setData] = useState<StudentData[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [expanded, setExpanded] = useState<string | null>(null)

  useEffect(() => {
    const url = teacherId
      ? `/api/admin/progress?teacherId=${teacherId}`
      : "/api/admin/progress"
    fetch(url)
      .then((r) => r.json())
      .then((d) => { setData(d); setIsLoading(false) })
      .catch(() => setIsLoading(false))
  }, [teacherId])

  if (isLoading) return <div className="flex justify-center py-12"><Spinner /></div>
  if (data.length === 0) return (
    <div className="text-center py-12 text-muted-foreground">
      <Users className="h-10 w-10 mx-auto mb-3 opacity-40" />
      <p>No students enrolled yet.</p>
    </div>
  )

  return (
    <div className="space-y-4">
      {data.map(({ student, videoProgress }) => {
        const completedCount = videoProgress.filter((v) => v.completed).length
        const totalVideos = videoProgress.length
        const overallPct = totalVideos > 0 ? Math.round((completedCount / totalVideos) * 100) : 0
        const isOpen = expanded === student.id

        return (
          <div key={student.id} className="rounded-xl border overflow-hidden">
            {/* Student summary row */}
            <button
              className="w-full flex items-center gap-4 p-4 hover:bg-muted/40 transition-colors text-left"
              onClick={() => setExpanded(isOpen ? null : student.id)}
            >
              <div className="h-9 w-9 rounded-full bg-primary/10 flex items-center justify-center font-semibold text-sm">
                {student.name.slice(0, 2).toUpperCase()}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium">{student.name}</p>
                <p className="text-xs text-muted-foreground">{student.email}</p>
              </div>
              <div className="flex items-center gap-4 shrink-0">
                <div className="text-right hidden sm:block">
                  <p className="text-sm font-medium">{completedCount}/{totalVideos} videos</p>
                  <p className="text-xs text-muted-foreground">completed</p>
                </div>
                <div className="w-24 hidden md:block">
                  <Progress value={overallPct} className="h-2" />
                  <p className="text-xs text-muted-foreground mt-1 text-right">{overallPct}%</p>
                </div>
                <Badge variant={overallPct === 100 ? "default" : "secondary"}>
                  {overallPct === 100 ? <><Trophy className="h-3 w-3 mr-1" />Done</> : `${overallPct}%`}
                </Badge>
              </div>
            </button>

            {/* Expanded video detail */}
            {isOpen && (
              <div className="border-t">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-muted/30">
                      <TableHead>Course</TableHead>
                      <TableHead>Video</TableHead>
                      <TableHead>Watch Time</TableHead>
                      <TableHead>Completed</TableHead>
                      <TableHead>Quiz Score</TableHead>
                      <TableHead>Attempts</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {videoProgress.map((vp, i) => (
                      <TableRow key={i}>
                        <TableCell className="text-xs text-muted-foreground">{vp.courseTitle}</TableCell>
                        <TableCell className="font-medium text-sm">{vp.videoTitle}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1 text-sm">
                            <Clock className="h-3 w-3 text-muted-foreground" />
                            {formatTime(vp.watchedSec)}
                          </div>
                        </TableCell>
                        <TableCell>
                          {vp.completed
                            ? <CheckCircle2 className="h-4 w-4 text-green-500" />
                            : <XCircle className="h-4 w-4 text-muted-foreground/40" />}
                        </TableCell>
                        <TableCell>
                          {vp.quizScore !== null ? (
                            <Badge variant={vp.quizPassed ? "default" : "destructive"} className="text-xs">
                              {vp.quizScore}/5 {vp.quizPassed ? "✓" : "✗"}
                            </Badge>
                          ) : <span className="text-xs text-muted-foreground">—</span>}
                        </TableCell>
                        <TableCell className="text-sm">{vp.quizAttempts || "—"}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}
