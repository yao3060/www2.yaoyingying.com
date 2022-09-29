import { getCategories } from "apis/categories";
import { Category } from "interfaces";
import React, { useEffect, useState } from "react";
import usePostStore from "stores/posts";
import shallow from "zustand/shallow";

export default function PostsSearchCategories() {
  const filter = usePostStore((state) => state.filter, shallow);
  const setFilter = usePostStore((state) => state.setFilter);

  const [items, setItems] = useState<Category[] | null>(null);
  const getData = async () => {
    const response = await getCategories({ parent: 0, per_page: 100 });
    setItems(response.data);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="form-control mr-5">
      <select
        className="select select-bordered w-full max-w-xs"
        onChange={(e) =>
          setFilter({ ...filter, categories: e.target.value, page: "1" })
        }
      >
        <option disabled value="0">
          Categories
        </option>
        {items
          ? items.map((item) => (
              <option key={item.id} value={item.id}>
                {item.name}
              </option>
            ))
          : ""}
      </select>
    </div>
  );
}
