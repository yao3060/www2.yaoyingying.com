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
