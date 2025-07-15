import React, { useState, useRef } from 'react';
import JoditEditor from 'jodit-react';

const AddText = ({ placeholder }) => {
  const editor = useRef(null);
  const [content, setContent] = useState('');

  const config = {
    readonly: false,
    placeholder: placeholder || 'Start typing...',
  };

  return (
    <JoditEditor
      ref={editor}
      value={content}
      config={config}
      onBlur={(newContent) => setContent(newContent)}
      style={{ height: '1px', backgroundColor: 'white', color: 'black' }}
      onChange={(newContent) => setContent(newContent)}
    />
  );
};

export default AddText;