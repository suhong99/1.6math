import { Timestamp } from 'firebase/firestore';
import type { SeasonType } from './academySchedule';

export type DayOfWeek = '월' | '화' | '수' | '목' | '금' | '토' | '일';

export const DAYS_OF_WEEK: DayOfWeek[] = [
  '월',
  '화',
  '수',
  '목',
  '금',
  '토',
  '일',
];

export interface ClassRoom {
  id: string;
  grade: string;
  name: string;
  yearMonth: number; // 예: 202605 (2026년 5월)
  seasonType: SeasonType; // 기존 데이터 호환을 위해 옵셔널
  expiresAt: Timestamp;
  createdAt: Timestamp;
}

export type { SeasonType };

// 같은 학원의 특정 요일들 + 시간 묶음
export interface AcademyTimeSlot {
  days: DayOfWeek[];
  startTime: string; // "HH:MM"
  endTime: string;   // "HH:MM"
}

// 학원 단위 — 이동시간과 수업 시간표 포함
export interface AcademySchedule {
  academyName: string;
  travelMinutes: number;
  timeSlots: AcademyTimeSlot[];
}

export interface StudentSchedule {
  id: string;
  classId: string;
  studentName: string;
  academies: AcademySchedule[];
  submittedAt: Timestamp;
}

export type ClassStatus = 'active' | 'expired';

export const getClassStatus = (expiresAt: Timestamp): ClassStatus =>
  new Date() > expiresAt.toDate() ? 'expired' : 'active';

export const toYearMonth = (year: number, month: number): number =>
  year * 100 + month;

export const formatYearMonth = (ym: number): string => {
  const year = Math.floor(ym / 100);
  const month = ym % 100;
  return `${year}년 ${month}월`;
};

export const DURATION_OPTIONS: { label: string; hours: number }[] = [
  { label: '30분', hours: 0.5 },
  { label: '1시간', hours: 1 },
  { label: '3시간', hours: 3 },
  { label: '6시간', hours: 6 },
  { label: '12시간', hours: 12 },
  { label: '1일', hours: 24 },
  { label: '2일', hours: 48 },
  { label: '3일', hours: 72 },
  { label: '5일', hours: 120 },
  { label: '7일', hours: 168 },
  { label: '14일', hours: 336 },
  { label: '30일', hours: 720 },
];

export const getRemainingTime = (expiresAt: Timestamp): string => {
  const diff = expiresAt.toDate().getTime() - Date.now();
  if (diff <= 0) return '만료됨';

  const totalMinutes = Math.floor(diff / 60000);
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;

  if (hours >= 24) {
    const days = Math.floor(hours / 24);
    const remainingHours = hours % 24;
    return remainingHours > 0
      ? `${days}일 ${remainingHours}시간 남음`
      : `${days}일 남음`;
  }
  if (hours > 0) return `${hours}시간 ${minutes}분 남음`;
  return `${minutes}분 남음`;
};

// 특정 요일에 수업이 있는 모든 학원+시간 추출 (관리자 테이블용)
export const getDayEntries = (
  academies: AcademySchedule[],
  day: DayOfWeek
): { academyName: string; travelMinutes: number; startTime: string; endTime: string }[] =>
  academies.flatMap((a) =>
    a.timeSlots
      .filter((slot) => slot.days.includes(day))
      .map((slot) => ({
        academyName: a.academyName,
        travelMinutes: a.travelMinutes,
        startTime: slot.startTime,
        endTime: slot.endTime,
      }))
  );
