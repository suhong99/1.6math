'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { updateReplyState } from '@/firestore/helper/suggest';
import { ReplyState } from '../const/type';

interface ReplyFeedbackProps {
  id: string;
}

const ReplyFeedback: React.FC<ReplyFeedbackProps> = ({ id }) => {
  const router = useRouter();

  const handleReplyChange = async (newReplyState: ReplyState) => {
    const confirmChange = confirm(
      `"${newReplyState}" 상태로 변경하시겠습니까?`
    );
    if (confirmChange) {
      try {
        await updateReplyState(id, newReplyState);
        alert('처리가 완료되었습니다.');
        router.refresh();
      } catch (error) {
        alert('상태 변경 중 오류가 발생했습니다.');
      }
    }
  };

  const handleGoBack = () => {
    router.back();
  };

  return (
    <div className="flex items-center justify-between mt-6 pt-4">
      <div className="flex flex-col">
        <label htmlFor="reply-state" className="sr-only">
          처리 상태 변경
        </label>
        <select
          id="reply-state"
          onChange={(e) => handleReplyChange(e.target.value as ReplyState)}
          defaultValue=""
          className="h-10 p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="" disabled>
            어떻게 처리하셨나요?
          </option>
          <option value="해결">해결</option>
          <option value="수용불가">수용불가</option>
          <option value="처리중">처리중</option>
          <option value="고려대상">고려대상</option>
          <option value="미응답">미응답</option>
        </select>
      </div>
      <button
        onClick={handleGoBack}
        className="ml-4 h-10 px-4 bg-blue-600 text-white font-medium rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      >
        뒤로가기
      </button>
    </div>
  );
};

export default ReplyFeedback;
