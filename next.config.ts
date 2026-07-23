import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // 커버 이미지는 Notion CMS에서 임의 호스트(S3 서명 URL, 외부 링크)로 오므로 전체 허용
    remotePatterns: [{ protocol: "https", hostname: "**" }],
  },
};

export default nextConfig;
