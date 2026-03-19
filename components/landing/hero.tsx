import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Play } from "lucide-react"

export function Hero() {
  return (
    <section className="relative overflow-hidden py-20 lg:py-32">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
          <Badge variant="secondary" className="mb-6 px-4 py-1.5 text-sm font-medium">
            <span className="mr-2 inline-block h-2 w-2 rounded-full bg-green-500"></span>
            New: AI-Powered Learning Paths
          </Badge>
          
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl text-balance">
            The complete platform to{" "}
            <span className="text-muted-foreground">master new skills</span>
          </h1>
          
          <p className="mt-6 text-lg text-muted-foreground max-w-2xl leading-relaxed">
            Transform your career with world-class courses, hands-on coding practice, 
            and expert instructors. Join millions of learners advancing their skills.
          </p>
          
          <div className="mt-10 flex flex-col sm:flex-row gap-4">
            <Link href="/signup">
              <Button size="lg" className="gap-2 px-8">
                Get started
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link href="/courses">
              <Button size="lg" variant="outline" className="gap-2 px-8">
                <Play className="h-4 w-4" />
                Explore courses
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
