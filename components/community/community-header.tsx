"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { FieldGroup, Field, FieldLabel } from "@/components/ui/field"
import { Search, Plus, MessageSquarePlus } from "lucide-react"

export function CommunityHeader() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Community</h1>
          <p className="mt-1 text-muted-foreground">
            Connect, learn, and grow together with fellow learners
          </p>
        </div>
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <MessageSquarePlus className="h-4 w-4" />
              Start Discussion
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-lg">
            <DialogHeader>
              <DialogTitle>Start a New Discussion</DialogTitle>
              <DialogDescription>
                Share your question or topic with the community
              </DialogDescription>
            </DialogHeader>
            <form className="mt-4">
              <FieldGroup>
                <Field>
                  <FieldLabel>Title</FieldLabel>
                  <Input placeholder="What's your question about?" />
                </Field>
                <Field>
                  <FieldLabel>Category</FieldLabel>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="general">General Discussion</SelectItem>
                      <SelectItem value="help">Help & Support</SelectItem>
                      <SelectItem value="showcase">Project Showcase</SelectItem>
                      <SelectItem value="career">Career Advice</SelectItem>
                      <SelectItem value="resources">Resources</SelectItem>
                    </SelectContent>
                  </Select>
                </Field>
                <Field>
                  <FieldLabel>Content</FieldLabel>
                  <Textarea 
                    placeholder="Describe your question or share your thoughts..."
                    className="min-h-32"
                  />
                </Field>
              </FieldGroup>
              <div className="mt-6 flex justify-end gap-3">
                <Button variant="outline" onClick={() => setIsOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit">Post Discussion</Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input 
            placeholder="Search discussions..." 
            className="pl-9"
          />
        </div>
        <Tabs defaultValue="latest">
          <TabsList>
            <TabsTrigger value="latest">Latest</TabsTrigger>
            <TabsTrigger value="popular">Popular</TabsTrigger>
            <TabsTrigger value="unanswered">Unanswered</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
    </div>
  )
}
