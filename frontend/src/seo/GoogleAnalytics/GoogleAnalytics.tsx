import React from 'react';

export const GoogleAnalytics = () => {
  const googleAnalyticsTag = process.env.NEXT_PUBLIC_GA_KEY as string;
  return (
    <>
      <script async src={`https://www.googletagmanager.com/gtag/js?id=${googleAnalyticsTag}`} />
      <script
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${googleAnalyticsTag}');
          `,
        }}
      />
    </>
  );
};
