"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { 
  Bell, 
  BookOpen, 
  MessageSquare, 
  Award, 
  Calendar,
  User,
  Settings,
  Check,
  Trash2,
  Star
} from "lucide-react"

const notifications: any[] = []

const typeColors: Record<string, string> = {
  course: "bg-blue-100 text-blue-600",
  discussion: "bg-violet-100 text-violet-600",
  achievement: "bg-amber-100 text-amber-600",
  reminder: "bg-rose-100 text-rose-600",
  social: "bg-emerald-100 text-emerald-600",
}

export default function NotificationsPage() {
  const [activeTab, setActiveTab] = useState("all")
  const [notifs, setNotifs] = useState(notifications)

  const unreadCount = notifs.filter(n => !n.read).length

  const markAllRead = () => {
    setNotifs(notifs.map(n => ({ ...n, read: true })))
  }

  const markAsRead = (id: number) => {
    setNotifs(notifs.map(n => n.id === id ? { ...n, read: true } : n))
  }

  const filteredNotifs = activeTab === "all" 
    ? notifs 
    : activeTab === "unread" 
      ? notifs.filter(n => !n.read)
      : notifs.filter(n => n.type === activeTab)

  return (
    <div className="container mx-auto max-w-4xl px-4 py-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Notifications</h1>
          <p className="mt-1 text-muted-foreground">
            Stay updated with your learning journey
          </p>
        </div>
        <div className="flex gap-2">
          {unreadCount > 0 && (
            <Button variant="outline" size="sm" onClick={markAllRead}>
              <Check className="mr-2 h-4 w-4" />
              Mark all read
            </Button>
          )}
          <Button variant="outline" size="sm">
            <Settings className="mr-2 h-4 w-4" />
            Settings
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="mt-6">
        <TabsList>
          <TabsTrigger value="all" className="gap-2">
            All
            {unreadCount > 0 && (
              <Badge variant="secondary" className="h-5 px-1.5">
                {unreadCount}
              </Badge>
            )}
          </TabsTrigger>
          <TabsTrigger value="unread">Unread</TabsTrigger>
          <TabsTrigger value="course">Courses</TabsTrigger>
          <TabsTrigger value="discussion">Discussions</TabsTrigger>
          <TabsTrigger value="achievement">Achievements</TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab} className="mt-6">
          <Card>
            <CardContent className="p-0">
              {filteredNotifs.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <Bell className="h-12 w-12 text-muted-foreground/50" />
                  <h3 className="mt-4 font-medium">No notifications</h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    You're all caught up!
                  </p>
                </div>
              ) : (
                <div className="divide-y">
                  {filteredNotifs.map((notification) => (
                    <div
                      key={notification.id}
                      className={`flex items-start gap-4 p-4 transition-colors hover:bg-muted/50 ${
                        !notification.read ? "bg-muted/30" : ""
                      }`}
                    >
                      <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${typeColors[notification.type]}`}>
                        <notification.icon className="h-5 w-5" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2">
                          <h4 className="font-medium">{notification.title}</h4>
                          {!notification.read && (
                            <span className="h-2 w-2 rounded-full bg-primary" />
                          )}
                        </div>
                        <p className="mt-0.5 text-sm text-muted-foreground">
                          {notification.description}
                        </p>
                        <p className="mt-1 text-xs text-muted-foreground">
                          {notification.timestamp}
                        </p>
                      </div>
                      <div className="flex items-center gap-1">
                        {!notification.read && (
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => markAsRead(notification.id)}
                          >
                            <Check className="h-4 w-4" />
                          </Button>
                        )}
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-destructive">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <Card className="mt-8">
        <CardHeader>
          <CardTitle className="text-lg">Notification Preferences</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {[
            { label: "Course updates", description: "New lessons, content updates", enabled: true },
            { label: "Discussion replies", description: "Replies to your posts and comments", enabled: true },
            { label: "Live class reminders", description: "Reminders before scheduled live classes", enabled: true },
            { label: "Achievement notifications", description: "Badges, certificates, and milestones", enabled: true },
            { label: "Marketing emails", description: "Promotions and course recommendations", enabled: false },
          ].map((pref) => (
            <div key={pref.label} className="flex items-center justify-between">
              <div>
                <div className="font-medium">{pref.label}</div>
                <div className="text-sm text-muted-foreground">{pref.description}</div>
              </div>
              <Switch defaultChecked={pref.enabled} />
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}
