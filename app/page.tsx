"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import AboutMe from "../components/AboutMe";
import Blog from "../components/Blog";
import BlogPost from "../components/BlogPost";

export default function App() {
  const [currentPage, setCurrentPage] = useState<"about" | "blog" | "post">(
    "about"
  );
  const [selectedPostId, setSelectedPostId] = useState<number | null>(null);

  const handlePostClick = (postId: number) => {
    setSelectedPostId(postId);
    setCurrentPage("post");
  };

  const handleBackToBlog = () => {
    setCurrentPage("blog");
    setSelectedPostId(null);
  };

  const handleBackToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-lg border-b border-orange-100">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <motion.div
            className="flex items-center gap-3 cursor-pointer"
            onClick={() => {
              setCurrentPage("about");
              handleBackToTop();
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="w-12 h-12 bg-gradient-to-br from-orange-400 to-red-500 rounded-full flex items-center justify-center shadow-lg">
              <span className="text-2xl">🍒</span>
            </div>
            <h1 className="font-bold text-2xl bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
              JSChoIog!
            </h1>
          </motion.div>

          <nav className="flex gap-2">
            <motion.button
              onClick={() => {
                setCurrentPage("blog");
                handleBackToTop();
              }}
              className={`px-6 py-2 rounded-full transition-all ${
                currentPage === "blog" || currentPage === "post"
                  ? "bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg"
                  : "text-gray-700 hover:bg-orange-50"
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Blog
            </motion.button>
            <motion.button
              onClick={() => {
                setCurrentPage("about");
                handleBackToTop();
              }}
              className={`px-6 py-2 rounded-full transition-all ${
                currentPage === "about"
                  ? "bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg"
                  : "text-gray-700 hover:bg-orange-50"
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              About Me
            </motion.button>
          </nav>
        </div>
      </header>

      {/* Page Content */}
      <main className="pt-20">
        <AnimatePresence mode="wait">
          {currentPage === "about" ? (
            <motion.div
              key="about"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <AboutMe />
            </motion.div>
          ) : currentPage === "blog" ? (
            <motion.div
              key="blog"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <Blog onPostClick={handlePostClick} />
            </motion.div>
          ) : (
            <motion.div
              key="post"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <BlogPost postId={selectedPostId} onBack={handleBackToBlog} />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Footer */}
      <footer className="mt-20 bg-gradient-to-r from-orange-100 to-amber-100 py-12">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="text-gray-700">
            © 2025 JSChoIog. Built with passion and dedication 🚀
          </p>
          <div className="flex items-center justify-center gap-4 mt-4">
            <motion.a
              href="#"
              className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-md hover:shadow-lg transition-shadow"
              whileHover={{ scale: 1.1, rotate: 5 }}
              whileTap={{ scale: 0.9 }}
            >
              <span className="text-xl">📧</span>
            </motion.a>
            <motion.a
              href="#"
              className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-md hover:shadow-lg transition-shadow"
              whileHover={{ scale: 1.1, rotate: -5 }}
              whileTap={{ scale: 0.9 }}
            >
              <span className="text-xl">💼</span>
            </motion.a>
            <motion.a
              href="#"
              className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-md hover:shadow-lg transition-shadow"
              whileHover={{ scale: 1.1, rotate: 5 }}
              whileTap={{ scale: 0.9 }}
            >
              <span className="text-xl">🐙</span>
            </motion.a>
          </div>
        </div>
      </footer>
    </div>
  );
}
