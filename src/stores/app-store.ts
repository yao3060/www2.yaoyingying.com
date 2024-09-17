// src/stores/app-store.ts
import type {} from "@redux-devtools/extension";
import { devtools } from "zustand/middleware";
import { createStore } from "zustand/vanilla";

export type AppState = {
  count: number;
  name: string;
  description: string;
};

export type AppActions = {
  decrementCount: () => void;
  incrementCount: () => void;
};

export type AppStore = AppState & AppActions;

export const initAppStore = (): AppState => {
  return {
    count: 0,
    name: "Hello, World!",
    description: "This is a description",
  };
};

export const defaultInitState: AppState = {
  count: 0,
  name: "",
  description: "",
};

export const createAppStore = (initState: AppState = defaultInitState) => {
  return createStore<AppStore>()(
    devtools(
      (set) => ({
        ...initState,
        decrementCount: () => set((state) => ({ count: state.count - 1 })),
        incrementCount: () => set((state) => ({ count: state.count + 1 })),
      }),
      {
        // disable devtools (on production for instance).
        enabled: process.env.NODE_ENV === "development",
        name: "app-store",
        anonymousActionType: "app-store",
      }
    )
  );
};
