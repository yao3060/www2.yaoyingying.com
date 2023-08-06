import { NextParsedUrlQuery } from "next/dist/server/request-meta";
import request from "../utils/request";

export function getPosts(params?: NextParsedUrlQuery) {
  const response = request({
    url: `/wp/v2/posts`,
    method: "get",
    params,
  });

  return response;
}

export function getPost(slug: string) {
  const response = request({
    url: `/wp/v2/posts`,
    method: "get",
    params: {
      slug,
    },
  });

  return response;
}

export function getRelatedPosts(postId: number) {
  const response = request({
    url: `/yarpp/v1/related/${postId}`,
    method: "get",
  });

  return response;
}
