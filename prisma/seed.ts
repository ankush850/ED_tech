const { PrismaClient } = require("@prisma/client")
const bcrypt = require("bcryptjs")

const prisma = new PrismaClient()

async function main() {
  const hashedPassword = await bcrypt.hash("LearnHub@123", 10)

  const admin = await prisma.user.upsert({
    where: { email: "Admin-LearnHub@gmail.com" },
    update: {
      role: "admin",
      password: hashedPassword,
    },
    create: {
      name: "Admin",
      email: "Admin-LearnHub@gmail.com",
      password: hashedPassword,
      role: "admin",
    },
  })

  console.log("Admin user seeded:", admin.email)
}

main()
  .catch((e: any) => {
    console.error("Seed error:", e)
    process.exit(1)
  })
  .finally(() => prisma.$disconnect())
