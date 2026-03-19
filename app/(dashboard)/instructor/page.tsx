"use client"

import { useEffect, useState } from "react"
import { useUser } from "@/lib/user-context"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { CourseBuilder } from "@/components/instructor/course-builder"
import { StudentProgressTable } from "@/components/instructor/student-progress-table"
import { Spinner } from "@/components/ui/spinner"
import { Plus, BookOpen, Users, Video, ChevronRight } from "lucide-react"

interface Course { 
  id: string; 
  title: string; 
  description: string; 
  modules: { 
    id: string; 
    title: string; 
    lessons: { id: string; title: string; type: string; quiz?: { id: string } | null }[] 
  }[] 
}

const DEMO_TEACHER_ID = "demo-teacher-1"

export default function InstructorPage() {
  const { role } = useUser()
  const [courses, setCourses] = useState<Course[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [newCourse, setNewCourse] = useState({ title: "", description: "" })
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null)
  const [selectedVideoId, setSelectedVideoId] = useState<string | null>(null)
  const [creating, setCreating] = useState(false)

  const loadCourses = async () => {
    const res = await fetch("/api/courses")
    if (res.ok) { const d = await res.json(); setCourses(d) }
    setIsLoading(false)
  }

  useEffect(() => { loadCourses() }, [])

  const createCourse = async () => {
    if (!newCourse.title) return
    setCreating(true)
    const res = await fetch("/api/courses", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...newCourse, teacherId: DEMO_TEACHER_ID }),
    })
    if (res.ok) {
      setNewCourse({ title: "", description: "" })
      await loadCourses()
    }
    setCreating(false)
  }

  if (role !== "admin") {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-3 text-center">
        <div className="text-4xl">🚫</div>
        <h2 className="text-xl font-bold">Instructor Access Only</h2>
        <p className="text-muted-foreground">This area is restricted to instructor accounts.</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Instructor Dashboard</h1>
        <p className="text-muted-foreground">Manage courses, upload videos, build quizzes, and track student progress.</p>
      </div>

      <Tabs defaultValue="courses">
        <TabsList>
          <TabsTrigger value="courses"><BookOpen className="mr-2 h-4 w-4" />Courses</TabsTrigger>
          <TabsTrigger value="build"><Video className="mr-2 h-4 w-4" />Course Builder</TabsTrigger>
          <TabsTrigger value="students"><Users className="mr-2 h-4 w-4" />Student Progress</TabsTrigger>
        </TabsList>

        {/* Courses Tab */}
        <TabsContent value="courses" className="space-y-4 mt-4">
          {/* Create Course */}
          <Card>
            <CardHeader><CardTitle>Create New Course</CardTitle></CardHeader>
            <CardContent className="space-y-3">
              <div className="space-y-1.5">
                <Label htmlFor="ct">Course Title</Label>
                <Input id="ct" placeholder="e.g. React Masterclass" value={newCourse.title} onChange={(e) => setNewCourse((p) => ({ ...p, title: e.target.value }))} />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="cd">Description</Label>
                <Textarea id="cd" placeholder="What will students learn?" value={newCourse.description} onChange={(e) => setNewCourse((p) => ({ ...p, description: e.target.value }))} />
              </div>
              <Button onClick={createCourse} disabled={creating || !newCourse.title} className="gap-2">
                {creating ? <Spinner className="mr-2" /> : <Plus className="h-4 w-4" />} Create Course
              </Button>
            </CardContent>
          </Card>

          {/* Existing Courses */}
          <div className="space-y-3">
            {isLoading ? <div className="flex justify-center py-8"><Spinner /></div> : courses.map((c) => (
              <Card key={c.id} className="cursor-pointer hover:border-primary/50 transition-colors" onClick={() => setSelectedCourse(c === selectedCourse ? null : c)}>
                <CardContent className="flex items-center gap-4 p-4">
                  <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <BookOpen className="h-5 w-5 text-primary" />
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold">{c.title}</p>
                    <p className="text-xs text-muted-foreground">{c.modules?.reduce((acc, m) => acc + m.lessons.length, 0) ?? 0} lessons in {c.modules?.length ?? 0} modules</p>
                  </div>
                  <ChevronRight className="h-4 w-4 text-muted-foreground" />
                </CardContent>
              </Card>
            ))}
            {!isLoading && courses.length === 0 && <p className="text-center text-muted-foreground py-8">No courses yet. Create your first one above.</p>}
          </div>
        </TabsContent>

        {/* Build Tab */}
        <TabsContent value="build" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Course Architecture</CardTitle>
                <CardDescription>Select a course to build its structure with drag-and-drop modules and mixed content (Videos & Articles).</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-1.5">
                  <Label>Select target course</Label>
                  <select
                    className="w-full rounded-md border bg-background px-3 py-2 text-sm"
                    value={selectedCourse?.id ?? ""}
                    onChange={(e) => setSelectedCourse(courses.find((c) => c.id === e.target.value) ?? null)}
                  >
                    <option value="">-- Click to choose --</option>
                    {courses.map((c) => <option key={c.id} value={c.id}>{c.title}</option>)}
                  </select>
                </div>
                {selectedCourse && (
                  <CourseBuilder courseId={selectedCourse.id} onUpdate={loadCourses} />
                )}
              </CardContent>
            </Card>
        </TabsContent>

        {/* Student Progress Tab */}
        <TabsContent value="students" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Student Progress</CardTitle>
              <CardDescription>Monitor how students are performing across all your courses.</CardDescription>
            </CardHeader>
            <CardContent>
              <StudentProgressTable teacherId={DEMO_TEACHER_ID} />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
