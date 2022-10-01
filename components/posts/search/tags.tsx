import { getTags } from "apis/categories";
import { Category } from "interfaces";
import React, { useEffect, useRef, useState } from "react";
import usePostStore from "stores/posts";
import shallow from "zustand/shallow";

export default function PostsSearchTags() {
  const filter = usePostStore((state) => state.filter, shallow);
  const setFilter = usePostStore((state) => state.setFilter);

  const [items, setItems] = useState<Category[]>([]);

  const isChecked = (id: string) => {
    return filter.tags?.includes(id);
  };

  const getData = async () => {
    const response = await getTags({
      order: "desc",
      orderby: "count",
      per_page: 20,
    });
    setItems(response.data);
  };

  const handleOnChange = (id: string) => {
    if (!filter.tags) {
      setFilter({ ...filter, tags: [id], page: "1" });
    } else {
      if (filter.tags.includes(id)) {
        setFilter({
          ...filter,
          tags: filter.tags.filter((item) => item != id),
          page: "1",
        });
      } else {
        setFilter({ ...filter, tags: [...filter.tags, id], page: "1" });
      }
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="w-full flex mt-5">
      <span className="py-1.5 pr-2 font-bold">Tags:</span>
      <div className="flex justify-start flex-wrap">
        {items
          ? items.map((item) => (
              <div className="form-control mr-2.5" key={item.id}>
                <label className="label cursor-pointer">
                  <input
                    type="checkbox"
                    name="tags"
                    value={item.id}
                    checked={isChecked(item.id.toString())}
                    className="checkbox"
                    onChange={() => handleOnChange(item.id.toString())}
                  />
                  <span className="label-text pl-2">{item.name}</span>
                </label>
              </div>
            ))
          : ""}
      </div>
    </div>
  );
}
