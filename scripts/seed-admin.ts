// scripts/seed-admin.ts
// চালানো: npx tsx --env-file=.env scripts/seed-admin.ts
import { randomUUID } from "node:crypto";
import { hashPassword } from "better-auth/crypto";
import { prisma } from "@/lib/prisma"; // lib যদি src/ এর ভেতরে থাকে তাহলে "../src/lib/prisma"

async function main() {
  const email = process.env.ADMIN_EMAIL?.trim().toLowerCase();
  const password = process.env.ADMIN_PASSWORD;
  const name = process.env.ADMIN_NAME?.trim() || "Admin";

  if (!email || !password) throw new Error("ADMIN_EMAIL এবং ADMIN_PASSWORD সেট করো");
  if (password.length < 8) throw new Error("পাসওয়ার্ড কমপক্ষে ৮ অক্ষরের হতে হবে");

  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) {
    console.log(`ইতিমধ্যে আছে: ${email}`);
    return;
  }

  const id = randomUUID();
  await prisma.user.create({
    data: {
      id,
      name,
      email,
      emailVerified: true,
      role: "admin",
      accounts: {
        create: {
          id: randomUUID(),
          accountId: id,
          providerId: "credential",
          password: await hashPassword(password),
        },
      },
    },
  });

  console.log(`অ্যাডমিন তৈরি হয়েছে: ${email}`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());