import React from 'react';
import { FeedbackCategory } from '../const/data';
import { useRouter } from 'next/navigation';
import { FeedBack } from '@/firestore/helper/suggest';
import { formatRowData } from '../helper/table';

interface FeedbackTableProps {
  feedbacks: (FeedBack & { id: string })[];
}

const FeedbackTable: React.FC<FeedbackTableProps> = ({ feedbacks }) => {
  const router = useRouter();

  return (
    <table className="w-full border-collapse border border-gray-300">
      <thead className="bg-gray-100">
        <tr>
          {FeedbackCategory.map((header) => (
            <th
              key={header}
              className="border border-gray-300 px-4 py-2 text-center"
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
            {formatRowData(feedback).map((data, index) => (
              <td
                key={index}
                className={`border border-gray-300 px-4 py-2 ${
                  index === 2 ? 'truncate max-w-[150px]' : ''
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

export default FeedbackTable;
