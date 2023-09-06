import NextProgress from "next-progress";
import Script from "next/script";
import { Toaster } from "react-hot-toast";
import ContextProvider from "../context/ContextProvider";
import "../styles/globals.css";
import Effect from "./effect";
export default function App({ Component, pageProps }) {
 
  return (
    <>   
<Script async src="https://www.googletagmanager.com/gtag/js?id=G-WLRN2J4SEM"></Script>
<Script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments)}
  gtag('js', new Date());

  gtag('config', 'G-WLRN2J4SEM');
</Script>
    <ContextProvider>
      <Component {...pageProps} />
      <Toaster position="top-center" reverseOrder={false} />
      <NextProgress
        delay={300}
        height="5px"
        color="orange"
        options={{ showSpinner: false }}
      />
      <Effect />
    </ContextProvider>
    </>
  );
}
