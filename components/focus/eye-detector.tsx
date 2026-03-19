"use client"

import { useEffect, useRef, useState, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Camera, CameraOff, Eye, EyeOff } from "lucide-react"

interface EyeDetectorProps {
  active: boolean
  onCameraGranted: () => void
  onCameraBlocked: () => void
}

export function EyeDetector({ active, onCameraGranted, onCameraBlocked }: EyeDetectorProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const streamRef = useRef<MediaStream | null>(null)
  const detectorRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const missedFrames = useRef(0)
  const audioCtxRef = useRef<AudioContext | null>(null)
  const [cameraStatus, setCameraStatus] = useState<"idle" | "granted" | "denied">("idle")
  const [isLooking, setIsLooking] = useState(true)
  const [faceApiLoaded, setFaceApiLoaded] = useState(false)

  // Lazy load face-api.js
  useEffect(() => {
    if (!active) return
    let cancelled = false
    import("face-api.js").then(async (faceapi) => {
      if (cancelled) return
      // Load tiny models from CDN
      const MODEL_URL = "https://cdn.jsdelivr.net/npm/@vladmandic/face-api@1.7.13/model"
      await faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL)
      await faceapi.nets.faceLandmark68TinyNet.loadFromUri(MODEL_URL)
      if (!cancelled) setFaceApiLoaded(true)
    }).catch(console.error)
    return () => { cancelled = true }
  }, [active])

  const playBeep = useCallback(() => {
    try {
      if (!audioCtxRef.current) {
        audioCtxRef.current = new AudioContext()
      }
      const ctx = audioCtxRef.current
      const osc = ctx.createOscillator()
      const gain = ctx.createGain()
      osc.connect(gain)
      gain.connect(ctx.destination)
      osc.type = "sine"
      osc.frequency.setValueAtTime(880, ctx.currentTime)
      gain.gain.setValueAtTime(0.4, ctx.currentTime)
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.4)
      osc.start(ctx.currentTime)
      osc.stop(ctx.currentTime + 0.4)
    } catch { /* AudioContext blocked */ }
  }, [])

  const startCamera = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: "user" } })
      streamRef.current = stream
      if (videoRef.current) {
        videoRef.current.srcObject = stream
        await videoRef.current.play()
      }
      setCameraStatus("granted")
      onCameraGranted()
    } catch {
      setCameraStatus("denied")
      onCameraBlocked()
    }
  }, [onCameraGranted, onCameraBlocked])

  const stopCamera = useCallback(() => {
    if (detectorRef.current) clearInterval(detectorRef.current)
    streamRef.current?.getTracks().forEach((t) => t.stop())
    streamRef.current = null
    setCameraStatus("idle")
  }, [])

  // Run eye detection loop
  useEffect(() => {
    if (!active || !faceApiLoaded || cameraStatus !== "granted") return

    const runDetection = async () => {
      const faceapi = await import("face-api.js")
      if (!videoRef.current) return

      detectorRef.current = setInterval(async () => {
        try {
          const detection = await faceapi
            .detectSingleFace(videoRef.current!, new faceapi.TinyFaceDetectorOptions())
            .withFaceLandmarks(true)

          if (!detection) {
            missedFrames.current++
            if (missedFrames.current >= 3) {
              setIsLooking(false)
              playBeep()
            }
          } else {
            missedFrames.current = 0
            setIsLooking(true)
          }
        } catch { /* frame error */ }
      }, 500)
    }

    runDetection()
    return () => { if (detectorRef.current) clearInterval(detectorRef.current) }
  }, [active, faceApiLoaded, cameraStatus, playBeep])

  // Auto-start camera when active
  useEffect(() => {
    if (active && cameraStatus === "idle") startCamera()
    if (!active) stopCamera()
  }, [active, cameraStatus, startCamera, stopCamera])

  if (!active) return null

  return (
    <div className="relative">
      {/* Hidden camera feed for detection */}
      <video ref={videoRef} className="hidden" muted playsInline />
      <canvas ref={canvasRef} className="hidden" />

      {/* Status indicator */}
      <div className={`fixed bottom-6 right-6 z-50 flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium shadow-lg transition-all duration-300 ${
        cameraStatus === "denied"
          ? "bg-red-500 text-white"
          : isLooking
          ? "bg-green-500 text-white"
          : "bg-amber-500 text-white animate-pulse"
      }`}>
        {cameraStatus === "denied" ? (
          <><CameraOff className="h-4 w-4" /> Camera blocked — video paused</>
        ) : isLooking ? (
          <><Eye className="h-4 w-4" /> Eyes detected ✓</>
        ) : (
          <><EyeOff className="h-4 w-4" /> 👀 Look at the screen!</>
        )}
      </div>

      {/* Camera denied overlay */}
      {cameraStatus === "denied" && (
        <div className="fixed inset-0 z-40 bg-black/70 backdrop-blur-sm flex flex-col items-center justify-center gap-4">
          <CameraOff className="h-16 w-16 text-red-400" />
          <h2 className="text-2xl font-bold text-white">Camera Access Required</h2>
          <p className="text-white/70 text-center max-w-sm">
            Focus Mode requires camera access to detect if you are looking at the screen.
            Video playback is paused until you grant access.
          </p>
          <Button onClick={startCamera} className="bg-red-500 hover:bg-red-600">
            <Camera className="mr-2 h-4 w-4" /> Grant Camera Access
          </Button>
        </div>
      )}
    </div>
  )
}
