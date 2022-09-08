import { GetStaticProps } from "next";
import Layout from "../layouts/page-layout";
import { getPosts } from "apis/posts";
import { Post } from "../interfaces";
import PostItem from "components/posts/item";
import Head from "next/head";
import { SITE_NAME, SITE_DESCRIPTION } from "../utils/constants";
import { useState } from "react";

const IndexPage = ({ posts, preview }: { posts: Post[]; preview: boolean }) => {
  return (
    <Layout title="Home | Next.js + TypeScript Example">
      <Head>
        <title>
          {SITE_NAME} - {SITE_DESCRIPTION}
        </title>
      </Head>
      {posts.map((post) => (
        <PostItem key={post.id} post={post} />
      ))}
    </Layout>
  );
};

export default IndexPage;

export const getStaticProps: GetStaticProps = async ({ preview = false }) => {
  const posts = await getPosts();
  return {
    props: { posts, preview },
    revalidate: 10,
  };
};
