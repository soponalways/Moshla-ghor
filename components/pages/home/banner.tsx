"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ChevronDown, ChevronLeft, ChevronRight, Leaf } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import {
  heroCategories,
  heroPromo,
  heroSlides,
  type HeroSlide,
} from "@/lib/data/banner-data";

const AUTOPLAY_MS = 5000;
const SWIPE_PX = 50;

/* ছবি না থাকলে এই প্লেসহোল্ডার দেখাবে */
function Placeholder({ label }: { label: string }) {
  return (
    <div className="flex size-full flex-col items-center justify-center gap-2 bg-gradient-to-br from-[#e4f5ec] via-[#c9ecd9] to-[#a8dfc2] text-[#2f9368]">
      <Leaf className="size-10 sm:size-14" />
      <span className="px-4 text-center text-lg font-bold sm:text-2xl">{label}</span>
    </div>
  );
}

function SlideImage({ slide, priority }: { slide: HeroSlide; priority: boolean }) {
  if (!slide.image) return <Placeholder label={slide.alt} />;
  return (
    <Image
      src={slide.image}
      alt={slide.alt}
      fill
      priority={priority}
      sizes="(min-width: 1024px) 64vw, 100vw"
      className="object-cover"
    />
  );
}

/* ---------- Shop Now + ক্যাটাগরি ---------- */
function ShopNow() {
  const [open, setOpen] = useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger>
        <button
          className="flex h-10 items-center gap-1.5 whitespace-nowrap rounded-md bg-white px-4 text-sm font-semibold text-slate-900 shadow-lg transition-transform hover:scale-105 active:scale-95 sm:h-12 sm:gap-2 sm:px-7 sm:text-base"
        >
          এখনই কিনুন
          <ChevronDown
            className={cn("size-4 transition-transform duration-200", open && "rotate-180")}
          />
        </button>
      </PopoverTrigger>
      <PopoverContent
        side="top"
        align="center"
        sideOffset={10}
        className="w-[min(18rem,calc(100vw-2rem))] p-2"
      >
        <p className="px-2 pb-2 pt-1 text-xs font-semibold text-slate-500">ক্যাটাগরি</p>
        <ul className="grid grid-cols-2 gap-1">
          {heroCategories.map((c) => (
            <li key={c.id}>
              <Link
                href={c.href}
                onClick={() => setOpen(false)}
                className="flex min-h-10 items-center rounded-md px-2.5 text-sm font-medium text-slate-800 transition-colors hover:bg-[#41b883]/10 hover:text-[#2f9368]"
              >
                {c.name}
              </Link>
            </li>
          ))}
        </ul>
        <Link
          href="/products"
          onClick={() => setOpen(false)}
          className="mt-2 flex min-h-10 items-center justify-center rounded-md bg-[#41b883] text-sm font-semibold text-white transition-colors hover:bg-[#38a574]"
        >
          সকল প্রডাক্ট দেখুন
        </Link>
      </PopoverContent>
    </Popover>
  );
}

/* ---------- ক্যারোসেল ---------- */
function Carousel() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const count = heroSlides.length;

  const go = useCallback((i: number) => setIndex((i + count) % count), [count]);

  useEffect(() => {
    if (paused || count < 2) return;
    const t = setTimeout(() => go(index + 1), AUTOPLAY_MS);
    return () => clearTimeout(t);
  }, [index, paused, count, go]);

  return (
    <motion.div
      onPanEnd={(_, info) => {
        if (info.offset.x < -SWIPE_PX) go(index + 1);
        else if (info.offset.x > SWIPE_PX) go(index - 1);
      }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
      role="region"
      aria-roledescription="carousel"
      aria-label="অফার ব্যানার"
      style={{ touchAction: "pan-y" }}
      className="group relative aspect-[16/10] w-full overflow-hidden rounded-lg bg-slate-200 lg:rounded-xl"
    >
      {/* স্লাইড */}
      {heroSlides.map((s, i) => {
        const active = i === index;
        return (
          <div
            key={s.id}
            aria-hidden={!active}
            className={cn(
              "absolute inset-0 transition-opacity duration-700 motion-reduce:transition-none",
              active ? "z-[1] opacity-100" : "pointer-events-none opacity-0"
            )}
          >
            <div
              className={cn(
                "relative size-full transition-transform duration-[6000ms] ease-out motion-reduce:transition-none",
                active ? "scale-105" : "scale-100"
              )}
            >
              <SlideImage slide={s} priority={i === 0} />
            </div>
            <Link
              href={s.href}
              tabIndex={active ? 0 : -1}
              aria-label={s.alt}
              className="absolute inset-0"
            />
          </div>
        );
      })}

      {/* তীর */}
      {count > 1 && (
        <>
          <button
            onClick={() => go(index - 1)}
            aria-label="আগের স্লাইড"
            className="absolute left-2 top-1/2 z-[2] flex size-9 -translate-y-1/2 items-center justify-center rounded-full bg-black/25 text-white backdrop-blur-sm transition hover:bg-black/45 active:scale-90 sm:left-3 lg:opacity-0 lg:group-hover:opacity-100"
          >
            <ChevronLeft className="size-5" />
          </button>
          <button
            onClick={() => go(index + 1)}
            aria-label="পরের স্লাইড"
            className="absolute right-2 top-1/2 z-[2] flex size-9 -translate-y-1/2 items-center justify-center rounded-full bg-black/25 text-white backdrop-blur-sm transition hover:bg-black/45 active:scale-90 sm:right-3 lg:opacity-0 lg:group-hover:opacity-100"
          >
            <ChevronRight className="size-5" />
          </button>
        </>
      )}

      {/* Shop Now */}
      <div className="absolute inset-x-0 bottom-8 z-[2] flex justify-center sm:bottom-10">
        <ShopNow />
      </div>

      {/* ডট */}
      {count > 1 && (
        <div className="absolute inset-x-0 bottom-2.5 z-[2] flex justify-center gap-2 sm:bottom-3">
          {heroSlides.map((s, i) => (
            <button
              key={s.id}
              onClick={() => go(i)}
              aria-label={`স্লাইড ${i + 1}`}
              aria-current={i === index}
              className="flex size-4 items-center justify-center"
            >
              <span
                className={cn(
                  "block rounded-full transition-all duration-300",
                  i === index ? "h-2 w-5 bg-white" : "size-2 bg-white/60"
                )}
              />
            </button>
          ))}
        </div>
      )}
    </motion.div>
  );
}

/* ---------- ডান পাশের প্রোমো ---------- */
function Promo() {
  return (
    <Link
      href={heroPromo.href}
      aria-label={heroPromo.alt}
      className="group relative hidden overflow-hidden rounded-xl bg-slate-200 lg:block"
    >
      {heroPromo.image ? (
        <Image
          src={heroPromo.image}
          alt={heroPromo.alt}
          fill
          sizes="34vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
      ) : (
        <Placeholder label={heroPromo.alt} />
      )}
    </Link>
  );
}

/* ---------- মূল কম্পোনেন্ট ---------- */
export default function HeroBanner() {
  return (
    <section aria-label="হিরো ব্যানার" className="mx-auto w-full max-w-7xl px-3 pt-3 sm:px-6 sm:pt-5">
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-[minmax(0,1.88fr)_minmax(0,1fr)] lg:gap-5">
        <Carousel />
        <Promo />
      </div>
    </section>
  );
}