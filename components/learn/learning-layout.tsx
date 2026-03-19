"use client"

import { useState, useEffect, useCallback } from "react"
import { useParams, useRouter } from "next/navigation"
import { LessonsSidebar } from "./lessons-sidebar"
import { VideoPlayer } from "./video-player"
import { LessonContent } from "./lesson-content"
import { AIChatPanel } from "./ai-chat-panel"
import { LearningHeader } from "./learning-header"
import { QuizModal, QuizResult } from "./quiz-modal"
import { EyeDetector } from "@/components/focus/eye-detector"
import { useFocusMode } from "@/lib/focus-mode-context"
import { useUser } from "@/lib/user-context"


type Stage = "watching" | "quiz" | "result"

interface Quiz {
  id: string
  questions: { id: string; text: string; options: string[]; order: number }[]
}

export function LearningLayout() {
  const params = useParams<{ courseId: string; lessonId: string }>()
  const { lessonId } = params
  const router = useRouter()
  const { isFocusMode } = useFocusMode()
  const { id: userId, name, isLoading } = useUser()

  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [rightPanelOpen, setRightPanelOpen] = useState(false)
  const [rightPanelTab, setRightPanelTab] = useState<"chat" | "notes" | "discussion">("chat")
  const [stage, setStage] = useState<Stage>("watching")
  const [quiz, setQuiz] = useState<Quiz | null>(null)
  const [quizScore, setQuizScore] = useState(0)
  const [quizPassed, setQuizPassed] = useState(false)
  const [cameraGranted, setCameraGranted] = useState(!isFocusMode)

  // auth guard
  useEffect(() => {
    if (!isLoading && !userId) {
      router.push(`/login?callbackUrl=/learn/${params.courseId}/${params.lessonId}`)
    }
  }, [userId, isLoading, router, params.courseId, params.lessonId])

  // Fetch quiz for this video/lesson
  useEffect(() => {
    if (!lessonId) return
    fetch(`/api/videos/${lessonId}/quiz`)
      .then((r) => r.json())
      .then((d) => { if (d) setQuiz(d) })
      .catch(() => {})
  }, [lessonId])

  const handleVideoEnded = useCallback(() => {
    if (quiz) setStage("quiz")
  }, [quiz])

  const handleQuizResult = useCallback((passed: boolean, score: number) => {
    setQuizPassed(passed)
    setQuizScore(score)
    setStage("result")
  }, [])

  const handleNext = useCallback(() => {
    // Navigate back to dashboard or next lesson
    router.push("/dashboard")
  }, [router])

  const handleRetry = useCallback(() => {
    setStage("watching")
  }, [])

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <LearningHeader
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        rightPanelOpen={rightPanelOpen}
        setRightPanelOpen={setRightPanelOpen}
        rightPanelTab={rightPanelTab}
        setRightPanelTab={setRightPanelTab}
      />

      <div className="flex-1 flex overflow-hidden">
        {sidebarOpen && (
          <aside className="w-80 border-r shrink-0 overflow-y-auto hidden lg:block">
            <LessonsSidebar />
          </aside>
        )}

        <main className="flex-1 overflow-y-auto">
          {isFocusMode && !cameraGranted && (
            <div className="m-4 rounded-xl border border-amber-300 bg-amber-50 dark:bg-amber-950/20 p-4 text-sm text-amber-800 dark:text-amber-300">
              🎥 <strong>Camera required</strong> — Focus Mode needs camera access to start video.
            </div>
          )}
          <VideoPlayer
            src={lessonId ? `/api/videos/${lessonId}/stream` : ""}
            videoId={lessonId ?? ""}
            userId={userId}
            onEnded={handleVideoEnded}
            disabled={isFocusMode && !cameraGranted}
          />
          <LessonContent />
        </main>

        {rightPanelOpen && (
          <aside className="w-96 border-l shrink-0 overflow-hidden hidden lg:flex flex-col">
            <AIChatPanel tab={rightPanelTab} setTab={setRightPanelTab} />
          </aside>
        )}
      </div>

      {/* Eye Detector — active only in focus mode */}
      <EyeDetector
        active={isFocusMode}
        onCameraGranted={() => setCameraGranted(true)}
        onCameraBlocked={() => setCameraGranted(false)}
      />

      {/* Quiz Modal */}
      {stage === "quiz" && quiz && (
        <QuizModal quiz={quiz} userId={userId} onResult={handleQuizResult} />
      )}

      {/* Quiz Result */}
      {stage === "result" && (
        <QuizResult
          score={quizScore}
          total={quiz?.questions.length ?? 5}
          passed={quizPassed}
          onNext={handleNext}
          onRetry={handleRetry}
        />
      )}
    </div>
  )
}
