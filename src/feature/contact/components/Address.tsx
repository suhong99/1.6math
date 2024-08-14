import Image from 'next/image';
import { CardDescription } from './Card';

export default function Address() {
  return (
    <>
      <div className="flex items-center flex-col gap-3 font-bold lg:gap-4 text-2xl lg:text-4xl">
        학원 약도
        <a
          href="https://map.naver.com/p/entry/place/1426094200?c=15.00,0,0,0,dh}"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            className="relative w-auto h-auto rounded-xl"
            src="/address.png"
            alt="학원 주소"
            width={800}
            height={500}
            priority
          />
        </a>
        <div className="text-center">
          <CardDescription text="클릭 시 네이버지도로 이동" size="xs" />
          <address className="m-0 text-xs  sm:text-sm sm:opacity-50 transition-all">
            울산 남구 문수로335번길 6 길상 빌딩 5층
          </address>
        </div>
      </div>
    </>
  );
}
