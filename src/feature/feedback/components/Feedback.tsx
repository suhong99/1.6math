'use client';

import React, { useEffect, useState } from 'react';
import { FeedBack, readSuggest } from '@/firestore/helper/suggest';
import Loading from '@/shared/components/Loading';
import FeedbackTable from './FeedbackTable';

const Feedback = () => {
  const [feedbacks, setFeedbacks] = useState<(FeedBack & { id: string })[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchFeedbacks = async () => {
      setLoading(true);
      const feedbackList = await readSuggest();
      setFeedbacks(feedbackList);
      setLoading(false);
    };

    fetchFeedbacks();
  }, []);

  const formatRowData = (feedback: FeedBack) => [
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

  return (
    <div className="overflow-x-auto">
      {loading ? (
        <Loading />
      ) : feedbacks.length > 0 ? (
        <FeedbackTable feedbacks={feedbacks} formatRowData={formatRowData} />
      ) : (
        <p className="text-center text-gray-500">등록된 피드백이 없습니다.</p>
      )}
    </div>
  );
};

export default Feedback;
