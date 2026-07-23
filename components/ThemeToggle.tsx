"use client";

import { useSyncExternalStore } from "react";
import { Moon, Sun } from "lucide-react";

// html.dark 클래스(외부 상태)를 구독. 토글은 클래스 변경 + localStorage 저장 후
// themechange 이벤트를 발행하고, giscus 등 다른 위젯이 이를 구독한다.
function subscribe(callback: () => void) {
  window.addEventListener("themechange", callback);
  return () => window.removeEventListener("themechange", callback);
}
function getSnapshot() {
  return document.documentElement.classList.contains("dark");
}
function getServerSnapshot() {
  return false; // 서버에서는 라이트 기준 (실제 테마는 FOUC 스크립트가 이미 적용)
}

export default function ThemeToggle() {
  const dark = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const toggle = () => {
    const next = !dark;
    document.documentElement.classList.toggle("dark", next);
    localStorage.setItem("theme", next ? "dark" : "light");
    window.dispatchEvent(new CustomEvent("themechange"));
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={dark ? "라이트 모드로 전환" : "다크 모드로 전환"}
      className="w-10 h-10 shrink-0 rounded-full flex items-center justify-center text-gray-600 hover:bg-orange-50 dark:text-gray-300 dark:hover:bg-gray-800 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-400 focus-visible:ring-offset-2"
    >
      {dark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
    </button>
  );
}
