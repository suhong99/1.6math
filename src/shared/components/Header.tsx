import Head from 'next/head';
import Script from 'next/script';
import React from 'react';

export default function Header() {
  return (
    <header className="w-full max-w-5xl items-center justify-between font- lg:flex">
      <Script id="schema.org" type="application/ld+json">
        {`
          {
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "1.6수학과학학원",
            "address": {
              "@type": "PostalAddress",
              "postalCode": "44646",
              "addressRegion": "울산",
              "addressLocality": "남구 옥동",
              "streetAddress": "문수로335번길 6 길상 빌딩 5층"
            },
            "contactPoint": {
              "@type": "ContactPoint",
              "telephone": "+82-52-261-5515",
              "contactType": "상담",
              "areaServed": ["KR"],
              "availableLanguage": ["Korean"]
            }
          }
        `}
      </Script>
      <h1 className="static top-0 left-0 flex  w-full items-end justify-center bg-gradient-to-t lg:size-auto lg:bg-none font-extrabold text-3xl m-4">
        1.6 수학과학 전문학원
      </h1>
    </header>
  );
}
