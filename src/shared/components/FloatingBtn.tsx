'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { PHONE_DATA, NAVER_MAP_URL } from '../const';

const PhoneIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
  </svg>
);

const MapPinIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
);

const ChatIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
      d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
  </svg>
);

const PlusIcon = () => (
  <svg className="w-6 h-6 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
  </svg>
);

const CloseIcon = () => (
  <svg className="w-6 h-6 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
  </svg>
);

export default function FloatingBtn() {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const firstActionRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (open) {
      const timer = setTimeout(() => firstActionRef.current?.focus(), 180);
      return () => clearTimeout(timer);
    }
  }, [open]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && open) setOpen(false);
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [open]);

  const actions = [
    {
      icon: <PhoneIcon />,
      label: '상담 번호',
      onClick: () => {
        navigator.clipboard.writeText(PHONE_DATA[0].number);
        alert(`${PHONE_DATA[0].number}가 클립보드에 복사되었습니다`);
        setOpen(false);
      },
    },
    {
      icon: <MapPinIcon />,
      label: '길 찾기',
      onClick: () => {
        window.open(NAVER_MAP_URL, '_blank', 'noopener,noreferrer');
        setOpen(false);
      },
    },
    {
      icon: <ChatIcon />,
      label: '익명 건의함',
      onClick: () => {
        router.push('/suggest');
        setOpen(false);
      },
    },
  ];

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      {/* 액션 버튼들 */}
      <div className="flex flex-col items-end gap-2">
        {actions.map((action, index) => (
          <div
            key={action.label}
            className={`flex items-center gap-2 transition-all duration-300 ${
              open
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-4 pointer-events-none'
            }`}
            style={{ transitionDelay: open ? `${index * 60}ms` : '0ms' }}
          >
            {/* 라벨 */}
            <span className="bg-slate-900 text-white text-xs font-medium px-3 py-1.5 rounded-lg shadow-md whitespace-nowrap border border-slate-700">
              {action.label}
            </span>
            {/* 아이콘 버튼 */}
            <button
              ref={index === 0 ? firstActionRef : undefined}
              onClick={action.onClick}
              tabIndex={open ? 0 : -1}
              className="w-11 h-11 rounded-full bg-slate-800 border border-slate-700 text-amber-400 shadow-lg hover:bg-slate-700 hover:border-amber-500/50 transition-colors flex items-center justify-center"
              aria-label={action.label}
            >
              {action.icon}
            </button>
          </div>
        ))}
      </div>

      {/* 메인 FAB */}
      <button
        onClick={() => setOpen((prev) => !prev)}
        aria-label={open ? '메뉴 닫기' : '빠른 메뉴 열기'}
        aria-expanded={open}
        className={`w-14 h-14 rounded-full shadow-xl flex items-center justify-center transition-colors duration-200 ${
          open
            ? 'bg-slate-800 border border-slate-600 text-white'
            : 'bg-amber-500 hover:bg-amber-400 text-slate-900'
        }`}
      >
        {open ? <CloseIcon /> : <PlusIcon />}
      </button>

      {/* 배경 오버레이 (클릭으로 닫기) */}
      {open && (
        <div
          className="fixed inset-0 -z-10"
          onClick={() => setOpen(false)}
          aria-hidden="true"
        />
      )}
    </div>
  );
}
