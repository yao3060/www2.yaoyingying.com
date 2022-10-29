import React, { useEffect, useState } from "react";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { SITE_NAME, SITE_DESCRIPTION } from "utils/constants";
import { getPosts } from "apis/posts";
import { Post } from "../interfaces";
import PostItem from "components/posts/item";
import Head from "next/head";
import { useRouter } from "next/router";
import Pagination from "components/posts/pagination";
import Loading from "components/common/loading";
import Layout from "layouts/page-layout";

interface Data {
  posts: Post[];
  pages: number;
  total: number;
}

export const getServerSideProps: GetServerSideProps<Data> = async ({
  query,
  res,
}) => {
  res.setHeader(
    "Cache-Control",
    "public, s-maxage=60, stale-while-revalidate=59"
  );

  const response = await getPosts(query);

  return {
    props: {
      posts: response.data,
      total: Number(response.headers["x-wp-total"] ?? 0),
      pages: Number(response.headers["x-wp-totalpages"] ?? 1),
    },
  };
};

/**
 * This is HomePage
 *
 * @returns {JSX.Element}
 */
const IndexPage = ({
  posts,
  pages,
  total,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const router = useRouter();
  const { s, page } = router.query;
  const [items, setItems] = useState<Post[]>(posts);
  const [totalPages, setTotalPages] = useState<number>(pages);
  const [totalItems, setTotalItems] = useState<number>(total);
  const [isLoading, setIsLoading] = useState(false);

  const search = async () => {
    setIsLoading(true);
    const response = await getPosts({
      search: s,
      page: `1`,
    });
    setItems(response.data);
    setTotalItems(Number(response.headers["x-wp-total"] ?? 0));
    setTotalPages(Number(response.headers["x-wp-totalpages"] ?? 1));
    setIsLoading(false);
  };

  useEffect(() => {
    if (s) {
      search();
    }
  }, [s]);

  const handelPageChange = async (page: number) => {
    console.log("search keyword with page", s, page);
    setIsLoading(true);
    const response = await getPosts({
      search: s,
      page: page.toString(),
    });
    setItems(response.data);
    setTotalItems(Number(response.headers["x-wp-total"] ?? 0));
    setTotalPages(Number(response.headers["x-wp-totalpages"] ?? 1));
    setIsLoading(false);
  };

  return (
    <Layout title="Next.js + WordPress = Headless CMS">
      <Head>
        <title>
          {SITE_NAME} - Page:{page} - {SITE_DESCRIPTION}
        </title>
      </Head>
      <div className="articles relative">
        {isLoading ? (
          <Loading />
        ) : items.length ? (
          items.map((post) => <PostItem key={post.id} post={post} />)
        ) : (
          <div>No Posts</div>
        )}
      </div>

      {!isLoading && (
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
};

export default IndexPage;
