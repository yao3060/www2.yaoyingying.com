import usePostStore from "stores/posts";
import PostsSearchCategories from "./categories";
import PostsSearchKeyword from "./keyword";
import PostsSearchTags from "./tags";

export default function PostsSearch() {
  const filter = usePostStore((state) => state.filter);
  const setFilter = usePostStore((state) => state.setFilter);

  return (
    <div>
      <h3 className="text-3xl font-bold">Advanced Search</h3>
      <div className="divider"></div>
      <div className="advanced-search-form flex">
        <PostsSearchCategories />
        <PostsSearchKeyword />
      </div>
      <PostsSearchTags />

      <div className="divider"></div>
      <pre>{JSON.stringify(filter)}</pre>
    </div>
  );
}
