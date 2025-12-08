"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { usePageNavigation } from "../hooks/usePageNavigation";
import Header from "../components/Header";
import Footer from "../components/Footer";
import AboutMe from "../components/AboutMe";
import Blog from "../components/Blog";
import BlogPost from "../components/BlogPost";
import type { BlogPost as BlogPostType } from "@/lib/notion/types";

export default function App() {
  const { currentPage, selectedPostId, navigateTo, openPost, closePost } =
    usePageNavigation();
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

  return (
    <div className="min-h-screen bg-linear-to-br from-orange-50 via-amber-50 to-yellow-50">
      <Header currentPage={currentPage} onNavigate={navigateTo} />

      <main className="pt-20">
        <AnimatePresence mode="wait">
          {currentPage === "about" && (
            <PageTransition key="about">
              <AboutMe />
            </PageTransition>
          )}
          {currentPage === "blog" && (
            <PageTransition key="blog">
              <Blog onPostClick={openPost} posts={posts} />
            </PageTransition>
          )}
          {currentPage === "post" && (
            <PageTransition key="post">
              <BlogPost
                postId={selectedPostId}
                onBack={closePost}
                allPosts={posts}
              />
            </PageTransition>
          )}
        </AnimatePresence>
      </main>

      <Footer />
    </div>
  );
}

function PageTransition({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
    >
      {children}
    </motion.div>
  );
}
