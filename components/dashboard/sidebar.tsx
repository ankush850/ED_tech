"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  GraduationCap,
  LayoutDashboard,
  BookOpen,
  Code2,
  Users,
  Video,
  Trophy,
  Settings,
  LogOut,
  ChevronUp,
  MessageSquare,
  Bell,
  BarChart2,
  PlusCircle,
  ClipboardList,
  FileText,
} from "lucide-react"
import { useUser } from "@/lib/user-context"
import { useFocusMode } from "@/lib/focus-mode-context"
import { cn } from "@/lib/utils"

const studentNavItems = [
  { title: "Dashboard", icon: LayoutDashboard, href: "/dashboard" },
  { title: "My Courses", icon: BookOpen, href: "/dashboard/courses" },
  { title: "Practice", icon: Code2, href: "/practice" },
  { title: "Live Classes", icon: Video, href: "/live-classes" },
  { title: "Resume Builder", icon: FileText, href: "/resume/resume-builder" },
  { title: "Community", icon: Users, href: "/community" },
]



const adminNavItems = [
  { title: "Dashboard", icon: LayoutDashboard, href: "/dashboard" },
  { title: "All Courses", icon: BookOpen, href: "/dashboard/courses" },
  { title: "Create Course", icon: PlusCircle, href: "/instructor" },
  { title: "Live Classes", icon: Video, href: "/live-classes" },
  { title: "Users", icon: Users, href: "/community" },
  { title: "Community", icon: MessageSquare, href: "/community" },
  { title: "Resume Builder", icon: FileText, href: "/resume/resume-builder" },
  { title: "Analytics", icon: BarChart2, href: "/instructor" },
]

const studentSecondaryItems = [
  { title: "Certificates", icon: Trophy, href: "/profile" },
  { title: "Notifications", icon: Bell, href: "/notifications" },
  { title: "Instructor", icon: GraduationCap, href: "/instructor" },
]



const adminSecondaryItems = [
  { title: "Notifications", icon: Bell, href: "/notifications" },
  { title: "Settings", icon: Settings, href: "/dashboard/settings" },
]

export function DashboardSidebar() {
  const pathname = usePathname()
  const { role, name } = useUser()
  const { isFocusMode } = useFocusMode()

  const mainItems = role === "admin" ? adminNavItems : studentNavItems
  const secondaryItems = role === "admin" ? adminSecondaryItems : studentSecondaryItems

  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2)

  return (
    <Sidebar className={cn(isFocusMode && "opacity-30 pointer-events-none select-none transition-opacity duration-300")}>
      <SidebarHeader className="border-b border-sidebar-border p-4">
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sidebar-primary">
            <GraduationCap className="h-5 w-5 text-sidebar-primary-foreground" />
          </div>
          <span className="text-lg font-semibold">LearnHub</span>
        </Link>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>
            {role === "admin" ? "Admin" : "Student"} Menu
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {mainItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild isActive={pathname === item.href}>
                    <Link href={item.href}>
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Resources</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {secondaryItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild isActive={pathname === item.href}>
                    <Link href={item.href}>
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t border-sidebar-border">
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton className="w-full">
                  <Avatar className="h-6 w-6">
                    <AvatarFallback className={cn(
                      "text-xs font-semibold",
                      role === "admin"
                        ? "bg-rose-100 text-rose-700"
                        : "bg-blue-100 text-blue-700"
                    )}>
                      {initials}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 text-left">
                    <p className="text-sm font-medium leading-none">{name}</p>
                    <p className="text-xs text-muted-foreground capitalize">
                      {role === "admin" ? "Administrator" : "Student"}
                    </p>
                  </div>
                  <ChevronUp className="h-4 w-4" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent side="top" className="w-[--radix-popper-anchor-width]">
                <DropdownMenuItem asChild>
                  <Link href="/dashboard/profile">
                    <Settings className="mr-2 h-4 w-4" />
                    Settings
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/logout">
                    <LogOut className="mr-2 h-4 w-4" />
                    Log out
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}
