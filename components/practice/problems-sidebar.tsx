"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Search, Check, X, Minus, Filter } from "lucide-react"

interface ProblemsSidebarProps {
  selectedProblem: string
  onSelectProblem: (id: string) => void
}

const problems: any[] = []

export function ProblemsSidebar({ selectedProblem, onSelectProblem }: ProblemsSidebarProps) {
  const [search, setSearch] = useState("")
  const [difficulty, setDifficulty] = useState("all")
  const [status, setStatus] = useState("all")

  const filteredProblems = problems.filter((problem) => {
    const matchesSearch = problem.title.toLowerCase().includes(search.toLowerCase())
    const matchesDifficulty = difficulty === "all" || problem.difficulty.toLowerCase() === difficulty
    const matchesStatus = status === "all" || problem.status === status
    return matchesSearch && matchesDifficulty && matchesStatus
  })

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

  const getStatusIcon = (st: string) => {
    switch (st) {
      case "solved":
        return <Check className="h-4 w-4 text-emerald-500" />
      case "attempted":
        return <Minus className="h-4 w-4 text-amber-500" />
      default:
        return <span className="h-4 w-4" />
    }
  }

  return (
    <div className="flex h-full w-80 flex-col border-r bg-card">
      <div className="border-b p-4">
        <div className="relative mb-3">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search problems..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>
        <div className="flex gap-2">
          <Select value={difficulty} onValueChange={setDifficulty}>
            <SelectTrigger className="flex-1">
              <SelectValue placeholder="Difficulty" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Difficulties</SelectItem>
              <SelectItem value="easy">Easy</SelectItem>
              <SelectItem value="medium">Medium</SelectItem>
              <SelectItem value="hard">Hard</SelectItem>
            </SelectContent>
          </Select>
          <Select value={status} onValueChange={setStatus}>
            <SelectTrigger className="flex-1">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="solved">Solved</SelectItem>
              <SelectItem value="attempted">Attempted</SelectItem>
              <SelectItem value="none">Not Started</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <ScrollArea className="flex-1">
        <div className="p-2">
          {filteredProblems.map((problem) => (
            <button
              key={problem.id}
              onClick={() => onSelectProblem(problem.id)}
              className={cn(
                "flex w-full items-start gap-3 rounded-lg p-3 text-left transition-colors hover:bg-muted/50",
                selectedProblem === problem.id && "bg-muted"
              )}
            >
              <div className="mt-0.5">{getStatusIcon(problem.status)}</div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground">
                    {problem.number}.
                  </span>
                  <span className="truncate text-sm font-medium">
                    {problem.title}
                  </span>
                </div>
                <div className="mt-1.5 flex items-center gap-2">
                  <Badge 
                    variant="outline" 
                    className={cn("text-xs", getDifficultyColor(problem.difficulty))}
                  >
                    {problem.difficulty}
                  </Badge>
                  <span className="text-xs text-muted-foreground">
                    {problem.acceptance}
                  </span>
                </div>
              </div>
            </button>
          ))}
        </div>
      </ScrollArea>

      <div className="border-t p-3">
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <span>{filteredProblems.length} problems</span>
          <span>
            {problems.filter((p: any) => p.status === "solved").length} solved
          </span>
        </div>
      </div>
    </div>
  )
}
