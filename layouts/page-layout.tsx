import React, { ReactNode } from "react";
import Head from "next/head";
import useSWR from "swr";
import Footer from "../components/footer";
import Header from "../components/header";
import PageHeader from "components/page-header";
import Sidebar from "components/sidebar";

type Props = {
  children?: ReactNode;
  title?: string;
};

export default function PageLayout({
  children,
  title = "This is the default title",
}: Props) {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Header />
      <PageHeader title={title} />

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
