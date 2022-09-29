import { url } from "inspector";
import request from "../utils/request";

export function getCategories(params: Record<string, string | number>) {
  const res = request({
    url: `/wp/v2/categories`,
    method: "get",
    params,
  });
  return res;
}

export function getCategory(slug: string) {
  return getCategories({ slug });
}

export function getTags(params: Record<string, string | number>) {
  const response = request({
    url: `/wp/v2/tags`,
    method: "get",
    params,
  });
  return response;
}
