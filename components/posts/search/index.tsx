import React, { useEffect } from "react";
import usePostStore from "stores/posts";
import PostsSearchCategories from "./categories";
import PostsSearchKeyword from "./keyword";
import PostsSearchTags from "./tags";
import qs from "qs";
import shallow from "zustand/shallow";
import PostsSearchOrder from "./order";

export default function PostsSearch() {
  const init = usePostStore((state) => state.init);
  const setInit = usePostStore((state) => state.setInit);
  const filter = usePostStore((state) => state.filter, shallow);
  const setFilter = usePostStore((state) => state.setFilter);
  const getItems = usePostStore((state) => state.getItems);

  useEffect(() => {
    if (init) {
      window.history.replaceState(
        null,
        "",
        qs.stringify(filter, {
          encode: false,
          addQueryPrefix: true,
          arrayFormat: "brackets",
        })
      );

      getItems();
    }
  }, [filter, init]);

  // restore query strings
  useEffect(() => {
    setFilter({
      ...filter,
      ...qs.parse(window.location.search, { ignoreQueryPrefix: true }),
    });
    setInit(true);
  }, []);

  return (
    <div>
      <h3 className="text-3xl font-bold">Advanced Search</h3>
      <div className="divider"></div>
      <div className="advanced-search-form flex items-center">
        <PostsSearchCategories />
        <PostsSearchOrder />
        <PostsSearchKeyword />
      </div>
      <PostsSearchTags />

      <div className="divider"></div>
    </div>
  );
}
