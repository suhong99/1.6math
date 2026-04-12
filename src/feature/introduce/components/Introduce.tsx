import Image from 'next/image';

export default function Introduce() {
  return (
    <div className="flex flex-col lg:flex-row gap-10 lg:gap-16 items-start">
      {/* 텍스트 영역 */}
      <div className="flex-1 min-w-0">
        <h3 className="text-2xl lg:text-3xl font-black text-slate-900 mb-4 leading-snug">
          황금비율처럼
          <br />
          <span className="text-amber-500">최적의 균형</span>을 추구합니다
        </h3>
        <p className="text-slate-600 text-base lg:text-lg leading-relaxed mb-6">
          1.6은 인간이 가장 편안함을 느끼는 황금비율입니다. 파르테논 신전,
          신용카드, 피보나치 수열 등 자연과 예술 곳곳에서 발견되는 이 비율처럼,
          학생들의 수험길에 편안함과 최적의 효율을 더하고자 학원명을
          &apos;1.6&apos;으로 정했습니다.
        </p>
        <p className="text-slate-600 text-base lg:text-lg leading-relaxed mb-8">
          울산 남구 옥동에서{' '}
          <strong className="text-slate-800 font-semibold">20년간</strong>{' '}
          수학·과학 전문 지도를 이어온 노하우로, 학생 개개인에게 맞는 최적의
          학습 경로를 찾아드립니다.
        </p>

        {/* 키워드 태그 */}
        <div className="flex flex-wrap gap-2">
          {[
            '황금비율 1.6',
            '20년 역사',
            '수학·과학 전문',
            '울산 남구 옥동',
            '맞춤 지도',
          ].map((tag) => (
            <span
              key={tag}
              className="bg-amber-50 text-amber-700 border border-amber-200 rounded-full px-3 py-1 text-sm font-medium"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* 이미지 영역 */}
      <div className="w-full lg:w-80 flex-shrink-0 grid grid-cols-2 lg:grid-cols-1 gap-3 lg:gap-4">
        {/* 교실 사진 */}
        <div className="relative rounded-2xl overflow-hidden aspect-video lg:aspect-[4/3] shadow-lg">
          <Image
            src="/1.6교실.jpg"
            alt="1.6수학과학전문학원 교실"
            fill
            className="object-cover"
            sizes="(max-width: 768px) 50vw, 320px"
          />
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent px-3 py-2">
            <span className="text-white text-xs font-medium">교실</span>
          </div>
        </div>
        {/* 황금비율 이미지 */}
        <div className="relative rounded-2xl overflow-hidden aspect-video lg:aspect-[4/3] shadow-lg">
          <Image
            src="/parthenon.png"
            alt="황금비율 파르테논 신전"
            fill
            className="object-cover"
            sizes="(max-width: 768px) 50vw, 320px"
          />
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent px-3 py-2">
            <span className="text-white text-xs font-medium">황금비율</span>
          </div>
        </div>
      </div>
    </div>
  );
}
