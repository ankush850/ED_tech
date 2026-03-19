"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { Spinner } from "@/components/ui/spinner"
import { CheckCircle2, XCircle, AlertCircle } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"

interface Question {
  id: string
  text: string
  options: string[]
  order: number
}

interface QuizModalProps {
  quiz: { id: string; questions: Question[] }
  userId: string
  onResult: (passed: boolean, score: number) => void
}

export function QuizModal({ quiz, userId, onResult }: QuizModalProps) {
  const [answers, setAnswers] = useState<Record<number, number>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState("")

  const allAnswered = quiz.questions.every((_, i) => answers[i] !== undefined)

  const handleSubmit = async () => {
    if (!allAnswered) { setError("Please answer all questions before submitting."); return }
    setError("")
    setIsSubmitting(true)

    const answersArray = quiz.questions.map((_, i) => answers[i])

    try {
      const res = await fetch(`/api/quiz/${quiz.id}/submit`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, answers: answersArray }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || "Submission failed")
      onResult(data.passed, data.score)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Submission failed")
      setIsSubmitting(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="w-full max-w-2xl bg-background rounded-2xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="p-6 border-b bg-gradient-to-r from-violet-600 to-indigo-600 text-white">
          <h2 className="text-xl font-bold">📝 Quiz Time!</h2>
          <p className="text-violet-200 text-sm mt-1">
            Answer all {quiz.questions.length} questions. You need at least <strong>3/5</strong> correct to pass.
          </p>
          <div className="mt-3 flex gap-1">
            {quiz.questions.map((_, i) => (
              <div
                key={i}
                className={cn(
                  "h-1.5 flex-1 rounded-full transition-colors",
                  answers[i] !== undefined ? "bg-white" : "bg-white/30"
                )}
              />
            ))}
          </div>
        </div>

        {/* Questions */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {quiz.questions.map((q, qIdx) => (
            <div key={q.id} className="space-y-3">
              <p className="font-medium">
                <span className="text-muted-foreground mr-2">Q{qIdx + 1}.</span>
                {q.text}
              </p>
              <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                {q.options.map((opt, optIdx) => {
                  const isSelected = answers[qIdx] === optIdx
                  return (
                    <button
                      key={optIdx}
                      onClick={() => setAnswers((prev) => ({ ...prev, [qIdx]: optIdx }))}
                      className={cn(
                        "text-left p-3 rounded-xl border-2 text-sm transition-all duration-150 hover:border-primary/50",
                        isSelected
                          ? "border-violet-500 bg-violet-50 dark:bg-violet-950/30 font-medium"
                          : "border-border bg-muted/30 hover:bg-muted/60"
                      )}
                    >
                      <span className={cn(
                        "inline-flex h-5 w-5 rounded-full border-2 mr-2 items-center justify-center text-xs shrink-0 align-middle",
                        isSelected ? "border-violet-500 bg-violet-500 text-white" : "border-muted-foreground/40"
                      )}>
                        {String.fromCharCode(65 + optIdx)}
                      </span>
                      {opt}
                    </button>
                  )
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="p-6 border-t bg-muted/30">
          <div className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground">
              {Object.keys(answers).length}/{quiz.questions.length} answered
            </p>
            <Button
              onClick={handleSubmit}
              disabled={!allAnswered || isSubmitting}
              className="bg-violet-600 hover:bg-violet-700 text-white"
            >
              {isSubmitting ? <><Spinner className="mr-2" /> Submitting...</> : "Submit Quiz →"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

interface QuizResultProps {
  score: number
  total: number
  passed: boolean
  onNext: () => void
  onRetry: () => void
}

export function QuizResult({ score, total, passed, onNext, onRetry }: QuizResultProps) {
  const pct = Math.round((score / total) * 100)

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="w-full max-w-md bg-background rounded-2xl shadow-2xl overflow-hidden text-center">
        <div className={cn(
          "p-8",
          passed
            ? "bg-gradient-to-br from-green-500 to-emerald-600"
            : "bg-gradient-to-br from-red-500 to-rose-600"
        )}>
          {passed
            ? <CheckCircle2 className="h-16 w-16 text-white mx-auto mb-3" />
            : <XCircle className="h-16 w-16 text-white mx-auto mb-3" />}
          <h2 className="text-3xl font-bold text-white">
            {passed ? "You Passed! 🎉" : "Not Quite! 😅"}
          </h2>
        </div>

        <div className="p-8 space-y-6">
          <div className="space-y-1">
            <p className="text-5xl font-bold">{score}<span className="text-2xl text-muted-foreground">/{total}</span></p>
            <p className="text-muted-foreground">{pct}% score</p>
          </div>

          <div className="rounded-xl bg-muted/40 p-4 text-sm text-muted-foreground">
            {passed
              ? "✅ Great job! You've unlocked the next video."
              : "❌ You need at least 3/5 correct to pass. The video will replay so you can review."}
          </div>

          <Button
            className={cn("w-full", passed ? "bg-green-600 hover:bg-green-700" : "bg-rose-600 hover:bg-rose-700")}
            onClick={passed ? onNext : onRetry}
          >
            {passed ? "▶ Continue to Next Video →" : "↺ Replay Video & Try Again"}
          </Button>
        </div>
      </div>
    </div>
  )
}
