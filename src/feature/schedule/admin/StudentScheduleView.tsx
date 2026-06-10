'use client';

import { useEffect, useState } from 'react';
import {
  getStudentSchedules,
  deleteStudentSchedule,
  updateStudentSchedule,
} from '@/firestore/helper/schedule';
import type {
  AcademySchedule,
  AcademyTimeSlot,
  DayOfWeek,
  StudentSchedule,
} from '../const/types';
import { DAYS_OF_WEEK } from '../const/types';
import { ACADEMY_SCHEDULE } from '../const/academySchedule';
import type { SeasonType } from '../const/academySchedule';

/* ─── 타임테이블 상수 / 헬퍼 ─── */

const STUDENT_COLORS = [
  'bg-blue-100 text-blue-900 border-blue-300',
  'bg-green-100 text-green-900 border-green-300',
  'bg-purple-100 text-purple-900 border-purple-300',
  'bg-orange-100 text-orange-900 border-orange-300',
  'bg-pink-100 text-pink-900 border-pink-300',
  'bg-teal-100 text-teal-900 border-teal-300',
  'bg-amber-100 text-amber-900 border-amber-300',
  'bg-rose-100 text-rose-900 border-rose-300',
  'bg-indigo-100 text-indigo-900 border-indigo-300',
  'bg-cyan-100 text-cyan-900 border-cyan-300',
] as const;

// 이동 시간 블록용 — 수업 블록보다 옅은 계열
const TRAVEL_COLORS = [
  'bg-blue-50 text-blue-500 border-blue-200',
  'bg-green-50 text-green-500 border-green-200',
  'bg-purple-50 text-purple-500 border-purple-200',
  'bg-orange-50 text-orange-500 border-orange-200',
  'bg-pink-50 text-pink-500 border-pink-200',
  'bg-teal-50 text-teal-500 border-teal-200',
  'bg-amber-50 text-amber-500 border-amber-200',
  'bg-rose-50 text-rose-500 border-rose-200',
  'bg-indigo-50 text-indigo-500 border-indigo-200',
  'bg-cyan-50 text-cyan-500 border-cyan-200',
] as const;

const LEGEND_DOTS = [
  'bg-blue-400',
  'bg-green-400',
  'bg-purple-400',
  'bg-orange-400',
  'bg-pink-400',
  'bg-teal-400',
  'bg-amber-400',
  'bg-rose-400',
  'bg-indigo-400',
  'bg-cyan-400',
] as const;

const PX_PER_MIN = 1.5;

const timeToMin = (t: string): number => {
  if (t === '24:00') return 24 * 60;
  const [h, m] = t.split(':').map(Number);
  return h * 60 + m;
};

