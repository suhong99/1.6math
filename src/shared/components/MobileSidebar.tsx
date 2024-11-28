'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { NAVIGATION_LIST } from '../const';

const MobileSidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const toggleSidebar = () => {
    setIsOpen((prev) => !prev);
  };

  const closeSidebar = () => {
    setIsOpen(false);
  };

  return (
    <>
      <button
        className="lg:hidden flex flex-col items-center text-xl font-bold"
        onClick={toggleSidebar}
        aria-label="Toggle Menu"
      >
        <span className="text-2xl">☰</span> {/* 아이콘 크기를 크게 */}
        <span className="text-xs">메뉴</span> {/* 텍스트 크기를 작게 */}
      </button>
      {isOpen && (
        <>
          {/* 오버레이 */}
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-[999]"
            onClick={closeSidebar}
          ></div>

          {/* 사이드바 */}
          <div className="fixed top-0 left-0 w-3/4 max-w-64 h-full bg-white shadow-lg z-[1000] flex flex-col justify-between">
            {/* 네비게이션 버튼들 */}
            <div className="flex flex-col items-start gap-4 p-6 w-ful">
              {NAVIGATION_LIST.map((nav) => {
                const isActive = pathname === nav.url;

                return (
                  <Link
                    key={nav.label}
                    href={nav.url}
                    className="no-underline w-full block"
                  >
                    <div
                      className={`w-full text-left text-base font-semibold p-3 rounded-md transition-all duration-200 ${
                        isActive
                          ? 'bg-blue-400 text-white'
                          : 'text-gray-700 hover:bg-gray-100 hover:text-blue-500'
                      }`}
                    >
                      {nav.label}
                    </div>
                  </Link>
                );
              })}
            </div>

            {/* 하단 여백 */}
            <div className="p-6 text-gray-500 text-sm">© 1.6 수학 전문학원</div>
          </div>
        </>
      )}
    </>
  );
};

export default MobileSidebar;
