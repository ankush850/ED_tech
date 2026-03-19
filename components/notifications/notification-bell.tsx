"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { 
  Bell, 
  BookOpen, 
  MessageSquare, 
  Award, 
  Calendar,
  Check,
  Settings
} from "lucide-react"

const notifications: any[] = []

export function NotificationBell() {
  const [isOpen, setIsOpen] = useState(false)
  const unreadCount = notifications.filter(n => !n.read).length

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <Badge 
              variant="destructive" 
              className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs"
            >
              {unreadCount}
            </Badge>
          )}
          <span className="sr-only">Notifications</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent align="end" className="w-80 p-0">
        <div className="flex items-center justify-between border-b px-4 py-3">
          <h4 className="font-semibold">Notifications</h4>
          <div className="flex gap-1">
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <Check className="h-4 w-4" />
              <span className="sr-only">Mark all as read</span>
            </Button>
            <Button variant="ghost" size="icon" className="h-8 w-8" asChild>
              <Link href="/notifications">
                <Settings className="h-4 w-4" />
                <span className="sr-only">Notification settings</span>
              </Link>
            </Button>
          </div>
        </div>
        
        <ScrollArea className="h-80">
          <div className="divide-y">
            {notifications.length > 0 ? (
              notifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`flex items-start gap-3 p-4 hover:bg-muted/50 cursor-pointer ${
                    !notification.read ? "bg-muted/30" : ""
                  }`}
                >
                  <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full ${notification.iconBg}`}>
                    <notification.icon className="h-4 w-4" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <h5 className="text-sm font-medium truncate">{notification.title}</h5>
                      {!notification.read && (
                        <span className="h-2 w-2 rounded-full bg-primary shrink-0" />
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground truncate">
                      {notification.description}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {notification.timestamp}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <div className="p-8 text-center text-sm text-muted-foreground italic">
                No new notifications.
              </div>
            )}
          </div>
        </ScrollArea>
        
        <div className="border-t p-2">
          <Button 
            variant="ghost" 
            className="w-full text-sm" 
            asChild
            onClick={() => setIsOpen(false)}
          >
            <Link href="/notifications">View all notifications</Link>
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  )
}
