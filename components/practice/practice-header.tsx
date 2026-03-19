"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { 
  PanelLeftClose, 
  PanelLeftOpen, 
  Play, 
  Send, 
  Settings, 
  ChevronLeft,
  Sun,
  Moon,
  Timer,
  RotateCcw
} from "lucide-react"

interface PracticeHeaderProps {
  showSidebar: boolean
  onToggleSidebar: () => void
}

export function PracticeHeader({ showSidebar, onToggleSidebar }: PracticeHeaderProps) {
  const [language, setLanguage] = useState("javascript")
  const [timerActive, setTimerActive] = useState(false)
  const [time, setTime] = useState(0)

  return (
    <header className="flex h-14 items-center justify-between border-b bg-card px-4">
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/dashboard">
            <ChevronLeft className="h-5 w-5" />
          </Link>
        </Button>
        <Button 
          variant="ghost" 
          size="icon"
          onClick={onToggleSidebar}
        >
          {showSidebar ? (
            <PanelLeftClose className="h-5 w-5" />
          ) : (
            <PanelLeftOpen className="h-5 w-5" />
          )}
        </Button>
        <div className="h-6 w-px bg-border" />
        <span className="text-lg font-semibold">Practice</span>
      </div>

      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2 rounded-md border bg-muted/50 px-3 py-1.5">
          <Timer className="h-4 w-4 text-muted-foreground" />
          <span className="font-mono text-sm">
            {String(Math.floor(time / 60)).padStart(2, '0')}:
            {String(time % 60).padStart(2, '0')}
          </span>
          <Button
            variant="ghost"
            size="icon"
            className="h-6 w-6"
            onClick={() => setTimerActive(!timerActive)}
          >
            {timerActive ? (
              <span className="h-2 w-2 rounded-sm bg-destructive" />
            ) : (
              <Play className="h-3 w-3" />
            )}
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-6 w-6"
            onClick={() => setTime(0)}
          >
            <RotateCcw className="h-3 w-3" />
          </Button>
        </div>

        <Select value={language} onValueChange={setLanguage}>
          <SelectTrigger className="w-36">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="javascript">JavaScript</SelectItem>
            <SelectItem value="typescript">TypeScript</SelectItem>
            <SelectItem value="python">Python</SelectItem>
            <SelectItem value="java">Java</SelectItem>
            <SelectItem value="cpp">C++</SelectItem>
            <SelectItem value="go">Go</SelectItem>
          </SelectContent>
        </Select>

        <div className="h-6 w-px bg-border" />

        <Button variant="outline" size="sm" className="gap-2">
          <Play className="h-4 w-4" />
          Run
        </Button>
        <Button size="sm" className="gap-2">
          <Send className="h-4 w-4" />
          Submit
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <Settings className="h-5 w-5" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>
              <Sun className="mr-2 h-4 w-4" />
              Light Theme
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Moon className="mr-2 h-4 w-4" />
              Dark Theme
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}
