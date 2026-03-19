"use client"

import { SidebarTrigger } from "@/components/ui/sidebar"
import { Separator } from "@/components/ui/separator"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Search, Focus, X } from "lucide-react"
import { NotificationBell } from "@/components/notifications/notification-bell"
import { ThemeToggle } from "@/components/theme-toggle"
import { useFocusMode } from "@/lib/focus-mode-context"
import { useUser } from "@/lib/user-context"
import { cn } from "@/lib/utils"

export function DashboardHeader() {
  const { isFocusMode, toggleFocusMode } = useFocusMode()
  const { role } = useUser()

  return (
    <>
      {/* Focus Mode Banner */}
      {isFocusMode && (
        <div className="flex items-center justify-between bg-violet-600 px-6 py-2 text-white text-sm animate-in slide-in-from-top duration-300">
          <div className="flex items-center gap-2">
            <Focus className="h-4 w-4" />
            <span className="font-medium">Focus Mode is ON</span>
            <span className="opacity-70">— Notifications and distractions are hidden</span>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={toggleFocusMode}
            className="h-7 text-white hover:text-white hover:bg-white/20 gap-1.5"
          >
            <X className="h-3.5 w-3.5" />
            Exit Focus
          </Button>
        </div>
      )}

      <header className="flex h-14 items-center gap-4 border-b px-6">
        <SidebarTrigger />
        <Separator orientation="vertical" className="h-4" />

        <div className="flex-1 flex items-center gap-4">
          <div className={cn("relative w-full max-w-sm", isFocusMode && "opacity-40 pointer-events-none")}>
            <Search className="absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search courses..."
              className="pl-8 bg-muted/50"
            />
          </div>
        </div>

        {/* Role Badge */}
        <Badge
          variant="secondary"
          className={cn(
            "hidden sm:flex capitalize font-medium",
            role === "admin"
              ? "bg-rose-100 text-rose-700 dark:bg-rose-950/50 dark:text-rose-400"
              : "bg-blue-100 text-blue-700 dark:bg-blue-950/50 dark:text-blue-400"
          )}
        >
          {role === "admin" ? "Admin" : "Student"}
        </Badge>

        {/* Focus Mode Toggle */}
        <Button
          variant={isFocusMode ? "default" : "ghost"}
          size="icon"
          onClick={toggleFocusMode}
          title={isFocusMode ? "Exit Focus Mode" : "Enter Focus Mode"}
          className={cn(
            "transition-all",
            isFocusMode && "bg-violet-600 text-white hover:bg-violet-700"
          )}
        >
          <Focus className="h-5 w-5" />
          <span className="sr-only">{isFocusMode ? "Exit Focus Mode" : "Enter Focus Mode"}</span>
        </Button>

        <ThemeToggle />

        {/* Hide notifications in focus mode */}
        {!isFocusMode && <NotificationBell />}
      </header>
    </>
  )
}