const minToTime = (min: number): string => {
  if (min >= 24 * 60) return '24:00';
  const h = Math.floor(min / 60);
  const m = min % 60;
  return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`;
};

const isWeekend = (day: DayOfWeek): boolean => day === '토' || day === '일';

interface TimetableEvent {
  studentId: string;
  studentName: string;
  academyName: string;
  day: DayOfWeek;
  startMin: number;
  endMin: number;
  colorIdx: number;
  isTravel: boolean;
}

interface LayoutEvent extends TimetableEvent {
  col: number;
  totalCols: number;
}


function layoutDayEvents(events: TimetableEvent[]): LayoutEvent[] {
  if (events.length === 0) return [];
  const sorted = [...events].sort((a, b) => a.startMin - b.startMin);
  const columnEnds: number[] = [];
  const cols: number[] = [];

  for (const event of sorted) {
    let col = columnEnds.findIndex((end) => end <= event.startMin);
    if (col === -1) {
      col = columnEnds.length;
      columnEnds.push(event.endMin);
    } else {
      columnEnds[col] = event.endMin;
    }
    cols.push(col);
  }

  return sorted.map((event, i) => {
    const concurrentCols = new Set<number>();
    sorted.forEach((other, j) => {
      if (other.startMin < event.endMin && other.endMin > event.startMin) {
        concurrentCols.add(cols[j]);
      }
    });
    return { ...event, col: cols[i], totalCols: concurrentCols.size };
  });
}

/* ─── 수정 폼 타입 ─── */

interface TimeSlotDraft {
  days: DayOfWeek[];
  startTime: string;
  endTime: string;
}

interface AcademyDraft {
  academyName: string;
  travelMinutes: string;
  timeSlots: TimeSlotDraft[];
}

interface EditState {
  id: string;
  studentName: string;
  academies: AcademyDraft[];
}

const makeSlot = (): TimeSlotDraft => ({ days: [], startTime: '', endTime: '' });
const makeAcademy = (): AcademyDraft => ({
  academyName: '',
  travelMinutes: '',
  timeSlots: [makeSlot()],
});

const toDraft = (s: StudentSchedule): EditState => ({
  id: s.id,
  studentName: s.studentName,
  academies: s.academies.map((a) => ({
    academyName: a.academyName,
    travelMinutes: String(a.travelMinutes),
    timeSlots: a.timeSlots.map((slot) => ({
      days: [...slot.days],
      startTime: slot.startTime,
      endTime: slot.endTime,
    })),
  })),
});

interface Props {
  classId: string;
  className: string;
  defaultSeasonType?: SeasonType;
}

export default function StudentScheduleView({ classId, className, defaultSeasonType = '학기중' }: Props) {
  const [schedules, setSchedules] = useState<StudentSchedule[]>([]);
  const [loading, setLoading] = useState(true);
  const [detail, setDetail] = useState<StudentSchedule | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [edit, setEdit] = useState<EditState | null>(null);
  const [editError, setEditError] = useState('');
  const [saving, setSaving] = useState(false);
  const [hiddenIds, setHiddenIds] = useState<Set<string>>(new Set());
  const [showAvailability, setShowAvailability] = useState(false);
  const [seasonType, setSeasonType] = useState<SeasonType>(defaultSeasonType);

  const toggleHidden = (id: string): void =>
    setHiddenIds((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });

  const reload = (): void => {
    getStudentSchedules(classId)
      .then(setSchedules)
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    reload();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [classId]);

  /* ── 삭제 ── */
  const handleDelete = async (id: string): Promise<void> => {
    await deleteStudentSchedule(id);
    setDeleteId(null);
    setLoading(true);
    reload();
  };

  /* ── 수정 저장 ── */
  const handleSave = async (): Promise<void> => {
    if (!edit) return;
    setEditError('');

    if (!edit.studentName.trim()) {
      setEditError('이름을 입력해주세요.');
      return;
    }
    for (let i = 0; i < edit.academies.length; i++) {
      const a = edit.academies[i];
      if (!a.academyName.trim()) {
        setEditError(`학원 ${i + 1}: 이름을 입력해주세요.`);
        return;
      }
      const t = parseInt(a.travelMinutes, 10);
      if (isNaN(t) || t < 0) {
        setEditError(`학원 ${i + 1}: 이동 시간을 올바르게 입력해주세요.`);
        return;
      }
      for (let j = 0; j < a.timeSlots.length; j++) {
        const s = a.timeSlots[j];
        if (s.days.length === 0) {
          setEditError(`학원 ${i + 1} 시간 ${j + 1}: 요일을 선택해주세요.`);
          return;
        }
        if (!s.startTime || !s.endTime) {
          setEditError(`학원 ${i + 1} 시간 ${j + 1}: 시간을 입력해주세요.`);
          return;
        }
      }
    }

    const academies: AcademySchedule[] = edit.academies.map((a) => ({
      academyName: a.academyName.trim(),
      travelMinutes: parseInt(a.travelMinutes, 10),
      timeSlots: a.timeSlots.map((s) => ({
        days: s.days as DayOfWeek[],
        startTime: s.startTime,
        endTime: s.endTime,
      })) as AcademyTimeSlot[],
    }));

    try {
      setSaving(true);
      await updateStudentSchedule(edit.id, {
        studentName: edit.studentName.trim(),
        academies,
      });
      setEdit(null);
      setLoading(true);
      reload();
    } catch {
      setEditError('저장에 실패했습니다. 다시 시도해주세요.');
    } finally {
      setSaving(false);
    }
  };

  /* ── 수정 폼 헬퍼 ── */
  const updateEditAcademy = (
    idx: number,
    field: 'academyName' | 'travelMinutes',
    value: string
  ): void => {
    setEdit((prev) =>
      prev
        ? {
            ...prev,
            academies: prev.academies.map((a, i) =>
              i === idx ? { ...a, [field]: value } : a
            ),
          }
        : prev
    );
  };

  const toggleEditDay = (aIdx: number, sIdx: number, day: DayOfWeek): void => {
    setEdit((prev) =>
      prev
        ? {
            ...prev,
            academies: prev.academies.map((a, i) =>
              i !== aIdx
                ? a
                : {
                    ...a,
                    timeSlots: a.timeSlots.map((s, j) =>
                      j !== sIdx
                        ? s
                        : {
                            ...s,
                            days: s.days.includes(day)
                              ? s.days.filter((d) => d !== day)
                              : [...s.days, day],
                          }
                    ),
                  }
            ),
          }
        : prev
    );
  };

  const updateEditSlot = (
    aIdx: number,
    sIdx: number,
    field: 'startTime' | 'endTime',
    value: string
  ): void => {
    setEdit((prev) =>
      prev
        ? {
            ...prev,
            academies: prev.academies.map((a, i) =>
              i !== aIdx
                ? a
                : {
                    ...a,
                    timeSlots: a.timeSlots.map((s, j) =>
                      j !== sIdx ? s : { ...s, [field]: value }
                    ),
                  }
            ),
          }
        : prev
    );
  };

  if (loading) {
    return <p className="text-center text-gray-500 py-12">불러오는 중...</p>;
  }

  if (schedules.length === 0) {
    return (
      <p className="text-center text-gray-400 py-12">
        아직 제출된 시간표가 없습니다.
      </p>
    );
  }

  /* ── 타임테이블 데이터 계산 ── */
  const allEvents: TimetableEvent[] = schedules.flatMap((s, idx) => {
    if (hiddenIds.has(s.id)) return [];
    const colorIdx = idx % STUDENT_COLORS.length;
    return s.academies.flatMap((a) =>
      a.timeSlots.flatMap((slot) =>
        slot.days.flatMap((day) => {
          const endMin = timeToMin(slot.endTime);
          const startMin = timeToMin(slot.startTime);
          const base: TimetableEvent = {
            studentId: s.id,
            studentName: s.studentName,
            academyName: a.academyName,
            day,
            startMin,
            endMin,
            colorIdx,
            isTravel: false,
          };
          if (a.travelMinutes <= 0) return [base];
          const travelBefore: TimetableEvent = {
            ...base,
            startMin: startMin - a.travelMinutes,
            endMin: startMin,
            isTravel: true,
          };
          const travelAfter: TimetableEvent = {
            ...base,
            startMin: endMin,
            endMin: endMin + a.travelMinutes,
            isTravel: true,
          };
          return [travelBefore, base, travelAfter];
        })
      )
    );
  });

  const minTime = 9 * 60;  // 9:00
  const maxTime = 22 * 60; // 22:00
  const totalHeight = (maxTime - minTime) * PX_PER_MIN;

  const hourMarkers = Array.from(
    { length: (maxTime - minTime) / 60 + 1 },
    (_, i) => minTime + i * 60
  );

  const eventsByDay = new Map<DayOfWeek, LayoutEvent[]>();
  DAYS_OF_WEEK.forEach((day) => {
    const dayEvents = allEvents.filter((e) => e.day === day);
    eventsByDay.set(day, layoutDayEvents(dayEvents));
  });

  // 배정 가능 시간 분석: 학원 교시 기반
  const activeCount = schedules.filter((s) => !hiddenIds.has(s.id)).length;

  interface PeriodAvail {
    period: number;
    start: string;
    end: string;
    freeCount: number;
  }

  const periodAvailByDay = new Map<DayOfWeek, PeriodAvail[]>();
  DAYS_OF_WEEK.forEach((day) => {
    const seasonSched = ACADEMY_SCHEDULE[seasonType];
    const periods = isWeekend(day) ? seasonSched.weekend : seasonSched.weekday;
    const result: PeriodAvail[] = periods.map((p) => {
      const pStart = timeToMin(p.start);
      const pEnd = timeToMin(p.end);
      const occupiedIds = new Set(
        allEvents
          .filter((e) => e.day === day && e.startMin < pEnd && e.endMin > pStart)
          .map((e) => e.studentId)
      );
      return { period: p.period, start: p.start, end: p.end, freeCount: activeCount - occupiedIds.size };
    });
    periodAvailByDay.set(day, result);
  });

  return (
    <div className="flex flex-col gap-6">
      <p className="text-sm text-gray-500">
        총 <strong>{schedules.length}명</strong>이 제출했습니다.
      </p>

      {/* ── 범례 (클릭으로 숨김/표시 토글) ── */}
      <div className="flex flex-wrap gap-2">
        {schedules.map((s, i) => {
          const hidden = hiddenIds.has(s.id);
          return (
            <button
              key={s.id}
              type="button"
              onClick={() => toggleHidden(s.id)}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-sm transition-all ${
                hidden
                  ? 'border-gray-200 bg-gray-50 text-gray-400 line-through'
                  : 'border-gray-200 bg-white text-gray-700 hover:border-gray-400'
              }`}
              aria-pressed={hidden}
              aria-label={`${s.studentName} ${hidden ? '표시' : '숨김'}`}
            >
              <span
                className={`w-2.5 h-2.5 rounded-full shrink-0 transition-opacity ${LEGEND_DOTS[i % LEGEND_DOTS.length]} ${hidden ? 'opacity-30' : ''}`}
                aria-hidden="true"
              />
              {s.studentName}
            </button>
          );
        })}
      </div>

      {/* ── 타임테이블 ── */}
      <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between flex-wrap gap-2">
        <div className="flex items-center gap-2 flex-wrap">
          <button
            type="button"
            onClick={() => setShowAvailability((v) => !v)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-sm font-medium transition-colors ${
              showAvailability
                ? 'bg-green-600 border-green-600 text-white'
                : 'border-gray-300 text-gray-600 hover:border-green-500 hover:text-green-700'
            }`}
          >
            배정 가능 시간 {showAvailability ? '숨기기' : '보기'}
          </button>
          {showAvailability && (
            <>
              {/* 학기중 / 방학 선택 */}
              <div className="flex rounded-lg border border-gray-200 overflow-hidden text-sm">
                {(['학기중', '방학'] as SeasonType[]).map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => setSeasonType(s)}
                    className={`px-3 py-1.5 font-medium transition-colors ${
                      seasonType === s
                        ? 'bg-blue-600 text-white'
                        : 'bg-white text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
              <div className="flex items-center gap-2 text-xs text-gray-500">
                <span className="flex items-center gap-1">
                  <span className="inline-block w-3 h-3 rounded bg-green-100 border border-green-300" />
                  전원
                </span>
                <span className="flex items-center gap-1">
                  <span className="inline-block w-3 h-3 rounded bg-orange-100 border border-orange-300" />
                  과반수
                </span>
                <span className="flex items-center gap-1">
                  <span className="inline-block w-3 h-3 rounded bg-red-100 border border-red-300" />
                  일부
                </span>
              </div>
            </>
          )}
        </div>
      </div>
      <div className="border border-gray-200 rounded-xl overflow-hidden">
        <div className="overflow-auto max-h-[70vh]">
          <div className="min-w-[560px]">
            {/* 요일 헤더 */}
            <div className="flex sticky top-0 z-10 bg-white border-b border-gray-200">
              <div className="w-14 shrink-0" />
              {DAYS_OF_WEEK.map((day) => (
                <div
                  key={day}
                  className="flex-1 text-center text-sm font-semibold text-gray-700 py-2.5 border-l border-gray-200"
                >
                  {day}
                </div>
              ))}
            </div>

            {/* 시간 축 + 요일 열 */}
            <div className="flex">
              {/* 시간 레이블 */}
              <div
                className="w-14 shrink-0 relative bg-gray-50"
                style={{ height: totalHeight }}
              >
                {hourMarkers.map((min) => (
                  <div
                    key={min}
                    className="absolute right-2 text-xs text-gray-400 -translate-y-1/2 select-none"
                    style={{ top: (min - minTime) * PX_PER_MIN }}
                  >
                    {minToTime(min)}
                  </div>
                ))}
              </div>

              {/* 요일별 열 */}
              {DAYS_OF_WEEK.map((day) => {
                const events = eventsByDay.get(day) ?? [];
                return (
                  <div
                    key={day}
                    className="flex-1 relative border-l border-gray-200"
                    style={{ height: totalHeight }}
                  >
                    {/* 시간 격자선 */}
                    {hourMarkers.map((min) => (
                      <div
                        key={min}
                        className="absolute inset-x-0 border-t border-gray-100"
                        style={{ top: (min - minTime) * PX_PER_MIN }}
                      />
                    ))}

                    {/* 교시 기반 배정 가능 시간 오버레이 */}
                    {showAvailability &&
                      activeCount > 0 &&
                      (periodAvailByDay.get(day) ?? []).map((pa, pi) => {
                        if (pa.freeCount === 0) return null;
                        const pStart = timeToMin(pa.start);
                        const pEnd = timeToMin(pa.end);
                        const clipStart = Math.max(pStart, minTime);
                        const clipEnd = Math.min(pEnd, maxTime);
                        if (clipStart >= clipEnd) return null;
                        const ratio = pa.freeCount / activeCount;
                        const bgClass =
                          ratio === 1
                            ? 'bg-green-100'
                            : ratio >= 0.5
                            ? 'bg-orange-100'
                            : 'bg-red-100';
                        return (
                          <div
                            key={`av-${pi}`}
                            className={`absolute inset-x-0 pointer-events-none ${bgClass}`}
                            style={{
                              top: (clipStart - minTime) * PX_PER_MIN,
                              height: (clipEnd - clipStart) * PX_PER_MIN,
                            }}
                          />
                        );
                      })}

                    {/* 이벤트 블록 */}
                    {events.map((event, i) => {
                      const top = (event.startMin - minTime) * PX_PER_MIN;
                      const height = Math.max(
                        (event.endMin - event.startMin) * PX_PER_MIN - 2,
                        16
                      );
                      const widthPct = 100 / event.totalCols;
                      const leftPct = (event.col / event.totalCols) * 100;
                      const commonStyle = {
                        top,
                        height,
                        left: `${leftPct}%`,
                        width: `${widthPct}%`,
                      };

                      if (event.isTravel) {
                        return (
                          <div
                            key={i}
                            className={`absolute border border-dashed rounded overflow-hidden px-1 py-0.5 ${TRAVEL_COLORS[event.colorIdx]}`}
                            style={commonStyle}
                            aria-label={`${event.studentName} 이동 ${event.endMin - event.startMin}분`}
                          >
                            <div className="text-[10px] leading-tight truncate">
                              이동 {event.endMin - event.startMin}분
                            </div>
                          </div>
                        );
                      }

                      return (
                        <button
                          key={i}
                          type="button"
                          onClick={() => {
                            const s = schedules.find(
                              (sc) => sc.id === event.studentId
                            );
                            if (s) setDetail(s);
                          }}
                          className={`absolute border rounded overflow-hidden px-1 py-0.5 text-left transition-opacity hover:opacity-80 ${STUDENT_COLORS[event.colorIdx]}`}
                          style={commonStyle}
                          aria-label={`${event.studentName} ${event.academyName} ${minToTime(event.startMin)}~${minToTime(event.endMin)}`}
                        >
                          <div className="text-[11px] font-semibold leading-tight truncate">
                            {event.studentName}
                          </div>
                          <div className="text-[10px] leading-tight truncate opacity-75">
                            {event.academyName}
                          </div>
                          <div className="text-[10px] leading-tight truncate opacity-60">
                            {minToTime(event.startMin)}~{minToTime(event.endMin)}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
      </div>{/* end 타임테이블 wrapper */}

      {/* ── 배정 가능 시간대 추천 (교시 기반) ── */}
      {showAvailability && (
        <div className="flex flex-col gap-3">
          <h3 className="text-sm font-semibold text-gray-700">
            배정 가능 교시
            <span className="ml-2 text-xs font-normal text-gray-400">
              {seasonType} 시간표 기준 · 이동 시간 포함
            </span>
          </h3>
          <div className="grid grid-cols-2 gap-2 md:grid-cols-4 lg:grid-cols-7">
            {DAYS_OF_WEEK.map((day) => {
              const periods = periodAvailByDay.get(day) ?? [];
              const available = periods.filter((p) => p.freeCount > 0);
              return (
                <div
                  key={day}
                  className="border border-gray-200 rounded-xl p-3 flex flex-col gap-1.5"
                >
                  <div className="text-sm font-semibold text-gray-700 text-center pb-1 border-b border-gray-100">
                    {day}요일
                  </div>
                  {available.length === 0 ? (
                    <p className="text-xs text-gray-400 text-center py-2">없음</p>
                  ) : (
                    available.map((pa, wi) => {
                      const ratio = activeCount > 0 ? pa.freeCount / activeCount : 0;
                      const colorClass =
                        ratio === 1
                          ? 'bg-green-50 border-green-200 text-green-800'
                          : ratio >= 0.5
                          ? 'bg-orange-50 border-orange-200 text-orange-800'
                          : 'bg-red-50 border-red-200 text-red-700';
                      return (
                        <div
                          key={wi}
                          className={`border rounded-lg px-2 py-1.5 text-center ${colorClass}`}
                        >
                          <div className="text-xs font-semibold">
                            {pa.period}교시
                          </div>
                          <div className="text-[10px] opacity-75">
                            {pa.start}~{pa.end === '24:00' ? '자정' : pa.end}
                          </div>
                          <div className="text-[11px] opacity-70 font-medium">
                            {pa.freeCount}/{activeCount}명
                          </div>
                        </div>
                      );
                    })
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ── 학생 관리 ── */}
      <div className="flex flex-col gap-3">
        <h3 className="text-sm font-semibold text-gray-700">학생 관리</h3>
        <div className="border border-gray-200 rounded-xl overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="px-4 py-2.5 text-left font-medium text-gray-700">
                  이름
                </th>
                <th className="px-4 py-2.5 text-center font-medium text-gray-700 whitespace-nowrap">
                  제출일
                </th>
                <th className="px-4 py-2.5 text-center font-medium text-gray-700">
                  관리
                </th>
              </tr>
            </thead>
            <tbody>
              {schedules.map((s) => (
                <>
                  <tr key={s.id} className="border-b border-gray-100 last:border-0">
                    <td className="px-4 py-2.5 font-medium text-gray-800">
                      {s.studentName}
                    </td>
                    <td className="px-4 py-2.5 text-xs text-center text-gray-500 whitespace-nowrap">
                      {s.submittedAt.toDate().toLocaleDateString('ko-KR')}
                    </td>
                    <td className="px-4 py-2.5 text-center">
                      <div className="flex gap-1.5 justify-center">
                        <button
                          onClick={() => {
                            setEdit(toDraft(s));
                            setEditError('');
                          }}
                          className="text-xs px-2 py-1 border border-blue-300 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors"
                        >
                          수정
                        </button>
                        <button
                          onClick={() =>
                            setDeleteId((prev) => (prev === s.id ? null : s.id))
                          }
                          className={`text-xs px-2 py-1 border rounded-lg transition-colors ${
                            deleteId === s.id
                              ? 'border-red-300 bg-red-50 text-red-600'
                              : 'border-red-300 text-red-500 hover:bg-red-50'
                          }`}
                        >
                          삭제
                        </button>
                      </div>
                    </td>
                  </tr>

                  {/* 삭제 확인 행 */}
                  {deleteId === s.id && (
                    <tr key={`del-${s.id}`}>
                      <td
                        colSpan={3}
                        className="border-b border-red-200 bg-red-50 px-4 py-3"
                      >
                        <div className="flex items-center gap-3 flex-wrap">
                          <p className="text-xs text-red-700 font-medium flex-1">
                            <strong>{s.studentName}</strong> 학생의 시간표를
                            삭제합니다. 되돌릴 수 없습니다.
                          </p>
                          <div className="flex gap-2">
                            <button
                              onClick={() => setDeleteId(null)}
                              className="px-3 py-1.5 border border-gray-300 text-gray-600 text-xs rounded-lg hover:bg-white"
                            >
                              취소
                            </button>
                            <button
                              onClick={() => handleDelete(s.id)}
                              className="px-3 py-1.5 bg-red-500 hover:bg-red-600 text-white text-xs font-medium rounded-lg"
                            >
                              삭제 확인
                            </button>
                          </div>
                        </div>
                      </td>
                    </tr>
                  )}
                </>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ── 상세 보기 모달 ── */}
      {detail && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
          onClick={() => setDetail(null)}
        >
          <div
            className="bg-white rounded-2xl p-6 shadow-xl max-w-lg w-full max-h-[80vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-5">
              <h3 className="font-bold text-lg text-gray-800">
                {detail.studentName} — {className}
              </h3>
              <button
                onClick={() => setDetail(null)}
                className="text-gray-400 hover:text-gray-600 text-xl leading-none"
                aria-label="닫기"
              >
                ✕
              </button>
            </div>

            {detail.academies.length === 0 ? (
              <p className="text-sm text-gray-400">등록된 학원이 없습니다.</p>
            ) : (
              <div className="flex flex-col gap-4">
                {detail.academies.map((academy, i) => (
                  <div
                    key={i}
                    className="border border-gray-200 rounded-xl overflow-hidden"
                  >
                    <div className="bg-gray-50 px-4 py-2 flex items-center justify-between">
                      <span className="font-semibold text-gray-800">
                        {academy.academyName}
                      </span>
                      <span className="text-xs text-gray-500">
                        이동 {academy.travelMinutes}분
                      </span>
                    </div>
                    <div className="px-4 py-3 flex flex-col gap-2">
                      {academy.timeSlots.map((slot, j) => (
                        <div
                          key={j}
                          className="flex items-center gap-2 text-sm flex-wrap"
                        >
                          <div className="flex gap-1">
                            {slot.days.map((d) => (
                              <span
                                key={d}
                                className="px-1.5 py-0.5 bg-blue-100 text-blue-700 rounded text-xs font-medium"
                              >
                                {d}
                              </span>
                            ))}
                          </div>
                          <span className="text-gray-600">
                            {slot.startTime} ~ {slot.endTime}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* ── 수정 모달 ── */}
      {edit && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
          onClick={() => setEdit(null)}
        >
          <div
            className="bg-white rounded-2xl shadow-xl w-full max-w-lg max-h-[90vh] flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between px-6 pt-5 pb-3 border-b border-gray-100">
              <h3 className="font-bold text-lg text-gray-800">시간표 수정</h3>
              <button
                onClick={() => setEdit(null)}
                className="text-gray-400 hover:text-gray-600 text-xl leading-none"
                aria-label="닫기"
              >
                ✕
              </button>
            </div>

            <div className="overflow-y-auto flex-1 px-6 py-4 flex flex-col gap-4">
              {/* 이름 */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  이름
                </label>
                <input
                  type="text"
                  value={edit.studentName}
                  onChange={(e) =>
                    setEdit((prev) =>
                      prev ? { ...prev, studentName: e.target.value } : prev
                    )
                  }
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* 학원 목록 */}
              {edit.academies.map((academy, aIdx) => (
                <div
                  key={aIdx}
                  className="border border-gray-200 rounded-xl overflow-hidden"
                >
                  <div className="bg-gray-50 px-4 py-2 flex items-center justify-between">
                    <span className="text-sm font-semibold text-gray-700">
                      학원 {aIdx + 1}
                    </span>
                    {edit.academies.length > 1 && (
                      <button
                        type="button"
                        onClick={() =>
                          setEdit((prev) =>
                            prev
                              ? {
                                  ...prev,
                                  academies: prev.academies.filter(
                                    (_, i) => i !== aIdx
                                  ),
                                }
                              : prev
                          )
                        }
                        className="text-xs text-red-400 hover:text-red-600"
                      >
                        학원 삭제
                      </button>
                    )}
                  </div>

                  <div className="p-4 flex flex-col gap-3">
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-medium text-gray-600 mb-1">
                          학원 이름
                        </label>
                        <input
                          type="text"
                          value={academy.academyName}
                          onChange={(e) =>
                            updateEditAcademy(aIdx, 'academyName', e.target.value)
                          }
                          className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-gray-600 mb-1">
                          이동시간(분)
                        </label>
                        <input
                          type="number"
                          value={academy.travelMinutes}
                          onChange={(e) =>
                            updateEditAcademy(
                              aIdx,
                              'travelMinutes',
                              e.target.value
                            )
                          }
                          min="0"
                          className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                    </div>

                    {academy.timeSlots.map((slot, sIdx) => (
                      <div
                        key={sIdx}
                        className="bg-gray-50 rounded-lg p-3 flex flex-col gap-2"
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-gray-500">
                            시간{' '}
                            {academy.timeSlots.length > 1 ? sIdx + 1 : ''}
                          </span>
                          {academy.timeSlots.length > 1 && (
                            <button
                              type="button"
                              onClick={() =>
                                setEdit((prev) =>
                                  prev
                                    ? {
                                        ...prev,
                                        academies: prev.academies.map((a, i) =>
                                          i !== aIdx
                                            ? a
                                            : {
                                                ...a,
                                                timeSlots: a.timeSlots.filter(
                                                  (_, j) => j !== sIdx
                                                ),
                                              }
                                        ),
                                      }
                                    : prev
                                )
                              }
                              className="text-xs text-red-400 hover:text-red-600"
                            >
                              삭제
                            </button>
                          )}
                        </div>

                        <div className="flex gap-1.5 flex-wrap">
                          {DAYS_OF_WEEK.map((day) => (
                            <button
                              key={day}
                              type="button"
                              onClick={() => toggleEditDay(aIdx, sIdx, day)}
                              className={`w-8 h-8 rounded-full text-xs font-medium transition-colors ${
                                slot.days.includes(day)
                                  ? 'bg-blue-600 text-white'
                                  : 'bg-white border border-gray-300 text-gray-600 hover:border-blue-400'
                              }`}
                            >
                              {day}
                            </button>
                          ))}
                        </div>

                        <div className="flex items-center gap-2">
                          <input
                            type="time"
                            value={slot.startTime}
                            onChange={(e) =>
                              updateEditSlot(
                                aIdx,
                                sIdx,
                                'startTime',
                                e.target.value
                              )
                            }
                            className="flex-1 border border-gray-300 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                          <span className="text-gray-400 text-sm">~</span>
                          <input
                            type="time"
                            value={slot.endTime}
                            onChange={(e) =>
                              updateEditSlot(
                                aIdx,
                                sIdx,
                                'endTime',
                                e.target.value
                              )
                            }
                            className="flex-1 border border-gray-300 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                        </div>
                      </div>
                    ))}

                    <button
                      type="button"
                      onClick={() =>
                        setEdit((prev) =>
                          prev
                            ? {
                                ...prev,
                                academies: prev.academies.map((a, i) =>
                                  i !== aIdx
                                    ? a
                                    : {
                                        ...a,
                                        timeSlots: [
                                          ...a.timeSlots,
                                          makeSlot(),
                                        ],
                                      }
                                ),
                              }
                            : prev
                        )
                      }
                      className="self-start text-xs text-blue-600 hover:text-blue-800 font-medium"
                    >
                      + 다른 시간대 추가
                    </button>
                  </div>
                </div>
              ))}

              <button
                type="button"
                onClick={() =>
                  setEdit((prev) =>
                    prev
                      ? { ...prev, academies: [...prev.academies, makeAcademy()] }
                      : prev
                  )
                }
                className="w-full py-2.5 border-2 border-dashed border-gray-300 rounded-xl text-sm text-gray-500 hover:border-blue-400 hover:text-blue-600 transition-colors"
              >
                + 학원 추가
              </button>

              {editError && (
                <p className="text-xs text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2">
                  {editError}
                </p>
              )}
            </div>

            <div className="px-6 py-4 border-t border-gray-100 flex gap-2 justify-end">
              <button
                onClick={() => setEdit(null)}
                className="px-4 py-2 border border-gray-300 text-gray-600 text-sm rounded-lg hover:bg-gray-50"
              >
                취소
              </button>
              <button
                onClick={handleSave}
                disabled={saving}
                className="px-5 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 text-white text-sm font-medium rounded-lg transition-colors"
              >
                {saving ? '저장 중...' : '저장'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
