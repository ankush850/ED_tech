"use client"

import { ReactNode } from "react"
import { useFocusMode } from "@/lib/focus-mode-context"
import { EyeDetector } from "@/components/focus/eye-detector"
import { useState } from "react"

export function FocusModeWrapper({ children }: { children: ReactNode }) {
  const { isFocusMode } = useFocusMode()
  const [cameraGranted, setCameraGranted] = useState(false)

  return (
    <div className="flex flex-col flex-1">
      {children}
      <EyeDetector
        active={isFocusMode}
        onCameraGranted={() => setCameraGranted(true)}
        onCameraBlocked={() => setCameraGranted(false)}
      />
    </div>
  )
}
