import React from 'react';
import Link from 'next/link';
import NavLinks from './NavLinks';
import MobileSidebar from './MobileSidebar';
import { PHONE_DATA } from '../const';

export default function Header() {
  return (
    <header className="w-full sticky top-0 z-[800] bg-white/90 backdrop-blur-md border-b border-slate-200/80 shadow-sm">
      <div className="max-w-6xl mx-auto px-5 lg:px-10 h-16 flex items-center justify-between">
        {/* 로고 */}
        <Link href="/" className="flex items-center gap-2 flex-shrink-0">
          <span className="text-2xl font-black text-slate-900 leading-none">
            <span className="text-amber-500">1.6</span>
          </span>
          <span className="hidden min-[320px]:block text-sm font-semibold text-slate-700 leading-tight">
            수학과학
            <br />
            전문학원
          </span>
        </Link>

        {/* 데스크탑 네비게이션 */}
        <div className="hidden lg:block">
          <NavLinks />
        </div>

        {/* 상담 번호 + 모바일 메뉴 */}
        <div className="flex items-center gap-3">
          <a
            href={`tel:${PHONE_DATA[0].number}`}
            className="hidden sm:flex items-center gap-1.5 bg-amber-500 hover:bg-amber-400 text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
              />
            </svg>
            {PHONE_DATA[0].number}
          </a>
          <MobileSidebar />
        </div>
      </div>
    </header>
  );
}
