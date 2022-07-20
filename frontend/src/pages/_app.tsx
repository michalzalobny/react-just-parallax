import React, { useState, useEffect, useRef } from 'react';
import type { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import FontFaceObserver from 'fontfaceobserver';
import 'focus-visible';
import '../styles/index.scss';

import { GlobalStyles } from 'utils/GlobalStyles';
import { Layout } from 'components/Layout/Layout';
import { PageProps } from 'utils/sharedTypes';

export default function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const canvasAppRef = useRef<HTMLDivElement | null>(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const fontA = new FontFaceObserver('opensans');
    const fontB = new FontFaceObserver('teko');

    Promise.all([fontA.load(null, 2500), fontB.load(null, 2500)])
      .then(
        () => {
          setIsReady(true);
        },
        () => {
          setIsReady(true);
          console.warn('Fonts were loading too long (over 1500ms)');
        }
      )
      .catch(err => {
        setIsReady(true);
        console.warn('Some critical font are not available:', err);
      });
  }, []);

  return (
    <>
      <GlobalStyles />
      <Layout repoHref={(pageProps as PageProps).repoHref} isReady={isReady}>
        <>
          <div ref={canvasAppRef} className="canvas__wrapper" />
          <Component
            key={`${router.route}${router.locale === undefined ? '' : router.locale}`}
            router={router}
            {...pageProps}
          />
        </>
      </Layout>
    </>
  );
}
