import Layout from "../../layouts/page-layout";
import { GetServerSideProps } from "next";
import { getCategories, getCategory } from "apis/categories";
import { Category, Post } from "interfaces";
import { useEffect, useState } from "react";
import Link from "next/link";
import last from "lodash/last";
import InlineTerms from "components/posts/inline-terms";
import Loading from "components/common/loading";
import Pagination from "components/posts/pagination";
import { getPosts } from "apis/posts";
import PostItem from "components/posts/item";

export default function CategoryPage({ category }: { category: Category }) {
  const [childCats, setChildCats] = useState<Category[] | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [items, setItems] = useState<Post[]>([]);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [totalItems, setTotalItems] = useState<number>(0);

  const getChildCategories = async (parent: number) => {
    const response = await getCategories({ parent });
    if (response && response.data) {
      setChildCats(response.data);
    }
  };

  const getItems = async () => {
    setIsLoading(true);
    const response = await getPosts({ categories: [category.id.toString()] });
    setItems(response.data);
    setTotalItems(Number(response.headers["x-wp-total"] ?? 0));
    setTotalPages(Number(response.headers["x-wp-totalpages"] ?? 1));
    setIsLoading(false);
  };

  const handelPageChange = (page: number) => {
    console.log("page", page);
  };

  useEffect(() => {
    getChildCategories(category.id);
    getItems();
  }, [category]);

  return (
    <Layout title={`Category: ${category.name}`} description="">
      <InlineTerms taxonomy="category" items={childCats} />

      <div className="articles relative min-h-[500px]">
        {isLoading ? (
          <Loading />
        ) : items.length ? (
          items.map((post) => <PostItem key={post.id} post={post} />)
        ) : (
          <div>No Posts</div>
        )}
      </div>

      {isLoading ? (
        ""
      ) : (
        <Pagination
          total={totalItems}
          pages={totalPages}
          siblings={1}
          className=""
          handelChange={handelPageChange}
        />
      )}
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

  console.log("params,", last(params?.slug));

  const response = await getCategory(last(params?.slug) as string);
  return {
    props: {
      category: response.data[0] ?? [],
    },
  };
};
