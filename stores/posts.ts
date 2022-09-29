import { getPosts } from "apis/posts";
import { Post } from "interfaces";
import create from "zustand";
import { mountStoreDevtool } from "simple-zustand-devtools";

type Filter = {
  search?: string;
  tags?: string[];
  categories?: string;
  page?: string;
};

interface Store {
  init: boolean;
  setInit: CallableFunction;
  isLoading: boolean;
  filter: Filter;
  setFilter: (filter: Filter) => void;

  getItems: () => void;
  posts: Post[];
  total: number;
  pages: number;
}

const usePostStore = create<Store>((set, get) => ({
  init: false,
  isLoading: false,
  filter: {
    search: undefined,
    tags: [],
    categories: undefined,
  },
  posts: [],
  total: 0,
  pages: 1,
  getItems: async () => {
    set((state) => ({ ...state, isLoading: true }));
    const response = await getPosts(get().filter);
    set((state) => ({
      ...state,
      posts: response.data,
      total: Number(response.headers["x-wp-total"] ?? 0),
      pages: Number(response.headers["x-wp-totalpages"] ?? 1),
      isLoading: false,
    }));
  },
  setFilter: (filter: Filter) => set((state) => ({ ...state, filter })),
  setInit: (value: boolean) => set((state) => ({ ...state, init: value })),
}));

if (process.env.NODE_ENV === "development") {
  mountStoreDevtool("PostStore", usePostStore);
}

export default usePostStore;
