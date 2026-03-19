"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useUser } from "@/lib/user-context"
import { Spinner } from "@/components/ui/spinner"

export default function LogoutPage() {
  const router = useRouter()
  const { setUser } = useUser()

  useEffect(() => {
    // Clear storage
    localStorage.removeItem("learnhub-user")
    
    // Clear context
    setUser({ id: "", name: "", email: "", role: "student" })
    
    // Redirect to landing page
    router.replace("/")
  }, [router, setUser])

  return (
    <div className="h-screen w-full flex flex-col items-center justify-center gap-4">
      <Spinner className="h-8 w-8 text-primary" />
      <p className="text-muted-foreground animate-pulse">Logging you out safely...</p>
    </div>
  )
}
