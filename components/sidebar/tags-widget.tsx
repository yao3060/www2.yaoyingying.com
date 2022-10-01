import { getTags } from "apis/categories";
import { Tag } from "interfaces";
import Link from "next/link";
import React, { useEffect, useState } from "react";

export default function TagsWidget() {
  const [items, setItems] = useState<Tag[] | null>(null);
  const getData = async () => {
    const response = await getTags({ order: "desc", orderby: "count" });
    setItems(response.data);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <aside className="widget widget_categories">
      <h3 className="text-2xl pb-5">Tags</h3>
      <div className="">
        {items?.length
          ? items.map((item) => (
              <Link key={item.id} href={`/tag/${item.slug}`}>
                <a className="btn gap-2 btn-sm mr-5 mb-5">
                  {item.name}
                  <div className="badge">{item.count}</div>
                </a>
              </Link>
            ))
          : "No Tags"}
      </div>
    </aside>
  );
}
