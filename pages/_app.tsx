import React from "react";
import Head from "next/head";
import { Provider } from "react-redux";
import "../styles/globals.scss";
import { AppProps } from "next/app";
import { NextAdapter } from "next-query-params";
import { QueryParamProvider } from "use-query-params";
import NextNProgress from "nextjs-progressbar";
import { store } from "stores/rematch";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Provider store={store}>
        <QueryParamProvider adapter={NextAdapter}>
          <NextNProgress />
          <Component {...pageProps} />
        </QueryParamProvider>
      </Provider>
    </>
  );
}

export default MyApp;
