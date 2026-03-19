import Link from "next/link"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { 
  MessageSquare, 
  ThumbsUp, 
  Eye, 
  Clock, 
  CheckCircle2,
  Pin
} from "lucide-react"

const discussions: any[] = []

const categoryColors: Record<string, string> = {
  "Help & Support": "bg-blue-50 text-blue-700 border-blue-200",
  "Career Advice": "bg-emerald-50 text-emerald-700 border-emerald-200",
  "Project Showcase": "bg-amber-50 text-amber-700 border-amber-200",
  "Resources": "bg-violet-50 text-violet-700 border-violet-200",
  "General Discussion": "bg-slate-50 text-slate-700 border-slate-200",
}

export function DiscussionList() {
  return (
    <div className="space-y-4 text-center">
      {discussions.length > 0 ? (
        discussions.map((discussion) => (
          <Card key={discussion.id} className="p-5 text-left">
            <div className="flex gap-4">
              <Avatar className="h-10 w-10">
                <AvatarImage src={discussion.author.avatar} />
                <AvatarFallback>
                  {discussion.author.name.split(" ").map((n: any) => n[0]).join("")}
                </AvatarFallback>
              </Avatar>
              
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  {discussion.isPinned && (
                    <Pin className="h-4 w-4 text-amber-500" />
                  )}
                  {discussion.isSolved && (
                    <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                  )}
                  <Link 
                    href={`/community/${discussion.id}`}
                    className="text-base font-semibold hover:text-primary"
                  >
                    {discussion.title}
                  </Link>
                </div>
                
                <div className="mt-2 flex flex-wrap items-center gap-2">
                  <Badge 
                    variant="outline" 
                    className={categoryColors[discussion.category]}
                  >
                    {discussion.category}
                  </Badge>
                  {discussion.tags.slice(0, 2).map((tag: any) => (
                    <Badge key={tag} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
                
                <div className="mt-3 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                  <span className="font-medium text-foreground">
                    {discussion.author.name}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="h-3.5 w-3.5" />
                    {discussion.timestamp}
                  </span>
                  <span className="flex items-center gap-1">
                    <MessageSquare className="h-3.5 w-3.5" />
                    {discussion.replies}
                  </span>
                  <span className="flex items-center gap-1">
                    <ThumbsUp className="h-3.5 w-3.5" />
                    {discussion.likes}
                  </span>
                  <span className="flex items-center gap-1">
                    <Eye className="h-3.5 w-3.5" />
                    {discussion.views}
                  </span>
                </div>
              </div>
            </div>
          </Card>
        ))
      ) : (
        <Card className="p-12">
          <MessageSquare className="mx-auto h-12 w-12 text-muted-foreground/50" />
          <h3 className="mt-4 text-lg font-semibold">No discussions yet</h3>
          <p className="text-muted-foreground">Be the first to start a conversation in the community.</p>
        </Card>
      )}
    </div>
  )
}
