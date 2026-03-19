import Link from "next/link"
import { GraduationCap } from "lucide-react"

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      <div className="flex flex-col justify-center px-4 py-12 sm:px-6 lg:px-20 xl:px-24">
        <div className="mx-auto w-full max-w-sm">
          <Link href="/" className="flex items-center gap-2 mb-8">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
              <GraduationCap className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-semibold tracking-tight">LearnHub</span>
          </Link>
          {children}
        </div>
      </div>
      <div className="hidden lg:block relative bg-muted">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/10" />
        <div className="absolute inset-0 flex items-center justify-center p-12">
          <div className="max-w-md text-center">
            <blockquote className="text-lg font-medium leading-relaxed">
              &ldquo;LearnHub transformed my career. The courses are world-class, 
              and the community support is incredible.&rdquo;
            </blockquote>
            <div className="mt-6">
              <p className="font-semibold">Sarah Chen</p>
              <p className="text-sm text-muted-foreground">Software Engineer at Google</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
