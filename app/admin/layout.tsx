// app/admin/layout.tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "অ্যাডমিন | মসলা ঘর",
  robots: { index: false, follow: false },
};

export default function AdminRootLayout({ children }: { children: React.ReactNode }) {
  return children;
}