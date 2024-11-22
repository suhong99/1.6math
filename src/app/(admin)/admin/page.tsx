import { signIn } from '@/auth';
import Image from 'next/image';

export default function AdminLoginPage() {
  return (
    <main className="flex min-h-screen flex-col items-center pt-10">
      <p className="text-center font-bold text-lg lg:text-3xl md:text-xl">
        인가된 관리자만 접속할 수 있습니다.
      </p>
      <form
        action={async () => {
          'use server';

          await signIn('google');
        }}
      >
        <button type="submit">
          <Image
            src="/google_signin.png"
            alt="Login"
            width={500}
            height={300}
          />
        </button>
      </form>
    </main>
  );
}
