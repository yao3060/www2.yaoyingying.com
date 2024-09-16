import PostsList from "@/components/PostsList/PostsList";

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
