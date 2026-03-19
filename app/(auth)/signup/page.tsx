import { Metadata } from "next"
import { SignupForm } from "@/components/auth/signup-form"

export const metadata: Metadata = {
  title: "Sign up - LearnHub",
  description: "Create your LearnHub account",
}

export default function SignupPage() {
  return <SignupForm />
}
