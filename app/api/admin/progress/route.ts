import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

// GET all student progress (teacher/admin only)
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const teacherId = searchParams.get("teacherId")

  try {
    // Get all students
    const students = await prisma.user.findMany({
      where: { role: "student" },
      select: { id: true, name: true, email: true },
    })

    // Get all courses (optionally filter by teacher)
    const courses = await prisma.course.findMany({
      where: teacherId ? { teacherId } : undefined,
      include: {
        modules: {
          include: {
            lessons: {
              include: {
                progress: true,
                quiz: {
                  include: {
                    attempts: {
                      orderBy: { createdAt: "desc" },
                    },
                  },
                },
              },
              orderBy: { order: "asc" },
            },
          },
          orderBy: { order: "asc" },
        },
      },
    })

    // Build a progress summary per student per lesson (previously "video")
    const data = students.map((student) => {
      const lessonProgress = courses.flatMap((course) =>
        course.modules.flatMap((module) =>
          module.lessons.map((lesson) => {
            const prog = lesson.progress.find((p) => p.userId === student.id)
            const bestAttempt = lesson.quiz?.attempts
              .filter((a) => a.userId === student.id)
              .sort((a, b) => b.score - a.score)[0]

            return {
              courseId: course.id,
              courseTitle: course.title,
              moduleId: module.id,
              moduleTitle: module.title,
              lessonId: lesson.id,
              lessonTitle: lesson.title,
              lessonType: lesson.type,
              watchedSec: prog?.watchedSec ?? 0,
              completed: prog?.completed ?? false,
              quizScore: bestAttempt?.score ?? null,
              quizPassed: bestAttempt?.passed ?? null,
              quizAttempts: lesson.quiz?.attempts.filter((a) => a.userId === student.id).length ?? 0,
            }
          })
        )
      )
      return { student, videoProgress: lessonProgress }
    })

    return NextResponse.json(data)
  } catch (err) {
    console.error("[GET /api/admin/progress]", err)
    return NextResponse.json({ error: "Failed to fetch progress" }, { status: 500 })
  }
}
