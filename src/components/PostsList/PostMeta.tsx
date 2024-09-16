import env from "@/env";
import { ListPost } from "./PostsList";

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

export default PostMeta;
