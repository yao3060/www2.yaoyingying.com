import PostsList from "@/components/PostsList/PostsList";
import { Suspense } from "react";

export default function Home() {
  return (
    <div className=" container m-auto">
      <Suspense
        fallback={
          <p className="py-20 flex items-center justify-center bg-slate-100">
            Loading
          </p>
        }
      >
        <PostsList
          className="flex flex-col gap-4 py-4"
          title="Recent Posts"
          showMeta
          showExcerpt
        />
      </Suspense>
    </div>
  );
}
