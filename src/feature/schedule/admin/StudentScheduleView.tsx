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
import { DAYS_OF_WEEK, getDayEntries } from '../const/types';

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
}

export default function StudentScheduleView({ classId, className }: Props) {
  const [schedules, setSchedules] = useState<StudentSchedule[]>([]);
  const [loading, setLoading] = useState(true);
  const [detail, setDetail] = useState<StudentSchedule | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [edit, setEdit] = useState<EditState | null>(null);
  const [editError, setEditError] = useState('');
  const [saving, setSaving] = useState(false);

  const reload = () =>
    getStudentSchedules(classId)
      .then(setSchedules)
      .finally(() => setLoading(false));

  useEffect(() => {
    reload();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [classId]);

  /* ── 삭제 ── */
  const handleDelete = async (id: string) => {
    await deleteStudentSchedule(id);
    setDeleteId(null);
    setLoading(true);
    reload();
  };

  /* ── 수정 저장 ── */
  const handleSave = async () => {
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
  ) => {
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

  const toggleEditDay = (aIdx: number, sIdx: number, day: DayOfWeek) => {
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
  ) => {
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

  return (
    <div className="flex flex-col gap-6">
      <p className="text-sm text-gray-500">
        총 <strong>{schedules.length}명</strong>이 제출했습니다.
      </p>

      {/* ── 테이블 ── */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="bg-gray-50">
              <th className="border border-gray-200 px-3 py-2 text-left font-medium text-gray-700 whitespace-nowrap">
                이름
              </th>
              {DAYS_OF_WEEK.map((day) => (
                <th
                  key={day}
                  className="border border-gray-200 px-2 py-2 text-center font-medium text-gray-700 min-w-[100px]"
                >
                  {day}
                </th>
              ))}
              <th className="border border-gray-200 px-3 py-2 text-center font-medium text-gray-700 whitespace-nowrap">
                제출일
              </th>
              <th className="border border-gray-200 px-3 py-2 text-center font-medium text-gray-700">
                관리
              </th>
            </tr>
          </thead>
          <tbody>
            {schedules.map((s) => (
              <>
                <tr
                  key={s.id}
                  className="hover:bg-gray-50 cursor-pointer transition-colors"
                  onClick={() => setDetail(s)}
                >
                  <td className="border border-gray-200 px-3 py-2 font-medium whitespace-nowrap">
                    {s.studentName}
                  </td>
                  {DAYS_OF_WEEK.map((day) => {
                    const entries = getDayEntries(s.academies, day);
                    return (
                      <td
                        key={day}
                        className="border border-gray-200 px-2 py-2 text-xs text-center align-top"
                      >
                        {entries.length > 0 ? (
                          <div className="flex flex-col gap-1">
                            {entries.map((e, i) => (
                              <div key={i} className="leading-tight">
                                <div className="font-medium text-gray-700">
                                  {e.academyName}
                                </div>
                                <div className="text-gray-500">
                                  {e.startTime}~{e.endTime}
                                </div>
                                <div className="text-gray-400">
                                  이동 {e.travelMinutes}분
                                </div>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <span className="text-gray-300">-</span>
                        )}
                      </td>
                    );
                  })}
                  <td className="border border-gray-200 px-3 py-2 text-xs text-center text-gray-500 whitespace-nowrap">
                    {s.submittedAt.toDate().toLocaleDateString('ko-KR')}
                  </td>
                  <td
                    className="border border-gray-200 px-3 py-2 text-center"
                    onClick={(e) => e.stopPropagation()}
                  >
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
                      colSpan={DAYS_OF_WEEK.length + 3}
                      className="border border-red-200 bg-red-50 px-4 py-3"
                    >
                      <div className="flex items-center gap-3 flex-wrap">
                        <p className="text-xs text-red-700 font-medium flex-1">
                          <strong>{s.studentName}</strong> 학생의 시간표를 삭제합니다. 되돌릴 수 없습니다.
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
              >
                ✕
              </button>
            </div>

            {detail.academies.length === 0 ? (
              <p className="text-sm text-gray-400">등록된 학원이 없습니다.</p>
            ) : (
              <div className="flex flex-col gap-4">
                {detail.academies.map((academy, i) => (
                  <div key={i} className="border border-gray-200 rounded-xl overflow-hidden">
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
                        <div key={j} className="flex items-center gap-2 text-sm flex-wrap">
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
                                  academies: prev.academies.filter((_, i) => i !== aIdx),
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
                            updateEditAcademy(aIdx, 'travelMinutes', e.target.value)
                          }
                          min="0"
                          className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                    </div>

                    {academy.timeSlots.map((slot, sIdx) => (
                      <div key={sIdx} className="bg-gray-50 rounded-lg p-3 flex flex-col gap-2">
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-gray-500">
                            시간 {academy.timeSlots.length > 1 ? sIdx + 1 : ''}
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
                              updateEditSlot(aIdx, sIdx, 'startTime', e.target.value)
                            }
                            className="flex-1 border border-gray-300 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                          <span className="text-gray-400 text-sm">~</span>
                          <input
                            type="time"
                            value={slot.endTime}
                            onChange={(e) =>
                              updateEditSlot(aIdx, sIdx, 'endTime', e.target.value)
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
                                    : { ...a, timeSlots: [...a.timeSlots, makeSlot()] }
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
