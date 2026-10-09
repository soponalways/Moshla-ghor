"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Leaf, Menu, Search, ShoppingCart, X } from "lucide-react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { taka } from "@/lib/format";

const NAV_LINKS = [
  { label: "হোম", href: "/" },
  { label: "সকল প্রডাক্ট", href: "/products" },
  { label: "অর্গানিক", href: "/category/organic" },
  { label: "ন্যাচারাল", href: "/category/natural" },
  { label: "ব্লগ", href: "/blog" },
  { label: "আমাদের যাত্রা", href: "/about" },
  { label: "যোগাযোগ করুন", href: "/contact" },
];

type NavbarProps = {
  cartCount?: number; 
  cartTotal?: number; 
};

/* ---------- Logo ---------- */
function Logo({ className }: { className?: string }) {
  return (
    <Link
      href="/"
      aria-label="মসলা ঘর - হোম"
      className={cn("flex shrink-0 items-center gap-1.5", className)}
    >
      <span className="flex size-8 items-center justify-center rounded-lg bg-primary text-white sm:size-9">
        <Leaf className="size-4 sm:size-5" />
      </span>
      <span className="whitespace-nowrap text-xl font-bold leading-none text-primary sm:text-2xl">
        মসলা ঘর
      </span>
    </Link>
  );
}

/* ---------- Search ---------- */
function SearchBox({
  className,
  onDone,
  autoFocus,
}: {
  className?: string;
  onDone?: () => void;
  autoFocus?: boolean;
}) {
  const router = useRouter();
  const [q, setQ] = useState("");

  const submit = (e: FormEvent) => {
    e.preventDefault();
    const term = q.trim();
    if (!term) return;
    router.push(`/products?search=${encodeURIComponent(term)}`);
    onDone?.();
  };

  return (
    <form
      onSubmit={submit}
      role="search"
      className={cn(
        "flex h-10 w-full items-center rounded-md bg-primary/60 pl-3 pr-1 transition-shadow focus-within:bg-primary/70 focus-within:ring-2 focus-within:ring-primary/50",
        className
      )}
    >
      <input
        type="search"
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="প্রডাক্ট খুঁজুন..."
        aria-label="প্রডাক্ট খুঁজুন"
        autoFocus={autoFocus}
        className="h-full min-w-0 flex-1 bg-transparent text-sm text-white outline-none placeholder:text-white/80 [&::-webkit-search-cancel-button]:hidden"
      />
      <button
        type="submit"
        aria-label="সার্চ করুন"
        className="flex size-8 shrink-0 items-center justify-center rounded text-white transition-transform active:scale-90"
      >
        <Search className="size-4.5" strokeWidth={2.5} />
      </button>
    </form>
  );
}

/* ---------- Cart ---------- */
function CartButton({ count, total }: { count: number; total: number }) {
  return (
    <Link
      href="/cart"
      aria-label={`কার্ট, ${count} টি আইটেম`}
      className="group flex shrink-0 items-center gap-2 rounded-md px-1.5 py-1.5 text-slate-600 transition-colors hover:text-primary"
    >
      <span className="hidden whitespace-nowrap text-sm font-semibold sm:inline">
        {taka(total)}
      </span>
      <span className="relative">
        <ShoppingCart className="size-6 transition-transform group-hover:scale-110" />
        <AnimatePresence mode="popLayout">
          {count > 0 && (
            <motion.span
              key={count}
              initial={{ scale: 0.4, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.4, opacity: 0 }}
              transition={{ type: "spring", stiffness: 500, damping: 22 }}
              className="absolute -right-2 -top-2 flex size-4.5 items-center justify-center rounded-full bg-red-500 text-[11px] font-bold leading-none text-white"
            >
              {count > 99 ? "৯৯+" : count.toLocaleString("bn-BD")}
            </motion.span>
          )}
        </AnimatePresence>
      </span>
    </Link>
  );
}

