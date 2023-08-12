import { Head, Html, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html  data-theme="light" lang="en">
      <Head>
      <link rel="icon" href="/favicon.svg" sizes="any" />
      </Head>
      <title>Arman's Blog</title>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
