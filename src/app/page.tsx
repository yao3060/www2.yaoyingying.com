import PostsList from "@/components/PostsList/PostsList";

export const dynamic = "force-static";
// export const dynamic = "force-dynamic";
export const revalidate = 5;

export default function Page() {
  return (
    <div className="container m-auto">
      <PostsList
        className="flex flex-col gap-4 py-4"
        title="Recent Posts"
        params={{
          page: `1`,
        }}
        showMeta
        showExcerpt
        showPagination
      />
    </div>
  );
}
