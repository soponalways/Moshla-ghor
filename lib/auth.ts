import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { nextCookies } from "better-auth/next-js";
import { prisma } from "@/lib/prisma"; // তোমার বিদ্যমান Prisma client

export const auth = betterAuth({
  database: prismaAdapter(prisma, { provider: "postgresql" }),

  emailAndPassword: {
    enabled: true,
    disableSignUp: true, // পাবলিক রেজিস্ট্রেশন বন্ধ, অ্যাডমিন তৈরি হবে সিড স্ক্রিপ্টে
    minPasswordLength: 8,
    maxPasswordLength: 128,
  },

  user: {
    additionalFields: {
      role: {
        type: "string",
        required: false,
        defaultValue: "user",
        input: false, // ক্লায়েন্ট থেকে role সেট করা যাবে না
      },
    },
  },

  session: {
    expiresIn: 60 * 60 * 24 * 7, // ৭ দিন
    updateAge: 60 * 60 * 24, // প্রতিদিন নবায়ন
  },

  // লগইনে ব্রুট-ফোর্স ঠেকানো: প্রতি মিনিটে ৫ বারের বেশি নয়
  rateLimit: {
    enabled: true,
    window: 60,
    max: 60,
    customRules: {
      "/sign-in/email": { window: 60, max: 5 },
    },
  },

  advanced: {
    useSecureCookies: process.env.NODE_ENV === "production",
  },

  plugins: [nextCookies()], // সবসময় সবার শেষে
});

export type Session = typeof auth.$Infer.Session;