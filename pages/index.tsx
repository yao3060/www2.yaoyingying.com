import { GetServerSideProps, GetStaticProps } from "next";
import Layout from "../layouts/page-layout";
import { getPosts } from "apis/posts";
import { Post } from "../interfaces";
import PostItem from "components/posts/item";
import Head from "next/head";
import { SITE_NAME, SITE_DESCRIPTION } from "../utils/constants";
import { useQueryParam, StringParam, withDefault } from "use-query-params";
import React, { useEffect, useState } from "react";
import Pagination from "components/posts/pagination";

interface Props {
  posts: Post[];
  pages: number;
  total: number;
}

const IndexPage = ({ posts, pages, total }: Props) => {
  const [s, setS] = useQueryParam("s", withDefault(StringParam, ""));
  const [items, setItems] = useState<Post[]>([]);

  useEffect(() => {
    const search = async () => {
      // setItems(s ? await getPosts({ search: s }) : []);
    };
    search();
  }, [s]);

  return (
    <Layout title="Home | Next.js + TypeScript Example">
      <Head>
        <title>
          {SITE_NAME} - {SITE_DESCRIPTION}
        </title>
      </Head>

      <div className="articles">
        {items.length
          ? items.map((post) => <PostItem key={post.id} post={post} />)
          : posts.map((post) => <PostItem key={post.id} post={post} />)}
      </div>

      <Pagination total={total} pages={pages} />
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
