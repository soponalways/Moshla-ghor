// components/admin/logout-button.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";

export default function LogoutButton() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const logout = async () => {
    setLoading(true);
    await authClient.signOut();
    router.replace("/admin/login");
    router.refresh();
  };

  return (
    <Button variant="outline" size="sm" onClick={logout} disabled={loading}>
      {loading ? <Loader2 className="mr-2 size-4 animate-spin" /> : <LogOut className="mr-2 size-4" />}
      লগআউট
    </Button>
  );
}