import ContentWrapper from '@/feature/introduce/components/ContentWrapper';
import Introduce from '@/feature/introduce/components/Introduce';
import Number from '@/feature/introduce/components/Number';
import System from '@/feature/introduce/components/System';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between lg:p-24 lg:pt-16">
      <Number />
      <ContentWrapper title="학원 소개">
        <Introduce />
      </ContentWrapper>
      <ContentWrapper title="학원 시스템">
        <System />
      </ContentWrapper>
    </main>
  );
}
