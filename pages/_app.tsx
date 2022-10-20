import React from "react";
import { Provider } from "react-redux";
import "../styles/globals.scss";
import { AppProps } from "next/app";
import { NextAdapter } from "next-query-params";
import { QueryParamProvider } from "use-query-params";
import NextNProgress from "nextjs-progressbar";
import { store } from "stores/rematch";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <QueryParamProvider adapter={NextAdapter}>
        <NextNProgress />
        <Component {...pageProps} />
      </QueryParamProvider>
    </Provider>
  );
}

export default MyApp;
