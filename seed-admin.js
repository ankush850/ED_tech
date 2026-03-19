const { PrismaClient } = require("@prisma/client")
const bcrypt = require("bcryptjs")
const prisma = new PrismaClient()

async function main() {
  const hashed = await bcrypt.hash("LearnHub@123", 10)

  const admin = await prisma.user.upsert({
    where: { email: "Admin-LearnHub@gmail.com" },
    update: { role: "admin", password: hashed, name: "LearnHub Admin" },
    create: {
      name: "LearnHub Admin",
      email: "Admin-LearnHub@gmail.com",
      role: "admin",
      password: hashed,
    },
  })

  console.log("✅ Admin updated:", admin.email, "| role:", admin.role)
}

main().catch(console.error).finally(() => prisma.$disconnect())
