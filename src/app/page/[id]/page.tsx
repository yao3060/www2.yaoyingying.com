import PostsList from "@/components/PostsList/PostsList";

export const dynamic = "force-static";
// export const dynamic = "force-dynamic";
export const revalidate = 5;

export default function Page({ params }: { params: { id: string } }) {
  return (
    <div className="container m-auto">
      <PostsList
        className="flex flex-col gap-4 py-4"
        title="Recent Posts"
        params={{
          page: params.id,
        }}
        showMeta
        showExcerpt
        showPagination
      />
    </div>
  );
}
