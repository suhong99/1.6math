import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Header from '@/shared/components/Header';
import JsonLd from '@/shared/components/JsonLd';
import FloatingBtn from '@/shared/components/FloatingBtn';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: '1.6 수학전문학원',
  description:
    '울산 남구 옥동 1.6 수학학원입니다. \n 네이버 지도 이용시에는 일점육수학과학전문학원으로 검색 부탁드립니다.',
  openGraph: {
    title: '1.6 수학전문학원',
    description: '울산 남구 옥동 1.6수학전문학원(일점육수학전문학원)입니다.',
    images:
      'https://github.com/suhong99/1.6math/assets/120103909/205269b2-3969-4afd-8477-686a46aa76c8',
    locale: 'ko_KR',
    url: 'https://1-6math.vercel.app/',
    type: 'website',
    siteName: '1.6 수학전문학원',
  },
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className={inter.className}>
        <div className="flex flex-col items-center relative">
          <JsonLd />
          {children}
        </div>
      </body>
    </html>
  );
}
