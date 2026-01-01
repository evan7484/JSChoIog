"use client";

const socialLinks = [
  {
    icon: "📧",
    href: "https://www.instagram.com/junseo_chl/",
    label: "Instagram",
  },
  { icon: "💼", href: "#", label: "LinkedIn" },
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
              className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-md hover:shadow-lg hover:scale-110 transition-all"
              title={link.label}
            >
              <span className="text-xl">{link.icon}</span>
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
