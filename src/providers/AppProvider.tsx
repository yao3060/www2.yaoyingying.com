"use client";
import {
  type AppStore,
  createAppStore,
  initAppStore,
} from "@/stores/app-store";
import React, { useRef } from "react";
import { useStore } from "zustand";

export type AppStoreApi = ReturnType<typeof createAppStore>;

export const AppStoreContext = React.createContext<AppStoreApi | undefined>(
  undefined
);

export default function AppProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const storeRef = useRef<AppStoreApi>();
  if (!storeRef.current) {
    storeRef.current = createAppStore(initAppStore());
  }

  return (
    <AppStoreContext.Provider value={storeRef.current}>
      {children}
    </AppStoreContext.Provider>
  );
}

export const useAppStore = <T,>(selector: (store: AppStore) => T): T => {
  const context = React.useContext(AppStoreContext);
  if (!context) {
    throw new Error("useAppContext must be used within a AppProvider");
  }
  return useStore(context, selector);
};
