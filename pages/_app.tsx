import React from "react";

import "../styles/globals.scss";
import { AppProps } from "next/app";
import { NextAdapter } from "next-query-params";
import { QueryParamProvider } from "use-query-params";
import NextNProgress from "nextjs-progressbar";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <QueryParamProvider adapter={NextAdapter}>
      <NextNProgress />
      <Component {...pageProps} />
    </QueryParamProvider>
  );
}

export default MyApp;
