import React, { useState, useEffect } from "react";
import axios, { Method } from "axios";
import { API_BASE_URL } from "utils/constants";

axios.defaults.baseURL = API_BASE_URL;

const useAxios = (
  url: string,
  method: Method,
  params?: URLSearchParams | FormData | File | Blob,
  headers?: any
) => {
  const [response, setResponse] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  // https://github.com/axios/axios#typescript
  const fetch = async () => {
    try {
      if (method.toLowerCase() === "get") {
        const { data } = await axios.get(url, { params });
        setResponse(data);
      }
      if (method.toLowerCase() === "post") {
        const { data } = await axios.post(url, { data: params });
        setResponse(data);
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setError(JSON.stringify(error));
      } else {
        setError(JSON.stringify(error));
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetch();
  }, []);

  return { response, error, loading };
};

export default useAxios;
