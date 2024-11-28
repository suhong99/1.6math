'use client';

import Image from 'next/image';
import React from 'react';
import { useRouter } from 'next/navigation'; // useRouter import
import { PHONE_DATA } from '../const';

const FloatingBtn = () => {
  const router = useRouter(); // useRouter 호출

  // 이동 함수는 컴포넌트 내부에서 선언
  const icons = [
    {
      src: '/consulting.svg',
      alt: '상담 아이콘',
      text: '상담 번호',
      func: () => {
        navigator.clipboard.writeText(PHONE_DATA[0].number);
        alert(`${PHONE_DATA[0].number}가 클립보드에 복사되었습니다`);
      },
    },
    {
      src: '/marker.svg',
      alt: '길찾기',
      text: '길 찾기',
      func: () => {
        window.open(
          'https://map.naver.com/p/entry/place/1426094200?c=15.00,0,0,0,dh',
          '_blank',
          'noopener,noreferrer'
        );
      },
    },
    {
      src: '/suggest.svg',
      alt: '건의함 아이콘',
      text: '익명 건의함',
      func: () => router.push('/suggest'), // 페이지 이동 함수
    },
  ];

  return (
    <section className="fixed bottom-5 right-5 z-50 md:bottom-[6%] md:right-[9%] space-y-2 md:space-y-4">
      {icons.map((icon, index) => (
        <FloatingIcon
          key={index}
          src={icon.src}
          alt={icon.alt}
          text={icon.text}
          func={icon.func}
        />
      ))}
    </section>
  );
};

export default FloatingBtn;

interface FloatingIconProps {
  src: string;
  alt: string;
  text: string;
  func: () => void;
}

const FloatingIcon: React.FC<FloatingIconProps> = ({
  src,
  alt,
  text,
  func,
}) => {
  return (
    <button
      onClick={func}
      className="flex flex-col items-center justify-center w-[80px] h-[80px] md:w-[110px] md:h-[110px] rounded-full bg-white shadow-lg"
    >
      <Image
        src={src}
        alt={alt}
        width={40}
        height={40}
        className="cursor-pointer md:w-[70px] md:h-[70px]"
      />
      <p className="text-center text-xs md:text-sm">{text}</p>
    </button>
  );
};
