import dynamic from 'next/dynamic';
import React from 'react';
import 'react-quill/dist/quill.snow.css';

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

interface RichTextEditorProps {
  text: string;
  onTextChange: (newText: string) => void;
}

const RichTextEditor: React.FC<RichTextEditorProps> = ({ text, onTextChange }) => {
  const handleChange = (content: string) => {
    onTextChange(content);
  };

  return <ReactQuill value={text} onChange={handleChange} />;
};

export default RichTextEditor;
