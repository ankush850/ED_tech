import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params

  try {
    const video = await prisma.lesson.findUnique({
      where: { id },
    })

    if (!video) {
      return new NextResponse("Video not found", { status: 404 })
    }

    const { videoUrl, type } = video
    
    if (type !== "VIDEO" || !videoUrl) {
        return new NextResponse("Video not found for this lesson", { status: 404 })
    }

    // It's a remote URL (Supabase), just redirect to it
    return NextResponse.redirect(videoUrl)
  } catch (err) {
    console.error(`[GET /api/videos/${id}/stream]`, err)
    return new NextResponse("Internal Server Error", { status: 500 })
  }
}
