import { Head, Html, Main, NextScript } from "next/document";

export default function Document() {
  
  return (
    <Html data-theme="light" lang="en">
      <Head>
        <link rel="icon" href="/favicon.svg" sizes="any" />
        <meta name="robots" content="all" />
        <meta name="google" content="notranslate" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Noto+Serif+Bengali:wght@400;500;600;700;800;900&family=Ubuntu:ital,wght@0,400;0,500;0,700;1,400;1,500;1,700&display=swap"
          rel="stylesheet"
        />
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-WLRN2J4SEM"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){typeof window !== 'undefined' && window && window.dataLayer &&  dataLayer.push(arguments)}
  gtag('js', new Date());

  gtag('config', 'G-WLRN2J4SEM');
</script>
      </Head>
      <title>Arman's Blog</title>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
