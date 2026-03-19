import { Metadata } from "next"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Header } from "@/components/landing/header"
import { Footer } from "@/components/landing/footer"
import {
  MapPin,
  Link as LinkIcon,
  Calendar,
  Github,
  Linkedin,
  Twitter,
  Award,
  BookOpen,
  Code2,
  Trophy,
  Flame,
  Star,
  Users,
  ExternalLink,
} from "lucide-react"
import Link from "next/link"

export const metadata: Metadata = {
  title: "User Profile - LearnHub",
  description: "View learner profile and achievements",
}

// Mock user data
const userData = {
  username: "",
  name: "New Learner",
  title: "Stepping into the world of tech",
  bio: "No bio available yet.",
  avatar: "/placeholder.svg?height=120&width=120",
  location: "Unknown",
  website: "",
  joinedDate: "Recently",
  followers: 0,
  following: 0,
  socials: {
    github: "",
    linkedin: "",
    twitter: "",
  },
  stats: {
    coursesCompleted: 0,
    certificates: 0,
    codingProblems: 0,
    streak: 0,
    totalHours: 0,
    rank: "N/A",
  },
  skills: [] as { name: string; level: number }[],
  courses: [] as any[],
  certificates: [] as any[],
  projects: [] as any[],
  activity: [] as any[],
}

