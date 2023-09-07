import NextProgress from "next-progress";
import { Toaster } from "react-hot-toast";
import ContextProvider from "../context/ContextProvider";
import "../styles/globals.css";
import Effect from "./effect";
import './googleal.js';
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
    </ContextProvider>
    </>
  );
}
