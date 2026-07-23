// Notion의 Color select 값 → Tailwind gradient 클래스
export function getColorGradient(color: string): string {
  const colorMap: Record<string, string> = {
    Blue: "from-blue-400 to-cyan-400",
    Green: "from-green-400 to-emerald-400",
    Red: "from-red-400 to-pink-400",
    Orange: "from-orange-400 to-amber-400",
    Purple: "from-purple-400 to-violet-400",
    Pink: "from-pink-400 to-rose-400",
    Yellow: "from-yellow-400 to-orange-400",
    Gray: "from-gray-400 to-slate-400",
  };
  return colorMap[color] || "from-blue-400 to-cyan-400";
}
