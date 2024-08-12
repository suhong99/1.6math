import Image from 'next/image';
import CardList from '@/feature/contact/components/CardList';

export default function Contact() {
  return (
    <main className="flex min-h-screen flex-col items-center lg:p-14">
      <div className="relative flex place-items-center before:absolute before:h-[300px] before:w-full before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-full after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700 before:dark:opacity-10 after:dark:from-sky-900 after:dark:via-[#0141ff] after:dark:opacity-40 sm:before:w-[480px] sm:after:w-[240px] before:lg:h-[360px] m-10">
        <div className="flex items-center flex-col gap-3 font-bold lg:gap-4 text-2xl lg:text-4xl">
          학원 약도
          <Image
            className="relative w-auto h-auto rounded-xl"
            src="/address.png"
            alt="학원 주소"
            width={800}
            height={500}
            priority
          />
        </div>
      </div>
      <CardList />
    </main>
  );
}
