import React, { useEffect } from "react";
import usePostStore from "stores/posts";
import PostsSearchCategories from "./categories";
import PostsSearchKeyword from "./keyword";
import PostsSearchTags from "./tags";
import qs from "qs";
import shallow from "zustand/shallow";

export default function PostsSearch() {
  const filter = usePostStore((state) => state.filter, shallow);
  const getItems = usePostStore((state) => state.getItems);

  useEffect(() => {
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
  }, [filter]);

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
    </div>
  );
}
