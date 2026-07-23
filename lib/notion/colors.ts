import {
  CATEGORY_COLORS,
  DEFAULT_CATEGORY,
} from "@/lib/design/tokens";

const colors = CATEGORY_COLORS as Record<
  string,
  { gradientClass: string; hex: string[] }
>;

// Notion의 Color select 값 → Tailwind gradient 클래스
export function getColorGradient(color: string): string {
  return (colors[color] ?? colors[DEFAULT_CATEGORY]).gradientClass;
}