export default async function PublicProfilePage({
  params,
}: {
  params: Promise<{ username: string }>
}) {
  const { username } = await params

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        {/* Profile Header */}
        <section className="border-b bg-muted/30">
          <div className="container mx-auto max-w-5xl px-4 py-8">
            <div className="flex flex-col md:flex-row gap-6">
              <Avatar className="h-28 w-28 border-4 border-background shadow-lg">
                <AvatarImage src={userData.avatar} alt={userData.name} />
                <AvatarFallback className="text-3xl">
                  {userData.name.split(" ").map(n => n[0]).join("")}
                </AvatarFallback>
              </Avatar>
              
              <div className="flex-1">
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                  <div>
                    <h1 className="text-2xl font-bold">{userData.name}</h1>
                    <p className="text-muted-foreground">@{username}</p>
                    <p className="mt-1 font-medium">{userData.title}</p>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline">Follow</Button>
                    <Button>Connect</Button>
                  </div>
                </div>
                
                <p className="mt-4 text-sm text-muted-foreground max-w-2xl">
                  {userData.bio}
                </p>
                
                <div className="mt-4 flex flex-wrap gap-4 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <MapPin className="h-4 w-4" />
                    {userData.location}
                  </span>
                  <a href={`https://${userData.website}`} className="flex items-center gap-1 hover:text-foreground">
                    <LinkIcon className="h-4 w-4" />
                    {userData.website}
                  </a>
                  <span className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    Joined {userData.joinedDate}
                  </span>
                </div>
                
                <div className="mt-4 flex gap-4">
                  <a href={`https://github.com/${userData.socials.github}`} className="text-muted-foreground hover:text-foreground">
                    <Github className="h-5 w-5" />
                  </a>
                  <a href={`https://linkedin.com/in/${userData.socials.linkedin}`} className="text-muted-foreground hover:text-foreground">
                    <Linkedin className="h-5 w-5" />
                  </a>
                  <a href={`https://twitter.com/${userData.socials.twitter}`} className="text-muted-foreground hover:text-foreground">
                    <Twitter className="h-5 w-5" />
                  </a>
                </div>
                
                <div className="mt-4 flex gap-4 text-sm">
                  <span>
                    <strong>{userData.followers.toLocaleString()}</strong>{" "}
                    <span className="text-muted-foreground">followers</span>
                  </span>
                  <span>
                    <strong>{userData.following.toLocaleString()}</strong>{" "}
                    <span className="text-muted-foreground">following</span>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="border-b">
          <div className="container mx-auto max-w-5xl px-4 py-6">
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
              {[
                { icon: BookOpen, label: "Courses", value: userData.stats.coursesCompleted },
                { icon: Award, label: "Certificates", value: userData.stats.certificates },
                { icon: Code2, label: "Problems", value: userData.stats.codingProblems },
                { icon: Flame, label: "Day Streak", value: userData.stats.streak },
                { icon: Trophy, label: "Hours", value: userData.stats.totalHours },
                { icon: Star, label: "Rank", value: userData.stats.rank },
              ].map((stat) => (
                <Card key={stat.label}>
                  <CardContent className="p-4 text-center">
                    <stat.icon className="h-5 w-5 mx-auto text-muted-foreground mb-2" />
                    <div className="text-xl font-bold">{stat.value}</div>
                    <div className="text-xs text-muted-foreground">{stat.label}</div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Content Tabs */}
        <section className="container mx-auto max-w-5xl px-4 py-8">
          <Tabs defaultValue="overview">
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="courses">Courses</TabsTrigger>
              <TabsTrigger value="certificates">Certificates</TabsTrigger>
              <TabsTrigger value="projects">Projects</TabsTrigger>
              <TabsTrigger value="activity">Activity</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="mt-6">
              <div className="grid gap-6 lg:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Skills</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {userData.skills.map((skill) => (
                      <div key={skill.name}>
                        <div className="flex justify-between text-sm mb-1">
                          <span>{skill.name}</span>
                          <span className="text-muted-foreground">{skill.level}%</span>
                        </div>
                        <Progress value={skill.level} className="h-2" />
                      </div>
                    ))}
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Recent Activity</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {userData.activity.map((activity, index) => (
                        <div key={index} className="flex gap-3">
                          <div className={`h-8 w-8 rounded-full flex items-center justify-center shrink-0 ${
                            activity.type === "certificate" ? "bg-amber-100 text-amber-600" :
                            activity.type === "course" ? "bg-blue-100 text-blue-600" :
                            activity.type === "problem" ? "bg-emerald-100 text-emerald-600" :
                            "bg-rose-100 text-rose-600"
                          }`}>
                            {activity.type === "certificate" && <Award className="h-4 w-4" />}
                            {activity.type === "course" && <BookOpen className="h-4 w-4" />}
                            {activity.type === "problem" && <Code2 className="h-4 w-4" />}
                            {activity.type === "streak" && <Flame className="h-4 w-4" />}
                          </div>
                          <div>
                            <p className="text-sm">{activity.text}</p>
                            <p className="text-xs text-muted-foreground">{activity.time}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="courses" className="mt-6">
              <div className="space-y-4">
                {userData.courses.map((course) => (
                  <Card key={course.id}>
                    <CardContent className="p-4 flex items-center justify-between">
                      <div className="flex-1">
                        <h3 className="font-medium">{course.title}</h3>
                        <div className="flex items-center gap-4 mt-2">
                          <Progress value={course.progress} className="h-2 w-32" />
                          <span className="text-sm text-muted-foreground">{course.progress}% complete</span>
                          {course.completedDate && (
                            <span className="text-sm text-muted-foreground">
                              Completed {course.completedDate}
                            </span>
                          )}
                        </div>
                      </div>
                      {course.certificate && (
                        <Badge variant="secondary" className="gap-1">
                          <Award className="h-3 w-3" />
                          Certified
                        </Badge>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="certificates" className="mt-6">
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {userData.certificates.map((cert) => (
                  <Card key={cert.id} className="overflow-hidden">
                    <div className="h-2 bg-gradient-to-r from-amber-400 to-amber-600" />
                    <CardContent className="p-4">
                      <Award className="h-8 w-8 text-amber-500 mb-3" />
                      <h3 className="font-semibold">{cert.name}</h3>
                      <p className="text-sm text-muted-foreground mt-1">Issued {cert.issueDate}</p>
                      <p className="text-xs text-muted-foreground mt-1">ID: {cert.credential}</p>
                      <Button variant="link" size="sm" className="mt-2 p-0 h-auto gap-1">
                        View Certificate
                        <ExternalLink className="h-3 w-3" />
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="projects" className="mt-6">
              <div className="grid gap-4 sm:grid-cols-2">
                {userData.projects.map((project) => (
                  <Card key={project.id}>
                    <CardContent className="p-4">
                      <h3 className="font-semibold">{project.name}</h3>
                      <p className="text-sm text-muted-foreground mt-1">{project.description}</p>
                      <div className="flex flex-wrap gap-2 mt-3">
                        {project.technologies.map((tech: string) => (
                          <Badge key={tech} variant="secondary" className="text-xs">
                            {tech}
                          </Badge>
                        ))}
                      </div>
                      <a 
                        href={`https://${project.url}`}
                        className="flex items-center gap-1 text-sm text-primary mt-3 hover:underline"
                      >
                        <Github className="h-4 w-4" />
                        {project.url}
                      </a>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="activity" className="mt-6">
              <Card>
                <CardContent className="p-6">
                  <div className="space-y-6">
                    {userData.activity.map((activity, index) => (
                      <div key={index} className="flex gap-4 pb-6 border-b last:border-0 last:pb-0">
                        <div className={`h-10 w-10 rounded-full flex items-center justify-center shrink-0 ${
                          activity.type === "certificate" ? "bg-amber-100 text-amber-600" :
                          activity.type === "course" ? "bg-blue-100 text-blue-600" :
                          activity.type === "problem" ? "bg-emerald-100 text-emerald-600" :
                          "bg-rose-100 text-rose-600"
                        }`}>
                          {activity.type === "certificate" && <Award className="h-5 w-5" />}
                          {activity.type === "course" && <BookOpen className="h-5 w-5" />}
                          {activity.type === "problem" && <Code2 className="h-5 w-5" />}
                          {activity.type === "streak" && <Flame className="h-5 w-5" />}
                        </div>
                        <div>
                          <p className="font-medium">{activity.text}</p>
                          <p className="text-sm text-muted-foreground">{activity.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </section>
      </main>
      <Footer />
    </div>
  )
}
