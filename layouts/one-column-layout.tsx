import React, { ReactNode } from "react";
import Head from "next/head";

import Footer from "../components/footer";
import Header from "../components/header";
import PageHeader from "components/page-header";
import Sidebar from "components/sidebar";

type Props = {
  children?: ReactNode;
  title?: string;
  description?: string;
};

export default function OneColumnLayout({
  children,
  title,
  description,
}: Props) {
  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <Header />
      <PageHeader title={title} description={description} />

      <main id="content">
        <div className="container m-auto">
          <div className="flex justify-between w-full">
            <div id="primary" className="w-full pt-5 ">
              {children}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
