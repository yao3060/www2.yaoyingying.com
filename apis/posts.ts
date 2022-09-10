import { Post } from "interfaces";

const API_URL = process.env.NEXT_PUBLIC_WORDPRESS_API_URL;

export async function getPosts(
  params?:
    | string
    | URLSearchParams
    | string[][]
    | Record<string, string>
    | undefined
) {
  const qs = new URLSearchParams(params);
  const res = await fetch(`${API_URL}/wp/v2/posts?${qs}`);
  if (!res.ok) {
    console.error("HTTP-Error: " + res.status);
  }
  const posts: Post[] = await res.json();

  return {
    posts,
    total: Number(res.headers.get("x-wp-total") ?? 0),
    pages: Number(res.headers.get("x-wp-totalpages") ?? 1),
  };
}

export async function getPost(slug: string) {
  const res = await fetch(`${API_URL}/wp/v2/posts?slug=${slug}`);
  const posts: Post[] = await res.json();
  return posts[0];
}
