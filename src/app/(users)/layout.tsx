import FloatingBtn from '@/shared/components/FloatingBtn';
import Header from '@/shared/components/Header';

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <FloatingBtn />
      <Header />

      {children}
    </>
  );
}
