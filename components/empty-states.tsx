import { Button } from "@/components/ui/button"
import { 
  BookOpen, 
  Search, 
  Trophy, 
  MessageSquare, 
  Bell, 
  FileText,
  Code2,
  Video
} from "lucide-react"
import Link from "next/link"

interface EmptyStateProps {
  icon?: React.ReactNode
  title: string
  description: string
  action?: {
    label: string
    href: string
  }
}

export function EmptyState({ icon, title, description, action }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      {icon && (
        <div className="mb-4 rounded-full bg-muted p-4">
          {icon}
        </div>
      )}
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="mt-1 max-w-sm text-sm text-muted-foreground">
        {description}
      </p>
      {action && (
        <Button asChild className="mt-6">
          <Link href={action.href}>{action.label}</Link>
        </Button>
      )}
    </div>
  )
}

export function NoCoursesFound() {
  return (
    <EmptyState
      icon={<Search className="h-8 w-8 text-muted-foreground" />}
      title="No courses found"
      description="Try adjusting your search or filter criteria to find what you're looking for."
    />
  )
}

export function NoEnrolledCourses() {
  return (
    <EmptyState
      icon={<BookOpen className="h-8 w-8 text-muted-foreground" />}
      title="No enrolled courses"
      description="Start your learning journey by exploring our course catalog."
      action={{
        label: "Browse Courses",
        href: "/courses",
      }}
    />
  )
}

export function NoCertificates() {
  return (
    <EmptyState
      icon={<Trophy className="h-8 w-8 text-muted-foreground" />}
      title="No certificates yet"
      description="Complete courses to earn certificates and showcase your skills."
      action={{
        label: "View Courses",
        href: "/courses",
      }}
    />
  )
}

export function NoDiscussions() {
  return (
    <EmptyState
      icon={<MessageSquare className="h-8 w-8 text-muted-foreground" />}
      title="No discussions yet"
      description="Be the first to start a conversation in this community."
      action={{
        label: "Start Discussion",
        href: "/community/new",
      }}
    />
  )
}

export function NoNotifications() {
  return (
    <EmptyState
      icon={<Bell className="h-8 w-8 text-muted-foreground" />}
      title="No notifications"
      description="You're all caught up! Check back later for updates."
    />
  )
}

export function NoProjects() {
  return (
    <EmptyState
      icon={<FileText className="h-8 w-8 text-muted-foreground" />}
      title="No projects yet"
      description="Add your portfolio projects to showcase your work."
      action={{
        label: "Add Project",
        href: "/profile/projects/new",
      }}
    />
  )
}

export function NoProblemsSolved() {
  return (
    <EmptyState
      icon={<Code2 className="h-8 w-8 text-muted-foreground" />}
      title="No problems solved"
      description="Start practicing coding problems to improve your skills."
      action={{
        label: "Start Practice",
        href: "/practice",
      }}
    />
  )
}

export function NoLiveClasses() {
  return (
    <EmptyState
      icon={<Video className="h-8 w-8 text-muted-foreground" />}
      title="No live classes scheduled"
      description="Check back later for upcoming live sessions."
    />
  )
}
