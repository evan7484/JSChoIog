import { ICONS } from "@/lib/design/icons";

const icons = ICONS as Record<string, string>;

interface IconProps extends React.SVGProps<SVGSVGElement> {
  name: string;
  size?: number;
  /** true면 스트로크 도형을 currentColor로 채운다 (예: 좋아요 활성 하트) */
  filled?: boolean;
}

// 커스텀 아이콘 렌더러 — 지오메트리 원본은 lib/design/icons.js (시안 B)
export default function Icon({
  name,
  size = 24,
  filled = false,
  ...props
}: IconProps) {
  const paths = icons[name];
  if (!paths) return null;

  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill={filled ? "currentColor" : "none"}
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      dangerouslySetInnerHTML={{ __html: paths }}
      {...props}
    />
  );
}
