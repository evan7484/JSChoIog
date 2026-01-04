"use client";

const socialLinks = [
  {
    icon: "📧",
    href: "https://www.instagram.com/junseo_chl/",
    label: "Instagram",
  },
  {
    icon: "💼",
    href: "https://www.linkedin.com/in/%EC%A4%80%EC%84%9C-%EC%B5%9C-6b46a4395/",
    label: "LinkedIn",
  },
  { icon: "🐙", href: "https://github.com/evan7484", label: "GitHub" },
];

export default function Footer() {
  return (
    <footer className="mt-20 bg-linear-to-r from-orange-100 to-amber-100 py-12">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <p className="text-gray-700">
          © 2025 JSChoIog. Built with passion and dedication 🚀
        </p>
        <div className="flex items-center justify-center gap-4 mt-4">
          {socialLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              className="relative w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-md hover:shadow-lg hover:scale-110 transition-all group"
              title={link.label}
            >
              <span className="text-xl">{link.icon}</span>
              <span className="absolute -top-10 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-sm px-3 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                {link.label}
              </span>
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
