import React from 'react';
import { useFilterParams } from '../hooks/useFilterParams';

const FeedbackFilter = () => {
  const { currentFilter, setFilter } = useFilterParams();

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setFilter(event.target.value); // filter 값 변경
  };

  return (
    <div>
      <label htmlFor="filter">필터 선택:</label>
      <select id="filter" value={currentFilter} onChange={handleChange}>
        <option value="all">모두</option>
        <option value="해결">해결</option>
        <option value="수용불가">수용불가</option>
        <option value="처리중">처리중</option>
        <option value="고려대상">고려대상</option>
        <option value="미응답">미응답</option>
      </select>
    </div>
  );
};

export default FeedbackFilter;
