import CardList from '@/feature/contact/components/CardList';
import Address from '@/feature/contact/components/Address';
import ContentWrapper from '@/feature/introduce/components/ContentWrapper';

export default function Contact() {
  return (
    <main className="flex flex-col">
      <ContentWrapper title="오시는 길" subtitle="학원 위치 & 약도">
        <Address />
      </ContentWrapper>

      <ContentWrapper title="연락처" subtitle="상담 & 문의" dark>
        <CardList />
      </ContentWrapper>
    </main>
  );
}
