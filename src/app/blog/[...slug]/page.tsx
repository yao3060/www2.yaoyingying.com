import { WPPost } from "@/wordpress/wordpress";
import { wpClient } from "@/wordpress/WPClient";
import last from "lodash.last";

export const dynamic = "force-static";

type PageProps = {
  params: { slug: string[] };
};

export default async function Page({ params }: PageProps) {
  const slug = last(params.slug);

  const response = await wpClient.fetch(`/wp-json/wp/v2/posts?slug=${slug}`);
  const [post] = (await response.json()) as WPPost[];

  return (
    <div className="container m-auto py-10">
      <article className="prose lg:prose-xl">
        <header>
          <h1>{post.title.rendered}</h1>
        </header>
        <div dangerouslySetInnerHTML={{ __html: post.content.rendered }} />
      </article>
    </div>
  );
}
