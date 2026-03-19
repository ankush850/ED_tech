import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { BookOpen, Code2, Users, Trophy, Zap, Shield } from "lucide-react"

const features = [
  {
    icon: BookOpen,
    title: "Expert-Led Courses",
    description: "Learn from industry professionals with real-world experience at top tech companies.",
  },
  {
    icon: Code2,
    title: "Hands-On Practice",
    description: "Master coding with interactive exercises, projects, and LeetCode-style challenges.",
  },
  {
    icon: Users,
    title: "Live Classes",
    description: "Join live sessions with instructors and peers for real-time collaboration.",
  },
  {
    icon: Trophy,
    title: "Certifications",
    description: "Earn industry-recognized certificates to showcase your skills to employers.",
  },
  {
    icon: Zap,
    title: "AI-Powered Learning",
    description: "Get personalized recommendations and AI assistance throughout your journey.",
  },
  {
    icon: Shield,
    title: "Career Support",
    description: "Build your portfolio and connect with hiring partners.",
  },
]

export function Features() {
  return (
    <section className="py-20 lg:py-28">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          <div className="lg:sticky lg:top-24">
            <span className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
              Platform Features
            </span>
            <h2 className="mt-3 text-3xl lg:text-4xl font-bold tracking-tight">
              Everything you need to{" "}
              <span className="text-muted-foreground">accelerate your learning</span>
            </h2>
            <p className="mt-4 text-muted-foreground leading-relaxed max-w-md">
              Our platform combines structured learning with hands-on practice to help you build real-world skills faster.
            </p>
          </div>
          
          <div className="grid sm:grid-cols-2 gap-4">
            {features.map((feature) => (
              <Card key={feature.title} className="border-border/50 bg-card/50">
                <CardHeader className="pb-2">
                  <feature.icon className="h-10 w-10 p-2 rounded-lg bg-secondary text-foreground mb-2" />
                  <CardTitle className="text-lg">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-sm leading-relaxed">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
