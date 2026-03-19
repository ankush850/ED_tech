"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu, GraduationCap } from "lucide-react"
import { useState } from "react"
import { ThemeToggle } from "@/components/theme-toggle"
import { useUser } from "@/lib/user-context"

const courses = [
  { title: "Web Development", description: "Build modern web applications", href: "/courses/web-development" },
  { title: "Data Science", description: "Master data analysis & ML", href: "/courses/data-science" },
  { title: "Mobile Development", description: "Create iOS & Android apps", href: "/courses/mobile" },
  { title: "Cloud Computing", description: "AWS, Azure, and GCP", href: "/courses/cloud" },
]

const resources = [
  { title: "Documentation", description: "Guides and tutorials", href: "/docs" },
  { title: "Community", description: "Join our learning community", href: "/community" },
  { title: "Blog", description: "Latest updates and tips", href: "/blog" },
]

export function Header() {
  const [open, setOpen] = useState(false)
  const { email, name } = useUser()
  const isLoggedIn = email !== ""

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
            <GraduationCap className="h-5 w-5 text-primary-foreground" />
          </div>
          <span className="text-xl font-semibold tracking-tight">LearnHub</span>
        </Link>

        <NavigationMenu className="hidden lg:flex">
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger className="bg-transparent">Courses</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2">
                  {courses.map((course) => (
                    <li key={course.title}>
                      <NavigationMenuLink asChild>
                        <Link
                          href={course.href}
                          className="block select-none rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                        >
                          <div className="text-sm font-medium leading-none">{course.title}</div>
                          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground mt-1">
                            {course.description}
                          </p>
                        </Link>
                      </NavigationMenuLink>
                    </li>
                  ))}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuTrigger className="bg-transparent">Resources</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-[300px] gap-3 p-4">
                  {resources.map((resource) => (
                    <li key={resource.title}>
                      <NavigationMenuLink asChild>
                        <Link
                          href={resource.href}
                          className="block select-none rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                        >
                          <div className="text-sm font-medium leading-none">{resource.title}</div>
                          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground mt-1">
                            {resource.description}
                          </p>
                        </Link>
                      </NavigationMenuLink>
                    </li>
                  ))}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link
                  href="/pricing"
                  className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-transparent px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none"
                >
                  Pricing
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link
                  href="/enterprise"
                  className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-transparent px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none"
                >
                  Enterprise
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>

        <div className="hidden lg:flex items-center gap-2">
          <ThemeToggle />
          {isLoggedIn ? (
            <>
              <Link href="/dashboard">
                <Button variant="ghost" size="sm">
                  Dashboard
                </Button>
              </Link>
              <Link href="/logout">
                <Button variant="outline" size="sm">
                  Log out
                </Button>
              </Link>
            </>
          ) : (
            <>
              <Link href="/login">
                <Button variant="ghost" size="sm">
                  Log in
                </Button>
              </Link>
              <Link href="/signup">
                <Button size="sm">Sign up</Button>
              </Link>
            </>
          )}
        </div>

        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild className="lg:hidden">
            <Button variant="ghost" size="icon">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[300px]">
            <nav className="flex flex-col gap-4 mt-8">
              <Link href="/courses" className="text-lg font-medium" onClick={() => setOpen(false)}>
                Courses
              </Link>
              <Link href="/pricing" className="text-lg font-medium" onClick={() => setOpen(false)}>
                Pricing
              </Link>
              <Link href="/community" className="text-lg font-medium" onClick={() => setOpen(false)}>
                Community
              </Link>
              <Link href="/enterprise" className="text-lg font-medium" onClick={() => setOpen(false)}>
                Enterprise
              </Link>
              <div className="flex flex-col gap-2 mt-4 pt-4 border-t">
                {isLoggedIn ? (
                  <>
                    <Link href="/dashboard" onClick={() => setOpen(false)}>
                      <Button variant="outline" className="w-full">Dashboard</Button>
                    </Link>
                    <Link href="/logout" onClick={() => setOpen(false)}>
                      <Button variant="ghost" className="w-full">Log out</Button>
                    </Link>
                  </>
                ) : (
                  <>
                    <Link href="/login" onClick={() => setOpen(false)}>
                      <Button variant="outline" className="w-full">Log in</Button>
                    </Link>
                    <Link href="/signup" onClick={() => setOpen(false)}>
                      <Button className="w-full">Sign up</Button>
                    </Link>
                  </>
                )}
              </div>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  )
}
