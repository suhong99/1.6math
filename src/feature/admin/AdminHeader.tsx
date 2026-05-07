import React from 'react';
import Link from 'next/link';
import SignOut from './SignOut';
import SignIn from './SignIn';
import { auth } from '@/auth';

export default async function AdminHeader() {
  const session = await auth();
  return (
    <header className="w-full sticky top-0 bg-white z-[800] border-b border-gray-300">
      <div className="flex p-2.5 px-6 lg:px-10 lg:gap-8 items-center justify-between">
        <h1 className="font-extrabold text-xl lg:text-3xl">
          1.6 수학과학전문학원
        </h1>
        <div className="min-h-[50px] flex justify-center items-center">
          {!session?.user ? <SignIn /> : <SignOut />}
        </div>
      </div>
      {session?.user && (
        <nav className="flex gap-4 px-6 lg:px-10 pb-2">
          <Link
            href="/feedback"
            className="text-sm text-gray-600 hover:text-gray-900 font-medium"
          >
            건의 관리
          </Link>
          <Link
            href="/admin/classes"
            className="text-sm text-gray-600 hover:text-gray-900 font-medium"
          >
            시간표 관리
          </Link>
        </nav>
      )}
    </header>
  );
}
