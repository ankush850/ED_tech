import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

// POST save/update watch progress
export async function POST(req: NextRequest) {
  try {
    const { userId, videoId, watchedSec } = await req.json()
    if (!userId || !videoId) {
      return NextResponse.json({ error: "userId and videoId required" }, { status: 400 })
    }

    const progress = await prisma.progress.upsert({
      where: { userId_videoId: { userId, videoId } },
      update: { watchedSec: Math.max(watchedSec, 0) },
      create: { userId, videoId, watchedSec: Math.max(watchedSec, 0) },
    })

    return NextResponse.json(progress)
  } catch (err) {
    console.error("[POST /api/progress]", err)
    return NextResponse.json({ error: "Failed to save progress" }, { status: 500 })
  }
}
