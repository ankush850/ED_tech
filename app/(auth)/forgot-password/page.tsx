import { Metadata } from "next"
import { ForgotPasswordForm } from "@/components/auth/forgot-password-form"

export const metadata: Metadata = {
  title: "Reset Password - LearnHub",
  description: "Reset your LearnHub password",
}

export default function ForgotPasswordPage() {
  return <ForgotPasswordForm />
}
