import Image from 'next/image';

export default function System() {
  return (
    <div className="flex flex-col lg:flex-row lg:space-x-12 gap-4">
      <div className="lg:flex-[3] lg:pr-8 flex items-center">
        <p className="text-xl leading-relaxed mb-6">
          수험생에게는 확실한 개념 이해와 꾸준한 복습이 중요합니다.
          1.6수학과학전문학원은 단순한 수업에 그치지 않고, 주말 테스트를 통해
          학습한 내용을 철저히 점검하며, 오답노트를 활용해 놓친 부분을 반복
          복습하도록 합니다. 이를 통해 개념을 확실히 다지고 꾸준한 성장을
          이끌어내어, 학생들의 실력 향상을 책임집니다.
        </p>
      </div>
      <div className="lg:flex-[1] grid grid-cols-2 gap-4 lg:grid-cols-1 lg:gap-8">
        <div className="relative max-w-[400px] w-full mx-auto">
          <div className="relative pb-[62.5%]">
            <Image
              src="/reviewnote.png"
              alt="오답노트"
              layout="fill"
              objectFit="cover"
            />
          </div>
        </div>
        <div className="relative max-w-[400px] w-full mx-auto">
          <div className="relative pb-[62.5%]">
            <Image
              src="/test.jpg"
              alt="주말시험"
              layout="fill"
              objectFit="cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
