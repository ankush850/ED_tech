"use client"

import { useState } from "react"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { ScrollArea } from "@/components/ui/scroll-area"
import { CheckCircle2, Circle, PlayCircle, Lock } from "lucide-react"
import { cn } from "@/lib/utils"

const curriculum: any[] = []

export function LessonsSidebar() {
  const [openSections, setOpenSections] = useState<string[]>([])

  return (
    <ScrollArea className="h-full">
      <div className="p-4">
        <h2 className="font-semibold mb-4">Course Content</h2>
        
        {curriculum.length > 0 ? (
          <Accordion
            type="multiple"
            value={openSections}
            onValueChange={setOpenSections}
            className="space-y-2"
          >
            {curriculum.map((section) => {
              const completedCount = section.lessons.filter((l: any) => l.completed).length
              const totalCount = section.lessons.length
              
              return (
                <AccordionItem
                  key={section.id}
                  value={section.id}
                  className="border rounded-lg overflow-hidden"
                >
                  <AccordionTrigger className="px-4 py-3 hover:no-underline hover:bg-muted/50">
                    <div className="flex flex-col items-start text-left">
                      <span className="font-medium text-sm">{section.title}</span>
                      <span className="text-xs text-muted-foreground mt-0.5">
                        {completedCount}/{totalCount} completed
                      </span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="pb-0">
                    <ul>
                      {section.lessons.map((lesson: any) => (
                        <li key={lesson.id}>
                          <button
                            className={cn(
                              "w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-muted/50 transition-colors",
                              lesson.current && "bg-primary/5 border-l-2 border-primary"
                            )}
                          >
                            <div className="shrink-0">
                              {lesson.completed ? (
                                <CheckCircle2 className="h-4 w-4 text-green-600" />
                              ) : lesson.current ? (
                                <PlayCircle className="h-4 w-4 text-primary" />
                              ) : (
                                <Circle className="h-4 w-4 text-muted-foreground" />
                              )}
                            </div>
                            <div className="flex-1 min-w-0">
                              <p
                                className={cn(
                                  "text-sm truncate",
                                  lesson.current && "font-medium"
                                )}
                              >
                                {lesson.title}
                              </p>
                              <p className="text-xs text-muted-foreground">
                                {lesson.duration}
                              </p>
                            </div>
                          </button>
                        </li>
                      ))}
                    </ul>
                  </AccordionContent>
                </AccordionItem>
              )
            })}
          </Accordion>
        ) : (
          <div className="py-20 text-center">
            <PlayCircle className="h-12 w-12 text-muted-foreground/20 mx-auto mb-4" />
            <p className="text-sm text-muted-foreground italic px-4">
              The instructor hasn't uploaded any content for this course yet.
            </p>
          </div>
        )}
      </div>
    </ScrollArea>
  )
}
