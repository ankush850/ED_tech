"use client"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Spinner } from "@/components/ui/spinner"
import { Upload, Video, CheckCircle2, AlertCircle } from "lucide-react"
import { supabase } from "@/lib/supabase/client"

interface VideoUploadFormProps {
  courseId: string
  onSuccess?: (video: { id: string; title: string; videoUrl: string }) => void
}

export function VideoUploadForm({ courseId, onSuccess }: VideoUploadFormProps) {
  const [title, setTitle] = useState("")
  const [file, setFile] = useState<File | null>(null)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [status, setStatus] = useState<"idle" | "uploading" | "saving" | "done" | "error">("idle")
  const [error, setError] = useState("")
  const fileRef = useRef<HTMLInputElement>(null)

  const handleUpload = async () => {
    if (!title || !file) {
      setError("Please enter a title and select a video file.")
      return
    }
    setError("")
    setStatus("uploading")
    setUploadProgress(0)

    try {
      // 1. Upload to Supabase Storage directly to bypass Vercel limits
      const fileName = `${Date.now()}_${file.name.replace(/[^a-zA-Z0-9.-]/g, "_")}`
      const bucketName = process.env.NEXT_PUBLIC_SUPABASE_BUCKET || "videos"
      
      const { data, error: uploadError } = await supabase.storage
        .from(bucketName)
        .upload(`${courseId}/${fileName}`, file, {
           cacheControl: "3600",
           upsert: false
        })
      
      if (uploadError) throw new Error(uploadError.message || "Supabase upload failed")

      const { data: { publicUrl } } = supabase.storage
        .from(bucketName)
        .getPublicUrl(data.path)

      const videoUrl = publicUrl;
      setUploadProgress(80)

      setStatus("saving")
      setUploadProgress(90)

      // 2. Save metadata to DB
      const res = await fetch(`/api/courses/${courseId}/videos`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, videoUrl }),
      })

      if (!res.ok) {
        const d = await res.json()
        throw new Error(d.error || "Failed to save video")
      }

      const video = await res.json()
      setUploadProgress(100)
      setStatus("done")
      onSuccess?.(video)

      // Reset
      setTimeout(() => {
        setTitle("")
        setFile(null)
        setStatus("idle")
        setUploadProgress(0)
        if (fileRef.current) fileRef.current.value = ""
      }, 2000)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed")
      setStatus("error")
    }
  }

  return (
    <div className="space-y-4">
      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {status === "done" && (
        <Alert className="border-green-200 bg-green-50 text-green-800">
          <CheckCircle2 className="h-4 w-4" />
          <AlertDescription>Video uploaded successfully!</AlertDescription>
        </Alert>
      )}

      <div className="space-y-2">
        <Label htmlFor="video-title">Video Title</Label>
        <Input
          id="video-title"
          placeholder="e.g. Introduction to React Hooks"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          disabled={status === "uploading" || status === "saving"}
        />
      </div>

      <div className="space-y-2">
        <Label>Video File</Label>
        <div
          className="border-2 border-dashed rounded-xl p-6 text-center cursor-pointer hover:bg-muted/40 transition-colors"
          onClick={() => fileRef.current?.click()}
        >
          {file ? (
            <div className="flex items-center justify-center gap-2 text-sm font-medium">
              <Video className="h-5 w-5 text-primary" />
              {file.name}
            </div>
          ) : (
            <div className="flex flex-col items-center gap-2 text-muted-foreground">
              <Upload className="h-8 w-8" />
              <p className="text-sm">Click to select a video file</p>
              <p className="text-xs">MP4, WebM, MOV supported</p>
            </div>
          )}
          <input
            ref={fileRef}
            type="file"
            accept="video/*"
            className="hidden"
            onChange={(e) => setFile(e.target.files?.[0] ?? null)}
          />
        </div>
      </div>

      {(status === "uploading" || status === "saving") && (
        <div className="space-y-1">
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>{status === "uploading" ? "Uploading video..." : "Saving to database..."}</span>
            <span>{uploadProgress}%</span>
          </div>
          <Progress value={uploadProgress} className="h-2" />
        </div>
      )}

      <Button
        onClick={handleUpload}
        disabled={status === "uploading" || status === "saving" || status === "done"}
        className="w-full"
      >
        {status === "uploading" || status === "saving" ? (
          <><Spinner className="mr-2" /> {status === "uploading" ? "Uploading..." : "Saving..."}</>
        ) : (
          <><Upload className="mr-2 h-4 w-4" /> Upload Video</>
        )}
      </Button>
    </div>
  )
}
