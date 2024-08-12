import Image from 'next/image';

export default function Introduce() {
  return (
    <div className="flex flex-col lg:flex-row lg:space-x-12 gap-4">
      <div className="lg:flex-[3] lg:pr-8 flex items-center">
        <p className="text-xl leading-relaxed mb-6">
          1.6은 인간이 가장 편안함을 느끼는 황금비율로 알려져 있습니다. 이
          비율은 파르테논 신전, 신용카드, 피보나치 수열 등 다양한 분야에서
          발견됩니다. 이와 같이 학생들의 수험길에 편안함을 더하고자 학원명을
          &apos;1.6&apos;으로 정했습니다.
        </p>
      </div>
      <div className="lg:flex-[1] grid grid-cols-2 gap-4 lg:grid-cols-1 lg:gap-8">
        <div className="relative max-w-[400px] w-full mx-auto">
          <div className="relative pb-[62.5%]">
            <Image
              src="/parthenon.png"
              alt="파르테론"
              layout="fill"
              objectFit="cover"
            />
          </div>
        </div>
        <div className="relative max-w-[400px] w-full mx-auto">
          <div className="relative pb-[62.5%]">
            <Image
              src="/creditcard.png"
              alt="신용카드"
              layout="fill"
              objectFit="cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
