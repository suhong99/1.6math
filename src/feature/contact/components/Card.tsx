'use client';
import React, { ReactNode } from 'react';

type CardClip = {
  text: string;
  title: string;
  children: ReactNode;
};

function CardClipWrapper({ text, title, children }: CardClip) {
  const copylink = () => {
    navigator.clipboard.writeText(text);
    alert(text + '가 클립보드에 복사되었습니다');
  };
  return (
    <button
      onClick={copylink}
      aria-label={`${title} ${text} 복사`}
      className="flex flex-col items-start text-left group rounded-2xl border h-full px-5 py-5 transition-colors border-slate-700 bg-slate-800 hover:border-amber-500/50 hover:bg-slate-800/80 w-full max-w-96"
    >
      {children}
    </button>
  );
}

function CardTitle({ title }: { title: string }) {
  return (
    <div className="mb-3 text-lg font-bold text-white w-full flex items-center justify-between">
      {title}
      <span
        className="text-amber-400 transition-transform group-hover:translate-x-1 motion-reduce:transform-none"
        aria-hidden="true"
      >
        →
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
    xs: 'text-xs text-slate-500',
    sm: 'text-sm text-slate-400',
    lg: 'text-lg text-amber-300 font-semibold',
  };

  return <p className={`w-full m-0 ${sizeVariants[size]}`}>{text}</p>;
}

export { CardClipWrapper, CardTitle, CardDescription };
