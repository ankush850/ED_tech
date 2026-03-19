"use client"

import { useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import {
  Hash,
  Volume2,
  Settings,
  Plus,
  Search,
  Send,
  Smile,
  Paperclip,
  AtSign,
  Pin,
  Bell,
  BellOff,
  Users,
  ChevronDown,
  Mic,
  Headphones,
  MoreHorizontal,
} from "lucide-react"

const channels: any[] = []

const messages: any[] = []

const onlineMembers: any[] = []

const roleColors: Record<string, string> = {
  "Instructor": "text-amber-500",
  "Pro Member": "text-emerald-500",
  "Member": "text-foreground",
}

const statusColors: Record<string, string> = {
  "online": "bg-emerald-500",
  "idle": "bg-amber-500",
  "dnd": "bg-rose-500",
  "offline": "bg-muted-foreground",
}

export function ChatInterface() {
  const [selectedChannel, setSelectedChannel] = useState("general")
  const [message, setMessage] = useState("")
  const [showMembers, setShowMembers] = useState(true)

  return (
    <div className="flex h-[calc(100vh-12rem)] rounded-lg border overflow-hidden">
      {/* Channel Sidebar */}
      <aside className="w-60 border-r bg-muted/30 flex flex-col">
        <div className="p-4 border-b">
          <Button variant="ghost" className="w-full justify-between">
            <span className="font-semibold">LearnHub Community</span>
            <ChevronDown className="h-4 w-4" />
          </Button>
        </div>
        
        <ScrollArea className="flex-1">
          <div className="p-2">
            <div className="flex items-center justify-between px-2 py-1.5">
              <span className="text-xs font-semibold text-muted-foreground uppercase">Text Channels</span>
              <Button variant="ghost" size="icon" className="h-4 w-4">
                <Plus className="h-3 w-3" />
              </Button>
            </div>
            {channels.filter(c => c.type === "text").length > 0 ? (
              channels.filter(c => c.type === "text").map((channel) => (
                <button
                  key={channel.id}
                  onClick={() => setSelectedChannel(channel.name)}
                  className={`w-full flex items-center gap-2 px-2 py-1.5 rounded-md text-sm transition-colors ${
                    selectedChannel === channel.name
                      ? "bg-muted text-foreground"
                      : "text-muted-foreground hover:bg-muted/50 hover:text-foreground"
                  }`}
                >
                  <Hash className="h-4 w-4 shrink-0" />
                  <span className="truncate">{channel.name}</span>
                  {channel.unread > 0 && (
                    <Badge variant="destructive" className="ml-auto h-5 px-1.5 text-xs">
                      {channel.unread}
                    </Badge>
                  )}
                </button>
              ))
            ) : (
              <p className="text-xs text-muted-foreground px-2 py-1 italic">No text channels.</p>
            )}
            
            <div className="flex items-center justify-between px-2 py-1.5 mt-4">
              <span className="text-xs font-semibold text-muted-foreground uppercase">Voice Channels</span>
              <Button variant="ghost" size="icon" className="h-4 w-4">
                <Plus className="h-3 w-3" />
              </Button>
            </div>
            {channels.filter(c => c.type === "voice").length > 0 ? (
              channels.filter(c => c.type === "voice").map((channel) => (
                <button
                  key={channel.id}
                  className="w-full flex items-center gap-2 px-2 py-1.5 rounded-md text-sm text-muted-foreground hover:bg-muted/50 hover:text-foreground transition-colors"
                >
                  <Volume2 className="h-4 w-4 shrink-0" />
                  <span className="truncate">{channel.name}</span>
                </button>
              ))
            ) : (
              <p className="text-xs text-muted-foreground px-2 py-1 italic">No voice channels.</p>
            )}
          </div>
        </ScrollArea>
        
        {/* User Panel */}
        <div className="border-t p-2 bg-muted/50">
          <div className="flex items-center gap-2">
            <div className="relative">
              <Avatar className="h-8 w-8">
                <AvatarFallback>U</AvatarFallback>
              </Avatar>
              <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-emerald-500 border-2 border-background" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">User</p>
              <p className="text-xs text-muted-foreground">Online</p>
            </div>
            <div className="flex gap-0.5">
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <Mic className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <Headphones className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <Settings className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">
        {/* Channel Header */}
        <header className="flex items-center justify-between border-b px-4 py-3">
          <div className="flex items-center gap-2">
            <Hash className="h-5 w-5 text-muted-foreground" />
            <span className="font-semibold">{selectedChannel}</span>
          </div>
          <div className="flex items-center gap-1">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <Bell className="h-5 w-5" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Notification Settings</TooltipContent>
              </Tooltip>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <Pin className="h-5 w-5" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Pinned Messages</TooltipContent>
              </Tooltip>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button 
                    variant={showMembers ? "secondary" : "ghost"} 
                    size="icon"
                    onClick={() => setShowMembers(!showMembers)}
                  >
                    <Users className="h-5 w-5" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Member List</TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <div className="relative ml-2">
              <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search" className="w-40 h-8 pl-8 text-sm" />
            </div>
          </div>
        </header>

        <div className="flex-1 flex overflow-hidden">
          {/* Messages */}
          <ScrollArea className="flex-1 p-4">
            <div className="space-y-4">
              {messages.length > 0 ? (
                messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`group flex gap-3 rounded-lg p-2 hover:bg-muted/50 ${msg.isPinned ? "bg-amber-500/5 border-l-2 border-amber-500" : ""}`}
                  >
                    <Avatar className="h-10 w-10 shrink-0">
                      <AvatarImage src={msg.user.avatar} />
                      <AvatarFallback>
                        {msg.user.name.split(" ").map((n: string) => n[0]).join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className={`font-semibold text-sm ${roleColors[msg.user.role]}`}>
                          {msg.user.name}
                        </span>
                        {msg.user.role === "Instructor" && (
                          <Badge variant="secondary" className="text-xs h-5">Instructor</Badge>
                        )}
                        {msg.user.role === "Pro Member" && (
                          <Badge className="text-xs h-5 bg-emerald-500">PRO</Badge>
                        )}
                        <span className="text-xs text-muted-foreground">{msg.time}</span>
                        {msg.isPinned && (
                          <Pin className="h-3 w-3 text-amber-500" />
                        )}
                      </div>
                      {msg.isCode ? (
                        <pre className="mt-2 p-3 rounded-md bg-muted text-sm font-mono overflow-x-auto">
                          <code>{msg.content.replace(/```typescript\n?|```/g, "")}</code>
                        </pre>
                      ) : (
                        <p className="mt-1 text-sm whitespace-pre-wrap">{msg.content}</p>
                      )}
                      {msg.reactions.length > 0 && (
                        <div className="flex gap-1 mt-2">
                          {msg.reactions.map((reaction: any, idx: number) => (
                            <button
                              key={idx}
                              className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-muted text-xs hover:bg-muted/80"
                            >
                              <span>{reaction.emoji === "wave" ? "wave" : reaction.emoji === "heart" ? "heart" : reaction.emoji === "thumbsup" ? "+1" : reaction.emoji === "star" ? "star" : reaction.emoji === "fire" ? "fire" : "100"}</span>
                              <span>{reaction.count}</span>
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Smile className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="h-full flex flex-col items-center justify-center text-center p-8">
                  <div className="h-16 w-16 rounded-full bg-muted flex items-center justify-center mb-4 text-muted-foreground">
                    <Hash className="h-8 w-8" />
                  </div>
                  <h3 className="text-lg font-semibold">Welcome to #{selectedChannel}!</h3>
                  <p className="text-muted-foreground max-w-sm mt-2">
                    This is the start of the #{selectedChannel} channel. Be the first to send a message!
                  </p>
                </div>
              )}
            </div>
          </ScrollArea>

          {/* Members Sidebar */}
          {showMembers && (
            <aside className="w-60 border-l p-4">
              <h3 className="text-xs font-semibold text-muted-foreground uppercase mb-3">
                Online - {onlineMembers.length}
              </h3>
              <div className="space-y-2">
                {onlineMembers.length > 0 ? (
                  onlineMembers.map((member) => (
                    <div key={member.name} className="flex items-center gap-2 p-1.5 rounded-md hover:bg-muted cursor-pointer">
                      <div className="relative">
                        <Avatar className="h-8 w-8">
                          <AvatarFallback className="text-xs">
                            {member.name.split(" ").map((n: string) => n[0]).join("")}
                          </AvatarFallback>
                        </Avatar>
                        <span className={`absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-background ${statusColors[member.status]}`} />
                      </div>
                      <span className={`text-sm ${roleColors[member.role]}`}>{member.name}</span>
                    </div>
                  ))
                ) : (
                  <p className="text-xs text-muted-foreground italic">No other members online.</p>
                )}
              </div>
            </aside>
          )}
        </div>

        {/* Message Input */}
        <div className="border-t p-4">
          <div className="flex items-center gap-2 rounded-lg border bg-muted/30 px-3 py-2">
            <Button variant="ghost" size="icon" className="h-8 w-8 shrink-0">
              <Plus className="h-5 w-5" />
            </Button>
            <Input
              placeholder={`Message #${selectedChannel}`}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="border-0 bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0"
            />
            <div className="flex gap-1">
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <Paperclip className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <Smile className="h-5 w-5" />
              </Button>
              <Button size="icon" className="h-8 w-8">
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
