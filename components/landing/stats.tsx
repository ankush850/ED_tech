const stats = [
  { value: "50K+", label: "Active learners", company: "Trusted by Google" },
  { value: "2,500+", label: "Expert courses", company: "Used at Microsoft" },
  { value: "95%", label: "Success rate", company: "Certified by AWS" },
  { value: "24/7", label: "Support available", company: "Enterprise ready" },
]

export function Stats() {
  return (
    <section className="border-y border-border bg-card">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-border">
          {stats.map((stat) => (
            <div key={stat.label} className="py-10 lg:py-12 px-6 lg:px-8 text-center lg:text-left">
              <p className="text-2xl lg:text-3xl font-bold tracking-tight">{stat.value}</p>
              <p className="text-sm text-muted-foreground mt-1">{stat.label}</p>
              <p className="text-xs text-muted-foreground/70 mt-3 font-medium uppercase tracking-wide">
                {stat.company}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
