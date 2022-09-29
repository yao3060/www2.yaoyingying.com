import { getPosts } from "apis/posts";
import { Post } from "interfaces";
import { NextParsedUrlQuery } from "next/dist/server/request-meta";
import { useLayoutEffect } from "react";
import create from "zustand";
import shallow from "zustand/shallow";

type Filter = {
  s?: string;
  tags?: string[];
  categories?: string[];
};

interface Store {
  filter: Filter;
  setFilter: (filter: Filter) => void;
  posts: Post[];
  getItems: (params?: Filter) => void;
  setItems: (items: Post[]) => void;
}

const usePostStore = create<Store>((set) => ({
  filter: {
    s: "",
    tags: [],
    categories: [],
  },
  posts: [],
  getItems: () => ({}),
  setItems: (posts: Post[]) => set((state) => ({ ...state, posts })),
  setFilter: (filter: Filter) => set((state) => ({ ...state, filter })),
}));

export default usePostStore;
