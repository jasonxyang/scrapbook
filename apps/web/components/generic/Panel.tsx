// Panel.tsx

import React from 'react';

type PanelProps = {
  title: string;
  content: string;
};

const Panel: React.FC<PanelProps> = ({ title, content }) => {
  return (
    <div className="bg-gray-100 p-4 rounded-md shadow-md">
      <h2>{title}</h2>
      <p>{content}</p>
    </div>
  );
};

export default Panel;
