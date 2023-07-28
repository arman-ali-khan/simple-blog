
import NextProgress from 'next-progress';

import ContextProvider from '../context/ContextProvider';
import '../styles/globals.css';

export default function App({ Component, pageProps }) {

  return <ContextProvider>
    <Component {...pageProps} />
    <NextProgress delay={300} options={{ showSpinner: false }} />
  </ContextProvider>
}
