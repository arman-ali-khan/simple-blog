
import NextProgress from 'next-progress';

import { Toaster } from 'react-hot-toast';
import ContextProvider from '../context/ContextProvider';
import '../styles/globals.css';

export default function App({ Component, pageProps }) {

  return <ContextProvider>
    <Component {...pageProps} />
    <Toaster
  position="top-center"
  reverseOrder={false}
/>
    <NextProgress delay={300} default = "5px" options={{ showSpinner: false }} />
  </ContextProvider>
}
