import { WPPost } from "@/wordpress/wordpress";
import env from "../../env";

// `app/page.tsx` is the UI for the `/` URL
export default async function Page() {
  const request = await fetch(`${env.WordPressRestAPI}/wp-json/wp/v2/posts`);
  const posts = (await request.json()) as WPPost[];

  return (
    <div className="container m-auto">
      <h1>Hello, Home page!</h1>

      <ul>
        {posts.map((post) => {
          const postLink = post.link.replaceAll(env.WordPressRestAPI, "");
          console.log("postLink", postLink);
          return (
            <li key={post.id}>
              <a href={`${postLink}`}>{post.title.rendered}</a>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
