import React, { ReactNode } from 'react';

type CardWrapperProps = {
  link?: string;
  children: ReactNode;
};

function CardWrapper({ link, children }: CardWrapperProps) {
  if (link) {
    return (
      <a
        href={link}
        className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30 "
        target="_blank"
        rel="noopener noreferrer"
      >
        {children}
      </a>
    );
  }
  return (
    <div
      className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
      role="button"
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
  return (
    <p
      className={`m-0 max-w-[30ch] text-${size} opacity-${
        size === 'lg' ? 85 : 50
      }`}
    >
      {text}
    </p>
  );
}
export { CardWrapper, CardTitle, CardDescription };
