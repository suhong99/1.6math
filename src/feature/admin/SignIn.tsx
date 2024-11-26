import { signIn } from '@/auth';
import Image from 'next/image';
import React from 'react';

const SignIn = () => {
  return (
    <form
      action={async () => {
        'use server';

        await signIn('google', { redirectTo: '/feedback' });
      }}
    >
      <button type="submit">
        <Image src="/google_signin.png" alt="Login" width={160} height={50} />
      </button>
    </form>
  );
};

export default SignIn;
