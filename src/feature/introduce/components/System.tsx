import Image from 'next/image';

const features = [
  {
    icon: '📚',
    title: '개념 완성',
    description:
      '단순 암기가 아닌 원리 중심의 수업으로 탄탄한 개념 이해를 이끌어냅니다.',
  },
  {
    icon: '📝',
    title: '주말 테스트',
    description:
      '매주 진행되는 주말 테스트로 학습 내용을 철저히 점검하고 실력을 확인합니다.',
  },
  {
    icon: '🔄',
    title: '오답노트 복습',
    description:
      '오답노트를 통해 놓친 부분을 반복 학습하고 실수를 완전히 없앱니다.',
  },
];

export default function System() {
  return (
    <div className="flex flex-col lg:flex-row gap-10 lg:gap-16 items-start">
      {/* 특징 카드 그리드 */}
      <div className="flex-1 min-w-0 grid gap-4">
        {features.map(({ icon, title, description }) => (
          <div
            key={title}
            className="flex gap-4 bg-slate-800 rounded-2xl p-5 border border-slate-700 hover:border-amber-500/50 transition-colors"
          >
            <div className="w-12 h-12 rounded-xl bg-amber-500/20 flex items-center justify-center flex-shrink-0 text-2xl">
              {icon}
            </div>
            <div>
              <h3 className="text-white font-bold text-lg mb-1">{title}</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                {description}
              </p>
            </div>
          </div>
        ))}

        {/* 강조 문구 */}
        <div className="bg-amber-500/10 border border-amber-500/30 rounded-2xl p-5">
          <p className="text-amber-300 text-sm leading-relaxed font-medium">
            &ldquo;개념 이해 → 주말 점검 → 오답 복습&rdquo; 3단계 사이클로
            학생들의 꾸준한 실력 향상을 책임집니다.
          </p>
        </div>
      </div>

      {/* 이미지 영역 */}
      <div className="w-full lg:w-80 flex-shrink-0 grid grid-cols-2 lg:grid-cols-1 gap-3 lg:gap-4">
        <div className="relative rounded-2xl overflow-hidden aspect-video lg:aspect-[4/3] shadow-lg">
          <Image
            src="/reviewnote.png"
            alt="오답노트"
            fill
            className="object-cover"
            sizes="(max-width: 768px) 50vw, 320px"
          />
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent px-3 py-2">
            <span className="text-white text-xs font-medium">오답노트</span>
          </div>
        </div>
        <div className="relative rounded-2xl overflow-hidden aspect-video lg:aspect-[4/3] shadow-lg">
          <Image
            src="/test.jpg"
            alt="주말 테스트"
            fill
            className="object-cover"
            sizes="(max-width: 768px) 50vw, 320px"
          />
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent px-3 py-2">
            <span className="text-white text-xs font-medium">주말 테스트</span>
          </div>
        </div>
      </div>
    </div>
  );
}
