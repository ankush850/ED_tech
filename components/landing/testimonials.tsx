import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Quote } from "lucide-react"

const testimonials: any[] = []

export function Testimonials() {
  return (
    <section className="py-20 lg:py-28 bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
            Success Stories
          </span>
          <h2 className="mt-2 text-3xl lg:text-4xl font-bold tracking-tight">
            Trusted by developers worldwide
          </h2>
        </div>
        
        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.length > 0 ? (
            testimonials.map((testimonial) => (
              <Card key={testimonial.id} className="border-border/50 bg-card">
                <CardContent className="pt-6">
                  <Quote className="h-8 w-8 text-muted-foreground/30 mb-4" />
                  <p className="text-muted-foreground leading-relaxed mb-6">
                    {testimonial.content}
                  </p>
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarFallback className="bg-primary text-primary-foreground text-sm">
                        {testimonial.initials}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium text-sm">{testimonial.author}</p>
                      <p className="text-xs text-muted-foreground">{testimonial.role}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            <p className="text-muted-foreground text-center py-10 col-span-full italic">Wall of Love is currently empty.</p>
          )}
        </div>
      </div>
    </section>
  )
}
