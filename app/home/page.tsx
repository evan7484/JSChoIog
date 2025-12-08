"use client";

import { useState, useEffect } from "react";
import Header from "@/components/Header";
import Blog from "@/components/Blog";
import BlogPost from "@/components/BlogPost";
import AboutMe from "@/components/AboutMe";
import Footer from "@/components/Footer";
import type { BlogPost as BlogPostType } from "@/lib/notion/types";

type Page = "blog" | "about" | "post";

export default function HomePage() {
  const [currentPage, setCurrentPage] = useState<Page>("blog");
  const [selectedPostId, setSelectedPostId] = useState<string | null>(null);
  const [posts, setPosts] = useState<BlogPostType[]>([]);

  useEffect(() => {
    async function fetchPosts() {
      try {
        const response = await fetch("/api/posts");
        if (!response.ok) throw new Error("Failed to fetch posts");
        const data = await response.json();
        setPosts(data);
      } catch (err) {
        console.error("Failed to fetch posts:", err);
      }
    }

    fetchPosts();
  }, []);

  const handlePostClick = (postId: string) => {
    setSelectedPostId(postId);
    setCurrentPage("post");
  };

  return (
    <div className="min-h-screen bg-linear-to-b from-white to-gray-50">
      <Header
        currentPage={currentPage}
        onNavigate={(page) => setCurrentPage(page)}
      />

      <main className="pt-24">
        {currentPage === "blog" && (
          <Blog onPostClick={handlePostClick} posts={posts} />
        )}
        {currentPage === "post" && (
          <BlogPost
            postId={selectedPostId}
            onBack={() => setCurrentPage("blog")}
            allPosts={posts}
          />
        )}
        {currentPage === "about" && <AboutMe />}
      </main>

      <Footer />
    </div>
  );
}
