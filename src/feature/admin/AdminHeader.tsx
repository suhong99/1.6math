import React from 'react';
import SignOut from './SignOut';
import SignIn from './SignIn';
import { auth } from '@/auth';

export default async function AdminHeader() {
  const session = await auth();
  return (
    <header className="w-full  sticky top-0 flex  p-2.5 px-6 lg:px-10 bg-white z-[800] border-b border-gray-500 lg:gap-8 items-end justify-between">
      <h1 className="font-extrabold text-xl lg:text-3xl">1.6 수학 전문학원</h1>
      <div className="min-h-[50px] flex justify-center items-center">
        {!session?.user ? <SignIn /> : <SignOut />}
      </div>{' '}
    </header>
  );
}
