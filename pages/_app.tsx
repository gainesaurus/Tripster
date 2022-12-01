import type { AppProps } from 'next/app';
import Head from 'next/head';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { TripsProvider } from '../src/Contexts/TripsContext';
import { UserProvider } from '../src/Contexts/UserContext';
import { auth } from '../src/firebase';
import '../styles/globals.css';

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();

  useEffect(() => {
    if (!auth.currentUser) router.replace('/login');
  }, [router]);
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
