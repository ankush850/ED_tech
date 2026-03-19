import { Metadata } from "next"
import { Header } from "@/components/landing/header"
import { Footer } from "@/components/landing/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Check, Sparkles } from "lucide-react"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Pricing - LearnHub",
  description: "Choose the plan that's right for you",
}

const plans = [
  {
    name: "Free",
    description: "Get started with the basics",
    price: 0,
    period: "forever",
    features: [
      "Access to free courses",
      "Basic coding practice",
      "Community access",
      "Email support",
      "Course previews",
    ],
    cta: "Get Started",
    href: "/signup",
    popular: false,
  },
  {
    name: "Pro",
    description: "Everything you need to learn",
    price: 29,
    period: "per month",
    features: [
      "All free features",
      "Unlimited course access",
      "Advanced coding challenges",
      "Certificate of completion",
      "Live classes access",
      "Priority support",
      "Offline downloads",
      "Resume builder",
    ],
    cta: "Start Pro Trial",
    href: "/signup?plan=pro",
    popular: true,
  },
  {
    name: "Team",
    description: "For teams and organizations",
    price: 79,
    period: "per user/month",
    features: [
      "All Pro features",
      "Team analytics dashboard",
      "Custom learning paths",
      "Admin controls",
      "SSO integration",
      "Dedicated success manager",
      "API access",
      "Custom branding",
    ],
    cta: "Contact Sales",
    href: "/enterprise",
    popular: false,
  },
]

const faqs = [
  {
    question: "Can I switch plans later?",
    answer: "Yes, you can upgrade or downgrade your plan at any time. Changes will be prorated based on your billing cycle.",
  },
  {
    question: "Is there a free trial?",
    answer: "Yes! We offer a 14-day free trial for the Pro plan. No credit card required to start.",
  },
  {
    question: "Do you offer student discounts?",
    answer: "Absolutely! Students with a valid .edu email get 50% off all plans. Contact support to verify your status.",
  },
  {
    question: "What payment methods do you accept?",
    answer: "We accept all major credit cards, PayPal, and bank transfers for annual plans.",
  },
  {
    question: "Can I get a refund?",
    answer: "We offer a 30-day money-back guarantee for all paid plans. If you're not satisfied, we'll refund your purchase.",
  },
]

export default function PricingPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <section className="py-20 lg:py-28">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-2xl mx-auto">
              <Badge variant="secondary" className="mb-4">Pricing</Badge>
              <h1 className="text-3xl lg:text-5xl font-bold tracking-tight text-balance">
                Simple, transparent pricing
              </h1>
              <p className="mt-4 text-lg text-muted-foreground">
                Choose the plan that works best for you. All plans include access to our community and learning resources.
              </p>
            </div>

            <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3 max-w-5xl mx-auto">
              {plans.map((plan) => (
                <Card 
                  key={plan.name} 
                  className={`relative flex flex-col ${plan.popular ? "border-primary shadow-lg scale-105" : ""}`}
                >
                  {plan.popular && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                      <Badge className="gap-1">
                        <Sparkles className="h-3 w-3" />
                        Most Popular
                      </Badge>
                    </div>
                  )}
                  <CardHeader>
                    <CardTitle className="text-xl">{plan.name}</CardTitle>
                    <CardDescription>{plan.description}</CardDescription>
                    <div className="mt-4">
                      <span className="text-4xl font-bold">${plan.price}</span>
                      <span className="text-muted-foreground">/{plan.period}</span>
                    </div>
                  </CardHeader>
                  <CardContent className="flex-1">
                    <ul className="space-y-3">
                      {plan.features.map((feature) => (
                        <li key={feature} className="flex items-center gap-2 text-sm">
                          <Check className="h-4 w-4 text-emerald-500 shrink-0" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                  <CardFooter>
                    <Button 
                      className="w-full" 
                      variant={plan.popular ? "default" : "outline"}
                      asChild
                    >
                      <Link href={plan.href}>{plan.cta}</Link>
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4 max-w-3xl">
            <h2 className="text-2xl font-bold text-center mb-12">Frequently Asked Questions</h2>
            <div className="space-y-6">
              {faqs.map((faq) => (
                <Card key={faq.question}>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">{faq.question}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">{faq.answer}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-2xl lg:text-3xl font-bold">Ready to start learning?</h2>
            <p className="mt-2 text-muted-foreground">
              Join thousands of learners already mastering new skills.
            </p>
            <div className="mt-8 flex justify-center gap-4">
              <Button size="lg" asChild>
                <Link href="/signup">Get Started Free</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/courses">Browse Courses</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
