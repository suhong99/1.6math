import React from 'react';

export default function Header() {
  const orgJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: '1.6수학과학학원',
    description: '옥동에서 수학과학을 전문적으로 가르치고 있습니다.',

    address: {
      '@type': 'PostalAddress',
      postalCode: '44646',
      addressRegion: '울산',
      addressLocality: '남구 옥동',
      streetAddress: '문수로335번길 6 길상 빌딩 5층',
    },
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+82-52-261-5515',
      contactType: '상담',
      areaServed: ['KR'],
      availableLanguage: ['Korean'],
    },
  };

  const FAQJsonLd = {
    '@context': 'http://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: '학원 상담시간은 언제인가요?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: '오후 2시에서 7시 입니다',
        },
      },
      {
        '@type': 'Question',
        name: '수강료는 어떻게 되나요?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: '\
            <ul>\
              <li>초등부 : 1275분 20만원</li>\
              <li>중등부(1): 1530분 27만원</li>\
              <li>중등부(2): 2040분 37만원</li>\
              <li>고등부(1): 1275분 27만원</li>\
              <li>고등부(2): 1784분 37만원</li>\
            </ul>\
          ',
        },
      },
    ],
  };

  return (
    <header className="w-full max-w-5xl items-center justify-between font- lg:flex">
      <h1 className="static top-0 left-0 flex  w-full items-end justify-center bg-gradient-to-t lg:size-auto lg:bg-none font-extrabold text-3xl m-4">
        1.6 수학과학 전문학원
      </h1>
      {/* Test후 section 제거 */}
      <section>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQJsonLd) }}
        />
      </section>
    </header>
  );
}
