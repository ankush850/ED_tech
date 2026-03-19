# Edguide — Modern Learning Management System (LMS)

[![Status: Under Construction](https://img.shields.io/badge/Status-Under_Construction-orange.svg)](#)
[![Stack: Next.js 16](https://img.shields.io/badge/Stack-Next.js_16-blue.svg)](https://nextjs.org/)
[![Language: TypeScript](https://img.shields.io/badge/Language-TypeScript-007ACC.svg)](https://www.typescriptlang.org/)
[![Design: Tailwind CSS 4](https://img.shields.io/badge/Design-Tailwind_CSS_4-38B2AC.svg)](https://tailwindcss.com/)
[![Database: PostgreSQL | Prisma](https://img.shields.io/badge/Database-PostgreSQL_|_Prisma-336791.svg)](https://www.prisma.io/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](https://makeapullrequest.com)

![Edguide Banner](https://images.unsplash.com/photo-1501504905252-473c47e087f8?auto=format&fit=crop&q=80&w=1200)

Edguide is a high-performance, feature-rich LMS designed to provide a premium experience for both instructors and students. Built with the latest technologies, it offers real-time interaction, progress tracking, and AI-assisted focus monitoring.

## 🚀 Features

### For Students
- **Course Discovery**: Explore courses across different categories and levels.
- **Interactive Learning**: Watch high-quality video lessons with automatic progress tracking.
- **Knowledge Checks**: Take quizzes after lessons to validate your learning.
- **Live Interactive Classes**: Join real-time virtual classrooms with instructors.
- **Community Engagement**: Participate in discussions, ask questions, and share insights.
- **Achievement Tracking**: Earn certificates and view your progress on a personalized dashboard.
- **Smart Focus**: Optional AI-powered eye-tracking to help maintain focus during study sessions.

### For Instructors
- **Course Creation**: Intuitive tools to upload videos, create quizzes, and manage content.
- **Live Teaching**: Host live sessions with integrated video and audio conferencing.
- **Student Analytics**: Track enrollment, completion rates, and average quiz scores.
- **Communication**: Engage with students through notifications and discussion boards.

---

## 🛠️ Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Database**: [PostgreSQL](https://www.postgresql.org/) with [Prisma ORM](https://www.prisma.io/)
- **UI/UX**: [Tailwind CSS 4](https://tailwindcss.com/), [Shadcn UI](https://ui.shadcn.com/), [Radix UI](https://www.radix-ui.com/)
- **Real-time**: [LiveKit](https://livekit.io/) for live classes
- **Media Storage**: [Supabase Storage](https://supabase.com/storage)
- **AI/Computer Vision**: [face-api.js](https://justadudewhohacks.github.io/face-api.js/) for eye-detection
- **Forms & Validation**: [React Hook Form](https://react-hook-form.com/) & [Zod](https://zod.dev/)
- **Icons**: [Lucide React](https://lucide.dev/)

---

## 🏁 Getting Started

### Prerequisites

- Node.js 20.x or later
- npm or yarn
- A PostgreSQL database (Supabase or Neon recommended)
- A LiveKit Project (for live classes)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/Edguide.git
   cd Edguide
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up Environment Variables**
   Create a `.env.local` file in the root directory and fill in the following:
   ```env
   # Database
   DATABASE_URL="postgresql://user:password@host:5432/db"

   # Supabase (Storage)
   NEXT_PUBLIC_SUPABASE_URL="https://your-project.supabase.co"
   NEXT_PUBLIC_SUPABASE_ANON_KEY="your-anon-key"
   SUPABASE_SERVICE_ROLE_KEY="your-service-role-key"
   NEXT_PUBLIC_SUPABASE_BUCKET="videos"

   # LiveKit (Live Classes)
   LIVEKIT_API_KEY="your-api-key"
   LIVEKIT_API_SECRET="your-api-secret"
   NEXT_PUBLIC_LIVEKIT_URL="wss://your-project.livekit.cloud"
   ```

4. **Initialize the Database**
   ```bash
   npx prisma db push
   ```

5. **Run the Development Server**
   ```bash
   npm run dev
   ```

6. **Seed Admin User (Optional)**
   To create a default instructor account:
   ```bash
   node seed-admin.js
   ```
   *Credentials: Admin-LearnHub@gmail.com / LearnHub@123*

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

---

## 📈 Database Schema

The system uses a robust relational schema to manage complex relationships:
- **Users & Roles**: Student and Teacher differentiation.
- **Course Hierarchy**: Courses -> Videos -> Quizzes -> Questions.
- **Interaction Layers**: Enrollments, Progress Tracking, Quiz Attempts.
- **Community Layers**: Discussions, Comments, Notifications.

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

---

Developed with ❤️ for the future of online education.
