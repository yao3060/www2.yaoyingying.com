import Layout from "../../layouts/page-layout";
import Head from "next/head";
import { SITE_NAME } from "../../utils/constants";
import { useEffect, useState } from "react";
import Loading from "components/common/loading";
import Pagination from "components/posts/pagination";
import PostItem from "components/posts/item";
import { getPosts } from "apis/posts";
import { Post } from "interfaces";

export default function PostIndexPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState<number | null>(1);
  const [items, setItems] = useState<Post[]>([]);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [totalItems, setTotalItems] = useState<number>(0);

  useEffect(() => {
    const search = async () => {
      setPage(null);
      setIsLoading(true);
      const { posts, pages, total } = await getPosts();
      setItems(posts);
      setTotalItems(total);
      setTotalPages(pages);
      setIsLoading(false);
    };
    search();
  }, []);

  const handelPageChange = (page: number) => {
    console.log("page", page);
    setPage(page);
  };

  return (
    <Layout title="Home | Next.js + TypeScript Example">
      <Head>
        <title>Posts - {SITE_NAME}</title>
      </Head>
      <div className="articles relative min-h-[500px]">
        {isLoading ? (
          <Loading />
        ) : items.length ? (
          items.map((post) => <PostItem key={post.id} post={post} />)
        ) : (
          <div>No posts</div>
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
