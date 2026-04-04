import { CardDescription } from './Card';
import KakaoMap from './KakaoMap';

export default function Address() {
  return (
    <>
      <div className="flex items-center flex-col gap-3 font-bold lg:gap-4 text-2xl lg:text-4xl">
        학원 약도
        <div className="w-[290px] md:w-[700px] lg:w-[900px]">
          <KakaoMap />
        </div>
        <div className="text-center">
          <a
            href="https://map.kakao.com/link/search/울산 남구 문수로335번길 6"
            target="_blank"
            rel="noopener noreferrer"
          >
            <CardDescription text="클릭 시 카카오지도로 이동" size="xs" />
          </a>
          <address className="m-0 text-xs sm:text-sm sm:opacity-50 transition-all">
            울산 남구 문수로335번길 6 길상 빌딩 5층
          </address>
        </div>
      </div>
    </>
  );
}
