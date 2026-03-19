import { LiveClassHeader } from "@/components/live-classes/live-class-header"
import { LiveNow } from "@/components/live-classes/live-now"
import { UpcomingLiveClasses } from "@/components/live-classes/upcoming-classes"
import { PastRecordings } from "@/components/live-classes/past-recordings"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function LiveClassesPage() {
  return (
    <div className="container mx-auto max-w-7xl px-4 py-8">
      <LiveClassHeader />
      
      <div className="mt-8">
        <LiveNow />
      </div>

      <Tabs defaultValue="upcoming" className="mt-8">
        <TabsList>
          <TabsTrigger value="upcoming">Upcoming Classes</TabsTrigger>
          <TabsTrigger value="recordings">Recordings</TabsTrigger>
        </TabsList>
        <TabsContent value="upcoming" className="mt-6">
          <UpcomingLiveClasses />
        </TabsContent>
        <TabsContent value="recordings" className="mt-6">
          <PastRecordings />
        </TabsContent>
      </Tabs>
    </div>
  )
}
