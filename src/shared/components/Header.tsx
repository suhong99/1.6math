import React from 'react';
import NavLinks from './NavLinks';

export default function Header() {
  return (
    <header className="w-full  sticky top-0 flex  p-2.5 px-6 lg:px-10 bg-white z-[800] border-b border-gray-500 lg:gap-8 items-end justify-between lg:justify-normal">
      <h1 className="font-extrabold text-xl lg:text-3xl">
        1.6 수학과학 전문학원
      </h1>
      <NavLinks />
    </header>
  );
}
