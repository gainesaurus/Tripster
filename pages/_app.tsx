import { Description } from '@mui/icons-material';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import React from 'react';
import { TripsProvider } from '../src/Contexts/TripsContext';
import { UserProvider } from '../src/Contexts/UserContext';
import '../styles/globals.css';
import initAuth from '../initAuth';
initAuth()

export default function App({ Component, pageProps }: AppProps) {
  return (
    <UserProvider>
      <TripsProvider>
        <React.Fragment>
          <Head>
            <title>Vakay! You're Invited!</title>
            <meta name="description" content="Here is a place where you can plan and stay informed on all the happenings of your next trip or vacation. Travel in community." />
          </Head>
          <Component {...pageProps} />
        </React.Fragment>
      </TripsProvider>
    </UserProvider>
  );
}
