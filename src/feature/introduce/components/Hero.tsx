import Link from "next/link";
import Image from "next/image";

export default function Hero() {
  return (
    <section className="relative w-full min-h-screen flex items-center justify-center overflow-hidden">
      {/* 배경 이미지 */}
      <div className="absolute inset-0">
        <Image
          src="/1.6정문.jpg"
          alt="1.6수학과학전문학원 정문"
          fill
          className="object-cover"
          priority
        />
        {/* navy 오버레이 */}
        <div className="absolute inset-0 bg-slate-900/95" />
        {/* 하단 그라디언트 페이드 */}
        <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-slate-900 to-transparent" />
      </div>

      {/* 배경 황금 "1.6" 워터마크 */}
      <span
        className="absolute right-[-2rem] top-1/2 -translate-y-1/2 text-[20rem] font-black text-amber-500/10 select-none leading-none pointer-events-none hidden lg:block"
        aria-hidden="true"
      >
        1.6
      </span>

      {/* 콘텐츠 */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 lg:px-10 py-32 text-center lg:text-left">
        {/* 뱃지 */}
        <div className="inline-flex items-center gap-2 bg-amber-500/20 border border-amber-500/40 rounded-full px-4 py-1.5 mb-8">
          <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
          <span className="text-amber-300 text-sm font-medium tracking-wide">
            울산 남구 옥동 · 수학과학전문학원
          </span>
        </div>

        {/* 메인 타이틀 */}
        <h1 className="text-white font-black leading-tight mb-6">
          <span className="block text-3xl min-[380px]:text-5xl lg:text-7xl">황금비율의 교육,</span>
          <span className="block text-3xl min-[380px]:text-5xl lg:text-7xl">
            <span className="text-amber-400">20년</span>의 노하우
          </span>
        </h1>

        {/* 서브타이틀 */}
        <p className="text-slate-300 text-lg lg:text-xl leading-relaxed max-w-2xl mb-4">
          1.6은 인간이 가장 편안함을 느끼는{" "}
          <strong className="text-amber-300 font-semibold">황금비율</strong>
          입니다.
          <br className="hidden lg:block" />그 균형처럼 학생 한 명 한 명에게
          최적화된 교육을 20년간 이어오고 있습니다.
        </p>
        <p className="text-slate-400 text-base mb-10">
          수학 · 과학 전 학년 / 개념 완성 · 주말 테스트 · 오답노트 시스템
        </p>

        {/* CTA 버튼 */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
          <Link
            href="/contact"
            className="inline-flex items-center justify-center gap-2 bg-amber-500 hover:bg-amber-400 text-slate-900 font-bold px-8 py-4 rounded-xl transition-colors text-lg shadow-lg shadow-amber-500/30"
          >
            오시는 길 &amp; 상담
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </Link>
          <a
            href="#intro"
            className="inline-flex items-center justify-center gap-2 border border-white/30 hover:border-white/60 text-white font-semibold px-8 py-4 rounded-xl transition-colors text-lg backdrop-blur-sm"
          >
            학원 소개 보기
          </a>
        </div>
      </div>

      {/* 스크롤 다운 힌트 */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/50 animate-bounce">
        <span className="text-xs tracking-widest uppercase">Scroll</span>
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </div>
    </section>
  );
}
