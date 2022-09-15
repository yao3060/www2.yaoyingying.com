import request from "../utils/request";

export function getCategories(params: Record<string, string | number>) {
  const res = request({
    url: `/wp/v2/categories`,
    method: "get",
    params,
  });
  return res;
}
