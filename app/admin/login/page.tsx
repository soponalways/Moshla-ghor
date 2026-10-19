// app/admin/login/page.tsx
import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth-guard";
import LoginForm from "@/components/admin/login-form";

export default async function AdminLoginPage() {
  const session = await getSession();
  if (session?.user.role === "admin") redirect("/admin");

  return (
    <main className="flex min-h-dvh items-center justify-center bg-slate-100 px-4 py-10">
      <LoginForm />
    </main>
  );
}