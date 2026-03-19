"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

const problemSolvingStats = {
  easy: { solved: 5, total: 10 },
  medium: { solved: 3, total: 8 },
  hard: { solved: 1, total: 5 },
}

export function ProfileSkills() {
  return (
    <div className="grid gap-6">
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg">Problem Solving</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <div className="mb-1.5 flex items-center justify-between text-sm">
              <span className="font-medium text-emerald-600">Easy</span>
              <span className="text-muted-foreground">
                {problemSolvingStats.easy.solved}/{problemSolvingStats.easy.total}
              </span>
            </div>
            <Progress 
              value={(problemSolvingStats.easy.solved / problemSolvingStats.easy.total) * 100} 
              className="h-2"
            />
          </div>
          <div>
            <div className="mb-1.5 flex items-center justify-between text-sm">
              <span className="font-medium text-amber-600">Medium</span>
              <span className="text-muted-foreground">
                {problemSolvingStats.medium.solved}/{problemSolvingStats.medium.total}
              </span>
            </div>
            <Progress 
              value={(problemSolvingStats.medium.solved / problemSolvingStats.medium.total) * 100} 
              className="h-2"
            />
          </div>
          <div>
            <div className="mb-1.5 flex items-center justify-between text-sm">
              <span className="font-medium text-rose-600">Hard</span>
              <span className="text-muted-foreground">
                {problemSolvingStats.hard.solved}/{problemSolvingStats.hard.total}
              </span>
            </div>
            <Progress 
              value={(problemSolvingStats.hard.solved / problemSolvingStats.hard.total) * 100} 
              className="h-2"
            />
          </div>
          <div className="pt-2 text-center">
            <div className="text-3xl font-bold">
              {problemSolvingStats.easy.solved + problemSolvingStats.medium.solved + problemSolvingStats.hard.solved}
            </div>
            <div className="text-sm text-muted-foreground">
              Total Problems Solved
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
