import { NextResponse } from "next/server"
import { PrismaClient } from "@prisma/client"
import bcrypt from "bcryptjs"

const prisma = new PrismaClient()

// GET /api/seed-admin - One-time admin seeding endpoint
export async function GET() {
  try {
    const hashedPassword = await bcrypt.hash("LearnHub@123", 10)

    const admin = await prisma.user.upsert({
      where: { email: "Admin-LearnHub@gmail.com" },
      update: {
        role: "admin",
        password: hashedPassword,
      },
      create: {
        name: "Admin",
        email: "Admin-LearnHub@gmail.com",
        password: hashedPassword,
        role: "admin",
      },
    })

    return NextResponse.json({
      success: true,
      message: "Admin user seeded successfully",
      email: admin.email,
    })
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    )
  }
}
