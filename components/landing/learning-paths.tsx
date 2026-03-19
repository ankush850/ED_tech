import Link from "next/link"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowRight, BookOpen } from "lucide-react"

const paths: any[] = []

export function LearningPaths() {
  return (
    <section className="py-20 lg:py-28">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
            Structured Learning
          </span>
          <h2 className="mt-2 text-3xl lg:text-4xl font-bold tracking-tight">
            Career-focused learning paths
          </h2>
          <p className="mt-4 text-muted-foreground">
            Follow curated roadmaps designed by industry experts to land your dream job.
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-6">
          {paths.length > 0 ? (
            paths.map((path) => (
              <Card key={path.id} className="group border-border/50 hover:border-border transition-all hover:shadow-sm">
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <Badge variant="secondary">{path.duration}</Badge>
                    <span className="text-sm text-muted-foreground flex items-center gap-1">
                      <BookOpen className="h-4 w-4" />
                      {path.courses} courses
                    </span>
                  </div>
                  <h3 className="text-xl font-semibold group-hover:text-primary transition-colors">
                    {path.title}
                  </h3>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    {path.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {path.skills.map((skill: string) => (
                      <Badge key={skill} variant="outline" className="text-xs">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                  <Link href={`/paths/${path.id}`}>
                    <Button variant="outline" className="w-full gap-2 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                      Start learning
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))
          ) : (
            <p className="text-muted-foreground text-center py-10 col-span-full">No learning paths available yet.</p>
          )}
        </div>
      </div>
    </section>
  )
}
