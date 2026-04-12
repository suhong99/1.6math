'use client';

import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { NAVIGATION_LIST, PHONE_DATA } from '../const';

const NAV_ICONS: Record<string, React.ReactNode> = {
  '학원 소개': (
    <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
    </svg>
  ),
  '오시는 길': (
    <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  ),
  '익명 건의함': (
    <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
    </svg>
  ),
};

function NavIcon({ label, isActive }: { label: string; isActive: boolean }) {
  return (
    <span className={isActive ? 'text-white' : 'text-slate-400'}>
      {NAV_ICONS[label]}
    </span>
  );
}

const MobileSidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.classList.add('overflow-hidden', 'select-none');
    } else {
      document.body.classList.remove('overflow-hidden', 'select-none');
    }
    return () => {
      document.body.classList.remove('overflow-hidden', 'select-none');
    };
  }, [isOpen]);

  const toggleSidebar = () => setIsOpen((prev) => !prev);
  const closeSidebar = () => setIsOpen(false);

  const portal = mounted
    ? createPortal(
        <>
          {/* 오버레이 */}
          {isOpen && (
            <div
              className="fixed inset-0 bg-black/85 z-[999] lg:hidden"
              onClick={closeSidebar}
              aria-hidden="true"
            />
          )}

          {/* 사이드바 드로어 */}
          <div
            className={`fixed top-0 right-0 h-full w-72 bg-white shadow-2xl z-[1000] flex flex-col transition-transform duration-300 ease-in-out lg:hidden ${
              isOpen ? 'translate-x-0' : 'translate-x-full'
            }`}
            aria-hidden={!isOpen}
          >
            {/* 사이드바 헤더 */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200">
              <div className="flex items-center gap-2">
                <span className="text-2xl font-black">
                  <span className="text-amber-500">1.6</span>
                </span>
                <span className="text-sm font-semibold text-slate-700">
                  수학과학전문학원
                </span>
              </div>
              <button
                onClick={closeSidebar}
                className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-slate-100 transition-colors text-slate-500"
                aria-label="메뉴 닫기"
              >
                ✕
              </button>
            </div>

            {/* 네비게이션 */}
            <nav className="flex-1 px-4 py-6 flex flex-col gap-2">
              {NAVIGATION_LIST.map((nav) => {
                const isActive = pathname === nav.url;
                return (
                  <Link
                    key={nav.label}
                    href={nav.url}
                    onClick={closeSidebar}
                    className={`flex items-center gap-3 px-4 py-3.5 rounded-xl text-base font-semibold transition-colors ${
                      isActive
                        ? 'bg-amber-500 text-white shadow-md shadow-amber-500/30'
                        : 'bg-slate-200 border border-slate-300 text-slate-700 hover:bg-slate-300 hover:border-slate-400 hover:text-slate-900'
                    }`}
                  >
                    <NavIcon label={nav.label} isActive={isActive} />
                    {nav.label}
                  </Link>
                );
              })}
            </nav>

            {/* 하단 CTA */}
            <div className="px-4 pb-6 flex flex-col gap-3">
              <a
                href={`tel:${PHONE_DATA[0].number}`}
                className="flex items-center justify-center gap-2 bg-amber-500 hover:bg-amber-400 text-white font-semibold py-3.5 rounded-xl transition-colors text-sm"
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
                {PHONE_DATA[0].number} 전화 상담
              </a>
              <p className="text-center text-slate-400 text-xs">
                © 1.6 수학과학전문학원
              </p>
            </div>
          </div>
        </>,
        document.body
      )
    : null;

  return (
    <>
      {/* 햄버거 버튼 */}
      <button
        className="lg:hidden flex flex-col justify-center items-center w-10 h-10 rounded-lg hover:bg-slate-100 transition-colors gap-1.5"
        onClick={toggleSidebar}
        aria-label="메뉴 열기"
        aria-expanded={isOpen}
      >
        <span
          className={`block w-5 h-0.5 bg-slate-700 rounded-full transition-all duration-300 ${isOpen ? 'rotate-45 translate-y-2' : ''}`}
        />
        <span
          className={`block w-5 h-0.5 bg-slate-700 rounded-full transition-all duration-300 ${isOpen ? 'opacity-0' : ''}`}
        />
        <span
          className={`block w-5 h-0.5 bg-slate-700 rounded-full transition-all duration-300 ${isOpen ? '-rotate-45 -translate-y-2' : ''}`}
        />
      </button>

      {portal}
    </>
  );
};

export default MobileSidebar;
