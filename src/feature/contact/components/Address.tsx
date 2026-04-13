import KakaoMap from './KakaoMap';
import { NAVER_MAP_URL } from '@/shared/const';

export default function Address() {
  return (
    <div className="flex flex-col items-center gap-6">
      {/* 지도 */}
      <a
        href={NAVER_MAP_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="relative block w-full max-w-3xl group rounded-2xl overflow-hidden shadow-lg"
        aria-label="네이버 지도에서 학원 위치 보기"
      >
        <KakaoMap />
        <span className="absolute inset-0 flex items-end justify-center pb-4 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
          <span className="bg-slate-900/80 text-amber-300 text-sm px-4 py-1.5 rounded-full font-medium border border-amber-500/40">
            클릭 시 네이버지도로 이동
          </span>
        </span>
      </a>

      {/* 주소 정보 */}
      <div className="text-center space-y-1">
        <address className="not-italic text-slate-600 text-sm lg:text-base font-medium">
          울산 남구 문수로335번길 6 길상 빌딩 5층
        </address>
        <a
          href={NAVER_MAP_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-amber-600 hover:text-amber-500 text-sm font-medium transition-colors"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          네이버지도에서 보기
        </a>
      </div>
    </div>
  );
}
