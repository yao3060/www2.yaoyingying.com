import { WPPage } from "@/wordpress/wordpress";
import { wpClient } from "@/wordpress/WPClient";
import last from "lodash.last";

export const dynamic = "force-static";

type PageProps = {
  params: { slug: string[] };
};

export default async function Page({ params }: PageProps) {
  const slug = last(params.slug);

  const response = await wpClient.fetch(`/wp-json/wp/v2/pages?slug=${slug}`);
  const [page] = (await response.json()) as WPPage[];

  return (
    <div className="container m-auto">
      <article className="prose py-10 lg:prose-xl">
        <header>
          <h1>{page.title.rendered}</h1>
        </header>
        <div dangerouslySetInnerHTML={{ __html: page.content.rendered }} />
      </article>
    </div>
  );
}
