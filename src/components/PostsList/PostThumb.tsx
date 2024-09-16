import Image from "next/image";
import { ListPost } from "./PostsList";
import env from "@/env";

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

export default PostThumb;
