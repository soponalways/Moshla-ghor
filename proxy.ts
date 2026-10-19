// proxy.ts (প্রজেক্ট রুটে, বা src/ ব্যবহার করলে src/proxy.ts)
// Next.js 15 হলে ফাইলের নাম middleware.ts এবং ফাংশনের নাম middleware করো।
import { NextRequest, NextResponse } from "next/server";
import { getSessionCookie } from "better-auth/cookies";

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname === "/admin/login") return NextResponse.next();

  // শুধু কুকির উপস্থিতি দেখা হয়। আসল যাচাই হয় requireAdmin() এ
  const sessionCookie = getSessionCookie(request);
  if (!sessionCookie) {
    return NextResponse.redirect(new URL("/admin/login", request.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};