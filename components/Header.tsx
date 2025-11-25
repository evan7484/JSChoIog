"use client";

interface HeaderProps {
  currentPage: "about" | "blog" | "post";
  onNavigate: (page: "about" | "blog") => void;
}

export default function Header({ currentPage, onNavigate }: HeaderProps) {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-lg border-b border-orange-100">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <div
          className="flex items-center gap-3 cursor-pointer hover:opacity-80 transition-opacity"
          onClick={() => onNavigate("about")}
        >
          <div className="w-14 h-14 bg-linear-to-br from-orange-400 to-red-100 rounded-full flex items-center justify-center shadow-lg">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/logo.svg" alt="로고" />
          </div>
          <h1 className="font-bold text-2xl bg-linear-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
            JSChoIog!
          </h1>
        </div>

        <nav className="flex gap-2">
          <NavButton
            active={currentPage === "blog" || currentPage === "post"}
            onClick={() => onNavigate("blog")}
          >
            Blog
          </NavButton>
          <NavButton
            active={currentPage === "about"}
            onClick={() => onNavigate("about")}
          >
            About Me
          </NavButton>
        </nav>
      </div>
    </header>
  );
}

interface NavButtonProps {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}

function NavButton({ active, onClick, children }: NavButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`px-6 py-2 rounded-full transition-all hover:scale-105 active:scale-95 ${
        active
          ? "bg-linear-to-r from-orange-500 to-red-500 text-white shadow-lg"
          : "text-gray-700 hover:bg-orange-50"
      }`}
    >
      {children}
    </button>
  );
}
