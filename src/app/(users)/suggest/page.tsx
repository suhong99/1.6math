import SuggestForm from '@/feature/suggest/component/SuggestForm';
import ContentWrapper from '@/feature/introduce/components/ContentWrapper';

export default function Suggest() {
  return (
    <main className="flex flex-col">
      <ContentWrapper
        title="익명 건의함"
        subtitle="소중한 의견을 남겨주세요"
      >
        <div className="max-w-2xl mx-auto w-full">
          <p className="text-slate-500 text-sm lg:text-base mb-8 leading-relaxed">
            학부모님과 학생의 소중한 목소리에 귀 기울이겠습니다.
            익명으로 자유롭게 의견을 남겨주세요.
          </p>
          <SuggestForm />
        </div>
      </ContentWrapper>
    </main>
  );
}
