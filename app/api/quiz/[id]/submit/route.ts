import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

const PASS_THRESHOLD = 3 // must get at least 3/5 correct

// POST submit quiz answers
export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id: quizId } = await params
  try {
    const { userId, answers } = await req.json()
    // answers: number[] — student's chosen option index per question (in order)

    if (!userId || !Array.isArray(answers)) {
      return NextResponse.json({ error: "userId and answers array required" }, { status: 400 })
    }

    // Fetch quiz with correctIndexes (server-side only)
    const quiz = await prisma.quiz.findUnique({
      where: { id: quizId },
      include: {
        questions: {
          select: { correctIndex: true, order: true },
          orderBy: { order: "asc" },
        },
      },
    })

    if (!quiz) return NextResponse.json({ error: "Quiz not found" }, { status: 404 })
    if (answers.length !== quiz.questions.length) {
      return NextResponse.json({ error: "Answer count mismatch" }, { status: 400 })
    }

    // Grade
    let score = 0
    const results = quiz.questions.map((q, i) => {
      const correct = q.correctIndex === answers[i]
      if (correct) score++
      return correct
    })

    const passed = score >= PASS_THRESHOLD

    // Save attempt
    await prisma.quizAttempt.create({
      data: { quizId, userId, score, passed, answers },
    })

    // If passed, mark video progress as completed
    if (passed) {
      const quizWithVideo = await prisma.quiz.findUnique({
        where: { id: quizId },
        select: { videoId: true },
      })
      if (quizWithVideo) {
        await prisma.progress.upsert({
          where: { userId_videoId: { userId, videoId: quizWithVideo.videoId } },
          update: { completed: true },
          create: { userId, videoId: quizWithVideo.videoId, completed: true },
        })
      }
    }

    return NextResponse.json({
      score,
      total: quiz.questions.length,
      passed,
      results, // true/false per question (no correctIndex revealed)
      passThreshold: PASS_THRESHOLD,
    })
  } catch (err) {
    console.error("[POST /api/quiz/[id]/submit]", err)
    return NextResponse.json({ error: "Failed to submit quiz" }, { status: 500 })
  }
}
