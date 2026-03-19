"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus, GripVertical, FileText, Video, ChevronDown, ChevronRight, PenSquare, UploadCloud, Trash2, Loader2 } from "lucide-react"
import { toast } from "sonner"

interface Lesson {
  id: string
  title: string
  type: string
  order: number
}

interface Module {
  id: string
  title: string
  order: number
  lessons: Lesson[]
}

interface CourseBuilderProps {
  courseId: string
  onUpdate: () => void
}

export function CourseBuilder({ courseId, onUpdate }: CourseBuilderProps) {
  const [modules, setModules] = useState<Module[]>([])
  const [loading, setLoading] = useState(true)

  // Forms states
  const [newModuleTitle, setNewModuleTitle] = useState("")
  const [activeModuleId, setActiveModuleId] = useState<string | null>(null)
  
  // Lesson form
  const [newLessonType, setNewLessonType] = useState("VIDEO")
  const [newLessonTitle, setNewLessonTitle] = useState("")
  const [newLessonContent, setNewLessonContent] = useState("")
  const [isUploading, setIsUploading] = useState(false)

  useEffect(() => {
    fetchCourseData()
  }, [courseId])

  const fetchCourseData = async () => {
    setLoading(true)
    try {
      const res = await fetch(`/api/courses/${courseId}`)
      if (res.ok) {
        const data = await res.json()
        setModules(data.modules || [])
      }
    } catch (e) {
      console.error(e)
    } finally {
      setLoading(false)
    }
  }

  const addModule = async () => {
    if (!newModuleTitle) return
    const res = await fetch("/api/modules", {
      method: "POST",
      body: JSON.stringify({ courseId, title: newModuleTitle, description: "" }),
      headers: { "Content-Type": "application/json" }
    })
    if (res.ok) {
        setNewModuleTitle("")
        fetchCourseData()
        onUpdate()
    }
  }

  const addLesson = async (moduleId: string) => {
    if (!newLessonTitle) return
    
    let finalVideoUrl = null

    if (newLessonType === "VIDEO") {
      const fileInput = document.getElementById(`video-upload-${moduleId}`) as HTMLInputElement
      const file = fileInput?.files?.[0]
      if (!file) {
        toast.error("Please select a video file to upload")
        return
      }
      setIsUploading(true)
      try {
          const { supabase } = await import("@/lib/supabase/client")
          const fileExt = file.name.split('.').pop()
          const fileName = `lesson_${Date.now()}_${Math.random().toString(36).substring(7)}.${fileExt}`
          const filePath = `lessons/${fileName}`
          
          const { error: uploadError } = await supabase.storage
             .from("videos")
             .upload(filePath, file)
             
          if (uploadError) throw uploadError
          
          const { data } = supabase.storage.from("videos").getPublicUrl(filePath)
          finalVideoUrl = data.publicUrl
      } catch (err: any) {
          if (err.message === "Bucket not found" || err.message?.includes("not found")) {
               toast.error("Setup required: Please go to your Supabase Dashboard -> Storage, and create a PUBLIC bucket named 'videos' first.", { duration: 10000 })
          } else {
               toast.error("Failed to upload video: " + err.message)
          }
          setIsUploading(false)
          return
      }
      setIsUploading(false)
    }

    const res = await fetch("/api/lessons", {
      method: "POST",
      body: JSON.stringify({ 
        moduleId, 
        title: newLessonTitle, 
        type: newLessonType, 
        content: newLessonType === "POST" ? newLessonContent : null,
        videoUrl: finalVideoUrl
      }),
      headers: { "Content-Type": "application/json" }
    })
    if (res.ok) {
      setNewLessonTitle("")
      setNewLessonContent("")
      setNewLessonType("VIDEO")
      const fileInput = document.getElementById(`video-upload-${moduleId}`) as HTMLInputElement
      if (fileInput) fileInput.value = ""
      
      fetchCourseData()
      onUpdate()
      toast.success("Lesson created successfully")
    } else {
        toast.error("Failed to create lesson")
    }
  }

  const deleteModule = async (moduleId: string, e: React.MouseEvent) => {
    e.stopPropagation() 
    if (!confirm("Are you sure you want to delete this module and ALL of its lessons? This action cannot be undone.")) return
    
    const res = await fetch(`/api/modules/${moduleId}`, { method: 'DELETE' })
    if (res.ok) {
        fetchCourseData()
        onUpdate()
        toast.success("Module deleted permanently")
    } else {
        toast.error("Failed to delete module")
    }
  }

  const deleteLesson = async (lessonId: string) => {
    if (!confirm("Are you sure you want to delete this lesson?")) return
    
    const res = await fetch(`/api/lessons/${lessonId}`, { method: 'DELETE' })
    if (res.ok) {
        fetchCourseData()
        onUpdate()
        toast.success("Lesson deleted successfully")
    } else {
        toast.error("Failed to delete lesson")
    }
  }

  if (loading) return <div className="p-4 text-center text-muted-foreground animate-pulse">Loading course structure...</div>

  return (
    <div className="space-y-6">
      <div className="flex gap-2">
        <Input 
          placeholder="New Module Title..." 
          value={newModuleTitle} 
          onChange={e => setNewModuleTitle(e.target.value)} 
          className="flex-1"
        />
        <Button onClick={addModule} className="gap-2">
          <Plus className="h-4 w-4" /> Add Module
        </Button>
      </div>

      <div className="space-y-4">
        {modules.map(module => (
          <Card key={module.id} className="overflow-hidden border-primary/20 bg-background/50 backdrop-blur">
            <CardHeader className="p-4 flex flex-row items-center cursor-pointer hover:bg-muted/30 transition-colors"
                onClick={() => setActiveModuleId(activeModuleId === module.id ? null : module.id)}
            >
              <div className="flex-1 flex items-center gap-3">
                <GripVertical className="h-4 w-4 text-muted-foreground cursor-move" />
                {activeModuleId === module.id ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
                <span className="font-semibold text-lg">{module.title}</span>
              </div>
              <span className="text-sm text-muted-foreground mr-2">{module.lessons.length} lessons</span>
              <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive hover:bg-destructive/10" onClick={(e) => deleteModule(module.id, e)}>
                <Trash2 className="h-4 w-4" />
              </Button>
            </CardHeader>
            
            {activeModuleId === module.id && (
              <CardContent className="p-4 pt-0 bg-muted/10 border-t space-y-4">
                {/* Lessons List */}
                <div className="space-y-2 mt-4">
                  {module.lessons.map(lesson => (
                    <div key={lesson.id} className="flex items-center gap-3 p-3 bg-background border rounded-lg hover:border-primary/50 transition">
                      <GripVertical className="h-4 w-4 text-muted-foreground cursor-move" />
                      {lesson.type === 'VIDEO' ? <Video className="h-4 w-4 text-primary" /> : <FileText className="h-4 w-4 text-primary" />}
                      <span className="flex-1 font-medium">{lesson.title}</span>
                      <span className="text-xs px-2 py-1 rounded bg-primary/10 text-primary font-medium mr-2">{lesson.type}</span>
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-destructive hover:bg-destructive/10" onClick={() => deleteLesson(lesson.id)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>

                {/* Add Lesson Form */}
                <div className="p-4 bg-background border rounded-lg space-y-4 mt-4">
                    <h4 className="font-semibold text-sm flex items-center gap-2"><Plus className="h-4 w-4" /> Add new lesson</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                            <Label>Lesson Title</Label>
                            <Input placeholder="Type lesson name..." value={newLessonTitle} onChange={e => setNewLessonTitle(e.target.value)} />
                        </div>
                        <div className="space-y-1.5">
                            <Label>Lesson Type</Label>
                            <Select value={newLessonType} onValueChange={setNewLessonType}>
                                <SelectTrigger><SelectValue /></SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="VIDEO">Video Lesson</SelectItem>
                                    <SelectItem value="POST">Post / Article (Markdown)</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                    {newLessonType === "POST" && (
                        <div className="space-y-1.5">
                            <Label>Article Content (Markdown supported)</Label>
                            <Textarea placeholder="# Hello World..." className="min-h-[150px] font-mono text-sm" value={newLessonContent} onChange={e => setNewLessonContent(e.target.value)} />
                        </div>
                    )}
                    {newLessonType === "VIDEO" && (
                        <div className="space-y-1.5">
                            <Label htmlFor={`video-upload-${module.id}`}>Upload Local Video</Label>
                            <Input id={`video-upload-${module.id}`} type="file" accept="video/*" disabled={isUploading} className="cursor-pointer file:cursor-pointer file:text-primary file:bg-primary/10 file:border-0 hover:file:bg-primary/20" />
                            <p className="text-xs text-muted-foreground">MP4, WebM formats supported up to 50MB</p>
                        </div>
                    )}
                    <Button onClick={() => addLesson(module.id)} className="w-full gap-2" disabled={isUploading || !newLessonTitle}>
                        {isUploading ? <Loader2 className="h-4 w-4 animate-spin" /> : (newLessonType === "VIDEO" ? <UploadCloud className="h-4 w-4" /> : <PenSquare className="h-4 w-4" />)}
                        {isUploading ? "Uploading & Saving..." : `Create ${newLessonType === "VIDEO" ? "Video Lesson" : "Article"}`}
                    </Button>
                </div>
              </CardContent>
            )}
          </Card>
        ))}
        {modules.length === 0 && <div className="text-center py-8 text-muted-foreground border-2 border-dashed rounded-lg">No modules yet. Create one to begin.</div>}
      </div>
    </div>
  )
}
