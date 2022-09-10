import { GetServerSideProps, GetStaticProps } from "next";
import Layout from "../layouts/page-layout";
import { getPosts } from "apis/posts";
import { Post } from "../interfaces";
import PostItem from "components/posts/item";
import Head from "next/head";
import { SITE_NAME, SITE_DESCRIPTION } from "../utils/constants";
import {
  useQueryParam,
  StringParam,
  NumberParam,
  withDefault,
} from "use-query-params";
import React, { useEffect, useState } from "react";
import Pagination from "components/posts/pagination";
import Loading from "components/common/loading";

interface Props {
  posts: Post[];
  pages: number;
  total: number;
}

const IndexPage = ({ posts, pages, total }: Props) => {
  const [s] = useQueryParam("s", withDefault(StringParam, ""));
  const [page, setPage] = useQueryParam("page", withDefault(NumberParam, 1));
  const [items, setItems] = useState<Post[]>([]);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [totalItems, setTotalItems] = useState<number>(0);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const search = async () => {
      setPage(1);
      setIsLoading(true);
      const { posts, pages, total } = await getPosts({
        search: s,
        page: `1`,
      });
      setItems(posts);
      setTotalItems(total);
      setTotalPages(pages);
      setIsLoading(false);
    };
    search();
  }, [s]);

  useEffect(() => {
    const search = async () => {
      setIsLoading(true);
      const { posts, pages, total } = await getPosts({
        search: s,
        page: page.toString(),
      });
      setItems(posts);
      setTotalItems(total);
      setTotalPages(pages);
      setIsLoading(false);
    };
    search();
  }, [page]);

  const handelPageChange = (page: number) => {
    console.log("page", page);
  };

  return (
    <Layout title="Home | Next.js + TypeScript Example">
      <Head>
        <title>
          {SITE_NAME} - {SITE_DESCRIPTION}
        </title>
      </Head>

      <div className="articles relative min-h-[500px]">
        {isLoading ? (
          <Loading />
        ) : items.length ? (
          items.map((post) => <PostItem key={post.id} post={post} />)
        ) : (
          posts.map((post) => <PostItem key={post.id} post={post} />)
        )}
      </div>

      {isLoading ? (
        ""
      ) : (
        <Pagination
          total={totalItems ?? total}
          pages={totalPages ?? pages}
          siblings={1}
          className=""
          handelChange={handelPageChange}
        />
      )}
    </Layout>
  );
};

export default IndexPage;

export const getServerSideProps: GetServerSideProps = async () => {
  const { posts, pages, total } = await getPosts();
  return {
    props: { posts, pages, total },
  };
};
