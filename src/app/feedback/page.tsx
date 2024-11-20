import Feedback from '@/feature/feedback/components/Feedback';

export default function FeeadBackPage() {
  return (
    <main className="flex min-h-screen flex-col items-center pt-10">
      <h1 className="text-2xl font-bold mb-4 text-center">학부모 건의 내역</h1>
      <Feedback />
    </main>
  );
}
