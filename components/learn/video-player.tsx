"use client"

import { useEffect, useRef, useState, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Play, Pause, Volume2, VolumeX, Maximize, RotateCcw } from "lucide-react"

interface VideoPlayerProps {
  src: string
  videoId: string
  userId: string
  onEnded?: () => void
  disabled?: boolean
}

export function VideoPlayer({ src, videoId, userId, onEnded, disabled }: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [progress, setProgress] = useState(0)
  const [duration, setDuration] = useState(0)
  const [currentTime, setCurrentTime] = useState(0)
  const progressSaveRef = useRef<number>(0)
  const saveIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const saveProgress = useCallback(async (watched: number) => {
    try {
      await fetch(`/api/progress`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, videoId, watchedSec: Math.floor(watched) }),
      })
    } catch { /* silent */ }
  }, [userId, videoId])

  useEffect(() => {
    saveIntervalRef.current = setInterval(() => {
      if (videoRef.current && isPlaying) saveProgress(videoRef.current.currentTime)
    }, 10000)
    return () => { if (saveIntervalRef.current) clearInterval(saveIntervalRef.current) }
  }, [isPlaying, saveProgress])

  const handleTimeUpdate = () => {
    const v = videoRef.current
    if (!v) return
    setCurrentTime(v.currentTime)
    setProgress(v.duration ? (v.currentTime / v.duration) * 100 : 0)
    progressSaveRef.current = v.currentTime
  }

  const handleEnded = () => {
    setIsPlaying(false)
    saveProgress(progressSaveRef.current)
    onEnded?.()
  }

  const togglePlay = () => {
    if (!videoRef.current || disabled) return
    if (isPlaying) { videoRef.current.pause(); setIsPlaying(false) }
    else { videoRef.current.play(); setIsPlaying(true) }
  }

  const toggleMute = () => {
    if (!videoRef.current) return
    videoRef.current.muted = !isMuted
    setIsMuted(!isMuted)
  }

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!videoRef.current) return
    const t = (parseFloat(e.target.value) / 100) * duration
    videoRef.current.currentTime = t
  }

  const fmt = (s: number) => {
    const m = Math.floor(s / 60), sec = Math.floor(s % 60)
    return `${m}:${sec.toString().padStart(2, "0")}`
  }

  if (disabled) {
    return (
      <div className="relative aspect-video bg-black/90 rounded-xl flex flex-col items-center justify-center gap-3 select-none">
        <div className="text-4xl">🔒</div>
        <p className="text-white font-medium">Complete the previous quiz to unlock this video</p>
        <p className="text-white/50 text-sm">You must pass (3/5 correct) to continue</p>
      </div>
    )
  }

  return (
    <div className="relative group rounded-xl overflow-hidden bg-black">
      <video
        ref={videoRef}
        src={src}
        className="w-full aspect-video"
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={() => setDuration(videoRef.current?.duration ?? 0)}
        onEnded={handleEnded}
        onClick={togglePlay}
      />
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 opacity-0 group-hover:opacity-100 transition-opacity">
        <input
          type="range" min={0} max={100} value={progress} onChange={handleSeek}
          className="w-full h-1 mb-3 appearance-none bg-white/30 rounded-full [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white cursor-pointer"
        />
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" className="h-8 w-8 text-white hover:bg-white/20" onClick={togglePlay}>
            {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8 text-white hover:bg-white/20" onClick={toggleMute}>
            {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
          </Button>
          <span className="text-white text-xs">{fmt(currentTime)} / {fmt(duration)}</span>
          <div className="flex-1" />
          <Button variant="ghost" size="icon" className="h-8 w-8 text-white hover:bg-white/20"
            onClick={() => { if(videoRef.current) { videoRef.current.currentTime = 0; videoRef.current.play(); setIsPlaying(true) }}}>
            <RotateCcw className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8 text-white hover:bg-white/20" onClick={() => videoRef.current?.requestFullscreen?.()}>
            <Maximize className="h-4 w-4" />
          </Button>
        </div>
      </div>
      {!isPlaying && (
        <button onClick={togglePlay} className="absolute inset-0 flex items-center justify-center">
          <div className="h-16 w-16 rounded-full bg-white/20 backdrop-blur flex items-center justify-center hover:bg-white/30 transition">
            <Play className="h-8 w-8 text-white fill-white" />
          </div>
        </button>
      )}
    </div>
  )
}
