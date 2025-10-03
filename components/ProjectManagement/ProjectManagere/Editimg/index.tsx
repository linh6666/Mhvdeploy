'use client';

import React from 'react';

type EditProps = {
//   idItem: string[];
  port?: number;
  onSearch: () => void;
  language: 'vi' | 'en';
};

const ViewEdit = ({  port, onSearch, language }: EditProps) => {
  return (
    <div>
      <h3>Edit Image</h3>
      <p>Port: {port}</p>
      <p>Language: {language}</p>
      <button onClick={onSearch}>
        {language === 'vi' ? 'Tìm kiếm' : 'Search'}
      </button>
    </div>
  );
};

export default ViewEdit;