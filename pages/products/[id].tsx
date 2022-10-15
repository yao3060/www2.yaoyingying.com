import React from "react";
import Layout from "layouts/product-page-layout";
import Head from "next/head";
import { SITE_NAME } from "utils/constants";
import { GetServerSideProps } from "next";
import { Product } from "interfaces";
import ProductGallery from "components/product/gallery";

interface Props {
  product: Product;
}

export default function ProductPage({ product }: Props) {
  return (
    <Layout>
      <Head>
        <title>
          {product.name} - {SITE_NAME}
        </title>
      </Head>
      <article className="flex">
        <div className="w-1/2 pr-10">
          <ProductGallery images={product.images} />
        </div>
        <div className="w-1/2">
          <header>
            <h1 className="entry-title mb-2.5 text-3xl leading-normal">
              {product.name}
            </h1>
          </header>
          <div
            className="entry-content"
            dangerouslySetInnerHTML={{ __html: product.short_description }}
          ></div>
        </div>
      </article>
    </Layout>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  // Fetch data from external API
  const product = await (
    await fetch(
      `${process.env.NEXT_PUBLIC_APP_URL}/api/wc/v3/products/${params?.id}`
    )
  ).json();

  // Pass data to the page via props
  return {
    props: {
      product: product.data,
    },
  };
};
