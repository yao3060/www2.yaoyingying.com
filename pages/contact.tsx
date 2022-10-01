import Link from "next/link";
import React, { useState } from "react";
import Layout from "../layouts/page-layout";

const ContactPage = () => {
  const [count, setCount] = useState(0);

  return (
    <Layout title="About | Next.js + TypeScript Example">
      <div className="py-10">
        <h1 className="text-4xl">Contact {count}</h1>
        <p>This is the contact page</p>
        <p>
          <button
            type="button"
            className="btn btn-wide"
            onClick={() => setCount(count + 1)}
          >
            Wide
          </button>
        </p>
        <p>
          <Link href="/">
            <a>Go home</a>
          </Link>
        </p>
      </div>
    </Layout>
  );
};

export default ContactPage;
