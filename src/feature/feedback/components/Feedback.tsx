'use client';

import React, { useEffect, useState } from 'react';
import { FeedBack, readSuggest } from '@/firestore/helper/suggest';
import Loading from '@/shared/components/Loading';
import { FeedbackTableMobile, FeedbackTable } from './FeedbackTable';

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

  return (
    <div className="overflow-x-auto">
      {loading ? (
        <Loading />
      ) : feedbacks.length > 0 ? (
        <>
          <FeedbackTable feedbacks={feedbacks} />
          <FeedbackTableMobile feedbacks={feedbacks} />
        </>
      ) : (
        <p className="text-center text-gray-500">등록된 피드백이 없습니다.</p>
      )}
    </div>
  );
};

export default Feedback;
