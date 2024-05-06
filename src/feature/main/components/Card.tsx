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
      className="group rounded-lg border border-transparent px-5 py-4 h-full transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30 "
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
    <div
      onClick={copylink}
      role="button"
      className="cursor-default group rounded-lg border border-transparent h-full px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30 w-full"
    >
      {children}
    </div>
  );
}

function CardTitle({ title }: { title: string }) {
  return (
    <div className="mb-3 text-2xl font-semibold">
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
  if (size === 'xs') {
    console.log(`text-${size}`);
  }
  return (
    <p
      className={`w-full m-0 max-w-[30ch] ${'text-' + size} ${
        size === 'lg' ? 'opacity-' + 85 : 'opacity-' + 50
      }`}
    >
      {text}
    </p>
  );
}
export { CardClipWrapper, CardLinkWrapper, CardTitle, CardDescription };
