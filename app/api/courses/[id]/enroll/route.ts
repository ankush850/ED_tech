import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id: courseId } = await params
  try {
    const body = await req.json().catch(() => ({}))
    const { userId } = body

    if (!userId) {
      return NextResponse.json({ error: "userId is required" }, { status: 400 })
    }

    if (!courseId) {
      return NextResponse.json({ error: "courseId is required" }, { status: 400 })
    }

    const enrollment = await prisma.enrollment.upsert({
      where: { userId_courseId: { userId, courseId } },
      update: {}, // Do nothing if already enrolled
      create: { userId, courseId },
    })

    return NextResponse.json(enrollment, { status: 201 })
  } catch (err) {
    console.error("[POST /api/courses/[id]/enroll]", err)
    return NextResponse.json({ error: "Failed to enroll" }, { status: 500 })
  }
}
