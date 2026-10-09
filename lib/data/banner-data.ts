// data/banner.ts
// এই ফাইলের ডাটা পরে নিজের মতো বসাবে। কম্পোনেন্টে হাত দিতে হবে না।
// ছবি রাখবে /public/banners/ ফোল্ডারে। image ফাঁকা রাখলে সবুজ প্লেসহোল্ডার দেখাবে।

export type HeroSlide = {
  id: number;
  image?: string; // যেমন "/banners/slide-1.jpg" (প্রস্তাবিত সাইজ ১৬১২×১০০০)
  alt: string;
  href: string; // স্লাইডে ক্লিক করলে যেখানে যাবে
};

export type HeroCategory = {
  id: number;
  name: string;
  href: string;
};

export type HeroPromo = {
  image?: string; // প্রস্তাবিত সাইজ ৮৬২×১০০০
  alt: string;
  href: string;
};

export const heroSlides: HeroSlide[] = [
  { id: 1, image: "", alt: "অফার ১", href: "/products" },
  { id: 2, image: "", alt: "অফার ২", href: "/products" },
  { id: 3, image: "", alt: "অফার ৩", href: "/products" },
];

// Shop Now বাটনে ক্লিক করলে এই ক্যাটাগরিগুলো খুলবে
export const heroCategories: HeroCategory[] = [
  { id: 1, name: "গুঁড়া মসলা", href: "/category/powder" },
  { id: 2, name: "আস্ত মসলা", href: "/category/whole" },
  { id: 3, name: "মিক্স মসলা", href: "/category/mix" },
  { id: 4, name: "তেল ও ঘি", href: "/category/oil-ghee" },
  { id: 5, name: "মধু", href: "/category/honey" },
  { id: 6, name: "ড্রাই ফ্রুটস", href: "/category/dry-fruits" },
];

export const heroPromo: HeroPromo = {
  image: "",
  alt: "বিশেষ অফার",
  href: "/products",
};
