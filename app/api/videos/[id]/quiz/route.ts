import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

// GET quiz for a video — NEVER returns correctIndex to client
export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id: videoId } = await params
  try {
    const quiz = await prisma.quiz.findUnique({
      where: { lessonId: videoId },
      include: {
        questions: {
          select: {
            id: true,
            text: true,
            options: true,
            order: true,
            // correctIndex is intentionally omitted
          },
          orderBy: { order: "asc" },
        },
      },
    })
    if (!quiz) return NextResponse.json(null)
    return NextResponse.json(quiz)
  } catch (err) {
    console.error("[GET /api/videos/[id]/quiz]", err)
    return NextResponse.json({ error: "Failed to fetch quiz" }, { status: 500 })
  }
}

// POST create quiz with questions (teacher only)
export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id: videoId } = await params
  try {
    const { questions } = await req.json()
    // questions: Array<{ text, options: string[4], correctIndex: number }>

    if (!Array.isArray(questions) || questions.length < 5) {
      return NextResponse.json({ error: "Minimum 5 questions required" }, { status: 400 })
    }

    for (const q of questions) {
      if (!q.text || !Array.isArray(q.options) || q.options.length !== 4 || typeof q.correctIndex !== "number") {
        return NextResponse.json(
          { error: "Each question needs text, exactly 4 options, and a correctIndex (0-3)" },
          { status: 400 }
        )
      }
    }

    // Delete existing quiz if any
    const existing = await prisma.quiz.findUnique({ where: { lessonId: videoId } })
    if (existing) {
      await prisma.quiz.delete({ where: { lessonId: videoId } })
    }

    const quiz = await prisma.quiz.create({
      data: {
        lessonId: videoId,
        questions: {
          create: questions.map((q, i) => ({
            text: q.text,
            options: q.options,
            correctIndex: q.correctIndex,
            order: i,
          })),
        },
      },
      include: { questions: { select: { id: true, text: true, options: true, order: true } } },
    })

    return NextResponse.json(quiz, { status: 201 })
  } catch (err) {
    console.error("[POST /api/videos/[id]/quiz]", err)
    return NextResponse.json({ error: "Failed to create quiz" }, { status: 500 })
  }
}
