import { getCategories } from "apis/categories";
import Link from "next/link";
import { useEffect, useState } from "react";

interface Category {
  name: string;
  slug: string;
}

const CategoriesWidget = () => {
  const [items, setItems] = useState<Category[] | null>(null);
  const getData = async () => {
    const response = await getCategories({ parent: 0, per_page: 100 });
    console.log("response,", response);
    setItems(response.data);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <aside className="widget widget_categories">
      <h3 className="text-2xl pb-5">Categories</h3>
      <ul className="menu menu-compact bg-base-100">
        {items ? (
          items.map((item) => (
            <li className="hover-bordered">
              <Link href={`/category/${item.slug}`}>
                <a>{item.name}</a>
              </Link>
            </li>
          ))
        ) : (
          <li>No Categories</li>
        )}
      </ul>
    </aside>
  );
};

export default CategoriesWidget;
