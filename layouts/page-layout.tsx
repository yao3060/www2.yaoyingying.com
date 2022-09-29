import React, { ReactNode } from "react";
import Head from "next/head";
import Script from "next/script";
import Footer from "../components/footer";
import Header from "../components/header";
import PageHeader from "components/page-header";
import Sidebar from "components/sidebar";

type Props = {
  children?: ReactNode;
  title?: string;
  description?: string;
};

export default function PageLayout({ children, title, description }: Props) {
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
            <div
              id="primary"
              className="w-3/4 pt-5 pr-10 border-r border-[#e9e9e9]"
            >
              {children}
            </div>
            <div id="secondary" className="w-1/4">
              <Sidebar />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
