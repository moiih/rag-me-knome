import React from 'react';
import type { ChatState } from '../types';

interface ResponseDisplayProps {
  chat: ChatState;
}

export const ResponseDisplay: React.FC<ResponseDisplayProps> = ({ chat }) => {
  return (
    <div className="flex-1 flex flex-col items-center justify-center p-6 max-w-3xl mx-auto w-full transition-all duration-300">
      
      {/* Central Circular Asset Frame */}
      <div className="relative mb-8 group">
        <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 opacity-30 blur-md group-hover:opacity-50 transition duration-500" />
        <div className="relative w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden border-2 border-slate-700 bg-slate-900 flex items-center justify-center">
          <img 
            src="https://unsplash.com" 
            alt="AI Assistant Core Visual" 
            className="w-full h-full object-cover grayscale opacity-80 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500"
          />
        </div>
      </div>

      {/* Dynamic Content Frame */}
      <div className="w-full min-h-[180px] flex flex-col gap-4 justify-center">
        {chat.isLoading ? (
          <div className="flex flex-col items-center gap-3">
            <div className="w-6 h-6 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin" />
            <p className="text-xs text-slate-400 font-mono tracking-wider animate-pulse">ANALYSING RESOURCE CONTEXT...</p>
          </div>
        ) : chat.question && chat.answer ? (
          <div className="space-y-4 animate-fadeIn">
            {/* User Question */}
            <div className="bg-slate-800/40 border border-slate-800 p-4 rounded-xl">
              <span className="text-[10px] font-bold tracking-widest text-slate-500 uppercase block mb-1">Current Inquiry</span>
              <p className="text-sm text-slate-200 antialiased font-medium">{chat.question}</p>
            </div>
            
            {/* System Answer */}
            <div className="bg-indigo-950/20 border border-indigo-900/40 p-5 rounded-xl">
              <span className="text-[10px] font-bold tracking-widest text-indigo-400 uppercase block mb-1">System Response</span>
              <p className="text-sm text-slate-300 antialiased leading-relaxed">{chat.answer}</p>
            </div>
          </div>
        ) : (
          <div className="text-center">
            <h3 className="text-base font-semibold text-slate-400 antialiased">System Ready</h3>
            <p className="text-xs text-slate-500 mt-1 max-w-xs mx-auto">
              Submit an inquiry below to extract contextual parameters directly from the reference core.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
