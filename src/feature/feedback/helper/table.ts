export const formatRowData = (feedback: FeedBack) => [
  feedback.category,
  feedback.grade,
  feedback.title.length > 10
    ? `${feedback.title.slice(0, 10)}...`
    : feedback.title,
  feedback.date.toDate().toLocaleDateString('ko-KR'),
  feedback.reply || '응답 없음',
  feedback.lastChecked
    ? feedback.lastChecked.toDate().toLocaleDateString('ko-KR')
    : '확인되지 않음',
];
