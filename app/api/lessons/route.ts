import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function POST(req: NextRequest) {
  try {
    const { moduleId, title, description, type, content, videoUrl } = await req.json()
    if (!moduleId || !title || !type) return NextResponse.json({ error: "moduleId, title and type required" }, { status: 400 })

    const lastLesson = await prisma.lesson.findFirst({
      where: { moduleId },
      orderBy: { order: "desc" }
    })
    const order = lastLesson ? lastLesson.order + 1 : 0

    const lesson = await prisma.lesson.create({
      data: { moduleId, title, description, type, content, videoUrl, order }
    })
    return NextResponse.json(lesson, { status: 201 })
  } catch (err) {
    console.error("[POST /api/lessons]", err)
    return NextResponse.json({ error: "Failed to create lesson" }, { status: 500 })
  }
}
