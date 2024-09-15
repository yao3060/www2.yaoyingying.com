import { WPPage } from "@/wordpress/wordpress";
import env from "../../env";
import last from "lodash.last";

type PageProps = {
  params: { slug: string[] };
};

export default async function Page({ params }: PageProps) {
  console.log("params", params);

  const slug = last(params.slug);

  const request = await fetch(
    `${env.WordPressRestAPI}/wp-json/wp/v2/pages?slug=${slug}`,
  );
  const [page] = (await request.json()) as WPPage[];

  console.log("pages", page);

  return (
    <div>
      <article className="prose lg:prose-xl">
        <header>
          <h1>{page.title.rendered}</h1>
        </header>
        <div dangerouslySetInnerHTML={{ __html: page.content.rendered }} />
      </article>
    </div>
  );
}
