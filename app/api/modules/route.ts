import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function POST(req: NextRequest) {
  try {
    const { courseId, title, description } = await req.json()
    if (!courseId || !title) return NextResponse.json({ error: "courseId and title required" }, { status: 400 })

    const lastModule = await prisma.module.findFirst({
      where: { courseId },
      orderBy: { order: "desc" }
    })
    const order = lastModule ? lastModule.order + 1 : 0

    const module = await prisma.module.create({
      data: { courseId, title, description, order }
    })
    return NextResponse.json(module, { status: 201 })
  } catch (err) {
    console.error("[POST /api/modules]", err)
    return NextResponse.json({ error: "Failed to create module" }, { status: 500 })
  }
}
