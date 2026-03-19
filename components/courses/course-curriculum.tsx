"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { PlayCircle, FileText, Lock, Clock } from "lucide-react"

interface CourseCurriculumProps {
  modules?: any[]
}

export function CourseCurriculum({ modules = [] }: CourseCurriculumProps) {
  const allLessons = modules.flatMap(m => m.lessons || [])
  const totalLessons = allLessons.length
  const totalDuration = "Varies" // Could sum lesson durations if available

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Course Curriculum</CardTitle>
          <span className="text-sm text-muted-foreground">
            {modules.length} modules • {totalLessons} lessons
          </span>
        </div>
      </CardHeader>
      <CardContent>
        {modules.length > 0 ? (
          <Accordion type="multiple" defaultValue={[modules[0].id]} className="w-full">
            {modules.map((module) => (
              <AccordionItem key={module.id} value={module.id}>
                <AccordionTrigger className="hover:no-underline">
                  <div className="flex items-center justify-between w-full pr-4">
                    <span className="font-medium text-left">{module.title}</span>
                    <span className="text-sm text-muted-foreground">
                      {module.lessons?.length || 0} lessons
                    </span>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <ul className="space-y-1">
                    {(module.lessons || []).map((lesson: any, index: number) => (
                      <li
                        key={lesson.id || index}
                        className="flex items-center justify-between p-3 rounded-md hover:bg-muted/50"
                      >
                        <div className="flex items-center gap-3">
                          {lesson.type === "VIDEO" ? (
                            <PlayCircle className="h-4 w-4 text-muted-foreground" />
                          ) : (
                            <FileText className="h-4 w-4 text-muted-foreground" />
                          )}
                          <span className="text-sm">{lesson.title}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Lock className="h-3.5 w-3.5 text-muted-foreground" />
                        </div>
                      </li>
                    ))}
                  </ul>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        ) : (
          <p className="p-8 text-center text-muted-foreground italic bg-muted/30 rounded-lg">
            No curriculum items available for this course yet.
          </p>
        )}
      </CardContent>
    </Card>
  )
}
