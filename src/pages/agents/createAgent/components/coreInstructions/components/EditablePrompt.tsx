import React, { useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setCreateAgent } from '../../../../../../redux/agents/action';
import { RootState } from '../../../../../../redux';
import TextArea from 'antd/es/input/TextArea';

interface EditablePromptProps {
  value: string | undefined;
  onChange: (value: string) => void;
  onCursorChange: (position: number) => void;
  cursorPosition: number;
  placeholder?: string;
}

export function EditablePrompt({
  value,
  onChange,
  onCursorChange,
  cursorPosition,
  placeholder,
}: EditablePromptProps) {
  const editorRef = useRef<HTMLDivElement>(null);

  // Update the contentEditable element with formatted HTML
  useEffect(() => {
    if (!editorRef.current) return;

    const parts = value?.split(/(\{\{[^}]+\}\}|\[[^\]]+\])/g);
    if (parts === undefined) return;

    editorRef.current.innerHTML = parts
      .map((part) => {
        if (part.match(/^\{\{[^}]+\}\}$/)) {
          return `<span class="inline-block bg-blue-950 border border-blue-800 rounded px-1.5 py-0.5 text-blue-300 text-sm" contenteditable="false">${part}</span>`;
        }
        if (part.match(/^\[[^\]]+\]$/)) {
          return `<span class="inline-block bg-purple-950 border border-purple-800 rounded px-1.5 py-0.5 text-purple-300 text-sm" contenteditable="false">${part}</span>`;
        }
        return part;
      })
      .join('');

    const selection = window.getSelection();
    if (selection && editorRef.current) {
      let currentLength = 0;
      let targetNode: Node | null = null;
      let targetOffset = 0;

      // Find target node and set the cursor position
      const findTargetNode = (node: Node) => {
        if (currentLength >= cursorPosition) {
          return;
        }

        if (node.nodeType === Node.TEXT_NODE) {
          const length = node.textContent?.length || 0;
          if (currentLength + length >= cursorPosition) {
            targetNode = node;
            targetOffset = cursorPosition - currentLength;
          }
          currentLength += length;
        } else {
          for (const child of Array.from(node.childNodes)) {
            findTargetNode(child);
            if (targetNode) break;
          }
        }
      };

      findTargetNode(editorRef.current);

      if (targetNode) {
        const range = document.createRange();
        range.setStart(targetNode, targetOffset);
        range.collapse(true);
        selection.removeAllRanges();
        selection.addRange(range);
      }
    }
  }, [value, cursorPosition]);

  const dispatch = useDispatch();
  const createAgent = useSelector((state: RootState) => state.agents.agent);

  // Handle input changes and update state
  const handleInput = (e: React.FormEvent<HTMLDivElement>) => {
    const text = Array.from(e.currentTarget.childNodes)
      .map((node) => {
        if (node.nodeType === Node.TEXT_NODE) {
          return node.textContent;
        }
        if (node instanceof HTMLElement) {
          return node.textContent;
        }
        return '';
      })
      .join('');

    onChange(text);

    const selection = window.getSelection();
    if (selection) {
      let position = 0;
      let currentNode = editorRef.current?.firstChild;

      while (currentNode && currentNode !== selection.focusNode) {
        if (currentNode.nodeType === Node.TEXT_NODE) {
          position += currentNode.textContent?.length || 0;
        } else if (currentNode instanceof HTMLElement) {
          position += currentNode.textContent?.length || 0;
        }
        currentNode = currentNode.nextSibling;
      }

      position += selection.focusOffset;
      onCursorChange(position);
    }
  };

  // Handle Enter key press for adding new line
  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault(); // Prevent default behavior (inserting new line)

      const selection = window.getSelection();
      if (selection && value) {
        const position = selection.focusOffset;
        const before = value.slice(0, position);
        const after = value.slice(position);
        const newText = `${before}\n${after}`; // Insert new line

        onChange(newText); // Update the text with a new line

        // Update cursor position after the new line
        onCursorChange(position + 1); // Move cursor to the next line
      }
    }
  };

  return (
    <div
      ref={editorRef}
      contentEditable
      className="w-full h-[72vh] px-3 py-2 bg-gray-900 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 overflow-auto whitespace-pre-wrap text-sm text-gray-100"
      style={{ minHeight: '10rem' }}
      data-placeholder={placeholder}
      onInput={handleInput}
      onKeyDown={handleKeyDown}
    />
  );
}
