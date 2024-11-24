import AdminHeader from '@/feature/admin/AdminHeader';

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <AdminHeader />
      {children}
    </>
  );
}
