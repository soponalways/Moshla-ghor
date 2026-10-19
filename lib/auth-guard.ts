// lib/auth-guard.ts
import "server-only";
import { cache } from "react";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";

export const getSession = cache(async () =>
  auth.api.getSession({ headers: await headers() })
);

/** অ্যাডমিন পেজ ও লেআউটে ব্যবহার করো: লগইন বা অ্যাডমিন রোল না থাকলে লগইন পেজে পাঠায় */
export async function requireAdmin() {
  const session = await getSession();
  if (!session || session.user.role !== "admin") {
    redirect("/admin/login");
  }
  return session;
}

/** সার্ভার অ্যাকশন ও API রুটে ব্যবহার করো: রিডাইরেক্ট নয়, এরর ছোড়ে */
export async function assertAdmin() {
  const session = await getSession();
  if (!session || session.user.role !== "admin") {
    throw new Error("UNAUTHORIZED");
  }
  return session;
}