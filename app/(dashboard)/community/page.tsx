import { CommunityHeader } from "@/components/community/community-header"
import { DiscussionList } from "@/components/community/discussion-list"
import { TopContributors } from "@/components/community/top-contributors"
import { TrendingTopics } from "@/components/community/trending-topics"
import { ChatInterface } from "@/components/community/chat-interface"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MessageSquare, Users } from "lucide-react"

export default function CommunityPage() {
  return (
    <div className="container mx-auto max-w-7xl px-4 py-8">
      <CommunityHeader />
      
      <Tabs defaultValue="discussions" className="mt-8">
        <TabsList>
          <TabsTrigger value="discussions" className="gap-2">
            <Users className="h-4 w-4" />
            Discussions
          </TabsTrigger>
          <TabsTrigger value="chat" className="gap-2">
            <MessageSquare className="h-4 w-4" />
            Live Chat
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="discussions" className="mt-6">
          <div className="grid gap-8 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <DiscussionList />
            </div>
            <div className="space-y-6">
              <TrendingTopics />
              <TopContributors />
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="chat" className="mt-6">
          <ChatInterface />
        </TabsContent>
      </Tabs>
    </div>
  )
}
