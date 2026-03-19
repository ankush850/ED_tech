"use client"

import { useEffect, useState, use } from "react"
import { Button } from "@/components/ui/button"
import { ChevronLeft, Loader2, AlertCircle } from "lucide-react"
import Link from "next/link"
import { useUser } from "@/lib/user-context"
import { LiveKitRoom, VideoConference, RoomAudioRenderer } from "@livekit/components-react"
import "@livekit/components-styles"
import { Alert, AlertDescription } from "@/components/ui/alert"

export default function LiveClassRoomPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const { name: username } = useUser()
  const [token, setToken] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function getToken() {
      if (!username) return // wait for username
      try {
        const res = await fetch(`/api/live/token?room=${id}&username=${encodeURIComponent(username)}`)
        const data = await res.json()
        if (!res.ok) {
          throw new Error(data.error || "Failed to get token")
        }
        setToken(data.token)
      } catch (err: any) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }
    getToken()
  }, [id, username])

  if (loading || !username) {
    return (
      <div className="flex flex-col h-screen items-center justify-center bg-background">
        <Loader2 className="h-8 w-8 animate-spin text-primary mb-4" />
        <p className="text-muted-foreground">Joining class...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex flex-col h-screen items-center justify-center p-4">
        <Alert variant="destructive" className="max-w-md">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
        <Link href="/live-classes" className="mt-4">
          <Button variant="outline">Back to Classes</Button>
        </Link>
      </div>
    )
  }

  return (
    <div className="flex flex-col h-screen bg-background text-foreground">
      <header className="flex items-center justify-between border-b px-4 py-2 shrink-0">
        <div className="flex items-center gap-4">
          <Link href="/live-classes">
            <Button variant="ghost" size="icon">
              <ChevronLeft className="h-5 w-5" />
            </Button>
          </Link>
          <h1 className="font-semibold">Live Class: {id}</h1>
        </div>
      </header>

      <div className="flex-1 min-h-0" data-lk-theme="default">
        <LiveKitRoom
          video={true}
          audio={true}
          token={token}
          serverUrl={process.env.NEXT_PUBLIC_LIVEKIT_URL}
          className="h-full"
        >
          <VideoConference />
          <RoomAudioRenderer />
        </LiveKitRoom>
      </div>
    </div>
  )
}

