import { create } from "zustand";
import type { BlogPost } from "@/lib/notion/types";

type BlogState = {
  posts: BlogPost[];
  isLoaded: boolean;
  setPosts: (posts: BlogPost[]) => void;
  upsertPost: (post: BlogPost) => void;
  getPostById: (id: string) => BlogPost | undefined;
};

export const useBlogStore = create<BlogState>((set, get) => ({
  posts: [],
  isLoaded: false,

  setPosts: (posts) => set({ posts, isLoaded: true }),

  upsertPost: (post) =>
    set((state) => {
      const idx = state.posts.findIndex((p) => p.id === post.id);
      if (idx === -1) return { posts: [post, ...state.posts] };
      const next = state.posts.slice();
      next[idx] = { ...next[idx], ...post };
      return { posts: next };
    }),

  getPostById: (id) => get().posts.find((p) => p.id === id),
}));
