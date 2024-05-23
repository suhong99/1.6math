import React from 'react';
import JsonLd from './JsonLd';

export default function Header() {
  return (
    <header className="w-full max-w-5xl items-center justify-between font- lg:flex">
      <JsonLd />

      <h1 className="static top-0 left-0 flex  w-full items-end justify-center bg-gradient-to-t lg:size-auto lg:bg-none font-extrabold text-3xl m-4">
        1.6 수학과학 전문학원
      </h1>
    </header>
  );
}
