"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { DashboardSidebar } from "@/components/dashboard/sidebar"
import { DashboardHeader } from "@/components/dashboard/header"
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"
import { FocusModeProvider } from "@/lib/focus-mode-context"
import { FocusModeWrapper } from "@/components/dashboard/focus-mode-wrapper"
import { useUser } from "@/lib/user-context"
import { Spinner } from "@/components/ui/spinner"

function AuthGuard({ children }: { children: React.ReactNode }) {
  const { email, isLoading } = useUser()
  const router = useRouter()

  useEffect(() => {
    // Only redirect if loading is finished and no email is set
    if (!isLoading && !email) {
      router.replace("/login")
    }
  }, [email, isLoading, router])

  if (isLoading) {
    return (
      <div className="h-screen w-full flex items-center justify-center">
        <Spinner className="h-8 w-8 text-primary" />
      </div>
    )
  }

  if (!email) return null

  return <>{children}</>
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <FocusModeProvider>
      <SidebarProvider>
        <AuthGuard>
          <DashboardSidebar />
          <SidebarInset>
            <FocusModeWrapper>
              <DashboardHeader />
              <main className="flex-1 p-6">{children}</main>
            </FocusModeWrapper>
          </SidebarInset>
        </AuthGuard>
      </SidebarProvider>
    </FocusModeProvider>
  )
}
