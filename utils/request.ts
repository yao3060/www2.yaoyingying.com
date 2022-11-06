import axios, { AxiosRequestConfig } from "axios";
import { API_BASE_URL } from "./constants";
import { getToken } from "utils/auth";

const instance = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true, // send cookies when cross-domain requests
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
  timeout: 5000,
});

// Add a request interceptor
instance.interceptors.request.use(
  (config: AxiosRequestConfig): AxiosRequestConfig => {
    // Do something before request is sent
    if (!config?.headers) {
      throw new Error(
        `Expected 'config' and 'config.headers' not to be undefined`
      );
    }

    const authToken = getToken();

    if (authToken) {
      config.headers.Authorization = `Bearer ${authToken}`;
    }

    return config;
  },
  (error) => {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
instance.interceptors.response.use(
  (response) => {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  },
  (error) => {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  }
);

export default instance;
