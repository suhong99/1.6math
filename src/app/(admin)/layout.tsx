import { auth } from '@/auth';
import AdminHeader from '@/feature/admin/AdminHeader';
import { checkUser } from '@/firestore/helper/auth';

export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const data = await auth();
  const isAuthorized = await checkUser({ email: data?.user?.email });
  return (
    <>
      <AdminHeader />
      {isAuthorized ? (
        children
      ) : (
        <div className="flex min-h-screen flex-col items-center pt-10">
          <p className="text-center font-bold text-lg lg:text-3xl md:text-xl items-center lg:m-20">
            인가되지 않았거나 혹은 사용할 수 없는 계정입니다 <br /> 관리자의
            경우 로그인 해주세요.
          </p>
        </div>
      )}
    </>
  );
}
