import React, { ReactNode } from "react";
import Head from "next/head";

import Footer from "../components/footer";
import Header from "../components/header";
import PageHeader from "components/page-header";

type Props = {
  fullWidth: boolean;
  children?: ReactNode;
  title?: string;
  description?: string;
  bgImage?: string;
};

export default function OneColumnLayout({
  fullWidth = false,
  children,
  title,
  description,
  bgImage,
}: Props) {
  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <Header />
      <PageHeader title={title} description={description} bgImage={bgImage} />

      <main id="content">
        {fullWidth ? (
          children
        ) : (
          <div className="container m-auto">
            <div className="flex justify-between w-full">
              <div id="primary" className="w-full pt-5 ">
                {children}
              </div>
            </div>
          </div>
        )}
      </main>
      <Footer />
    </>
  );
}
