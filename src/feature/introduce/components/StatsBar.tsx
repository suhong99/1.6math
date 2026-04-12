const stats = [
  { value: '20년+', label: '울산 옥동 역사' },
  { value: '수학·과학', label: '전문 학원' },
  { value: '전 학년', label: '중·고등 커버' },
  { value: '주말 테스트', label: '체계적 복습 시스템' },
];

export default function StatsBar() {
  return (
    <section className="bg-slate-900 py-12 px-6">
      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-0 lg:divide-x lg:divide-slate-700">
          {stats.map(({ value, label }) => (
            <div
              key={label}
              className="flex flex-col items-center text-center lg:px-8 py-2"
            >
              <span className="text-3xl lg:text-4xl font-black text-amber-400 mb-1 leading-none">
                {value}
              </span>
              <span className="text-slate-400 text-sm lg:text-base">
                {label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
