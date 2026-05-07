import Link from 'next/link';
import { getClass } from '@/firestore/helper/schedule';
import StudentScheduleView from '@/feature/schedule/admin/StudentScheduleView';

interface Props {
  params: { classId: string };
}

export default async function ClassDetailPage({ params }: Props) {
  const classRoom = await getClass(params.classId);

  if (!classRoom) {
    return (
      <main className="flex min-h-screen flex-col items-center pt-10 px-4">
        <p className="text-gray-500">존재하지 않는 반입니다.</p>
        <Link
          href="/admin/classes"
          className="mt-4 text-blue-600 hover:underline text-sm"
        >
          ← 반 목록으로
        </Link>
      </main>
    );
  }

  const displayName = `${classRoom.grade} ${classRoom.name}`;
  const expiresStr = classRoom.expiresAt.toDate().toLocaleString('ko-KR', {
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
  const isExpired = new Date() > classRoom.expiresAt.toDate();

  return (
    <main className="flex min-h-screen flex-col items-center pt-10 pb-20 px-4">
      <div className="w-full max-w-5xl flex flex-col gap-6">
        <div className="flex items-center gap-3 flex-wrap">
          <Link
            href="/admin/classes"
            className="text-gray-400 hover:text-gray-600 text-sm"
          >
            ← 목록
          </Link>
          <h1 className="text-2xl font-bold text-gray-800">{displayName}</h1>
          <span className={`text-sm ${isExpired ? 'text-gray-400' : 'text-blue-600'}`}>
            {isExpired ? `만료됨 (${expiresStr})` : `~ ${expiresStr} 까지`}
          </span>
        </div>

        <StudentScheduleView classId={params.classId} className={displayName} />
      </div>
    </main>
  );
}
