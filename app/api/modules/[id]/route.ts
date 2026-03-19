import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    if (!id) return NextResponse.json({ error: "id required" }, { status: 400 })

    await prisma.module.delete({
      where: { id }
    })

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error("[DELETE /api/modules/[id]]", err)
    return NextResponse.json({ error: "Failed to delete module" }, { status: 500 })
  }
}
