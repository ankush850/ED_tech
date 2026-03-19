import { Metadata } from "next"
import { LoginForm } from "@/components/auth/login-form"

export const metadata: Metadata = {
  title: "Log in - LearnHub",
  description: "Log in to your LearnHub account",
}

export default function LoginPage() {
  return <LoginForm />
}