/* ---------- Navbar ---------- */
export default function Navbar({ cartCount = 0, cartTotal = 0 }: NavbarProps) {
  const pathname = usePathname();
  const [mobileSearch, setMobileSearch] = useState(false);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-200/70 bg-slate-50/90 backdrop-blur supports-backdrop-filter:bg-slate-50/80 dark:border-slate-700/50 dark:bg-slate-900/75">
      <div className="mx-auto flex h-16 max-w-7xl items-center gap-3 px-3 sm:px-6 md:h-20 xl:gap-8">
        {/* Hamburger (xl এর নিচে) */}
        <Sheet>
          <SheetTrigger>
            <button
              aria-label="মেনু খুলুন"
              className="flex size-10 shrink-0 items-center justify-center rounded-md text-slate-700 transition-colors hover:bg-slate-200/60 active:scale-95 xl:hidden"
            >
              <Menu className="size-6" />
            </button>
          </SheetTrigger>
          <SheetContent side="left" className="w-[85%] max-w-sm p-0">
            <SheetHeader className="border-b p-4">
              <SheetTitle>
                <div>
                  <SheetClose>
                    <Logo />
                  </SheetClose>
                </div>
              </SheetTitle>
            </SheetHeader>
            <nav className="flex flex-col p-3" aria-label="মোবাইল মেনু">
              {NAV_LINKS.map((l, i) => (
                <SheetClose  key={l.href}>
                  <motion.div
                    initial={{ opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 * i, duration: 0.25 }}
                  >
                    <Link
                      href={l.href}
                      className={cn(
                        "flex min-h-12 items-center rounded-lg px-4 text-base font-medium transition-colors",
                        isActive(l.href)
                          ? "bg-primary/10 text-primary"
                          : "text-slate-800 hover:bg-slate-100"
                      )}
                    >
                      {l.label}
                    </Link>
                  </motion.div>
                </SheetClose>
              ))}
            </nav>
          </SheetContent>
        </Sheet>

        {/* Logo */}
        <Logo />

        {/* Desktop links (xl+) */}
        <nav
          aria-label="প্রধান মেনু"
          className="hidden flex-1 items-center justify-center gap-6 xl:flex 2xl:gap-8"
        >
          {NAV_LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              aria-current={isActive(l.href) ? "page" : undefined}
              className={cn(
                "group relative whitespace-nowrap py-2 text-[15px] font-semibold leading-none transition-colors",
                isActive(l.href)
                  ? "text-primary"
                  : "text-slate-900 hover:text-primary"
              )}
            >
              {l.label}
              <span
                className={cn(
                  "absolute inset-x-0 -bottom-0.5 h-0.5 origin-left rounded-full bg-primary transition-transform duration-300",
                  isActive(l.href) ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                )}
              />
            </Link>
          ))}
        </nav>

        {/* Right side */}
        <div className="ml-auto flex items-center gap-1 sm:gap-3 xl:ml-0">
          {/* Search: tablet+ */}
          <SearchBox className="hidden w-56 md:flex lg:w-72 xl:w-64 2xl:w-72" />

          {/* Search toggle: mobile */}
          <button
            onClick={() => setMobileSearch((v) => !v)}
            aria-label={mobileSearch ? "সার্চ বন্ধ করুন" : "সার্চ খুলুন"}
            aria-expanded={mobileSearch}
            className="flex size-10 items-center justify-center rounded-md text-slate-700 transition-colors hover:bg-slate-200/60 active:scale-95 md:hidden"
          >
            {mobileSearch ? <X className="size-5" /> : <Search className="size-5" />}
          </button>

          <CartButton count={cartCount} total={cartTotal} />
        </div>
      </div>

      {/* Mobile search row */}
      <AnimatePresence initial={false}>
        {mobileSearch && (
          <motion.div
            key="m-search"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
            className="overflow-hidden md:hidden"
          >
            <div className="px-3 pb-3 sm:px-6">
              <SearchBox autoFocus onDone={() => setMobileSearch(false)} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}