import { FeedBack } from '@/firestore/helper/suggest';
import { Timestamp } from 'firebase/firestore';

const timestampToDate = (timestamp: Timestamp) => {
  return timestamp
    .toDate()
    .toLocaleDateString('ko-KR', {
      year: '2-digit',
      month: '2-digit',
      day: '2-digit',
    })
    .replace(/\//g, '.');
};

export const formatTableData = (feedback: FeedBack) => [
  feedback.category,
  feedback.grade,
  feedback.title.length > 10
    ? `${feedback.title.slice(0, 10)}...`
    : feedback.title,
  timestampToDate(feedback.date),
  feedback.reply || '미응답',
  feedback.lastChecked ? timestampToDate(feedback.lastChecked) : '미확인',
];
