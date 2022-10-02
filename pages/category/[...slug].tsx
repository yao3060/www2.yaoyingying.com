import React from "react";
import { GetServerSideProps } from "next";
import { getCategories, getCategory } from "apis/categories";
import { Category, Post } from "interfaces";
import { useEffect, useState, useCallback } from "react";
import last from "lodash/last";
import InlineTerms from "components/posts/inline-terms";
import Loading from "components/common/loading";
import Pagination from "components/posts/pagination";
import { getPosts } from "apis/posts";
import PostItem from "components/posts/item";
import Layout from "layouts/page-layout";
import { useQueryParam, withDefault, NumberParam } from "use-query-params";

export default function CategoryPage({ category }: { category: Category }) {
  const [childCats, setChildCats] = useState<Category[] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [items, setItems] = useState<Post[]>([]);
  const [page] = useQueryParam("page", withDefault(NumberParam, 1));
  const [totalPages, setTotalPages] = useState<number>(1);
  const [totalItems, setTotalItems] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(page);

  const getChildCategories = useCallback(async () => {
    const response = await getCategories({ parent: category.id });
    if (response && response.data) {
      setChildCats(response.data);
    }
  }, [category.id]);

  const getItems = async () => {
    console.log("currentPage:", currentPage);
    setIsLoading(true);
    const response = await getPosts({
      categories: [category.id.toString()],
      page: currentPage.toString(),
    });
    setItems(response.data);
    setTotalItems(Number(response.headers["x-wp-total"] ?? 0));
    setTotalPages(Number(response.headers["x-wp-totalpages"] ?? 1));
    setIsLoading(false);
  };

  const handelPageChange = (p: number) => {
    console.log("page:", p);
    setCurrentPage(p);
  };

  useEffect(() => {
    if (category.id) {
      getChildCategories();
      getItems();
    }
  }, [category, currentPage]);

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
