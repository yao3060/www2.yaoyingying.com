"use client";

import { useAppStore } from "@/providers/AppProvider";
import { useEffect } from "react";

const PageViews = () => {
  const { count, incrementCount } = useAppStore((state) => state);

  useEffect(() => {
    incrementCount();
  }, []);

  return (
    <div className="flex w-fit gap-4 rounded-lg bg-slate-200 px-4 py-2">
      <span>Count: {count}</span>
    </div>
  );
};

export default PageViews;
