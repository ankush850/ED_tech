import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Flame } from "lucide-react"

const streakDays: any[] = []

export function LearningStreak() {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2">
          <Flame className="h-5 w-5 text-orange-500" />
          Learning Streak
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-center mb-4">
          <p className="text-4xl font-bold text-muted-foreground">0</p>
          <p className="text-sm text-muted-foreground">day streak</p>
        </div>
        
        {streakDays.length > 0 ? (
          <div className="flex justify-between gap-1">
            {streakDays.map((day, index) => (
              <div key={index} className="flex flex-col items-center gap-1">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium ${
                    day.active
                      ? "bg-orange-500 text-white"
                      : day.today
                      ? "border-2 border-dashed border-orange-500 text-orange-500"
                      : "bg-muted text-muted-foreground"
                  }`}
                >
                  {day.active ? (
                    <Flame className="h-4 w-4" />
                  ) : (
                    day.day
                  )}
                </div>
                <span className="text-xs text-muted-foreground">{day.day}</span>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex justify-between gap-1">
            {["M", "T", "W", "T", "F", "S", "S"].map((day, index) => (
              <div key={index} className="flex flex-col items-center gap-1 opacity-50">
                <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center text-xs font-medium text-muted-foreground">
                  {day}
                </div>
                <span className="text-xs text-muted-foreground">{day}</span>
              </div>
            ))}
          </div>
        )}

        <p className="text-center text-sm text-muted-foreground mt-4">
          Complete today&apos;s lesson to keep your streak!
        </p>
      </CardContent>
    </Card>
  )
}
