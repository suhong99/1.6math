import React from 'react';

interface SuggestionCardProps {
  title: string;
  date: Date;
  content: string;
  grade: string;
  lastChecked: Date | null;
  reply: string | null;
}

const FeedbackCard: React.FC<SuggestionCardProps> = ({
  title,
  date,
  content,
  grade,
  lastChecked,
  reply,
}) => {
  return (
    <div className="mt-4 border p-4 mb-4 bg-white shadow-md ">
      <h2 className="text-xl font-semibold text-gray-800 mb-2">
        제목 : {title}
      </h2>
      <p className="text-sm text-gray-800 mb-4 flex justify-between">
        <div>
          <strong className="font-bold ">학년 : </strong>
          {grade}
        </div>
        <div>
          <strong className="font-bold ">문의일 : </strong>
          {new Intl.DateTimeFormat('ko-KR').format(date)}
        </div>
      </p>
      <p className="text-lg font-bold text-gray-700 leading-relaxed border-t mb-4">
        문의 내용
      </p>

      <p className="text-lg text-gray-700 leading-relaxed mb-4 min-h-[200px]">
        {content}
      </p>
      <div className="flex justify-between items-center text-sm text-gray-600 border-t pt-2 mt-2">
        <span className="flex items-center gap-1">
          <strong className="font-bold text-gray-800">처리 상태 : </strong>
          <span className="text-green-600 font-medium">
            {reply || '미응답'}
          </span>
        </span>
        <span className="flex items-center gap-1">
          <strong className=" text-gray-800 font-bold">최종 응답일 :</strong>
          <span className="text-gray-700">
            {lastChecked
              ? new Intl.DateTimeFormat('ko-KR').format(lastChecked)
              : '미확인'}
          </span>
        </span>
      </div>
    </div>
  );
};

export default FeedbackCard;
