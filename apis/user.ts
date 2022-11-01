import request from "utils/request";

export function Login(data: { username: string; password: string }) {
  const response = request({
    url: `/jwt-auth/v1/token`,
    method: "post",
    data,
  });

  return response;
}

export function Me() {
  const response = request({
    url: `/wp/v2/users/me`,
    method: "get",
  });

  return response;
}
