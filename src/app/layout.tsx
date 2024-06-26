import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: '1.6 수학과학전문학원',
  description:
    '울산 남구 옥동 1.6 수학과학학원입니다. \n 네이버 지도 이용시에는 일점육수학과학전문학원으로 검색 부탁드립니다.',
  openGraph: {
    title: '1.6 수학과학전문학원',
    description:
      '울산 남구 옥동 1.6수학과학전문학원(일점육수학과학전문학원)입니다.',
    images:
      'https://github.com/suhong99/1.6math/assets/120103909/205269b2-3969-4afd-8477-686a46aa76c8',
    locale: 'ko_KR',
    url: 'https://1-6math.vercel.app/',
    type: 'website',
    siteName: '1.6 수학과학전문학원',
  },
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
