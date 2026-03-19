import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET(req: NextRequest) {
  const userId = req.nextUrl.searchParams.get("userId")

  if (!userId) {
    return NextResponse.json({ error: "userId is required" }, { status: 400 })
  }

  try {
    // Find courses the user is enrolled in
    const enrollments = await prisma.enrollment.findMany({
      where: { userId },
      include: {
        course: {
          include: {
            modules: {
              include: {
                lessons: {
                  where: { type: "VIDEO" },
                  include: {
                    progress: {
                      where: { userId }
                    }
                  },
                  orderBy: { order: "asc" }
                }
              },
              orderBy: { order: "asc" }
            }
          }
        }
      }
    })

    const courses = enrollments.map(e => {
      const course = e.course
      const videos = course.modules.flatMap(m => m.lessons)
      const totalVideos = videos.length
      const completedVideos = videos.filter(v => v.progress[0]?.completed).length
      
      // Calculate progress percentage
      const progress = totalVideos > 0 
        ? Math.round((completedVideos / totalVideos) * 100) 
        : 0

      // Find the "next" video (first one not completed)
      const nextVideo = videos.find(v => !v.progress[0]?.completed) || videos[0]

      const { modules, ...courseData } = course

      return {
        ...courseData,
        progress,
        nextVideoTitle: nextVideo?.title || "No lessons yet",
        nextVideoId: nextVideo?.id,
      }
    })

    return NextResponse.json(courses)
  } catch (err) {
    console.error("[GET /api/user/courses]", err)
    return NextResponse.json({ error: "Failed to fetch user courses" }, { status: 500 })
  }
}
