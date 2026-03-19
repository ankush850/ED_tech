// Course Types
export interface Course {
  id: string
  title: string
  subtitle?: string
  description?: string
  thumbnail?: string
  instructor: Instructor
  rating: number
  reviewsCount: number
  studentsCount: number
  duration: string
  lessonsCount: number
  level: "Beginner" | "Intermediate" | "Advanced"
  price: number
  originalPrice?: number
  category: string
  tags: string[]
  lastUpdated: string
  language: string
  features: string[]
  requirements: string[]
  whatYouWillLearn: string[]
  isEnrolled?: boolean
  progress?: number
}

export interface Instructor {
  id: string
  name: string
  title: string
  avatar?: string
  bio?: string
  rating: number
  studentsCount: number
  coursesCount: number
}

export interface Lesson {
  id: string
  title: string
  duration: string
  type: "video" | "article" | "quiz" | "exercise"
  isCompleted?: boolean
  isLocked?: boolean
}

export interface Section {
  id: string
  title: string
  lessons: Lesson[]
}

// User Types
export interface User {
  id: string
  email: string
  name: string
  username: string
  avatar?: string
  title?: string
  bio?: string
  location?: string
  website?: string
  socials?: {
    github?: string
    linkedin?: string
    twitter?: string
  }
  joinedAt: string
  role: "student" | "instructor" | "admin"
}

export interface UserStats {
  coursesCompleted: number
  certificatesEarned: number
  problemsSolved: number
  currentStreak: number
  totalHoursLearned: number
  rank?: string
}

// Notification Types
export interface Notification {
  id: string
  type: "course" | "discussion" | "achievement" | "reminder" | "social"
  title: string
  description: string
  timestamp: string
  read: boolean
}

// Discussion Types
export interface Discussion {
  id: string
  title: string
  content: string
  category: string
  author: User
  replies: number
  likes: number
  views: number
  createdAt: string
  isPinned?: boolean
  isSolved?: boolean
  tags: string[]
}

export interface Reply {
  id: string
  content: string
  author: User
  likes: number
  createdAt: string
  isAccepted?: boolean
}

// Certificate Types
export interface Certificate {
  id: string
  name: string
  courseId: string
  userId: string
  issueDate: string
  credentialId: string
  verificationUrl?: string
}

// Problem Types (for coding practice)
export interface Problem {
  id: string
  title: string
  difficulty: "Easy" | "Medium" | "Hard"
  category: string
  description: string
  examples: ProblemExample[]
  constraints: string[]
  starterCode: Record<string, string>
  testCases: TestCase[]
  acceptance: number
  submissions: number
  tags: string[]
}

export interface ProblemExample {
  input: string
  output: string
  explanation?: string
}

export interface TestCase {
  id: string
  input: string
  expectedOutput: string
  isHidden?: boolean
}

export interface Submission {
  id: string
  problemId: string
  userId: string
  code: string
  language: string
  status: "accepted" | "wrong_answer" | "runtime_error" | "time_limit_exceeded" | "compilation_error"
  runtime?: number
  memory?: number
  createdAt: string
}

// Live Class Types
export interface LiveClass {
  id: string
  title: string
  description?: string
  instructor: Instructor
  scheduledAt: string
  duration: string
  category: string
  maxParticipants?: number
  currentParticipants?: number
  isLive?: boolean
  recordingUrl?: string
}

// Resume Types
export interface Resume {
  id: string
  userId: string
  personalInfo: {
    firstName: string
    lastName: string
    title: string
    email: string
    phone?: string
    location?: string
    linkedIn?: string
    website?: string
  }
  summary: string
  experience: WorkExperience[]
  education: Education[]
  skills: string[]
  certificates: Certificate[]
  projects: Project[]
}

export interface WorkExperience {
  id: string
  title: string
  company: string
  startDate: string
  endDate?: string
  isCurrent?: boolean
  description: string
}

export interface Education {
  id: string
  degree: string
  institution: string
  graduationYear: string
  gpa?: string
}

export interface Project {
  id: string
  name: string
  description: string
  url?: string
  technologies: string[]
}
