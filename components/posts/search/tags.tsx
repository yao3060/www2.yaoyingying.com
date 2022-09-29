import { getTags } from "apis/categories";
import { Category } from "interfaces";
import React, { useEffect, useRef, useState } from "react";
import usePostStore from "stores/posts";

export default function PostsSearchTags() {
  const filter = usePostStore((state) => state.filter);
  const setFilter = usePostStore((state) => state.setFilter);

  const [items, setItems] = useState<Category[]>([]);

  const isChecked = (id: string) => {
    return filter.tags?.includes(id);
  };

  const getData = async () => {
    const response = await getTags({ order: "desc", orderby: "count" });
    setItems(response.data);
  };

  const handleOnChange = (id: string) => {
    if (!filter.tags) {
      setFilter({ tags: [id] });
    } else {
      if (filter.tags.includes(id)) {
        setFilter({ tags: filter.tags.filter((item) => item != id) });
      } else {
        setFilter({ tags: [...filter.tags, id] });
      }
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="w-full flex mt-5">
      <span className="py-1.5 pr-2 font-bold">Tags:</span>
      <div className="flex">
        {items
          ? items.map((item) => (
              <div className="form-control" key={item.id}>
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
