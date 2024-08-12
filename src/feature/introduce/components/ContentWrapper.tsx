import React from 'react';

interface Props {
  title: string;
  children: React.ReactNode;
}

const ContentWrapper: React.FC<Props> = ({ title, children }) => {
  return (
    <div className="bg-gray-100 p-6 rounded-lg shadow-lg max-w-4xl text-gray-800 leading-relaxed lg:px-12 mt-7 sm:mx-6 mx-4 mb-3">
      <h1 className="text-3xl font-extrabold mb-6">{title}</h1>
      {children}
    </div>
  );
};

export default ContentWrapper;
