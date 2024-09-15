import env from "@/env";
import { WPFeaturedMedia, WPPost, WPTerm } from "@/wordpress/wordpress";
import { wpClient } from "@/wordpress/WPClient";
import Image from "next/image";
import { HTMLAttributes } from "react";

type ListPost = WPPost & {
  _embedded: {
    "wp:featuredmedia": WPFeaturedMedia[];
    "wp:term": WPTerm[][];
  };
};

const PostMeta = ({ post }: { post: ListPost }) => {
  const terms = post._embedded["wp:term"];
  const primaryTerms = terms[0] ?? null;
  if (!primaryTerms) return null;

  return (
    <div className="list-article-meta">
      {primaryTerms.map((term) => {
        const link = term.link.replaceAll(env.WordPressRestAPI, "");
        return (
          <a
            key={term.id}
            href={link}
            rel={term.taxonomy}
            dangerouslySetInnerHTML={{ __html: term.name }}
          ></a>
        );
      })}
    </div>
  );
};

const PostThumb = ({ post }: { post: ListPost }) => {
  const thumb = post._embedded["wp:featuredmedia"][0] ?? null;
  if (!thumb) return null;

  const postLink = post.link.replaceAll(env.WordPressRestAPI, "");
  const src = thumb.source_url;

  return (
    <div className="list-article-thumb w-[250px] ">
      {thumb ? (
        <a href={postLink}>
          <Image
            width="250"
            height="150"
            src={src}
            className=""
            alt={thumb.alt_text}
            placeholder="blur"
            blurDataURL={`${src}?x-oss-process=image/resize,m_fill,h_150,w_250/blur,r_10,s_10`}
          />
        </a>
      ) : (
        <div className="w-[250px] h-[150px] bg-slate-50"></div>
      )}
    </div>
  );
};

type PostsListProps = HTMLAttributes<HTMLDivElement> & {
  title?: string;
  endpoint?: string;
  params?: Record<string, string>;
  showMeta?: boolean;
  showExcerpt?: boolean;
};
const PostsList = async ({
  title,
  endpoint = `/wp-json/wp/v2/posts`,
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
    params,
  });
  const posts = (await response.json()) as ListPost[];

  return (
    <div className={`${className}`}>
      {title && <h2 className=" text-2xl">{title}</h2>}

      <div>
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
                    <a href={`${postLink}`}>{post.title.rendered}</a>
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
    </div>
  );
};

export default PostsList;
