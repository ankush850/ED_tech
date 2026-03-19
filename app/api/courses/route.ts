import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

// GET all courses
export async function GET() {
  try {
    const courses = await prisma.course.findMany({
      include: { 
        modules: { 
          include: { lessons: { orderBy: { order: "asc" } } },
          orderBy: { order: "asc" }
        } 
      },
      orderBy: { createdAt: "desc" },
    })
    return NextResponse.json(courses)
  } catch (err) {
    console.error("[GET /api/courses]", err)
    return NextResponse.json({ error: "Failed to fetch courses" }, { status: 500 })
  }
}

// POST create a course (teacher only)
export async function POST(req: NextRequest) {
  try {
    const { title, description, teacherId } = await req.json()
    if (!title || !teacherId) {
      return NextResponse.json({ error: "title and teacherId are required" }, { status: 400 })
    }
    const course = await prisma.course.create({
      data: { title, description: description ?? "", teacherId },
    })
    return NextResponse.json(course, { status: 201 })
  } catch (err) {
    console.error("[POST /api/courses]", err)
    return NextResponse.json({ error: "Failed to create course" }, { status: 500 })
  }
}
