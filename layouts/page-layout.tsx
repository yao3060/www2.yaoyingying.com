import React, { ReactNode } from "react";
import Head from "next/head";
import Footer from "../components/footer";
import Header from "../components/header";
import PageHeader from "components/page-header";
import Sidebar from "components/sidebar";
import DrawerNav from "components/header/drawer-nav";

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
      <div className="drawer">
        <input id="my-drawer" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content flex flex-col pt-[75px]">
          <Header />
          <PageHeader title={title} description={description} />

          <main id="content" className="px-2.5">
            <div className="container m-auto">
              <div className="flex justify-between w-full">
                <div id="primary" className="w-full lg:w-3/4 lg:pt-5 lg:pr-10">
                  {children}
                </div>

                <div id="secondary" className="hidden lg:block lg:w-1/4">
                  <Sidebar />
                </div>
              </div>
            </div>
          </main>
          <Footer />
        </div>

        <div className="drawer-side">
          <label htmlFor="my-drawer" className="drawer-overlay"></label>
          <DrawerNav />
        </div>
      </div>
    </>
  );
}
