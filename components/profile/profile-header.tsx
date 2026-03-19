"use client"

import { useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { FieldGroup, Field, FieldLabel } from "@/components/ui/field"
import { 
  Edit, 
  MapPin, 
  Link as LinkIcon, 
  Github, 
  Linkedin, 
  Twitter,
  Calendar,
  Share2
} from "lucide-react"

export function ProfileHeader() {
  const [isEditOpen, setIsEditOpen] = useState(false)

  return (
    <div className="rounded-xl border bg-card p-6">
      <div className="flex flex-col gap-6 sm:flex-row sm:items-start">
        <Avatar className="h-24 w-24 border-4 border-background shadow-lg">
          <AvatarImage src="/placeholder.svg?height=96&width=96" />
          <AvatarFallback className="text-2xl">NL</AvatarFallback>
        </Avatar>
        
        <div className="flex-1">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <div className="flex items-center gap-3">
                <h1 className="text-2xl font-bold">New Learner</h1>
                <Badge variant="secondary">Member</Badge>
              </div>
              <p className="mt-1 text-muted-foreground">
                Beginning the journey in tech
              </p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="gap-2">
                <Share2 className="h-4 w-4" />
                Share
              </Button>
              <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
                <DialogTrigger asChild>
                  <Button size="sm" className="gap-2">
                    <Edit className="h-4 w-4" />
                    Edit Profile
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-lg">
                  <DialogHeader>
                    <DialogTitle>Edit Profile</DialogTitle>
                    <DialogDescription>
                      Update your profile information
                    </DialogDescription>
                  </DialogHeader>
                  <form className="mt-4">
                    <FieldGroup>
                      <Field>
                        <FieldLabel>Name</FieldLabel>
                        <Input defaultValue="New Learner" />
                      </Field>
                      <Field>
                        <FieldLabel>Title</FieldLabel>
                        <Input defaultValue="Beginning the journey in tech" />
                      </Field>
                      <Field>
                        <FieldLabel>Bio</FieldLabel>
                        <Textarea 
                          defaultValue="Tell us about yourself..."
                          className="min-h-24"
                        />
                      </Field>
                      <Field>
                        <FieldLabel>Location</FieldLabel>
                        <Input defaultValue="" />
                      </Field>
                      <Field>
                        <FieldLabel>Website</FieldLabel>
                        <Input defaultValue="" />
                      </Field>
                    </FieldGroup>
                    <div className="mt-6 flex justify-end gap-3">
                      <Button variant="outline" onClick={() => setIsEditOpen(false)}>
                        Cancel
                      </Button>
                      <Button type="submit">Save Changes</Button>
                    </div>
                  </form>
                </DialogContent>
              </Dialog>
            </div>
          </div>
          
          <p className="mt-3 max-w-2xl text-sm leading-relaxed italic text-muted-foreground">
            No bio provided yet. Add a bio to tell others about your learning journey.
          </p>
          
          <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <MapPin className="h-4 w-4" />
              Location unknown
            </span>
            <span className="flex items-center gap-1.5">
              <Calendar className="h-4 w-4" />
              Joined recently
            </span>
          </div>
          
          <div className="mt-4 flex items-center gap-3">
            <Button variant="ghost" size="icon" className="h-9 w-9">
              <Github className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" className="h-9 w-9">
              <Linkedin className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" className="h-9 w-9">
              <Twitter className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
