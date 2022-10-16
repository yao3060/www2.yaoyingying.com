import React from "react";
import Layout from "layouts/one-column-layout";
import Head from "next/head";
import { SITE_NAME } from "utils/constants";
import { GetServerSideProps } from "next";
import { Product } from "interfaces";
import ProductGallery from "components/product/gallery";
import ProductAttributes from "components/product/attributes";
import ProductDetails from "components/product/details";

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
      <article className="pb-10">
        <header className="flex">
          <div className="w-1/2 pr-10">
            <ProductGallery images={product.images} />
          </div>
          <div className="w-1/2">
            <h1 className="entry-title mb-2.5 text-3xl leading-normal">
              {product.name}
            </h1>
            <p
              className="text-2xl tracking-tight mb-5"
              dangerouslySetInnerHTML={{ __html: product.price_html }}
            ></p>

            <ProductAttributes product={product} />

            <div
              className="entry-content"
              dangerouslySetInnerHTML={{ __html: product.short_description }}
            ></div>
          </div>
        </header>
        <section>
          <ProductDetails product={product} />
        </section>
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
