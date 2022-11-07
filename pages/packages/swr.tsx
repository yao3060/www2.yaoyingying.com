import React, { useEffect } from "react";
import Layout from "layouts/one-column-layout";
import useSWR from "swr";
import { getTodos } from "apis/jsonplaceholder";
import Prism from "prismjs";
import "prismjs/themes/prism-coy.css";

interface Todo {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

export default function PackageSWR() {
  const { data: todos, error } = useSWR<Todo[]>(
    "https://jsonplaceholder.typicode.com/todos",
    () => getTodos().then((res) => res.data)
  );

  const code = `// api.ts
import request from "utils/request";

export function getTodos() {
  // const request: AxiosInstance
  const response = request({
    url: "https://jsonplaceholder.typicode.com/todos",
    method: "get",
  });

  return response;
}

// page.tsx
import React, { useEffect } from "react";
import useSWR from "swr";

interface Todo {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

export default function PackageSWR() {
  const { data: todos, error } = useSWR<Todo[]>(
    "https://jsonplaceholder.typicode.com/todos",
    () => getTodos().then((res) => res.data)
  );
  if (error) return <div>failed to load</div>;
  if (!todos) return <div>loading...</div>;
  return (
    <div>{JSON.stringify(todos)}</div>
  )
}
  `;

  useEffect(() => {
    Prism.highlightAll();
  }, []);

  if (error) return <div>failed to load</div>;
  if (!todos) return <div>loading...</div>;

  return (
    <Layout title="SWR + Axios Example">
      <div className="pb-10">
        <div className="prose">
          <p>tips: Display Json in react JS div formatted properly</p>
          <code className={`language-javascript`}>
            JSON.stringify(data, null, 2)
          </code>
        </div>

        <h3 className="mt-10 mb-5 text-2xl font-bold">Response</h3>

        <pre className="h-96">
          <code className={`language-json`}>
            {JSON.stringify(todos, null, 2)}
          </code>
        </pre>

        <h3 className="mt-10 mb-5 text-2xl font-bold">Code Example</h3>
        <pre>
          <code className={`language-javascript`}>{code}</code>
        </pre>
      </div>
    </Layout>
  );
}
