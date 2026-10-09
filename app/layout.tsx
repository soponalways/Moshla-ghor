import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter, Hind_Siliguri } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import TopBar from "@/components/layout/top-bar";
import Navbar from "@/components/layout/navbar";

const inter = Inter({subsets:['latin'],variable:'--font-sans'});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const font = Hind_Siliguri({
  subsets: ["bengali", "latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  variable: "--font-bn",
});

export const metadata : Metadata = {
  title: "মসলা ঘর | খাঁটি ও তাজা মসলা",
  description: "ঘরে বসে অর্ডার করুন খাঁটি মসলা, সারা দেশে ডেলিভারি।",
  openGraph: { locale: "bn_BD", type: "website" },
};


export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="bn"
      className={cn("h-full", "antialiased", geistSans.variable, geistMono.variable, "font-sans", inter.variable, font.variable)}
    >
      <body className="min-h-full flex flex-col">
        <header>
          <TopBar />
          <Navbar />
        </header>
        <main>
          {children}
        </main>
      </body>
    </html>
  );
}
