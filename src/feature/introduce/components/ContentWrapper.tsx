import React from 'react';

interface Props {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  id?: string;
  dark?: boolean;
}

const ContentWrapper: React.FC<Props> = ({
  title,
  subtitle,
  children,
  id,
  dark = false,
}) => {
  return (
    <section
      id={id}
      className={`w-full py-16 lg:py-24 ${dark ? 'bg-slate-900' : 'bg-white'}`}
    >
      <div className="max-w-5xl mx-auto px-6 lg:px-10">
        {/* 섹션 헤더 */}
        <div className="mb-10 lg:mb-14">
          <div className="flex items-center gap-3 mb-3">
            <span className="w-8 h-0.5 bg-amber-500" aria-hidden="true" />
            <span
              className={`text-sm font-semibold tracking-widest uppercase ${dark ? 'text-amber-400' : 'text-amber-600'}`}
            >
              {title}
            </span>
          </div>
          {subtitle && (
            <h2
              className={`text-3xl lg:text-4xl font-black leading-tight ${dark ? 'text-white' : 'text-slate-900'}`}
            >
              {subtitle}
            </h2>
          )}
        </div>
        {children}
      </div>
    </section>
  );
};

export default ContentWrapper;
