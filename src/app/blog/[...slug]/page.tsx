import env from "@/env";
import { WPPost } from "@/wordpress/wordpress";
import last from "lodash.last";

export const dynamic = "force-static";

type PageProps = {
  params: { slug: string[] };
};

export default async function Page({ params }: PageProps) {
  console.log("params", params);

  const slug = last(params.slug);

  const request = await fetch(
    `${env.WordPressRestAPI}/wp-json/wp/v2/posts?slug=${slug}`,
    {
      next: {
        revalidate: 10,
      },
    },
  );
  const [post] = (await request.json()) as WPPost[];

  console.log("post", post.id);

  return (
    <div className="container m-auto">
      <article className="prose lg:prose-xl">
        <header>
          <h1>{post.title.rendered}</h1>
        </header>
        <div dangerouslySetInnerHTML={{ __html: post.content.rendered }} />
      </article>
    </div>
  );
}
