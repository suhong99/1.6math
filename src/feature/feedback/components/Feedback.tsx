'use client';

import React, { useEffect, useState } from 'react';
import { FeedBack, readSuggest } from '@/firestore/helper/suggest';
import Loading from '@/shared/components/Loading';
import { FeedbackTableMobile, FeedbackTable } from './FeedbackTable';
import FeedbackFilter from './FeedbackFilter';
import { useSearchParams } from 'next/navigation';
import { ReplyState } from '../const/type';

const Feedback = () => {
  const [feedbacks, setFeedbacks] = useState<(FeedBack & { id: string })[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [getAll, setGetAll] = useState<boolean>(false);
  const searchParams = useSearchParams();

  // URL에서 filter 값을 추출, 없으면 'all'을 기본값으로 사용
  const filter = (searchParams.get('filter') as ReplyState) || 'all';
  useEffect(() => {
    const fetchFeedbacks = async () => {
      setLoading(true);
      const feedbackList = await readSuggest(filter);
      setFeedbacks(feedbackList);
      setLoading(false);
    };

    fetchFeedbacks();
  }, [filter]);

  return (
    <div className="overflow-x-auto">
      <FeedbackFilter />
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
