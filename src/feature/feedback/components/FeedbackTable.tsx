import React from 'react';
import { FeedbackCategory } from '../const/data';
import { useRouter } from 'next/navigation';
import { FeedBack } from '@/firestore/helper/suggest';
import { formatTableData } from '../helper/table';

interface FeedbackTableProps {
  feedbacks: (FeedBack & { id: string })[];
}

export const FeedbackTable: React.FC<FeedbackTableProps> = ({ feedbacks }) => {
  const router = useRouter();
  return (
    <table className="w-full max-w-[1280px] border-collapse border border-gray-300 hidden sm:table">
      <thead className="bg-gray-100">
        <tr>
          {FeedbackCategory.map((header, index) => (
            <th
              key={header}
              colSpan={index === 2 ? 2 : 1}
              className={`border border-gray-300 px-4 py-2 text-center text-sm lg:text-lg`}
            >
              {header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {feedbacks.map((feedback) => (
          <tr
            key={feedback.id}
            onClick={() => router.push(`/feedback/${feedback.id}`)}
            className="cursor-pointer hover:bg-gray-100 transition"
          >
            {formatTableData(feedback).map((data, index) => (
              <td
                key={index}
                colSpan={index === 2 ? 2 : 1}
                className={`border border-gray-300 px-4 py-2 ${
                  index === 2 ? 'truncate max-w-none' : ''
                }`}
                title={index === 2 ? feedback.title : undefined}
              >
                {data}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export const FeedbackTableMobile: React.FC<FeedbackTableProps> = ({
  feedbacks,
}) => {
  const router = useRouter();

  return (
    <div className="sm:hidden">
      {feedbacks.map((feedback) => (
        <div
          key={feedback.id}
          onClick={() => router.push(`/feedback/${feedback.id}`)}
          className="border border-gray-300 rounded-lg p-4 mb-4 hover:bg-gray-100 transition cursor-pointer"
        >
          {formatTableData(feedback).map((data, index) => (
            <div
              key={index}
              className="flex justify-between mb-2 text-sm lg:text-base"
            >
              <span className="font-semibold text-gray-600">
                {FeedbackCategory[index]}:
              </span>
              <span
                className={`${index === 2 ? 'truncate max-w-[150px]' : ''}`}
                title={index === 2 ? feedback.title : undefined}
              >
                {data}
              </span>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};
