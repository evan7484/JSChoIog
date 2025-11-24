import { useState, useCallback } from "react";

export type PageType = "about" | "blog" | "post";

export function usePageNavigation() {
  const [currentPage, setCurrentPage] = useState<PageType>("about");
  const [selectedPostId, setSelectedPostId] = useState<number | null>(null);

  const scrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const navigateTo = useCallback(
    (page: "about" | "blog") => {
      setCurrentPage(page);
      setSelectedPostId(null);
      scrollToTop();
    },
    [scrollToTop]
  );

  const openPost = useCallback(
    (postId: number) => {
      setSelectedPostId(postId);
      setCurrentPage("post");
      scrollToTop();
    },
    [scrollToTop]
  );

  const closePost = useCallback(() => {
    setCurrentPage("blog");
    setSelectedPostId(null);
  }, []);

  return {
    currentPage,
    selectedPostId,
    navigateTo,
    openPost,
    closePost,
  };
}
