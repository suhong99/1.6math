'use client';

import { useState, Suspense } from 'react';
import CreateClassForm from '@/feature/schedule/admin/CreateClassForm';
import ClassList from '@/feature/schedule/admin/ClassList';

export default function ClassesPage() {
  const [refreshKey, setRefreshKey] = useState(0);

  return (
    <main className="flex min-h-screen flex-col items-center pt-10 pb-20 px-4">
      <div className="w-full max-w-4xl flex flex-col gap-6">
        <h1 className="text-2xl font-bold text-gray-800">시간표 반 관리</h1>
        <CreateClassForm onCreated={() => setRefreshKey((k) => k + 1)} />
        <section>
          <h2 className="text-lg font-semibold text-gray-700 mb-3">반 목록</h2>
          <Suspense
            fallback={
              <p className="text-center text-gray-500 py-8">불러오는 중...</p>
            }
          >
            <ClassList refreshKey={refreshKey} />
          </Suspense>
        </section>
      </div>
    </main>
  );
}
