import { FeedBack } from '@/firestore/helper/suggest';

export const formatTableData = (feedback: FeedBack) => [
  feedback.category,
  feedback.grade,
  feedback.title.length > 10
    ? `${feedback.title.slice(0, 10)}...`
    : feedback.title,
  feedback.date.toDate().toLocaleDateString('ko-KR'),
  feedback.reply || '미응답',
  feedback.lastChecked
    ? feedback.lastChecked.toDate().toLocaleDateString('ko-KR')
    : '미확인',
];
