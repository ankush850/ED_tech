"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Spinner } from "@/components/ui/spinner"
import { ArrowLeft, Mail, AlertCircle } from "lucide-react"

export function ForgotPasswordForm() {
  const [isLoading, setIsLoading] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [error, setError] = useState("")
  const [email, setEmail] = useState("")
  const [emailError, setEmailError] = useState("")

  const validateEmail = () => {
    if (!email) {
      setEmailError("Email is required")
      return false
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setEmailError("Please enter a valid email")
      return false
    }
    setEmailError("")
    return true
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    
    if (!validateEmail()) return
    
    setIsLoading(true)
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    setIsLoading(false)
    setIsSubmitted(true)
  }

  if (isSubmitted) {
    return (
      <div>
        <div className="mb-8">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 mb-4">
            <Mail className="h-6 w-6 text-primary" />
          </div>
          <h1 className="text-2xl font-bold tracking-tight">Check your email</h1>
          <p className="text-muted-foreground mt-2">
            We sent a password reset link to{" "}
            <span className="font-medium text-foreground">{email}</span>
          </p>
        </div>

        <Button
          variant="outline"
          className="w-full"
          onClick={() => setIsSubmitted(false)}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to reset password
        </Button>

        <p className="mt-8 text-center text-sm text-muted-foreground">
          Didn&apos;t receive the email?{" "}
          <button
            onClick={() => handleSubmit({ preventDefault: () => {} } as React.FormEvent)}
            className="font-medium text-foreground hover:underline"
          >
            Click to resend
          </button>
        </p>

        <p className="mt-4 text-center text-sm text-muted-foreground">
          <Link href="/login" className="font-medium text-foreground hover:underline">
            Back to sign in
          </Link>
        </p>
      </div>
    )
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold tracking-tight">Forgot password?</h1>
        <p className="text-muted-foreground mt-2">
          No worries, we&apos;ll send you reset instructions
        </p>
      </div>

      {error && (
        <Alert variant="destructive" className="mb-6">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="name@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={emailError ? "border-destructive" : ""}
          />
          {emailError && (
            <p className="text-sm text-destructive">{emailError}</p>
          )}
        </div>

        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? <Spinner className="mr-2" /> : null}
          {isLoading ? "Sending..." : "Reset password"}
        </Button>
      </form>

      <p className="mt-8 text-center text-sm text-muted-foreground">
        <Link href="/login" className="font-medium text-foreground hover:underline inline-flex items-center gap-1">
          <ArrowLeft className="h-3 w-3" />
          Back to sign in
        </Link>
      </p>
    </div>
  )
}
