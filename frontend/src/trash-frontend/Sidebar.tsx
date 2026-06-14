import React from 'react';

export const Sidebar: React.FC = () => {
  return (
    <aside className="w-full md:w-[30%] bg-slate-900 border-b md:border-b-0 md:border-r border-slate-800 p-6 flex flex-col justify-between text-slate-200">
      <div>
        <h2 className="text-xl font-bold tracking-tight text-white mb-2">Knowledge Base</h2>
        <p className="text-xs text-slate-400 antialiased leading-relaxed mb-6">
          This system uses a dedicated, secure reference framework context.
        </p>
        
        <div className="bg-slate-950 rounded-xl p-4 border border-slate-800">
          <div className="flex items-center gap-2 mb-2">
            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-xs font-medium text-slate-300">Document Linked</span>
          </div>
          <p className="text-xs font-mono text-slate-500 truncate">knowledge_base.txt</p>
        </div>
      </div>
      
      <div className="text-xs text-slate-500 antialiased pt-4 border-t border-slate-800">
        v1.0.0 • Secure RAG System
      </div>
    </aside>
  );
};
