import SuggestForm from '@/feature/suggest/component/SuggestForm';

export default function Suggest() {
  return (
    <main className="space-y-6 p-6 shadow-md rounded-lg mx-auto mt-4 lg:max-w-2xl w-full">
      <h1 className="text-2xl font-bold text-center text-gray-800">제보하기</h1>
      <SuggestForm />
      <p className="text-gray-600 text-center text-sm">
        학부모님의 소중한 목소리에 귀 기울이겠습니다.
      </p>
    </main>
  );
}
