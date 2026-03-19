import { NextRequest, NextResponse } from "next/server"
import { generateOTP, storeOTP } from "@/lib/otp-store"

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json()

    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      return NextResponse.json({ error: "Valid email is required" }, { status: 400 })
    }

    const otp = generateOTP()
    storeOTP(email, otp)

    // Option A: Console log (no email provider needed)
    console.log(`\n========================================`)
    console.log(`[OTP] Email: ${email}`)
    console.log(`[OTP] Code:  ${otp}`)
    console.log(`[OTP] Expires in 10 minutes`)
    console.log(`========================================\n`)

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error("[send-otp] Error:", err)
    return NextResponse.json({ error: "Failed to send OTP" }, { status: 500 })
  }
}
