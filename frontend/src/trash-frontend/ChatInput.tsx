import React, { useState } from 'react';

interface ChatInputProps {
  onSend: (question: string) => void;
  disabled: boolean;
}

export const ChatInput: React.FC<ChatInputProps> = ({ onSend, disabled }) => {
  const [input, setInput] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || disabled) return;
    onSend(input.trim());
    setInput(''); // Clear entry line
  };

  return (
    <div className="border-t border-slate-800 bg-slate-900/80 backdrop-blur-md p-4 md:p-6">
      <form onSubmit={handleSubmit} className="max-w-3xl mx-auto relative flex items-center">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          disabled={disabled}
          placeholder="Ask a question about the system source documentation..."
          className="w-full bg-slate-950 text-slate-200 placeholder-slate-500 text-sm rounded-xl pl-4 pr-12 py-3.5 border border-slate-800 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all antialiased"
        />
        <button
          type="submit"
          disabled={disabled || !input.trim()}
          className="absolute right-2 p-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white disabled:opacity-30 disabled:hover:bg-indigo-600 disabled:cursor-not-allowed transition-colors"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 10.5L12 3m0 0l7.5 7.5M12 3v18" />
          </svg>
        </button>
      </form>
    </div>
  );
};
