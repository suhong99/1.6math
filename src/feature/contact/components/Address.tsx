import { CardDescription } from './Card';
import KakaoMap from './KakaoMap';
import { NAVER_MAP_URL } from '@/shared/const';

export default function Address() {
  return (
    <>
      <div className="flex items-center flex-col gap-3 font-bold lg:gap-4 text-2xl lg:text-4xl">
        <h2 className="text-2xl lg:text-4xl font-bold">학원 약도</h2>
        <a
          href={NAVER_MAP_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="relative block w-[290px] md:w-[700px] lg:w-[900px] group"
          aria-label="네이버 지도에서 학원 위치 보기"
        >
          <KakaoMap />
          <span className="absolute inset-0 flex items-end justify-center pb-3 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
            <span className="bg-black/60 text-white text-sm px-3 py-1 rounded-full">
              클릭 시 네이버지도로 이동
            </span>
          </span>
        </a>
        <div className="text-center">
          <a
            href={NAVER_MAP_URL}
            target="_blank"
            rel="noopener noreferrer"
          >
            <CardDescription text="클릭 시 네이버지도로 이동" size="xs" />
          </a>
          <address className="m-0 text-xs sm:text-sm sm:opacity-50 transition-all">
            울산 남구 문수로335번길 6 길상 빌딩 5층
          </address>
        </div>
      </div>
    </>
  );
}
