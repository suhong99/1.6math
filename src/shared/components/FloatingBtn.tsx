'use client';

import Image from 'next/image';
import React, { ReactNode } from 'react';
import { PHONE_DATA } from '../const';

const FloatingBtn = () => {
  const copyConsultNum = () => {
    navigator.clipboard.writeText(PHONE_DATA[0].number);
    alert(`${PHONE_DATA[0].number}가 클립보드에 복사되었습니다`);
  };

  const openMap = () => {
    window.open(
      'https://map.naver.com/p/entry/place/1426094200?c=15.00,0,0,0,dh',
      '_blank',
      'noopener,noreferrer'
    );
  };
  return (
    <section className="fixed bottom-5 right-5 z-50 md:bottom-[6%] md:right-[9%] space-y-2 md:space-y-4">
      <ButtonWrapper func={copyConsultNum}>
        <Image
          src="/consulting.svg"
          alt="상담 아이콘"
          width={40}
          height={40}
          className="cursor-pointer md:w-[70px] md:h-[70px]"
        />
        <p className="text-center text-xs md:text-sm">상담 번호</p>
      </ButtonWrapper>
      <ButtonWrapper func={openMap}>
        <Image
          src="/marker.svg"
          alt="길찾기"
          width={40}
          height={40}
          className="cursor-pointer md:w-[70px] md:h-[70px]"
        />
        <p className="text-center text-xs md:text-sm">길 찾기</p>
      </ButtonWrapper>
    </section>
  );
};

export default FloatingBtn;

interface ButtonWrapperProps {
  func: () => void;
  children: ReactNode;
}

const ButtonWrapper: React.FC<ButtonWrapperProps> = ({ func, children }) => {
  return (
    <button
      onClick={func}
      className="flex flex-col items-center justify-center w-[80px] h-[80px] md:w-[110px] md:h-[110px] rounded-full bg-white shadow-lg"
    >
      {children}
    </button>
  );
};
