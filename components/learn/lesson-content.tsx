"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import {
  Bookmark,
  BookmarkCheck,
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  Download,
  ThumbsUp,
} from "lucide-react"

export function LessonContent() {
  const [isBookmarked, setIsBookmarked] = useState(false)
  const [isCompleted, setIsCompleted] = useState(false)

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="flex items-start justify-between gap-4 mb-6">
        <div>
          <Badge variant="secondary" className="mb-2">
            Section 2: HTML Fundamentals
          </Badge>
          <h1 className="text-2xl font-bold">Working with Text Elements</h1>
          <p className="text-muted-foreground mt-1">
            Lesson 3 of 5 • 25 minutes
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsBookmarked(!isBookmarked)}
          >
            {isBookmarked ? (
              <BookmarkCheck className="h-4 w-4 mr-1" />
            ) : (
              <Bookmark className="h-4 w-4 mr-1" />
            )}
            {isBookmarked ? "Bookmarked" : "Bookmark"}
          </Button>
          <Button
            variant={isCompleted ? "secondary" : "default"}
            size="sm"
            onClick={() => setIsCompleted(!isCompleted)}
          >
            <CheckCircle2 className="h-4 w-4 mr-1" />
            {isCompleted ? "Completed" : "Mark Complete"}
          </Button>
        </div>
      </div>

      <Tabs defaultValue="overview" className="mt-6">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="resources">Resources</TabsTrigger>
          <TabsTrigger value="transcript">Transcript</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="mt-4">
          <div className="prose prose-sm max-w-none">
            <h3>About this lesson</h3>
            <p>
              In this lesson, you&apos;ll learn about the essential text elements in HTML, 
              including headings, paragraphs, and inline text formatting. Understanding 
              these elements is crucial for creating well-structured and semantic web content.
            </p>
            
            <h4>What you&apos;ll learn:</h4>
            <ul>
              <li>How to use heading tags (h1-h6) effectively</li>
              <li>Creating paragraphs and line breaks</li>
              <li>Using emphasis and strong tags for semantic meaning</li>
              <li>Working with lists (ordered and unordered)</li>
              <li>Quotations and citations</li>
            </ul>

            <h4>Key Concepts:</h4>
            <p>
              HTML provides a rich set of elements for marking up text content. 
              Each element carries semantic meaning that helps browsers and assistive 
              technologies understand your content better.
            </p>
          </div>
        </TabsContent>
        
        <TabsContent value="resources" className="mt-4">
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div>
                <p className="font-medium">Lesson Slides</p>
                <p className="text-sm text-muted-foreground">PDF, 2.4 MB</p>
              </div>
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-1" />
                Download
              </Button>
            </div>
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div>
                <p className="font-medium">Practice Files</p>
                <p className="text-sm text-muted-foreground">ZIP, 1.1 MB</p>
              </div>
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-1" />
                Download
              </Button>
            </div>
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div>
                <p className="font-medium">Cheat Sheet</p>
                <p className="text-sm text-muted-foreground">PDF, 0.5 MB</p>
              </div>
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-1" />
                Download
              </Button>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="transcript" className="mt-4">
          <div className="text-sm text-muted-foreground space-y-4">
            <p>
              <span className="text-foreground font-medium">0:00</span> - Welcome back! 
              In this lesson, we&apos;re going to dive deep into HTML text elements.
            </p>
            <p>
              <span className="text-foreground font-medium">0:15</span> - Let&apos;s start 
              with headings. HTML provides six levels of headings, from h1 to h6.
            </p>
            <p>
              <span className="text-foreground font-medium">1:30</span> - The h1 element 
              should be used for the main heading of your page. There should typically 
              only be one h1 per page.
            </p>
            <p>
              <span className="text-foreground font-medium">3:00</span> - Next, let&apos;s 
              look at paragraphs. The p element is used for blocks of text...
            </p>
          </div>
        </TabsContent>
      </Tabs>

      <Separator className="my-8" />

      <div className="flex items-center justify-between">
        <Button variant="outline" className="gap-2">
          <ChevronLeft className="h-4 w-4" />
          Previous Lesson
        </Button>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm">
            <ThumbsUp className="h-4 w-4 mr-1" />
            Helpful
          </Button>
        </div>
        <Button className="gap-2">
          Next Lesson
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}
