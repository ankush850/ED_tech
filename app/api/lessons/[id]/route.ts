import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    if (!id) return NextResponse.json({ error: "id required" }, { status: 400 })

    await prisma.lesson.delete({
      where: { id }
    })

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error("[DELETE /api/lessons/[id]]", err)
    return NextResponse.json({ error: "Failed to delete lesson" }, { status: 500 })
  }
}
