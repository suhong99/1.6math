import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: '1.6 수학과학전문학원',
  description:
    '울산 남구 옥동 1.6 수학과학전문학원입니다. 공식상호는 일점육수학과학전문학원이라 네이버지도에서는 해당 이름으로 검색해야 합니다.',
  openGraph: {
    title: '1.6 수학과학전문학원',
    description:
      '울산 남구 옥동 1.6수학과학전문학원(일점육수학과학전문학원)입니다.',
    images:
      'https://github-production-user-asset-6210df.s3.amazonaws.com/120103909/327368680-205269b2-3969-4afd-8477-686a46aa76c8.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAVCODYLSA53PQK4ZA%2F20240502%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20240502T145739Z&X-Amz-Expires=300&X-Amz-Signature=9de4bc069a9122bd80faddfaa09096dee5cb87498be5bdf6e4c48d337fbe4a00&X-Amz-SignedHeaders=host&actor_id=120103909&key_id=0&repo_id=794882524',
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
