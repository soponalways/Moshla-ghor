// app/admin/(panel)/layout.tsx
// এই গ্রুপের ভেতরের সব পেজ অ্যাডমিন ছাড়া খুলবে না
import { requireAdmin } from "@/lib/auth-guard";
import LogoutButton from "@/components/admin/logout-button";

export default async function PanelLayout({ children }: { children: React.ReactNode }) {
  const session = await requireAdmin();

  return (
    <div className="min-h-dvh bg-slate-50">
      <header className="sticky top-0 z-30 border-b bg-white">
        <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4 sm:px-6">
          <span className="font-bold text-primary">মসলা ঘর অ্যাডমিন</span>
          <div className="flex items-center gap-3">
            <span className="hidden text-sm text-muted-foreground sm:inline">{session.user.name}</span>
            <LogoutButton />
          </div>
        </div>
      </header>
      <main className="mx-auto max-w-7xl p-4 sm:p-6">{children}</main>
    </div>
  );
}