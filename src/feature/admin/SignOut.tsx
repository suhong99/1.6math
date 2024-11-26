import { signOut } from '@/auth';
import React from 'react';

const SignOut = () => {
  return (
    <form
      action={async () => {
        'use server';

        await signOut({ redirectTo: '/admin' });
      }}
    >
      <button
        type="submit"
        className="px-5 py-2 text-lg text-gray-700 bg-white border-2 border-gray-300 rounded-lg hover:bg-gray-100"
      >
        로그아웃
      </button>
    </form>
  );
};

export default SignOut;
