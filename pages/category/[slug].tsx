import Layout from "../../layouts/page-layout";
import { GetServerSideProps } from "next";
import { getCategories, getCategory } from "apis/categories";
import { Category } from "interfaces";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function CategoryPage({ category }: { category: Category }) {
  const [childItems, setChildItems] = useState<Category[] | null>(null);

  const getChildCategories = async (parent: number) => {
    const response = await getCategories({ parent });
    if (response && response.data) {
      setChildItems(response.data);
    }
  };

  useEffect(() => {
    getChildCategories(category.id);
  }, [category]);

  return (
    <Layout title={`Category: ${category.name}`} description="">
      <main>
        <h1> </h1>

        {childItems ? (
          <div className="child-categories">
            <span className="pr-2.5">Categories:</span>
            {childItems.map((item) => (
              <Link href={item.slug}>
                <a className="link link-hover px-2.5">{item.name}</a>
              </Link>
            ))}
          </div>
        ) : (
          ""
        )}
      </main>
    </Layout>
  );
}

/**
 * This value is considered fresh for ten seconds (s-maxage=10).
 * If a request is repeated within the next 10 seconds, the previously
 * cached value will still be fresh. If the request is repeated before 59 seconds,
 * the cached value will be stale but still render (stale-while-revalidate=59).
 *
 * In the background, a revalidation request will be made to populate the cache
 * with a fresh value. If you refresh the page, you will see the new value.
 *
 * @see https://nextjs.org/docs/basic-features/data-fetching/get-server-side-props#caching-with-server-side-rendering-ssr
 */
export const getServerSideProps: GetServerSideProps = async ({
  params,
  res,
}) => {
  res.setHeader(
    "Cache-Control",
    "public, s-max-age=10, stale-while-revalidate=59"
  );

  const response = await getCategory(params?.slug as string);
  return {
    props: {
      category: response.data[0] ?? [],
    },
  };
};
