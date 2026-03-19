import { NextRequest, NextResponse } from "next/server"
import { verifyOTP } from "@/lib/otp-store"
import { prisma } from "@/lib/prisma"
import bcrypt from "bcryptjs"

export async function POST(req: NextRequest) {
  try {
    const { email, otp, name, password, role } = await req.json()

    if (!email || !otp) {
      return NextResponse.json({ error: "Email and OTP are required" }, { status: 400 })
    }

    verifyOTP(email, otp) // throws on failure

    // Create user in DB if name and password are provided (signup flow)
    let user = null
    if (name && password) {
      const hashedPassword = await bcrypt.hash(password, 10)
      user = await prisma.user.create({
        data: {
          name,
          email,
          password: hashedPassword,
          role: role || "student",
        }
      })
    } else {
      // Just verifying (could be for password reset or login)
      user = await prisma.user.findUnique({ where: { email } })
    }

    return NextResponse.json({ 
      success: true,
      user: user ? {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role
      } : null
    })
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Verification failed"
    return NextResponse.json({ error: message }, { status: 400 })
  }
}
