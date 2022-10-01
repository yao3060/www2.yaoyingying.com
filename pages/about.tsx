import Link from "next/link";
import React from "react";
import Layout from "../layouts/page-layout";

const AboutPage = () => {
  return (
    <Layout title="About | Next.js + TypeScript Example">
      <h1>About {}</h1>
      <p>This is the about page</p>
      <p></p>
      <p>
        <Link href="/">
          <a>Go home</a>
        </Link>
      </p>
    </Layout>
  );
};

export default AboutPage;
