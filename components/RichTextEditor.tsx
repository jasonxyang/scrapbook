import dynamic from 'next/dynamic';
import 'react-quill/dist/quill.snow.css'; // You still import the CSS normally since it doesn't rely on browser globals
import React, { useState } from 'react';

// Dynamically import ReactQuill with SSR disabled
const ReactQuill = dynamic(() => import('react-quill'), {
  ssr: false,
});

interface RichTextEditorProps {
  initialText?: string;
}

const RichTextEditor: React.FC<RichTextEditorProps> = ({ initialText = '' }) => {
  const [text, setText] = useState(initialText);

  const handleChange = (content: string) => {
    setText(content);
  };

  return <ReactQuill value={text} onChange={handleChange} />;
};

export default RichTextEditor;