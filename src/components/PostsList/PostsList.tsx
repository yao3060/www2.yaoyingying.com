import env from "@/env";
import { WPFeaturedMedia, WPPost, WPTerm } from "@/wordpress/wordpress";
import { wpClient } from "@/wordpress/WPClient";
import { HTMLAttributes } from "react";
import PostThumb from "./PostThumb";
import PostMeta from "./PostMeta";
import MyPagination from "../Pagination/MyPagination";
import { Suspense } from "react";

export type ListPost = WPPost & {
  _embedded: {
    "wp:featuredmedia": WPFeaturedMedia[];
    "wp:term": WPTerm[][];
  };
};

type PostsListProps = HTMLAttributes<HTMLDivElement> & {
  title?: string;
  endpoint?: string;
  currentPage: number;
  params?: Record<string, string>;
  showMeta?: boolean;
  showExcerpt?: boolean;
};
const PostsList = async ({
  title,
  endpoint = `/wp-json/wp/v2/posts`,
  currentPage,
  params = {
    _embed: "wp:term,wp:featuredmedia",
    _fields:
      "id,title,excerpt,link,modified,format,class_list,_links,_embedded",
  },
  showMeta,
  showExcerpt,
  className = "flex flex-col gap-4 ",
}: PostsListProps) => {
  const response = await wpClient.fetch(endpoint, {
    params: { ...params, page: currentPage },
  });
  const headers = response.headers;
  const posts = (await response.json()) as ListPost[];

  //get  x-wp-total, x-wp-totalpages
  const total = parseInt(headers.get("x-wp-total") ?? `0`);
  const totalPages = parseInt(headers.get("x-wp-totalpages") ?? `0`);

  return (
    <div className={`${className}`}>
      {title && <h2 className=" text-2xl">{title}</h2>}

      <div data-total-posts={total} data-total-pages={totalPages}>
        {posts.map((post) => {
          const postLink = post.link.replaceAll(env.WordPressRestAPI, "");

          return (
            <article
              key={post.id}
              className={`border-b py-6 grid grid-cols-[250px,_1fr] gap-4  ${post.class_list.join(" ")}`}
            >
              <PostThumb post={post} />

              <div className="content flex flex-col gap-2">
                {showMeta && <PostMeta post={post} />}

                <header>
                  <h3 className="text-xl">
                    <a
                      href={`${postLink}`}
                      dangerouslySetInnerHTML={{ __html: post.title.rendered }}
                    >
                      {}
                    </a>
                  </h3>
                </header>
                {showExcerpt && (
                  <div
                    className="excerpt"
                    dangerouslySetInnerHTML={{
                      __html: post.excerpt.rendered,
                    }}
                  ></div>
                )}
              </div>
            </article>
          );
        })}
      </div>
      <Suspense>
        <MyPagination className="py-4" pages={totalPages} />
      </Suspense>
    </div>
  );
};

export default PostsList;
