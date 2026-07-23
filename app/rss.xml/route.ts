import { getBlogPosts } from "@/lib/notion/blog";
import { SITE_URL } from "@/lib/site";

export const revalidate = 3600;

function escapeCdata(text: string): string {
  return text.replaceAll("]]>", "]]&gt;");
}

export async function GET() {
  const posts = await getBlogPosts();

  const items = posts
    .map(
      (post) => `    <item>
      <title><![CDATA[${escapeCdata(post.title)}]]></title>
      <link>${SITE_URL}/blog/post/${post.id}</link>
      <guid isPermaLink="false">${post.id}</guid>
      ${post.date ? `<pubDate>${new Date(post.date).toUTCString()}</pubDate>` : ""}
      <description><![CDATA[${escapeCdata(post.excerpt)}]]></description>
      <category><![CDATA[${escapeCdata(post.category)}]]></category>
    </item>`
    )
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>JSChoIog</title>
    <link>${SITE_URL}</link>
    <description>성실함과 열정을 바탕으로 성장하는 개발자 JSChoIog의 기술 블로그</description>
    <language>ko</language>
    <atom:link href="${SITE_URL}/rss.xml" rel="self" type="application/rss+xml"/>
${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: { "Content-Type": "application/xml; charset=utf-8" },
  });
}
