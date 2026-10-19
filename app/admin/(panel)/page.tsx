// app/admin/(panel)/page.tsx
import { requireAdmin } from "@/lib/auth-guard";

export default async function AdminHome() {
  const session = await requireAdmin();
  return (
    <div className="rounded-xl border bg-white p-6">
      <h1 className="text-xl font-bold">স্বাগতম, {session.user.name}</h1>
      <p className="mt-1 text-sm text-muted-foreground">অর্ডার ও প্রডাক্ট ম্যানেজমেন্ট এখানে যোগ হবে।</p>
    </div>
  );
}