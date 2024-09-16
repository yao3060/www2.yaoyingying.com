import env from "@/env";
import { WPFeaturedMedia, WPPost, WPTerm } from "@/wordpress/wordpress";
import { wpClient } from "@/wordpress/WPClient";
import { HTMLAttributes } from "react";
import MyPagination from "./Pagination/MyPagination";
import PostMeta from "./PostMeta";
import PostThumb from "./PostThumb";

export type ListPost = WPPost & {
  _embedded: {
    "wp:featuredmedia": WPFeaturedMedia[];
    "wp:term": WPTerm[][];
  };
};

const defaultParams = {
  _embed: "wp:term,wp:featuredmedia",
  _fields: "id,title,excerpt,link,modified,format,class_list,_links,_embedded",
};

type PostsListProps = HTMLAttributes<HTMLDivElement> & {
  title?: string;
  endpoint?: string;
  params?: Record<string, string>;
  showMeta?: boolean;
  showExcerpt?: boolean;
  showPagination?: boolean;
};
const PostsList = async ({
  title,
  endpoint = `/wp-json/wp/v2/posts`,
  params = {},
  showMeta,
  showExcerpt,
  showPagination,
  className = "flex flex-col gap-4 ",
}: PostsListProps) => {
  const response = await wpClient.fetch(endpoint, {
    params: { ...defaultParams, ...params },
  });
  const headers = response.headers;
  const posts = (await response.json()) as ListPost[];

  //get  x-wp-total, x-wp-totalpages
  const total = parseInt(headers.get("x-wp-total") ?? `0`);
  const totalPages = parseInt(headers.get("x-wp-totalpages") ?? `0`);

  return (
    <div className={`${className}`}>
      {title && <h2 className="text-2xl">{title}</h2>}

      <div
        data-total-posts={total}
        data-total-pages={totalPages}
      >
        {posts.map((post) => {
          const postLink = post.link.replaceAll(env.WordPressRestAPI, "");

          return (
            <article
              key={post.id}
              className={`grid grid-cols-[250px,_1fr] gap-4 border-b py-6 ${post.class_list.join(" ")}`}
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
      {showPagination && (
        <>
          <MyPagination
            className="py-4"
            pages={totalPages}
          />
        </>
      )}
    </div>
  );
};

export default PostsList;
