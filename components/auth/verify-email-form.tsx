"use client"

import { useState, useEffect, useCallback } from "react"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Spinner } from "@/components/ui/spinner"
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
  InputOTPSeparator,
} from "@/components/ui/input-otp"
import { Mail, AlertCircle, ArrowLeft, CheckCircle2 } from "lucide-react"
import { useUser } from "@/lib/user-context"

const RESEND_COOLDOWN = 60 // seconds

export function VerifyEmailForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const email = searchParams.get("email") ?? ""
  const { setUser } = useUser()

  const [isLoading, setIsLoading] = useState(false)
  const [isResending, setIsResending] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState(false)
  const [code, setCode] = useState("")
  const [cooldown, setCooldown] = useState(0)

  // Countdown timer for resend cooldown
  useEffect(() => {
    if (cooldown <= 0) return
    const timer = setInterval(() => {
      setCooldown((c) => {
        if (c <= 1) {
          clearInterval(timer)
          return 0
        }
        return c - 1
      })
    }, 1000)
    return () => clearInterval(timer)
  }, [cooldown])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (code.length !== 6) {
      setError("Please enter the complete 6-digit verification code")
      return
    }

    if (!email) {
      setError("Email not found. Please go back and sign up again.")
      return
    }

    setIsLoading(true)

    try {
      // Get pending signup data from localStorage
      const pendingDataRaw = localStorage.getItem("learnhub-pending-signup")
      const pendingData = pendingDataRaw ? JSON.parse(pendingDataRaw) : {}

      const res = await fetch("/api/auth/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          email, 
          otp: code,
          name: pendingData.name,
          password: pendingData.password,
          role: pendingData.role
        }),
      })

      const data = await res.json()

      if (!res.ok) {
        setError(data.error || "Verification failed. Please try again.")
        setIsLoading(false)
        return
      }

      // Success! Update user context and clear pending data
      if (data.user) {
        setUser({
          id: data.user.id,
          name: data.user.name,
          email: data.user.email,
          role: data.user.role
        })
        localStorage.setItem("learnhub-user", JSON.stringify(data.user))
      }
      localStorage.removeItem("learnhub-pending-signup")

      setSuccess(true)
      // Small delay to show success state before redirect
      setTimeout(() => router.push("/dashboard"), 1200)
    } catch {
      setError("Network error. Please check your connection and try again.")
      setIsLoading(false)
    }
  }

  const handleResend = useCallback(async () => {
    if (cooldown > 0 || !email) return
    setIsResending(true)
    setError("")
    setCode("")

    try {
      const res = await fetch("/api/auth/send-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      })

      if (!res.ok) {
        const data = await res.json()
        setError(data.error || "Failed to resend OTP")
      } else {
        setCooldown(RESEND_COOLDOWN)
      }
    } catch {
      setError("Network error. Please try again.")
    } finally {
      setIsResending(false)
    }
  }, [email, cooldown])

  return (
    <div>
      <div className="mb-8">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 mb-4">
          {success ? (
            <CheckCircle2 className="h-6 w-6 text-green-600" />
          ) : (
            <Mail className="h-6 w-6 text-primary" />
          )}
        </div>
        <h1 className="text-2xl font-bold tracking-tight">Verify your email</h1>
        <p className="text-muted-foreground mt-2">
          We sent a 6-digit verification code to{" "}
          {email ? (
            <span className="font-medium text-foreground">{email}</span>
          ) : (
            "your email"
          )}
          . Enter it below to verify your account.
        </p>
      </div>

      {error && (
        <Alert variant="destructive" className="mb-6">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {success && (
        <Alert className="mb-6 border-green-200 bg-green-50 text-green-800">
          <CheckCircle2 className="h-4 w-4" />
          <AlertDescription>Email verified! Redirecting to dashboard...</AlertDescription>
        </Alert>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="flex justify-center">
          <InputOTP
            maxLength={6}
            value={code}
            onChange={(value) => setCode(value)}
            disabled={isLoading || success}
          >
            <InputOTPGroup>
              <InputOTPSlot index={0} />
              <InputOTPSlot index={1} />
              <InputOTPSlot index={2} />
            </InputOTPGroup>
            <InputOTPSeparator />
            <InputOTPGroup>
              <InputOTPSlot index={3} />
              <InputOTPSlot index={4} />
              <InputOTPSlot index={5} />
            </InputOTPGroup>
          </InputOTP>
        </div>

        <Button type="submit" className="w-full" disabled={isLoading || success}>
          {isLoading ? <Spinner className="mr-2" /> : null}
          {isLoading ? "Verifying..." : "Verify email"}
        </Button>
      </form>

      <p className="mt-8 text-center text-sm text-muted-foreground">
        Didn&apos;t receive the code?{" "}
        <button
          onClick={handleResend}
          disabled={isResending || cooldown > 0}
          className="font-medium text-foreground hover:underline disabled:opacity-50"
        >
          {isResending
            ? "Resending..."
            : cooldown > 0
            ? `Resend in ${cooldown}s`
            : "Resend code"}
        </button>
      </p>

      <p className="mt-4 text-center text-sm text-muted-foreground">
        <Link href="/login" className="font-medium text-foreground hover:underline inline-flex items-center gap-1">
          <ArrowLeft className="h-3 w-3" />
          Back to sign in
        </Link>
      </p>
    </div>
  )
}
