import CardList from '@/feature/contact/components/CardList';
import Address from '@/feature/contact/components/Address';

export default function Contact() {
  return (
    <main className="flex min-h-screen flex-col items-center lg:p-14">
      <section className="m-10" aria-label="학원 위치">
        <Address />
      </section>
      <section aria-label="연락처 정보">
        <CardList />
      </section>
    </main>
  );
}
