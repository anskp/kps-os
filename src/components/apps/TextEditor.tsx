import { useState } from 'react';
import { Save, FileText, Bold, Italic, Underline } from 'lucide-react';

const TextEditor = () => {
  const [content, setContent] = useState('Welcome to Notepad\n\nStart typing your document here...');
  const [fileName, setFileName] = useState('Untitled.txt');
  const [isBold, setIsBold] = useState(false);
  const [isItalic, setIsItalic] = useState(false);
  const [isUnderline, setIsUnderline] = useState(false);

  const handleSave = () => {
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = fileName;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="h-full flex flex-col">
      {/* Toolbar */}
      <div className="bg-gray-50 border-b p-2 flex items-center space-x-2">
        <button
          onClick={handleSave}
          className="flex items-center space-x-1 px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
        >
          <Save size={16} />
          <span>Save</span>
        </button>
        
        <div className="w-px h-6 bg-gray-300" />
        
        <button
          onClick={() => setIsBold(!isBold)}
          className={`p-1 rounded ${isBold ? 'bg-blue-500 text-white' : 'hover:bg-gray-200'}`}
        >
          <Bold size={16} />
        </button>
        <button
          onClick={() => setIsItalic(!isItalic)}
          className={`p-1 rounded ${isItalic ? 'bg-blue-500 text-white' : 'hover:bg-gray-200'}`}
        >
          <Italic size={16} />
        </button>
        <button
          onClick={() => setIsUnderline(!isUnderline)}
          className={`p-1 rounded ${isUnderline ? 'bg-blue-500 text-white' : 'hover:bg-gray-200'}`}
        >
          <Underline size={16} />
        </button>
        
        <div className="w-px h-6 bg-gray-300" />
        
        <input
          type="text"
          value={fileName}
          onChange={(e) => setFileName(e.target.value)}
          className="px-2 py-1 border rounded text-sm min-w-32"
        />
      </div>

      {/* Editor */}
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className={`flex-1 p-4 border-none outline-none resize-none font-mono text-sm ${
          isBold ? 'font-bold' : ''
        } ${isItalic ? 'italic' : ''} ${isUnderline ? 'underline' : ''}`}
        style={{ fontFamily: 'Consolas, monospace' }}
      />
      
      {/* Status Bar */}
      <div className="bg-gray-50 border-t px-3 py-1 text-xs text-gray-600 flex justify-between">
        <span>Lines: {content.split('\n').length}</span>
        <span>Characters: {content.length}</span>
      </div>
    </div>
  );
};

export default TextEditor;