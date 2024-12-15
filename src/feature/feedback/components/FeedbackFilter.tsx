import React from 'react';
import { useFilterParams } from '../hooks/useFilterParams';

const FeedbackFilter = () => {
  const { currentFilter, setFilter } = useFilterParams();

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setFilter(event.target.value);
  };

  return (
    <div className="flex  sm:justify-end justify-center items-center space-x-2">
      <select
        id="filter"
        value={currentFilter}
        onChange={handleChange}
        className="block w-full max-w-32 px-4 py-2 text-sm text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none focus:border-blue-500 sm:mt-4 mb-4 sm:mr-2 mt-2"
      >
        <option value="all">모든 문의</option>
        <option value="해결">해결된 것</option>
        <option value="수용불가">수용불가</option>
        <option value="처리중">처리중</option>
        <option value="고려대상">고려대상</option>
        <option value="미응답">미응답</option>
      </select>
    </div>
  );
};

export default FeedbackFilter;
