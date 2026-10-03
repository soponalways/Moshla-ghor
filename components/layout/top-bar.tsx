"use client";

import { motion } from "framer-motion";
import { Phone } from "lucide-react";
import { FaWhatsapp, FaFacebookF, FaYoutube, FaInstagram } from "react-icons/fa6";

const CONTACT = {
  whatsapp: "01331109337",
  phone: "096382-62340",
};

const SOCIALS = [
  { label: "Facebook", href: "https://www.facebook.com/profile.php?id=61592703963550", Icon: FaFacebookF },
  { label: "YouTube", href: "https://youtube.com/@your-channel", Icon: FaYoutube },
  { label: "Instagram", href: "https://instagram.com/your-page", Icon: FaInstagram },
];

const toIntl = (n: string) => "88" + n.replace(/\D/g, "");
const toTel = (n: string) => "+88" + n.replace(/\D/g, "");

export default function TopBar() {
  return (
    <motion.div
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.45, ease: "easeOut" }}
      className="w-full bg-primary text-white"
    >
      <div className="mx-auto flex h-11 max-w-7xl items-center justify-between gap-3 px-3 sm:px-6">
        {/* Contact */}
        <div className="flex min-w-0 items-center text-[13px] sm:text-sm">
          <a
            href={`https://wa.me/${toIntl(CONTACT.whatsapp)}`}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="WhatsApp এ মেসেজ করুন"
            className="flex items-center gap-1.5 pr-3 transition-opacity hover:opacity-80 sm:gap-2 sm:pr-4"
          >
            <FaWhatsapp className="size-4 shrink-0" />
            <span>{CONTACT.whatsapp}</span>
          </a>

          <span aria-hidden className="h-5 w-px bg-white/80" />

          <a
            href={`tel:${toTel(CONTACT.phone)}`}
            aria-label="ফোন করুন"
            className="flex items-center gap-1.5 pl-3 transition-opacity hover:opacity-80 sm:gap-2 sm:pl-4"
          >
            <Phone className="size-3.5 shrink-0 fill-white" />
            <span>{CONTACT.phone}</span>
          </a>
        </div>

        {/* Social */}
        <ul className="flex items-center gap-2 sm:gap-3">
          {SOCIALS.map(({ label, href, Icon }) => (
            <li key={label}>
              <motion.a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                whileHover={{ scale: 1.12 }}
                whileTap={{ scale: 0.92 }}
                className="flex size-7 items-center justify-center rounded-full bg-white text-[#41b883] sm:size-8"
              >
                <Icon className="size-3.5 sm:size-4" />
              </motion.a>
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
}