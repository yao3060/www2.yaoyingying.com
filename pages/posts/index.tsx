import Layout from "../../layouts/page-layout";
import Head from "next/head";
import { SITE_NAME } from "../../utils/constants";
import { useEffect, useState } from "react";
import Loading from "components/common/loading";

export default function PostIndexPage() {
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    setIsLoading(true);
  }, []);

  return (
    <Layout title="Home | Next.js + TypeScript Example">
      <Head>
        <title>Posts - {SITE_NAME}</title>
      </Head>
      <div className="articles relative min-h-[500px]">
        {isLoading ? <Loading /> : ""}
      </div>
    </Layout>
  );
}
