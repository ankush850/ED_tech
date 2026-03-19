import { Metadata } from "next"
import { LearningLayout } from "@/components/learn/learning-layout"

export const metadata: Metadata = {
  title: "Learning - LearnHub",
  description: "Continue your learning journey",
}

export default function LearningPage() {
  return <LearningLayout />
}
