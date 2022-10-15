import React, { useState } from "react";
import Layout from "layouts/one-column-layout";
import Head from "next/head";
import { SITE_NAME } from "utils/constants";
import { Product } from "interfaces";
import ProductItem from "components/product/item";

interface Props {
  data: Product[];
  pages?: number;
  total?: number;
}

export default function ProductsPage({ data }: Props) {
  const [products, setProducts] = useState<Product[] | null>(data);

  return (
    <Layout>
      <Head>
        <title>Products - {SITE_NAME}</title>
      </Head>
      <div className="products py-10 grid grid-cols-2 lg:grid-cols-4 gap-4">
        {products ? (
          products.map((product) => (
            <div key={product.id} className="w-full">
              <ProductItem product={product} />
            </div>
          ))
        ) : (
          <div className="text-3xl py-10">No Products</div>
        )}
      </div>
    </Layout>
  );
}

// This gets called on every request
export async function getServerSideProps() {
  // Fetch data from external API
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_APP_URL}/api/wc/v3/products`
  );
  const data = await res.json();

  // Pass data to the page via props
  return { props: data };
}
