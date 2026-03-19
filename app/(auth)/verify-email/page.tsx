import { Metadata } from "next"
import { Suspense } from "react"
import { VerifyEmailForm } from "@/components/auth/verify-email-form"
import { Spinner } from "@/components/ui/spinner"

export const metadata: Metadata = {
  title: "Verify Email - LearnHub",
  description: "Verify your email address",
}

export default function VerifyEmailPage() {
  return (
    <Suspense fallback={<div className="flex justify-center py-8"><Spinner /></div>}>
      <VerifyEmailForm />
    </Suspense>
  )
}
