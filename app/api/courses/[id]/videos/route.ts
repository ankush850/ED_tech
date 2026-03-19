import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

// GET all videos in a course
export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  try {
    const videos = await prisma.video.findMany({
      where: { courseId: id },
      include: { quiz: { select: { id: true } } },
      orderBy: { order: "asc" },
    })
    return NextResponse.json(videos)
  } catch (err) {
    console.error("[GET /api/courses/[id]/videos]", err)
    return NextResponse.json({ error: "Failed to fetch videos" }, { status: 500 })
  }
}

// POST add a video to a course (teacher)
export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id: courseId } = await params
  try {
    const { title, videoUrl, order } = await req.json()
    if (!title || !videoUrl) {
      return NextResponse.json({ error: "title and videoUrl are required" }, { status: 400 })
    }

    // Count existing videos to set order
    const existingCount = await prisma.video.count({ where: { courseId } })

    const video = await prisma.video.create({
      data: {
        courseId,
        title,
        videoUrl,
        order: order ?? existingCount,
      },
    })
    return NextResponse.json(video, { status: 201 })
  } catch (err) {
    console.error("[POST /api/courses/[id]/videos]", err)
    return NextResponse.json({ error: "Failed to add video" }, { status: 500 })
  }
}
