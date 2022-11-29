import '../styles/globals.css'
import type { AppProps } from 'next/app'
import React from 'react'
import Head from 'next/head'
import { AppProvider } from '../src/components/AppContext';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AppProvider>
      <React.Fragment>
        <Head>
          <meta name=''/>
        </Head>
        <Component {...pageProps} />
      </React.Fragment>
    </AppProvider>
  )
}
