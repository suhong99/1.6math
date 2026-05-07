import { getClass } from '@/firestore/helper/schedule';
import ScheduleForm from '@/feature/schedule/student/ScheduleForm';

interface Props {
  params: { classId: string };
}

export default async function SchedulePage({ params }: Props) {
  const classRoom = await getClass(params.classId);

  if (!classRoom) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center px-4">
        <div className="text-center">
          <p className="text-4xl mb-4">🔍</p>
          <h1 className="text-xl font-bold text-gray-800 mb-2">
            찾을 수 없는 링크입니다
          </h1>
          <p className="text-sm text-gray-500">
            URL을 다시 확인하거나 선생님께 문의해주세요.
          </p>
        </div>
      </main>
    );
  }

  if (new Date() > classRoom.expiresAt.toDate()) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center px-4">
        <div className="text-center">
          <p className="text-4xl mb-4">🔒</p>
          <h1 className="text-xl font-bold text-gray-800 mb-2">
            마감된 링크입니다
          </h1>
          <p className="text-sm text-gray-500">
            시간표 입력 기간이 종료되었습니다.
            <br />
            선생님께 문의해주세요.
          </p>
        </div>
      </main>
    );
  }

  const displayName = `${classRoom.grade} ${classRoom.name}`;

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="max-w-lg mx-auto px-4 pt-8">
        <div className="mb-6 text-center">
          <h1 className="text-2xl font-extrabold text-gray-900">
            1.6 수학과학전문학원
          </h1>
          <p className="text-sm text-gray-500 mt-1">시간표 입력</p>
        </div>
        <ScheduleForm classId={params.classId} className={displayName} />
      </div>
    </main>
  );
}
