import React from "react";
import Head from "next/head";
import { Provider } from "react-redux";
import "../styles/globals.scss";
import { AppProps } from "next/app";
import { NextAdapter } from "next-query-params";
import { QueryParamProvider } from "use-query-params";
import NextNProgress from "nextjs-progressbar";
import { ThemeProvider } from "next-themes";
import { store } from "stores/rematch";
import { appWithTranslation } from "next-i18next";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Provider store={store}>
        <ThemeProvider enableSystem={true} attribute="data-theme">
          <QueryParamProvider adapter={NextAdapter}>
            <NextNProgress />
            <Component {...pageProps} />
          </QueryParamProvider>
        </ThemeProvider>
      </Provider>
    </>
  );
}

export default appWithTranslation(MyApp);
