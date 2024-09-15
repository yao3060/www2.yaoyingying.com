import PostsList from "@/components/PostsList/PostsList";

export default function Home() {
  return (
    <div className=" container m-auto">
      <PostsList
        className="flex flex-col gap-4 py-4"
        title="Recent Posts"
        showMeta
        showExcerpt
      />
    </div>
  );
}
