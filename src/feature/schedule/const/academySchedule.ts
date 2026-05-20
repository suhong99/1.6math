export type SeasonType = '학기중' | '방학';

export interface Period {
  period: number;
  start: string; // "HH:MM"
  end: string;   // "HH:MM" — 마지막 교시는 "24:00" (자정)
}

export interface SeasonSchedule {
  weekday: Period[]; // 학기중: 월~금 / 방학: 모든 요일
  weekend: Period[]; // 학기중: 토~일 / 방학: weekday와 동일
}

// 학기중 평일: 15:20~24:00, 100분/교시
const SEMESTER_WEEKDAY: Period[] = [
  { period: 1, start: '15:20', end: '17:00' },
  { period: 2, start: '17:00', end: '18:45' },
  { period: 3, start: '18:45', end: '20:30' },
  { period: 4, start: '20:30', end: '22:15' },
  { period: 5, start: '22:15', end: '24:00' },
];

// 학기중 토/일: 09:00~23:00, 100분/교시 (점심 12:20~13:00)
const SEMESTER_WEEKEND: Period[] = [
  { period: 1, start: '09:00', end: '10:40' },
  { period: 2, start: '10:40', end: '12:20' },
  { period: 3, start: '13:00', end: '14:40' },
  { period: 4, start: '14:40', end: '16:20' },
  { period: 5, start: '16:20', end: '18:00' },
  { period: 6, start: '18:00', end: '19:40' },
  { period: 7, start: '19:40', end: '21:20' },
  { period: 8, start: '21:20', end: '23:00' },
];

// 방학 전일: 80분×6교시(09:00~17:00) + 저녁휴식(17:00~18:00) + 90분×4교시(18:00~24:00)
const VACATION_ALL: Period[] = [
  { period: 1,  start: '09:00', end: '10:20' },
  { period: 2,  start: '10:20', end: '11:40' },
  { period: 3,  start: '11:40', end: '13:00' },
  { period: 4,  start: '13:00', end: '14:20' },
  { period: 5,  start: '14:20', end: '15:40' },
  { period: 6,  start: '15:40', end: '17:00' },
  { period: 7,  start: '18:00', end: '19:30' },
  { period: 8,  start: '19:30', end: '21:00' },
  { period: 9,  start: '21:00', end: '22:30' },
  { period: 10, start: '22:30', end: '24:00' },
];

export const ACADEMY_SCHEDULE: Record<SeasonType, SeasonSchedule> = {
  학기중: {
    weekday: SEMESTER_WEEKDAY,
    weekend: SEMESTER_WEEKEND,
  },
  방학: {
    weekday: VACATION_ALL,
    weekend: VACATION_ALL,
  },
};
