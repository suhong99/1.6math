'use client';

import React from 'react';
import { useEffect, useState } from 'react';
import { FeedBack, readSuggest } from '@/firestore/helper/suggest';

const FeedbackList = () => {
  const [feedbacks, setFeedbacks] = useState<(FeedBack & { id: string })[]>([]);
  const [loading, setLoading] = useState<boolean>(true); // 로딩 상태 추가

  useEffect(() => {
    const fetchFeedbacks = async () => {
      setLoading(true); // 데이터 로딩 시작
      const feedbackList = await readSuggest();
      setFeedbacks(feedbackList);
      setLoading(false); // 데이터 로딩 완료
    };

    fetchFeedbacks();
  }, []);

  return (
    <div>
      {loading ? ( // 로딩 중일 때 메시지 표시
        <p>로딩 중...</p>
      ) : feedbacks.length > 0 ? (
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th>제목</th>
              <th>학년</th>
              <th>카테고리</th>
              <th>날짜</th>
            </tr>
          </thead>
          <tbody>
            {feedbacks.map(({ id, grade, category, title, date }) => (
              <tr key={id}>
                <td>{title}</td>
                <td>{grade}</td>
                <td>{category}</td>
                <td>{date.toDate().toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>등록된 피드백이 없습니다.</p>
      )}
    </div>
  );
};

export default FeedbackList;
