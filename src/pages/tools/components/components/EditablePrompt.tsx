import React, { useRef, useEffect } from 'react';

interface EditablePromptProps {
  value: string;
  onChange: (value: string) => void;
  onCursorChange: (position: number) => void;
  placeholder?: string;
}

export function EditablePrompt({ value, onChange, onCursorChange, placeholder }: EditablePromptProps) {
  const editorRef = useRef<HTMLDivElement>(null);
  const lastValueRef = useRef(value);

  useEffect(() => {
    if (editorRef.current && value !== lastValueRef.current) {
      const parts = value.split(/(\{\{[^}]+\}\})/g);
      editorRef.current.innerHTML = parts.map((part, index) => {
        if (part.match(/^\{\{[^}]+\}\}$/)) {
          return `<span class="inline-block bg-blue-100 border border-blue-200 rounded px-1.5 py-0.5 text-blue-700 text-sm">${part}</span>`;
        }
        return part;
      }).join('');

      // Try to restore cursor position if possible
      try {
        const selection = window.getSelection();
        if (selection && editorRef.current) {
          let currentNode = editorRef.current.firstChild;
          let currentOffset = 0;
          
          // Find the appropriate text node and offset
          while (currentNode) {
            if (currentNode.nodeType === Node.TEXT_NODE) {
              currentOffset = currentNode.textContent?.length || 0;
            }
            currentNode = currentNode.nextSibling;
          }

          // Place cursor at the end if we can't determine a better position
          const range = document.createRange();
          range.selectNodeContents(editorRef.current);
          range.collapse(false);
          selection.removeAllRanges();
          selection.addRange(range);
        }
      } catch (error) {
        console.debug('Cursor position could not be restored');
      }

      lastValueRef.current = value;
    }
  }, [value]);

  const handleInput = (e: React.FormEvent<HTMLDivElement>) => {
    const text = e.currentTarget.innerText;
    onChange(text);

    const selection = window.getSelection();
    if (selection) {
      let position = 0;
      const container = selection.focusNode;
      
      if (container) {
        // Calculate actual cursor position by traversing nodes
        let currentNode = editorRef.current?.firstChild;
        while (currentNode && currentNode !== container) {
          if (currentNode.nodeType === Node.TEXT_NODE) {
            position += currentNode.textContent?.length || 0;
          }
          currentNode = currentNode.nextSibling;
        }
        position += selection.focusOffset;
      }
      
      onCursorChange(position);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      const text = editorRef.current?.innerText || '';
      const selection = window.getSelection();
      if (selection) {
        const position = selection.focusOffset;
        const before = text.slice(0, position);
        const after = text.slice(position);
        onChange(before + '\n' + after);
      }
    }
  };

  return (
    <div
      ref={editorRef}
      contentEditable
      onInput={handleInput}
      onKeyDown={handleKeyDown}
      className="w-full h-48 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 overflow-auto whitespace-pre-wrap"
      style={{ minHeight: '12rem' }}
      data-placeholder={placeholder}
    />
  );
}