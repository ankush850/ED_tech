"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import {
  GraduationCap,
  PanelLeftClose,
  PanelLeftOpen,
  MessageSquare,
  FileText,
  Users,
  X,
  ChevronLeft,
} from "lucide-react"

interface LearningHeaderProps {
  sidebarOpen: boolean
  setSidebarOpen: (open: boolean) => void
  rightPanelOpen: boolean
  setRightPanelOpen: (open: boolean) => void
  rightPanelTab: "chat" | "notes" | "discussion"
  setRightPanelTab: (tab: "chat" | "notes" | "discussion") => void
}

export function LearningHeader({
  sidebarOpen,
  setSidebarOpen,
  rightPanelOpen,
  setRightPanelOpen,
  rightPanelTab,
  setRightPanelTab,
}: LearningHeaderProps) {
  const courseProgress = 68

  const toggleRightPanel = (tab: "chat" | "notes" | "discussion") => {
    if (rightPanelOpen && rightPanelTab === tab) {
      setRightPanelOpen(false)
    } else {
      setRightPanelTab(tab)
      setRightPanelOpen(true)
    }
  }

  return (
    <header className="h-14 border-b flex items-center justify-between px-4 bg-background shrink-0">
      <div className="flex items-center gap-4">
        <Link href="/dashboard" className="flex items-center gap-2 text-muted-foreground hover:text-foreground">
          <ChevronLeft className="h-4 w-4" />
          <span className="text-sm hidden sm:inline">Back to Dashboard</span>
        </Link>
        
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="hidden lg:flex"
        >
          {sidebarOpen ? (
            <PanelLeftClose className="h-4 w-4" />
          ) : (
            <PanelLeftOpen className="h-4 w-4" />
          )}
          <span className="sr-only">Toggle sidebar</span>
        </Button>
      </div>

      <div className="flex items-center gap-2">
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-md bg-primary">
            <GraduationCap className="h-4 w-4 text-primary-foreground" />
          </div>
          <span className="font-semibold hidden sm:inline">LearnHub</span>
        </Link>
      </div>

      <div className="flex items-center gap-2">
        <div className="hidden md:flex items-center gap-2 mr-4">
          <span className="text-sm text-muted-foreground">{courseProgress}% complete</span>
          <Progress value={courseProgress} className="w-32 h-2" />
        </div>

        <Button
          variant={rightPanelOpen && rightPanelTab === "chat" ? "secondary" : "ghost"}
          size="icon"
          onClick={() => toggleRightPanel("chat")}
          className="hidden lg:flex"
        >
          <MessageSquare className="h-4 w-4" />
          <span className="sr-only">AI Assistant</span>
        </Button>
        
        <Button
          variant={rightPanelOpen && rightPanelTab === "notes" ? "secondary" : "ghost"}
          size="icon"
          onClick={() => toggleRightPanel("notes")}
          className="hidden lg:flex"
        >
          <FileText className="h-4 w-4" />
          <span className="sr-only">Notes</span>
        </Button>
        
        <Button
          variant={rightPanelOpen && rightPanelTab === "discussion" ? "secondary" : "ghost"}
          size="icon"
          onClick={() => toggleRightPanel("discussion")}
          className="hidden lg:flex"
        >
          <Users className="h-4 w-4" />
          <span className="sr-only">Discussion</span>
        </Button>

        {rightPanelOpen && (
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setRightPanelOpen(false)}
            className="hidden lg:flex"
          >
            <X className="h-4 w-4" />
            <span className="sr-only">Close panel</span>
          </Button>
        )}
      </div>
    </header>
  )
}
