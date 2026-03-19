"use client"

import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { cn } from "@/lib/utils"
import { ThumbsUp, ThumbsDown, MessageSquare, Bookmark, Share2 } from "lucide-react"
import { Button } from "@/components/ui/button"

interface ProblemDescriptionProps {
  problemId: string
}

const problemsData: Record<string, any> = {}

export function ProblemDescription({ problemId }: ProblemDescriptionProps) {
  const problem = problemsData[problemId] || problemsData["two-sum"]

  const getDifficultyColor = (diff: string) => {
    switch (diff) {
      case "Easy":
        return "text-emerald-600 bg-emerald-50 border-emerald-200"
      case "Medium":
        return "text-amber-600 bg-amber-50 border-amber-200"
      case "Hard":
        return "text-rose-600 bg-rose-50 border-rose-200"
      default:
        return ""
    }
  }

  return (
    <div className="flex h-full flex-col bg-card">
      <Tabs defaultValue="description" className="flex h-full flex-col">
        <div className="border-b px-4">
          <TabsList className="h-12 w-full justify-start gap-4 rounded-none bg-transparent p-0">
            <TabsTrigger
              value="description"
              className="h-12 rounded-none border-b-2 border-transparent px-0 data-[state=active]:border-foreground data-[state=active]:bg-transparent"
            >
              Description
            </TabsTrigger>
            <TabsTrigger
              value="editorial"
              className="h-12 rounded-none border-b-2 border-transparent px-0 data-[state=active]:border-foreground data-[state=active]:bg-transparent"
            >
              Editorial
            </TabsTrigger>
            <TabsTrigger
              value="solutions"
              className="h-12 rounded-none border-b-2 border-transparent px-0 data-[state=active]:border-foreground data-[state=active]:bg-transparent"
            >
              Solutions
            </TabsTrigger>
            <TabsTrigger
              value="submissions"
              className="h-12 rounded-none border-b-2 border-transparent px-0 data-[state=active]:border-foreground data-[state=active]:bg-transparent"
            >
              Submissions
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="description" className="mt-0 flex-1 overflow-hidden">
          <ScrollArea className="h-full">
            <div className="p-6">
              {problem ? (
                <>
                  <div className="mb-4 flex items-center gap-3">
                    <h1 className="text-xl font-semibold">
                      {problem.number}. {problem.title}
                    </h1>
                    <Badge
                      variant="outline"
                      className={cn("text-xs", getDifficultyColor(problem.difficulty))}
                    >
                      {problem.difficulty}
                    </Badge>
                  </div>

                  <div className="mb-6 flex items-center gap-4">
                    <Button variant="ghost" size="sm" className="gap-1.5 text-muted-foreground">
                      <ThumbsUp className="h-4 w-4" />
                      <span>{problem.likes || 0}</span>
                    </Button>
                    <Button variant="ghost" size="sm" className="gap-1.5 text-muted-foreground">
                      <ThumbsDown className="h-4 w-4" />
                      <span>{problem.dislikes || 0}</span>
                    </Button>
                    <Button variant="ghost" size="sm" className="gap-1.5 text-muted-foreground">
                      <MessageSquare className="h-4 w-4" />
                      <span>Comments</span>
                    </Button>
                    <Button variant="ghost" size="sm" className="gap-1.5 text-muted-foreground">
                      <Bookmark className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm" className="gap-1.5 text-muted-foreground">
                      <Share2 className="h-4 w-4" />
                    </Button>
                  </div>

                  <div className="prose prose-sm max-w-none dark:prose-invert">
                    <div className="whitespace-pre-wrap text-sm leading-relaxed">
                      {problem.description}
                    </div>

                    <div className="mt-6">
                      {(problem.examples || []).map((example: any, index: number) => (
                        <div key={index} className="mb-4">
                          <h4 className="mb-2 font-medium">Example {index + 1}:</h4>
                          <div className="rounded-lg bg-muted/50 p-4 font-mono text-sm">
                            <div className="mb-1">
                              <span className="text-muted-foreground">Input: </span>
                              {example.input}
                            </div>
                            <div className="mb-1">
                              <span className="text-muted-foreground">Output: </span>
                              {example.output}
                            </div>
                            {example.explanation && (
                              <div>
                                <span className="text-muted-foreground">Explanation: </span>
                                {example.explanation}
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="mt-6">
                      <h4 className="mb-2 font-medium">Constraints:</h4>
                      <ul className="list-inside list-disc space-y-1 text-sm">
                        {(problem.constraints || []).map((constraint: string, index: number) => (
                          <li key={index} className="font-mono text-sm">
                            {constraint}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="mt-6">
                      <h4 className="mb-2 font-medium">Topics:</h4>
                      <div className="flex flex-wrap gap-2">
                        {(problem.topics || []).map((topic: string) => (
                          <Badge key={topic} variant="secondary">
                            {topic}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div className="mt-6">
                      <h4 className="mb-2 font-medium">Companies:</h4>
                      <div className="flex flex-wrap gap-2">
                        {(problem.companies || []).map((company: string) => (
                          <Badge key={company} variant="outline">
                            {company}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                <div className="h-full flex flex-col items-center justify-center text-center py-20">
                  <h3 className="text-lg font-semibold">Problem Not Found</h3>
                  <p className="text-muted-foreground max-w-xs mt-2 text-sm italic">
                    Select a problem from the sidebar to view its description.
                  </p>
                </div>
              )}
            </div>
          </ScrollArea>
        </TabsContent>

        <TabsContent value="editorial" className="mt-0 flex-1">
          <div className="flex h-full items-center justify-center text-muted-foreground">
            Editorial content coming soon
          </div>
        </TabsContent>

        <TabsContent value="solutions" className="mt-0 flex-1">
          <div className="flex h-full items-center justify-center text-muted-foreground">
            Community solutions coming soon
          </div>
        </TabsContent>

        <TabsContent value="submissions" className="mt-0 flex-1">
          <div className="flex h-full items-center justify-center text-muted-foreground">
            Your submissions will appear here
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
