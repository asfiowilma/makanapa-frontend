import '../styles/globals.css'
import type { AppProps } from 'next/app'
import GlobalProvider from '@context/GlobalProvider'
import { Toaster } from 'react-hot-toast'

function MyApp({ Component, pageProps }: AppProps) {
  return <GlobalProvider>
    <Component {...pageProps} />
    <Toaster position="bottom-center" reverseOrder={false} />
  </GlobalProvider>
}

export default MyApp
