"use client";

import { motion } from "motion/react";

const socialLinks = [
  { icon: "📧", href: "#", label: "Email" },
  { icon: "💼", href: "#", label: "LinkedIn" },
  { icon: "🐙", href: "#", label: "GitHub" },
];

export default function Footer() {
  return (
    <footer className="mt-20 bg-linear-to-r from-orange-100 to-amber-100 py-12">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <p className="text-gray-700">
          © 2025 JSChoIog. Built with passion and dedication 🚀
        </p>
        <div className="flex items-center justify-center gap-4 mt-4">
          {socialLinks.map((link, index) => (
            <SocialLink
              key={link.label}
              href={link.href}
              icon={link.icon}
              rotation={index % 2 === 0 ? 5 : -5}
            />
          ))}
        </div>
      </div>
    </footer>
  );
}

interface SocialLinkProps {
  href: string;
  icon: string;
  rotation: number;
}

function SocialLink({ href, icon, rotation }: SocialLinkProps) {
  return (
    <motion.a
      href={href}
      className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-md hover:shadow-lg transition-shadow"
      whileHover={{ scale: 1.1, rotate: rotation }}
      whileTap={{ scale: 0.9 }}
    >
      <span className="text-xl">{icon}</span>
    </motion.a>
  );
}
