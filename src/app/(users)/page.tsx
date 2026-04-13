import Hero from '@/feature/introduce/components/Hero';
import StatsBar from '@/feature/introduce/components/StatsBar';
import ContentWrapper from '@/feature/introduce/components/ContentWrapper';
import Introduce from '@/feature/introduce/components/Introduce';
import System from '@/feature/introduce/components/System';

export default function Home() {
  return (
    <main className="flex flex-col">
      {/* 풀스크린 히어로 */}
      <Hero />

      {/* 신뢰 통계 바 */}
      <StatsBar />

      {/* 학원 소개 */}
      <ContentWrapper
        id="intro"
        title="학원 소개"
        subtitle="왜 1.6인가요?"
      >
        <Introduce />
      </ContentWrapper>

      {/* 학원 시스템 */}
      <ContentWrapper
        title="학원 시스템"
        subtitle="3단계 학습 사이클"
        dark
      >
        <System />
      </ContentWrapper>
    </main>
  );
}
