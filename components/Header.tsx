"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Header() {
  const pathname = usePathname();

  const isBlog = pathname === "/blog" || pathname.startsWith("/blog/");
  const isAbout = pathname === "/about" || pathname.startsWith("/about/");

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-lg border-b border-orange-100">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link
          href="/about"
          className="flex items-center gap-3 cursor-pointer hover:opacity-80 transition-opacity"
        >
          <div className="w-14 h-14 bg-linear-to-br from-orange-400 to-red-100 rounded-full flex items-center justify-center shadow-lg">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/logo.svg" alt="로고" />
          </div>
          <h1 className="font-bold text-2xl bg-linear-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
            JSChoIog!
          </h1>
        </Link>

        <nav className="flex gap-2">
          <NavLink active={isBlog} href="/blog">
            Blog
          </NavLink>
          <NavLink active={isAbout} href="/about">
            About Me
          </NavLink>
        </nav>
      </div>
    </header>
  );
}

function NavLink({
  active,
  href,
  children,
}: {
  active: boolean;
  href: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className={`px-6 py-2 rounded-full transition-all hover:scale-105 active:scale-95 inline-flex items-center justify-center ${
        active
          ? "bg-linear-to-r from-orange-500 to-red-500 text-white shadow-lg"
          : "text-gray-700 hover:bg-orange-50"
      }`}
      aria-current={active ? "page" : undefined}
    >
      {children}
    </Link>
  );
}
