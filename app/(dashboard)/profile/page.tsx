import { ProfileHeader } from "@/components/profile/profile-header"
import { ProfileStats } from "@/components/profile/profile-stats"
import { ProfileCourses } from "@/components/profile/profile-courses"
import { ProfileCertificates } from "@/components/profile/profile-certificates"
import { ProfileSkills } from "@/components/profile/profile-skills"
import { ProfileActivity } from "@/components/profile/profile-activity"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function ProfilePage() {
  return (
    <div className="container mx-auto max-w-6xl px-4 py-8">
      <ProfileHeader />
      <ProfileStats />
      
      <Tabs defaultValue="courses" className="mt-8">
        <TabsList>
          <TabsTrigger value="courses">Courses</TabsTrigger>
          <TabsTrigger value="certificates">Certificates</TabsTrigger>
          <TabsTrigger value="skills">Skills</TabsTrigger>
          <TabsTrigger value="activity">Activity</TabsTrigger>
        </TabsList>
        <TabsContent value="courses" className="mt-6">
          <ProfileCourses />
        </TabsContent>
        <TabsContent value="certificates" className="mt-6">
          <ProfileCertificates />
        </TabsContent>
        <TabsContent value="skills" className="mt-6">
          <ProfileSkills />
        </TabsContent>
        <TabsContent value="activity" className="mt-6">
          <ProfileActivity />
        </TabsContent>
      </Tabs>
    </div>
  )
}
