"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Send, Bot, Sparkles, Plus } from "lucide-react"

interface AIChatPanelProps {
  tab: "chat" | "notes" | "discussion"
  setTab: (tab: "chat" | "notes" | "discussion") => void
}

const chatMessages = [
  {
    role: "assistant",
    content: "Hi! I'm your AI learning assistant. Feel free to ask me any questions about this lesson or the course material. I can help explain concepts, provide examples, or clarify anything you're unsure about.",
  },
  {
    role: "user",
    content: "What's the difference between strong and b tags in HTML?",
  },
  {
    role: "assistant",
    content: "Great question! While both <strong> and <b> visually make text bold, they have different semantic meanings:\n\n• <strong> indicates that the text has strong importance or urgency. Screen readers may emphasize this text.\n\n• <b> is purely presentational, just making text bold without any semantic meaning.\n\nFor accessibility and SEO, prefer <strong> when the text is truly important, and use CSS for purely stylistic bold text.",
  },
]

const notes = [
  { id: 1, content: "Remember: h1-h6 for headings, only one h1 per page", timestamp: "2:30" },
  { id: 2, content: "Use semantic tags like <strong> instead of <b>", timestamp: "5:45" },
]

export function AIChatPanel({ tab, setTab }: AIChatPanelProps) {
  const [message, setMessage] = useState("")
  const [noteContent, setNoteContent] = useState("")

  const handleSendMessage = () => {
    if (!message.trim()) return
    // Handle sending message
    setMessage("")
  }

  const handleAddNote = () => {
    if (!noteContent.trim()) return
    // Handle adding note
    setNoteContent("")
  }

  return (
    <div className="flex flex-col h-full">
      <Tabs value={tab} onValueChange={(v) => setTab(v as typeof tab)} className="flex flex-col h-full">
        <TabsList className="w-full justify-start rounded-none border-b bg-transparent p-0">
          <TabsTrigger
            value="chat"
            className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent"
          >
            <Bot className="h-4 w-4 mr-1.5" />
            AI Chat
          </TabsTrigger>
          <TabsTrigger
            value="notes"
            className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent"
          >
            Notes
          </TabsTrigger>
          <TabsTrigger
            value="discussion"
            className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent"
          >
            Discussion
          </TabsTrigger>
        </TabsList>

        <TabsContent value="chat" className="flex-1 flex flex-col mt-0 overflow-hidden">
          <ScrollArea className="flex-1 p-4">
            <div className="space-y-4">
              {chatMessages.map((msg, index) => (
                <div
                  key={index}
                  className={`flex gap-3 ${msg.role === "user" ? "flex-row-reverse" : ""}`}
                >
                  <Avatar className="h-8 w-8 shrink-0">
                    <AvatarFallback className={msg.role === "assistant" ? "bg-primary text-primary-foreground" : ""}>
                      {msg.role === "assistant" ? <Sparkles className="h-4 w-4" /> : "JD"}
                    </AvatarFallback>
                  </Avatar>
                  <div
                    className={`rounded-lg p-3 max-w-[85%] text-sm ${
                      msg.role === "user"
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted"
                    }`}
                  >
                    <p className="whitespace-pre-line">{msg.content}</p>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
          
          <div className="p-4 border-t">
            <div className="flex gap-2">
              <Input
                placeholder="Ask a question..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
              />
              <Button size="icon" onClick={handleSendMessage}>
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="notes" className="flex-1 flex flex-col mt-0 overflow-hidden">
          <ScrollArea className="flex-1 p-4">
            <div className="space-y-3">
              {notes.map((note) => (
                <div key={note.id} className="p-3 rounded-lg bg-muted text-sm">
                  <p>{note.content}</p>
                  <span className="text-xs text-muted-foreground mt-2 block">
                    at {note.timestamp}
                  </span>
                </div>
              ))}
            </div>
          </ScrollArea>
          
          <div className="p-4 border-t">
            <Textarea
              placeholder="Add a note..."
              className="min-h-[80px] mb-2"
              value={noteContent}
              onChange={(e) => setNoteContent(e.target.value)}
            />
            <Button size="sm" onClick={handleAddNote} className="w-full">
              <Plus className="h-4 w-4 mr-1" />
              Add Note
            </Button>
          </div>
        </TabsContent>

        <TabsContent value="discussion" className="flex-1 flex flex-col mt-0 overflow-hidden">
          <ScrollArea className="flex-1 p-4">
            <div className="space-y-4">
              <div className="p-4 rounded-lg border">
                <div className="flex items-center gap-2 mb-2">
                  <Avatar className="h-6 w-6">
                    <AvatarFallback className="text-xs">MR</AvatarFallback>
                  </Avatar>
                  <span className="text-sm font-medium">Maria R.</span>
                  <span className="text-xs text-muted-foreground">2 hours ago</span>
                </div>
                <p className="text-sm">
                  Can someone explain when to use article vs section tags?
                </p>
                <div className="mt-2 text-xs text-muted-foreground">
                  3 replies
                </div>
              </div>
              <div className="p-4 rounded-lg border">
                <div className="flex items-center gap-2 mb-2">
                  <Avatar className="h-6 w-6">
                    <AvatarFallback className="text-xs">DP</AvatarFallback>
                  </Avatar>
                  <span className="text-sm font-medium">David P.</span>
                  <span className="text-xs text-muted-foreground">5 hours ago</span>
                </div>
                <p className="text-sm">
                  Great tip about semantic HTML! This makes so much sense now.
                </p>
                <div className="mt-2 text-xs text-muted-foreground">
                  1 reply
                </div>
              </div>
            </div>
          </ScrollArea>
          
          <div className="p-4 border-t">
            <Input placeholder="Join the discussion..." />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
