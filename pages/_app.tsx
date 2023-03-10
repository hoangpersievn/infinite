import Head from "next/head";
import type { AppProps } from "next/app";

import { css } from "@emotion/css";
import { AppLocale } from "@/core/lngProvider";
import { IntlProvider } from "react-intl";
import { AuthProvider } from "@/context/authContext";

import "@/styles/globals.css";
import "@/styles/custom.css";
import "antd/dist/reset.css";

// --

export default function App({ Component, pageProps }: AppProps) {
  const currentAppLocale = AppLocale["en"];

  return (
    <>
      <Head>
        <title>Infinity - handsome</title>
      </Head>

      <IntlProvider
        locale={currentAppLocale.locale}
        messages={currentAppLocale.messages}
        defaultLocale="en"
      >
        <AuthProvider>
          <div className={appCss}>
            <Component {...pageProps} />
          </div>
        </AuthProvider>
      </IntlProvider>
    </>
  );
}

// --''

// Translated messages in VN with matching IDs to what you declared
// const messagesInVi = {
//   myMessage: "Hôm nay là {ts, date, ::yyyyMMdd}",
// };

// ---

const appCss = css([
  {
    width: "100vw",
    height: "100vh",
  },
]);
