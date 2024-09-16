import PostsList from "@/components/PostsList/PostsList";

export const dynamic = "force-static";
export const revalidate = 5;

type PageProps = {
  searchParams?: {
    page?: string;
  };
};
export default function Page({ searchParams }: PageProps) {
  const currentPage = Number(searchParams?.page) || 1;
  return (
    <div className="container m-auto">
      <PostsList
        className="flex flex-col gap-4 py-4"
        title="Recent Posts"
        currentPage={currentPage}
        showMeta
        showExcerpt
      />
    </div>
  );
}
