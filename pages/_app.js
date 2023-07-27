
import NextProgress from 'next-progress';
import dynamic from 'next/dynamic';
import ContextProvider from '../context/ContextProvider';
import '../styles/globals.css';

export default function App({ Component, pageProps }) {
  const BackToUp = dynamic(
    () => import('@uiw/react-back-to-top'),
    { ssr: false }
  )
  return <ContextProvider>
    <Component {...pageProps} />
    <NextProgress delay={300} options={{ showSpinner: false }} />
    <BackToUp>Top</BackToUp>
  </ContextProvider>
}
