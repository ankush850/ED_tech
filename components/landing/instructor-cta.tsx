import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, DollarSign, Users, BarChart3 } from "lucide-react"

const benefits = [
  { icon: Users, label: "Reach 50K+ students" },
  { icon: DollarSign, label: "Earn on your terms" },
  { icon: BarChart3, label: "Track your analytics" },
]

export function InstructorCTA() {
  return (
    <section className="py-20 lg:py-28">
      <div className="container mx-auto px-4">
        <div className="rounded-2xl bg-primary text-primary-foreground p-8 lg:p-16">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
            <div>
              <h2 className="text-3xl lg:text-4xl font-bold tracking-tight">
                Become an instructor
              </h2>
              <p className="mt-4 text-primary-foreground/80 leading-relaxed max-w-md">
                Share your expertise with millions of learners worldwide. Create courses, 
                build your brand, and earn income doing what you love.
              </p>
              <div className="flex flex-wrap gap-6 mt-8">
                {benefits.map((benefit) => (
                  <div key={benefit.label} className="flex items-center gap-2">
                    <benefit.icon className="h-5 w-5 text-primary-foreground/70" />
                    <span className="text-sm font-medium">{benefit.label}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex flex-col sm:flex-row lg:justify-end gap-4">
              <Link href="/teach">
                <Button size="lg" variant="secondary" className="gap-2 w-full sm:w-auto">
                  Start teaching today
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link href="/instructor-guide">
                <Button size="lg" variant="outline" className="w-full sm:w-auto border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/10">
                  Learn more
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
