import CardList from '@/feature/main/components/CardList';
import Image from 'next/image';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between lg:p-24">
      <div className="w-full max-w-5xl items-center justify-between font- lg:flex">
        <h1 className="static top-0 left-0 flex  w-full items-end justify-center bg-gradient-to-t lg:size-auto lg:bg-none font-extrabold text-3xl m-4">
          1.6 수학과학 전문학원
        </h1>
      </div>

      <div className="relative z-[-1] flex place-items-center before:absolute before:h-[300px] before:w-full before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-full after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700 before:dark:opacity-10 after:dark:from-sky-900 after:dark:via-[#0141ff] after:dark:opacity-40 sm:before:w-[480px] sm:after:w-[240px] before:lg:h-[360px]">
        <Image
          className="relative dark:drop-shadow-[0_0_0.3rem_#ffffff70] dark:invert"
          src="/address.png"
          alt="학원 주소"
          width={800}
          height={500}
          priority
        />
      </div>

      <CardList />
    </main>
  );
}
