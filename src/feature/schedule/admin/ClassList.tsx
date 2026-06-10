'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { getClasses, extendClass, closeClass, deleteClass } from '@/firestore/helper/schedule';
import type { ClassRoom, SeasonType } from '../const/types';
import {
  getClassStatus,
  getRemainingTime,
  formatYearMonth,
  DURATION_OPTIONS,
} from '../const/types';
import QRCodeDisplay from './QRCodeDisplay';

interface Props {
  refreshKey: number;
}

interface ExtendState {
  classId: string;
  hours: number;
  loading: boolean;
}

type PanelType = 'extend' | 'close' | 'delete';

const now = new Date();
const DEFAULT_YEAR = now.getFullYear();
const DEFAULT_MONTH = now.getMonth() + 1;

export default function ClassList({ refreshKey }: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const year = Number(searchParams.get('year')) || DEFAULT_YEAR;
  const month = Number(searchParams.get('month')) || DEFAULT_MONTH;
  const season = searchParams.get('season') as SeasonType | null;
  const grade = searchParams.get('grade') || '전체';

  const [classes, setClasses] = useState<ClassRoom[]>([]);
  const [loading, setLoading] = useState(true);
  const [extend, setExtend] = useState<ExtendState | null>(null);
  const [panel, setPanel] = useState<{ id: string; type: PanelType } | null>(null);

  const fetchClasses = useCallback(async () => {
    setLoading(true);
    try {
      const data = await getClasses();
      setClasses(data);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchClasses();
  }, [fetchClasses, refreshKey]);

  const updateParams = useCallback(
    (updates: Partial<{ year: number; month: number; season: SeasonType | null; grade: string }>) => {
      const params = new URLSearchParams(searchParams.toString());
      if (updates.year !== undefined) params.set('year', String(updates.year));
      if (updates.month !== undefined) params.set('month', String(updates.month));
      if ('season' in updates) {
        if (updates.season == null) params.delete('season');
        else params.set('season', updates.season);
      }
      if (updates.grade !== undefined) {
        if (updates.grade === '전체') params.delete('grade');
        else params.set('grade', updates.grade);
      }
      router.push(`/admin/classes?${params.toString()}`, { scroll: false });
    },
    [router, searchParams]
  );

  const years = useMemo(
    () =>
      Array.from(new Set(classes.map((c) => Math.floor(c.yearMonth / 100)))).sort(
        (a, b) => b - a
      ),
    [classes]
  );

  // (월, 시즌) 조합 목록
  const monthSeasonsForYear = useMemo(() => {
    const seen = new Set<string>();
    const result: { month: number; seasonType: SeasonType }[] = [];
    classes
      .filter((c) => Math.floor(c.yearMonth / 100) === year)
      .forEach((c) => {
        const st: SeasonType = c.seasonType ?? '학기중';
        const key = `${c.yearMonth % 100}-${st}`;
        if (!seen.has(key)) {
          seen.add(key);
          result.push({ month: c.yearMonth % 100, seasonType: st });
        }
      });
    return result.sort(
      (a, b) => a.month - b.month || (a.seasonType === '학기중' ? -1 : 1)
    );
  }, [classes, year]);

  // 두 시즌이 모두 있는 달 집합
  const monthsWithBothSeasons = useMemo(() => {
    const counter = new Map<number, number>();
    monthSeasonsForYear.forEach(({ month: m }) => {
      counter.set(m, (counter.get(m) ?? 0) + 1);
    });
    return new Set(
      Array.from(counter.entries()).filter(([, n]) => n > 1).map(([m]) => m)
    );
  }, [monthSeasonsForYear]);

  // URL season이 없으면 현재 월의 첫 번째 시즌으로 추론
  const activeSeason: SeasonType =
    season ??
    (monthSeasonsForYear.find((c) => c.month === month)?.seasonType ?? '학기중');

  const grades = useMemo(() => {
    const relevant = classes.filter(
      (c) =>
        c.yearMonth === year * 100 + month &&
        (c.seasonType ?? '학기중') === activeSeason
    );
    return ['전체', ...Array.from(new Set(relevant.map((c) => c.grade)))];
  }, [classes, year, month, activeSeason]);

  const filtered = useMemo(() => {
    const targetYm = year * 100 + month;
    return classes.filter(
      (c) =>
        c.yearMonth === targetYm &&
        (grade === '전체' || c.grade === grade) &&
        (c.seasonType ?? '학기중') === activeSeason
    );
  }, [classes, year, month, grade, activeSeason]);

  const handleYearChange = (newYear: number) => {
    const seen = new Set<string>();
    const combos: { month: number; seasonType: SeasonType }[] = [];
    classes
      .filter((c) => Math.floor(c.yearMonth / 100) === newYear)
      .forEach((c) => {
        const st: SeasonType = c.seasonType ?? '학기중';
        const key = `${c.yearMonth % 100}-${st}`;
        if (!seen.has(key)) { seen.add(key); combos.push({ month: c.yearMonth % 100, seasonType: st }); }
      });
    combos.sort((a, b) => a.month - b.month || (a.seasonType === '학기중' ? -1 : 1));

    const sameMonth = combos.find((c) => c.month === month);
    const first = sameMonth ?? combos[0];
    const newMonth = first?.month ?? DEFAULT_MONTH;
    const hasBoth = combos.filter((c) => c.month === newMonth).length > 1;
    updateParams({
      year: newYear,
      month: newMonth,
      season: hasBoth ? (first?.seasonType ?? null) : null,
      grade: '전체',
    });
  };

  const openPanel = (id: string, type: PanelType) => {
    if (panel?.id === id && panel.type === type) {
      setPanel(null);
      setExtend(null);
      return;
    }
    setPanel({ id, type });
    if (type === 'extend') {
      setExtend({ classId: id, hours: DURATION_OPTIONS[1].hours, loading: false });
    } else {
      setExtend(null);
    }
  };

  const closePanel = () => {
    setPanel(null);
    setExtend(null);
  };

  const handleExtend = async () => {
    if (!extend) return;
    setExtend((prev) => prev && { ...prev, loading: true });
    try {
      await extendClass(extend.classId, extend.hours);
      await fetchClasses();
      closePanel();
    } catch {
      setExtend((prev) => prev && { ...prev, loading: false });
    }
  };

  const handleClose = async () => {
    if (!panel) return;
    await closeClass(panel.id);
    await fetchClasses();
    closePanel();
  };

  const handleDelete = async () => {
    if (!panel) return;
    await deleteClass(panel.id);
    await fetchClasses();
    closePanel();
  };

  if (loading) {
    return <p className="text-center text-gray-500 py-8">불러오는 중...</p>;
  }

  return (
    <div className="flex flex-col gap-4">
      {/* 년도 필터 */}
      <div>
        <p className="text-xs text-gray-500 mb-1.5">년도</p>
        {years.length === 0 ? (
          <p className="text-xs text-gray-400">생성된 반이 없습니다.</p>
        ) : (
          <div className="flex gap-2 flex-wrap">
            {years.map((y) => (
              <button
                key={y}
                onClick={() => handleYearChange(y)}
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
                  year === y
                    ? 'bg-indigo-600 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {y}년
              </button>
            ))}
          </div>
        )}
      </div>

      {/* 월 필터 — 같은 달에 두 시즌이 있으면 "6월 학기중" / "6월 방학"으로 분리 */}
      {monthSeasonsForYear.length > 0 && (
        <div>
          <p className="text-xs text-gray-500 mb-1.5">{year}년 월</p>
          <div className="flex gap-2 flex-wrap">
            {monthSeasonsForYear.map(({ month: m, seasonType: s }) => {
              const showSeason = monthsWithBothSeasons.has(m);
              const label = showSeason ? `${m}월 ${s}` : `${m}월`;
              const isActive = month === m && activeSeason === s;
              return (
                <button
                  key={`${m}-${s}`}
                  onClick={() =>
                    updateParams({
                      month: m,
                      season: showSeason ? s : null,
                      grade: '전체',
                    })
                  }
                  className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {label}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* 학년 필터 */}
      {grades.length > 1 && (
        <div>
          <p className="text-xs text-gray-500 mb-1.5">학년</p>
          <div className="flex gap-2 flex-wrap">
            {grades.map((g) => (
              <button
                key={g}
                onClick={() => updateParams({ grade: g })}
                className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                  grade === g
                    ? 'bg-teal-600 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {g}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* 반 목록 */}
      {years.length > 0 && filtered.length === 0 ? (
        <p className="text-center text-gray-400 py-6">
          {formatYearMonth(year * 100 + month)} 해당 반이 없습니다.
        </p>
      ) : years.length === 0 ? (
        <p className="text-center text-gray-400 py-6">
          위에서 반을 만들어주세요.
        </p>
      ) : null}

      <div className="flex flex-col gap-3">
        {filtered.map((cls) => {
          const status = getClassStatus(cls.expiresAt);
          const remaining = getRemainingTime(cls.expiresAt);
          const isActive = status === 'active';
          const displayName = `${cls.grade} ${cls.name}`;
          const createdStr = cls.createdAt.toDate().toLocaleDateString('ko-KR');
          const activePanel = panel?.id === cls.id ? panel.type : null;

          return (
            <div
              key={cls.id}
              className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden"
            >
              <div className="p-4 flex flex-col sm:flex-row sm:items-center gap-3">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-semibold text-gray-800">{displayName}</span>
                    <span className="text-xs text-gray-400">
                      {formatYearMonth(cls.yearMonth)}
                    </span>
                    {cls.seasonType && (
                      <span
                        className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                          cls.seasonType === '방학'
                            ? 'bg-orange-100 text-orange-700'
                            : 'bg-blue-100 text-blue-700'
                        }`}
                      >
                        {cls.seasonType}
                      </span>
                    )}
                    <span
                      className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                        isActive
                          ? 'bg-green-100 text-green-700'
                          : 'bg-gray-100 text-gray-500'
                      }`}
                    >
                      {isActive ? '진행중' : '만료'}
                    </span>
                  </div>
                  <p
                    className={`text-xs mt-1 font-medium ${
                      isActive ? 'text-blue-600' : 'text-gray-400'
                    }`}
                  >
                    {remaining}
                  </p>
                  <p className="text-xs text-gray-400 mt-0.5">생성일 {createdStr}</p>
                </div>

                <div className="flex items-center gap-2 flex-wrap">
                  {isActive && (
                    <QRCodeDisplay classId={cls.id} className={displayName} />
                  )}
                  {isActive && (
                    <button
                      onClick={() => openPanel(cls.id, 'close')}
                      className={`text-xs px-3 py-1.5 border rounded-lg transition-colors ${
                        activePanel === 'close'
                          ? 'border-red-300 bg-red-50 text-red-600'
                          : 'border-red-300 text-red-500 hover:bg-red-50'
                      }`}
                    >
                      종료
                    </button>
                  )}
                  <button
                    onClick={() => openPanel(cls.id, 'extend')}
                    className={`text-xs px-3 py-1.5 border rounded-lg transition-colors ${
                      activePanel === 'extend'
                        ? 'border-orange-300 bg-orange-50 text-orange-600'
                        : 'border-orange-300 text-orange-600 hover:bg-orange-50'
                    }`}
                  >
                    연장
                  </button>
                  <button
                    onClick={() => openPanel(cls.id, 'delete')}
                    className={`text-xs px-3 py-1.5 border rounded-lg transition-colors ${
                      activePanel === 'delete'
                        ? 'border-gray-400 bg-gray-100 text-gray-700'
                        : 'border-gray-300 text-gray-500 hover:bg-gray-50'
                    }`}
                  >
                    삭제
                  </button>
                  <Link
                    href={`/admin/classes/${cls.id}`}
                    className="text-xs px-3 py-1.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    시간표 조회
                  </Link>
                </div>
              </div>

              {activePanel === 'close' && (
                <div className="border-t border-red-100 bg-red-50 px-4 py-3 flex flex-col sm:flex-row items-start sm:items-center gap-3">
                  <p className="text-xs text-red-700 font-medium flex-1">
                    링크를 지금 바로 종료합니다. 학생들이 더 이상 접근할 수 없게 됩니다.
                  </p>
                  <div className="flex gap-2">
                    <button onClick={closePanel} className="px-3 py-1.5 border border-gray-300 text-gray-600 text-sm rounded-lg hover:bg-white transition-colors">취소</button>
                    <button onClick={handleClose} className="px-4 py-1.5 bg-red-500 hover:bg-red-600 text-white text-sm font-medium rounded-lg transition-colors">종료 확인</button>
                  </div>
                </div>
              )}

              {activePanel === 'extend' && (
                <div className="border-t border-orange-100 bg-orange-50 px-4 py-3 flex flex-col sm:flex-row items-start sm:items-center gap-3">
                  <p className="text-xs text-orange-700 font-medium whitespace-nowrap">지금부터</p>
                  <select
                    value={extend?.hours}
                    onChange={(e) =>
                      setExtend((prev) => prev ? { ...prev, hours: Number(e.target.value) } : prev)
                    }
                    className="border border-orange-200 rounded-lg px-3 py-1.5 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-orange-400"
                  >
                    {DURATION_OPTIONS.map((opt) => (
                      <option key={opt.hours} value={opt.hours}>{opt.label}</option>
                    ))}
                  </select>
                  <div className="flex gap-2">
                    <button onClick={closePanel} className="px-3 py-1.5 border border-gray-300 text-gray-600 text-sm rounded-lg hover:bg-white transition-colors">취소</button>
                    <button onClick={handleExtend} disabled={extend?.loading} className="px-4 py-1.5 bg-orange-500 hover:bg-orange-600 disabled:bg-orange-300 text-white text-sm font-medium rounded-lg transition-colors">
                      {extend?.loading ? '처리 중...' : '연장 확인'}
                    </button>
                  </div>
                </div>
              )}

              {activePanel === 'delete' && (
                <div className="border-t border-gray-200 bg-gray-50 px-4 py-3 flex flex-col sm:flex-row items-start sm:items-center gap-3">
                  <p className="text-xs text-gray-700 font-medium flex-1">
                    반과 모든 학생 시간표를 영구 삭제합니다. 되돌릴 수 없습니다.
                  </p>
                  <div className="flex gap-2">
                    <button onClick={closePanel} className="px-3 py-1.5 border border-gray-300 text-gray-600 text-sm rounded-lg hover:bg-white transition-colors">취소</button>
                    <button onClick={handleDelete} className="px-4 py-1.5 bg-gray-800 hover:bg-gray-900 text-white text-sm font-medium rounded-lg transition-colors">영구 삭제</button>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
