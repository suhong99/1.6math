'use client';

import { useState } from 'react';
import { submitSchedule } from '@/firestore/helper/schedule';
import type { AcademySchedule, AcademyTimeSlot, DayOfWeek } from '../const/types';
import { DAYS_OF_WEEK } from '../const/types';

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

const makeSlot = (): TimeSlotDraft => ({ days: [], startTime: '', endTime: '' });
const makeAcademy = (): AcademyDraft => ({
  academyName: '',
  travelMinutes: '',
  timeSlots: [makeSlot()],
});

interface Props {
  classId: string;
  className: string;
}

export default function ScheduleForm({ classId, className }: Props) {
  const [studentName, setStudentName] = useState('');
  const [academies, setAcademies] = useState<AcademyDraft[]>([makeAcademy()]);
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState('');

  // 학원 필드 수정
  const updateAcademy = (
    idx: number,
    field: keyof Pick<AcademyDraft, 'academyName' | 'travelMinutes'>,
    value: string
  ) => {
    setAcademies((prev) =>
      prev.map((a, i) => (i === idx ? { ...a, [field]: value } : a))
    );
  };

  const addAcademy = () => setAcademies((prev) => [...prev, makeAcademy()]);

  const removeAcademy = (idx: number) =>
    setAcademies((prev) => prev.filter((_, i) => i !== idx));

  // 시간 슬롯 수정
  const updateSlot = (
    aIdx: number,
    sIdx: number,
    field: keyof TimeSlotDraft,
    value: TimeSlotDraft[keyof TimeSlotDraft]
  ) => {
    setAcademies((prev) =>
      prev.map((a, i) =>
        i !== aIdx
          ? a
          : {
              ...a,
              timeSlots: a.timeSlots.map((s, j) =>
                j !== sIdx ? s : { ...s, [field]: value }
              ),
            }
      )
    );
  };

  const toggleDay = (aIdx: number, sIdx: number, day: DayOfWeek) => {
    setAcademies((prev) =>
      prev.map((a, i) =>
        i !== aIdx
          ? a
          : {
              ...a,
              timeSlots: a.timeSlots.map((s, j) => {
                if (j !== sIdx) return s;
                const days = s.days.includes(day)
                  ? s.days.filter((d) => d !== day)
                  : [...s.days, day];
                return { ...s, days };
              }),
            }
      )
    );
  };

  const addSlot = (aIdx: number) =>
    setAcademies((prev) =>
      prev.map((a, i) =>
        i !== aIdx ? a : { ...a, timeSlots: [...a.timeSlots, makeSlot()] }
      )
    );

  const removeSlot = (aIdx: number, sIdx: number) =>
    setAcademies((prev) =>
      prev.map((a, i) =>
        i !== aIdx
          ? a
          : { ...a, timeSlots: a.timeSlots.filter((_, j) => j !== sIdx) }
      )
    );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!studentName.trim()) {
      setError('이름을 입력해주세요.');
      return;
    }

    for (let i = 0; i < academies.length; i++) {
      const a = academies[i];
      const label = `학원 ${i + 1}`;

      if (!a.academyName.trim()) {
        setError(`${label}: 학원 이름을 입력해주세요.`);
        return;
      }
      const travel = parseInt(a.travelMinutes, 10);
      if (isNaN(travel) || travel < 0) {
        setError(`${label}: 이동 시간을 올바르게 입력해주세요.`);
        return;
      }
      for (let j = 0; j < a.timeSlots.length; j++) {
        const s = a.timeSlots[j];
        if (s.days.length === 0) {
          setError(`${label} 시간 ${j + 1}: 요일을 하나 이상 선택해주세요.`);
          return;
        }
        if (!s.startTime || !s.endTime) {
          setError(`${label} 시간 ${j + 1}: 시작/종료 시간을 입력해주세요.`);
          return;
        }
        if (s.endTime <= s.startTime) {
          setError(`${label} 시간 ${j + 1}: 종료 시간은 시작 시간 이후여야 합니다.`);
          return;
        }
      }
    }

    const payload: AcademySchedule[] = academies.map((a) => ({
      academyName: a.academyName.trim(),
      travelMinutes: parseInt(a.travelMinutes, 10),
      timeSlots: a.timeSlots.map((s) => ({
        days: s.days as DayOfWeek[],
        startTime: s.startTime,
        endTime: s.endTime,
      })) as AcademyTimeSlot[],
    }));

    try {
      setLoading(true);
      await submitSchedule({ classId, studentName: studentName.trim(), academies: payload });
      setDone(true);
    } catch {
      setError('제출에 실패했습니다. 다시 시도해주세요.');
    } finally {
      setLoading(false);
    }
  };

  if (done) {
    return (
      <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
        <div className="text-5xl mb-4">✅</div>
        <h2 className="text-xl font-bold text-gray-800 mb-2">제출 완료!</h2>
        <p className="text-gray-500 text-sm">
          시간표가 성공적으로 제출되었습니다.
          <br />
          선생님이 시간표를 확인할 예정입니다.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5 pb-12">
      <div className="bg-blue-50 border border-blue-100 rounded-xl p-4">
        <p className="text-sm text-blue-700">
          <strong>{className}</strong> 시간표를 입력해주세요.
          <br />
          다니는 학원을 하나씩 추가하고 수업 요일과 시간을 입력하면 됩니다.
        </p>
      </div>

      {/* 이름 */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          이름 <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          value={studentName}
          onChange={(e) => setStudentName(e.target.value)}
          placeholder="홍길동"
          className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* 학원 목록 */}
      {academies.map((academy, aIdx) => (
        <div
          key={aIdx}
          className="border border-gray-200 rounded-xl overflow-hidden bg-white shadow-sm"
        >
          {/* 학원 헤더 */}
          <div className="bg-gray-50 px-4 py-3 flex items-center justify-between">
            <span className="text-sm font-semibold text-gray-700">
              학원 {aIdx + 1}
            </span>
            {academies.length > 1 && (
              <button
                type="button"
                onClick={() => removeAcademy(aIdx)}
                className="text-xs text-red-400 hover:text-red-600"
              >
                삭제
              </button>
            )}
          </div>

          <div className="p-4 flex flex-col gap-4">
            {/* 학원명 + 이동시간 */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">
                  학원 이름
                </label>
                <input
                  type="text"
                  value={academy.academyName}
                  onChange={(e) => updateAcademy(aIdx, 'academyName', e.target.value)}
                  placeholder="예: 영어학원"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">
                  이 학원→1.6까지 이동시간
                </label>
                <div className="relative">
                  <input
                    type="number"
                    value={academy.travelMinutes}
                    onChange={(e) => updateAcademy(aIdx, 'travelMinutes', e.target.value)}
                    placeholder="10"
                    min="0"
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 pr-8"
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-400">
                    분
                  </span>
                </div>
              </div>
            </div>

            {/* 시간 슬롯들 */}
            <div className="flex flex-col gap-3">
              {academy.timeSlots.map((slot, sIdx) => (
                <div
                  key={sIdx}
                  className="bg-gray-50 rounded-lg p-3 flex flex-col gap-2"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-medium text-gray-500">
                      수업 시간 {academy.timeSlots.length > 1 ? sIdx + 1 : ''}
                    </span>
                    {academy.timeSlots.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeSlot(aIdx, sIdx)}
                        className="text-xs text-red-400 hover:text-red-600"
                      >
                        삭제
                      </button>
                    )}
                  </div>

                  {/* 요일 선택 */}
                  <div>
                    <p className="text-xs text-gray-500 mb-1.5">수업 요일</p>
                    <div className="flex gap-1.5 flex-wrap">
                      {DAYS_OF_WEEK.map((day) => (
                        <button
                          key={day}
                          type="button"
                          onClick={() => toggleDay(aIdx, sIdx, day)}
                          className={`w-9 h-9 rounded-full text-sm font-medium transition-colors ${
                            slot.days.includes(day)
                              ? 'bg-blue-600 text-white'
                              : 'bg-white border border-gray-300 text-gray-600 hover:border-blue-400'
                          }`}
                        >
                          {day}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* 시간 입력 */}
                  <div className="flex items-center gap-2">
                    <input
                      type="time"
                      value={slot.startTime}
                      onChange={(e) => updateSlot(aIdx, sIdx, 'startTime', e.target.value)}
                      className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <span className="text-gray-400 text-sm">~</span>
                    <input
                      type="time"
                      value={slot.endTime}
                      onChange={(e) => updateSlot(aIdx, sIdx, 'endTime', e.target.value)}
                      className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
              ))}

              <button
                type="button"
                onClick={() => addSlot(aIdx)}
                className="self-start text-xs text-blue-600 hover:text-blue-800 font-medium"
              >
                + 다른 시간대 추가
              </button>
            </div>
          </div>
        </div>
      ))}

      <button
        type="button"
        onClick={addAcademy}
        className="w-full py-3 border-2 border-dashed border-gray-300 rounded-xl text-sm text-gray-500 hover:border-blue-400 hover:text-blue-600 transition-colors"
      >
        + 학원 추가
      </button>

      {error && (
        <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-4 py-3">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={loading}
        className="w-full py-4 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 text-white font-semibold rounded-xl transition-colors text-base"
      >
        {loading ? '제출 중...' : '시간표 제출'}
      </button>
    </form>
  );
}
