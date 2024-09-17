"use client";

import AppProvider from "@/providers/AppProvider";
import { useServerInsertedHTML } from "next/navigation";
import React, { useState } from "react";
import { StyleRegistry, createStyleRegistry } from "styled-jsx";
import { SWRConfig } from "swr";

export default function Providers({ children }: { children: React.ReactNode }) {
  // Only create stylesheet once with lazy initial state
  // x-ref: https://reactjs.org/docs/hooks-reference.html#lazy-initial-state
  const [jsxStyleRegistry] = useState(() => createStyleRegistry());

  useServerInsertedHTML(() => {
    const styles = jsxStyleRegistry.styles();
    jsxStyleRegistry.flush();
    return <>{styles}</>;
  });

  return (
    <AppProvider>
      <StyleRegistry registry={jsxStyleRegistry}>
        <SWRConfig>{children}</SWRConfig>
      </StyleRegistry>
    </AppProvider>
  );
}
