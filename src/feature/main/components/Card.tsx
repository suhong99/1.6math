'use client';
import React, { ReactNode } from 'react';

type CardLink = {
  link: string;
  children: ReactNode;
};

function CardLinkWrapper({ link, children }: CardLink) {
  return (
    <a
      href={link}
      className="rounded-lg border h-full px-5 py-4 transition-color border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30 w-full max-w-96"
      target="_blank"
      rel="noopener noreferrer"
    >
      {children}
    </a>
  );
}

type CardClip = {
  text: string;
  children: ReactNode;
};

function CardClipWrapper({ text, children }: CardClip) {
  const copylink = () => {
    navigator.clipboard.writeText(text);
    alert(text + '복사되었습니다');
  };
  return (
    <button
      onClick={copylink}
      className="flex flex-col items-start lg:text-left group rounded-lg border h-full px-5 py-4 transition-color border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30 w-full max-w-96"
    >
      {children}
    </button>
  );
}

function CardTitle({ title }: { title: string }) {
  return (
    <div className="mb-3 text-2xl font-semibold w-full">
      {title}
      <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
        -&gt;
      </span>
    </div>
  );
}

function CardDescription({
  text,
  size = 'sm',
}: {
  text: string;
  size?: 'xs' | 'sm' | 'lg';
}) {
  const sizeVariants = {
    xs: 'text-xs opacity-50',
    sm: 'text-sm opacity-50',
    lg: 'text-lg opacity-85',
  };

  return <p className={`w-full m-0 ${sizeVariants[size]}`}>{text}</p>;
}
export { CardClipWrapper, CardLinkWrapper, CardTitle, CardDescription };
