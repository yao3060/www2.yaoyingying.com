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
  const posts: Post[] = await res.json();
  return posts;
}

export async function getPost(slug: string) {
  const res = await fetch(`${API_URL}/wp/v2/posts?slug=${slug}`);
  const posts: Post[] = await res.json();
  return posts[0];
}
