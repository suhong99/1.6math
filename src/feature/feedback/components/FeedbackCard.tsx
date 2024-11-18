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
    <div className="border rounded-lg p-4 mb-4 bg-white shadow-md">
      <h2 className="text-xl font-semibold text-gray-800 mb-2">{title}</h2>
      <p className="text-sm text-gray-600 mb-4">
        {grade} | {new Intl.DateTimeFormat('ko-KR').format(date)}
      </p>
      <p className="text-lg text-gray-700 leading-relaxed mb-4">{content}</p>
      <div className="flex justify-between text-sm text-gray-600 border-t pt-2 mt-2">
        <span>
          <strong className="font-medium">처리 상태: </strong>
          {reply || '미응답'}
        </span>
        <span>
          <strong className="font-medium">마지막 확인:</strong>
          {lastChecked
            ? new Intl.DateTimeFormat('ko-KR').format(lastChecked)
            : '미확인'}
        </span>
      </div>
    </div>
  );
};

export default FeedbackCard;
