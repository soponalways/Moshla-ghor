// components/admin/login-form.tsx
"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Eye, EyeOff, Leaf, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { authClient } from "@/lib/auth-client";

export default function LoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (loading) return;
    setError("");
    setLoading(true);

    const { error } = await authClient.signIn.email({
      email: email.trim(),
      password,
    });

    if (error) {
      setError(
        error.status === 429
          ? "অনেকবার চেষ্টা করেছেন। কিছুক্ষণ পরে আবার চেষ্টা করুন।"
          : "ইমেইল বা পাসওয়ার্ড সঠিক নয়।"
      );
      setLoading(false);
      return;
    }

    router.replace("/admin");
    router.refresh();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className="w-full max-w-md rounded-2xl border bg-white p-6 shadow-sm sm:p-8"
    >
      <div className="mb-6 flex flex-col items-center gap-2 text-center">
        <span className="flex size-12 items-center justify-center rounded-xl bg-primary text-primary-foreground">
          <Leaf className="size-6" />
        </span>
        <h1 className="text-2xl font-bold">অ্যাডমিন লগইন</h1>
        <p className="text-sm text-muted-foreground">মসলা ঘর ম্যানেজমেন্ট প্যানেল</p>
      </div>

      <form onSubmit={onSubmit} className="space-y-4" noValidate>
        <div className="space-y-2">
          <Label htmlFor="email">ইমেইল</Label>
          <Input
            id="email"
            type="email"
            autoComplete="username"
            inputMode="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="admin@example.com"
            className="h-11"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="password">পাসওয়ার্ড</Label>
          <div className="relative">
            <Input
              id="password"
              type={show ? "text" : "password"}
              autoComplete="current-password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="h-11 pr-11"
            />
            <button
              type="button"
              onClick={() => setShow((v) => !v)}
              aria-label={show ? "পাসওয়ার্ড লুকান" : "পাসওয়ার্ড দেখুন"}
              className="absolute right-1 top-1/2 flex size-9 -translate-y-1/2 items-center justify-center rounded-md text-muted-foreground hover:text-foreground"
            >
              {show ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
            </button>
          </div>
        </div>

        {error && (
          <motion.p
            role="alert"
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-md bg-red-50 px-3 py-2 text-sm text-red-600"
          >
            {error}
          </motion.p>
        )}

        <Button type="submit" disabled={loading || !email || !password} className="h-11 w-full text-base">
          {loading ? (
            <>
              <Loader2 className="mr-2 size-4 animate-spin" />
              লগইন হচ্ছে...
            </>
          ) : (
            "লগইন করুন"
          )}
        </Button>
      </form>
    </motion.div>
  );
}