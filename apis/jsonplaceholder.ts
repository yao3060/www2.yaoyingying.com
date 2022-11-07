import request from "utils/request";

export function getTodos() {
  // const request: AxiosInstance
  const response = request({
    url: `https://jsonplaceholder.typicode.com/todos`,
    method: "get",
  });

  return response;
}
