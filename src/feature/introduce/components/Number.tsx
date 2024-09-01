'use client';

import React from 'react';

const Number = () => {
  return (
    <button
      onClick={() => {
        navigator.clipboard.writeText('052-261-5515');
        alert('052-261-5515' + '가 클립보드에 복사되었습니다');
      }}
      className="text-xl font-semibold"
    >
      상담번호 : 052-261-5515
    </button>
  );
};

export default Number;
