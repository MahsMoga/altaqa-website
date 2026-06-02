import type { AppProps } from 'next/app'
import '../styles/globals.css'
import { ThreeDProvider } from '@/context/ThreeDContext'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThreeDProvider>
      <Component {...pageProps} />
    </ThreeDProvider>
  )
}
