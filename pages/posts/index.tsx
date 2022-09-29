import { GetServerSideProps } from "next";
import Layout from "../../layouts/one-column-layout";
import { getPosts } from "apis/posts";
import { Post } from "../../interfaces";
import PostItem from "components/posts/item";
import Head from "next/head";
import { SITE_NAME, SITE_DESCRIPTION } from "../../utils/constants";
import {
  useQueryParam,
  StringParam,
  NumberParam,
  withDefault,
} from "use-query-params";
import React, { useEffect, useState } from "react";
import Pagination from "components/posts/pagination";
import Loading from "components/common/loading";
import PostsSearch from "components/posts/search";

interface Props {
  posts: Post[];
  pages: number;
  total: number;
}

const PostsPage = ({ posts, pages, total }: Props) => {
  const [s] = useQueryParam("s", withDefault(StringParam, ""));
  const [page, setPage] = useQueryParam("page", withDefault(NumberParam, 1));
  const [items, setItems] = useState<Post[]>(posts);
  const [totalPages, setTotalPages] = useState<number>(pages);
  const [totalItems, setTotalItems] = useState<number>(total);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const search = async () => {
      setPage(null);
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
    search();
  }, [s]);

  const handelPageChange = async (page: number) => {
    console.log("page", page);
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
    <Layout title="Blog">
      <Head>
        <title>
          {SITE_NAME} - {SITE_DESCRIPTION}
        </title>
      </Head>

      <PostsSearch />

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
};

export default PostsPage;

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const response = await getPosts(query);

  return {
    props: {
      posts: response.data,
      total: Number(response.headers["x-wp-total"] ?? 0),
      pages: Number(response.headers["x-wp-totalpages"] ?? 1),
    },
  };
};
