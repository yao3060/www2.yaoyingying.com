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
import usePostStore from "stores/posts";
import shallow from "zustand/shallow";

const PostsPage = () => {
  const filter = usePostStore((state) => state.filter, shallow);
  const setFilter = usePostStore((state) => state.setFilter);
  const items = usePostStore((state) => state.posts);
  const total = usePostStore((state) => state.total);
  const pages = usePostStore((state) => state.pages);
  const isLoading = usePostStore((state) => state.isLoading);

  const handelPageChange = async (page: number) => {
    setFilter({ ...filter, page });
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
          total={total}
          pages={pages}
          siblings={1}
          className=""
          handelChange={handelPageChange}
        />
      )}
    </Layout>
  );
};

export default PostsPage;
