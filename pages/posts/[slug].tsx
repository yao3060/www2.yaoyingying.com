import React from "react";
import { getPost } from "apis/posts";
import { Post } from "interfaces";
import { GetServerSideProps } from "next";
import Head from "next/head";
import { SITE_NAME, IMAGE_PLACEHOLDER } from "utils/constants";
import Layout from "layouts/page-layout";
import useSWR, { unstable_serialize } from "swr";

const API = "getPost";

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const slug = params?.slug as string;
  const response = await getPost(slug);

  return {
    props: {
      slug,
      fallback: {
        [unstable_serialize([API, slug])]: response.data[0] ?? [],
      },
    },
  };
};

const fetcher = async (...url: string[]) => (await getPost(url[1])).data[0];

export default function PostPage({ slug }: { slug: string }) {
  const { data: post, error } = useSWR<Post>([API, slug], fetcher);

  if (error) return "An error has occurred.";
  if (!post) return "Loading...";

  return (
    <Layout>
      <Head>
        <title>
          {post.title.rendered} - {SITE_NAME}
        </title>
        <meta
          property="og:image"
          content={post.x_featured_media_medium ?? IMAGE_PLACEHOLDER}
        />
      </Head>
      <article>
        <header>
          <h1
            className="entry-title mb-2.5 text-3xl leading-normal"
            dangerouslySetInnerHTML={{ __html: post.title.rendered }}
          ></h1>
          <div className="entry-meta text-xs uppercase tracking-widest border-b border-[#e9e9e9] pb-[30px] mb-[30px]">
            <span className="posted-on">Posted on {post.x_date}</span>
            <span className="byline pl-1">BY {post.x_author}</span>
          </div>
        </header>
        <div
          className="entry-content"
          dangerouslySetInnerHTML={{ __html: post.content.rendered }}
        ></div>
      </article>
    </Layout>
  );
}
