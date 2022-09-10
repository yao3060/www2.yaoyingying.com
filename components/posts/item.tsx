import { Post } from "interfaces";
import Link from "next/link";
import { IMAGE_PLACEHOLDER } from "utils/constants";
import ItemImage from "./item-image";

const PostItem = ({ post }: { post: Post }) => {
  let featuredMedia = post.x_featured_media_medium ?? IMAGE_PLACEHOLDER;

  // console.log("featuredMedia:", featuredMedia, post);
  return (
    <article id={`post-${post.id}`} className="flex gap-4 border-b py-5">
      <div className="feature-image w-[300px] ">
        <ItemImage
          title={post.title.rendered}
          url={featuredMedia}
          slug={post.slug}
          width={300}
          height={150}
        />
      </div>
      <div className="content">
        <div className="meta text-[#0275d8] uppercase text-xs tracking-widest mb-2.5">
          {post.x_categories}
        </div>
        <div className="title">
          <h2 className="text-xl">
            <Link href={`/posts/${post.slug}`}>
              <a
                rel="bookmark"
                dangerouslySetInnerHTML={{ __html: post.title.rendered }}
              ></a>
            </Link>
          </h2>
        </div>
        <div
          className="excerpt text-base pt-2.5"
          dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }}
        ></div>
      </div>
    </article>
  );
};

export default PostItem;