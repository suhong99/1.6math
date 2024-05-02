import Image from 'next/image';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between lg:p-24">
      <div className="w-full max-w-5xl items-center justify-between font- lg:flex">
        <h1 className="static top-0 left-0 flex  w-full items-end justify-center bg-gradient-to-t  lg:static lg:size-auto lg:bg-none font-extrabold text-3xl m-4">
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

      <div className="mb-16 grid text-center lg:text-left lg:w-full lg:mb-0  lg:max-w-5xl md:grid-cols-2 lg:grid-cols-4  m-3">
        <a
          href="https://map.naver.com/p/entry/place/1426094200?c=15.00,0,0,0,dh"
          className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30 "
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2 className="mb-3 text-2xl font-semibold">
            오시는 길
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
          </h2>
          <address className="m-0 max-w-[30ch] text-sm opacity-50">
            울산 남구 문수로335번길 6 <br /> 길상 빌딩 5층
          </address>

          <p className="m-0 max-w-[30ch] text-xs opacity-50">
            클릭 시 네이버지도로 이동
          </p>
        </a>
        <div
          className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
          role="button"
          rel="noopener noreferrer"
        >
          <h2 className="mb-3 text-2xl font-semibold">
            연락처
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
          </h2>
          <p className="m-0 max-w-[30ch] text-lg opacity-85">052-261-5515</p>
        </div>

        <div
          className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
          role="button"
          rel="noopener noreferrer"
        >
          <h2 className="mb-3 text-2xl font-semibold">
            수학 원장
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
          </h2>
          <p className="m-0 max-w-[30ch] text-lg opacity-85">010-4554-1172</p>
          <p className="m-0 max-w-[30ch] text-xs opacity-50">김진천 원장 </p>
        </div>
        <div
          className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
          role="button"
          rel="noopener noreferrer"
        >
          <h2 className="mb-3 text-2xl font-semibold">
            과학 원장
            <span className="inline-block transiion-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
          </h2>
          <p className="m-0 max-w-[30ch] text-lg opacity-85">010-4554-1172</p>
          <p className="m-0 max-w-[30ch] text-xs opacity-50">신규하 원장 </p>
        </div>
      </div>
    </main>
  );
}
