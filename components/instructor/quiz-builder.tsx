"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Spinner } from "@/components/ui/spinner"
import { Badge } from "@/components/ui/badge"
import { Plus, Trash2, CheckCircle2, AlertCircle, GripVertical } from "lucide-react"
import { cn } from "@/lib/utils"

interface QuestionDraft {
  text: string
  options: [string, string, string, string]
  correctIndex: number
}

interface QuizBuilderProps {
  videoId: string
  onSuccess?: () => void
}

const emptyQuestion = (): QuestionDraft => ({
  text: "",
  options: ["", "", "", ""],
  correctIndex: 0,
})

export function QuizBuilder({ videoId, onSuccess }: QuizBuilderProps) {
  const [questions, setQuestions] = useState<QuestionDraft[]>([emptyQuestion(), emptyQuestion(), emptyQuestion(), emptyQuestion(), emptyQuestion()])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState(false)

  const updateQuestion = (index: number, field: keyof QuestionDraft, value: unknown) => {
    setQuestions((prev) => {
      const next = [...prev]
      next[index] = { ...next[index], [field]: value }
      return next
    })
  }

  const updateOption = (qIndex: number, optIndex: number, value: string) => {
    setQuestions((prev) => {
      const next = [...prev]
      const opts = [...next[qIndex].options] as [string, string, string, string]
      opts[optIndex] = value
      next[qIndex] = { ...next[qIndex], options: opts }
      return next
    })
  }

  const addQuestion = () => {
    if (questions.length >= 10) return
    setQuestions((prev) => [...prev, emptyQuestion()])
  }

  const removeQuestion = (index: number) => {
    if (questions.length <= 5) {
      setError("Minimum 5 questions required")
      return
    }
    setQuestions((prev) => prev.filter((_, i) => i !== index))
  }

  const validate = () => {
    if (questions.length < 5) return "Minimum 5 questions required"
    for (let i = 0; i < questions.length; i++) {
      const q = questions[i]
      if (!q.text.trim()) return `Question ${i + 1}: Text is required`
      if (q.options.some((o) => !o.trim())) return `Question ${i + 1}: All 4 options are required`
    }
    return null
  }

  const handleSave = async () => {
    const err = validate()
    if (err) { setError(err); return }
    setError("")
    setIsLoading(true)

    try {
      const res = await fetch(`/api/videos/${videoId}/quiz`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ questions }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || "Failed to save quiz")
      setSuccess(true)
      onSuccess?.()
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to save quiz")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-semibold">Quiz Builder</h3>
          <p className="text-sm text-muted-foreground">Minimum 5 questions · 4 options each · Mark the correct answer</p>
        </div>
        <Badge variant="secondary">{questions.length} / 10 questions</Badge>
      </div>

      {error && <Alert variant="destructive"><AlertCircle className="h-4 w-4" /><AlertDescription>{error}</AlertDescription></Alert>}
      {success && <Alert className="border-green-200 bg-green-50 text-green-800"><CheckCircle2 className="h-4 w-4" /><AlertDescription>Quiz saved successfully!</AlertDescription></Alert>}

      <div className="space-y-4">
        {questions.map((q, qIdx) => (
          <div key={qIdx} className="rounded-xl border bg-card p-4 space-y-3">
            <div className="flex items-start gap-2">
              <GripVertical className="h-5 w-5 text-muted-foreground mt-2 shrink-0" />
              <div className="flex-1 space-y-3">
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="shrink-0">Q{qIdx + 1}</Badge>
                  <Input
                    placeholder="Question text..."
                    value={q.text}
                    onChange={(e) => updateQuestion(qIdx, "text", e.target.value)}
                    className="flex-1"
                  />
                  <Button variant="ghost" size="icon" className="h-8 w-8 shrink-0 text-destructive hover:text-destructive" onClick={() => removeQuestion(qIdx)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  {q.options.map((opt, optIdx) => (
                    <div key={optIdx} className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => updateQuestion(qIdx, "correctIndex", optIdx)}
                        className={cn(
                          "h-6 w-6 rounded-full border-2 shrink-0 flex items-center justify-center transition-all",
                          q.correctIndex === optIdx
                            ? "border-green-500 bg-green-500"
                            : "border-muted-foreground/30 hover:border-green-400"
                        )}
                        title="Mark as correct answer"
                      >
                        {q.correctIndex === optIdx && <span className="text-white text-xs font-bold">✓</span>}
                      </button>
                      <Input
                        placeholder={`Option ${optIdx + 1}`}
                        value={opt}
                        onChange={(e) => updateOption(qIdx, optIdx, e.target.value)}
                        className={cn(
                          "text-sm",
                          q.correctIndex === optIdx && "border-green-400 bg-green-50 dark:bg-green-950/20"
                        )}
                      />
                    </div>
                  ))}
                </div>
                <p className="text-xs text-muted-foreground">
                  ✓ Click the circle next to the correct answer. Students will NOT see which is correct before attempting.
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="flex gap-3">
        <Button variant="outline" onClick={addQuestion} disabled={questions.length >= 10} className="gap-2">
          <Plus className="h-4 w-4" /> Add Question
        </Button>
        <Button onClick={handleSave} disabled={isLoading} className="gap-2 ml-auto">
          {isLoading ? <><Spinner className="mr-2" /> Saving Quiz...</> : "Save Quiz"}
        </Button>
      </div>

      <p className="text-xs text-muted-foreground text-center">
        📌 Correct answers are stored securely on the server and never shown to students before they attempt the quiz.
      </p>
    </div>
  )
}
