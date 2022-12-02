import type { AppProps } from 'next/app';
import Head from 'next/head';
import React from 'react';
import { TripsProvider } from '../src/Contexts/TripsContext';
import { UserProvider } from '../src/Contexts/UserContext';
import '../styles/globals.css';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <UserProvider>
      <TripsProvider>
        <React.Fragment>
          <Head>
            <meta name="" />
          </Head>
          <Component {...pageProps} />
        </React.Fragment>
      </TripsProvider>
    </UserProvider>
  );
}
