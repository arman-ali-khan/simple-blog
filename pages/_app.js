import { Analytics } from '@vercel/analytics/react';
import NextProgress from "next-progress";
import { Toaster } from "react-hot-toast";
import ContextProvider from "../context/ContextProvider";
import '../googleAnly.js';
import "../styles/globals.css";
import Effect from "./effect";
export default function App({ Component, pageProps }) {
  return (
    <>   

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
      <Analytics />
    </ContextProvider>
    </>
  );
}


