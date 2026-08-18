import React, { useState, useEffect, useRef } from 'react';
import { Search, X, CheckCircle2, ArrowRight } from 'lucide-react';
import { QUESTIONS, SECTIONS } from '../data/questionnaireData';

export default function SearchModal({
  isOpen,
  onClose,
  answers,
  onSelectQuestion
}) {
  const [searchTerm, setSearchTerm] = useState('');
  const inputRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setSearchTerm('');
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const filteredQuestions = QUESTIONS.filter(q => {
    const term = searchTerm.toLowerCase().trim();
    if (!term) return true;
    const numStr = String(q.num).toLowerCase();
    const titleMatch = q.title.toLowerCase().includes(term);
    const descMatch = (q.description || '').toLowerCase().includes(term);
    const sec = SECTIONS.find(s => s.id === q.sectionId);
    const secMatch = (sec?.title || '').toLowerCase().includes(term);
    return titleMatch || descMatch || secMatch || numStr === term || `q${numStr}` === term;
  });

  return (
    <div 
      className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 p-4 bg-black/75 backdrop-blur-md animate-fadeIn"
      onClick={onClose}
    >
      <div 
        className="glass-panel-glow w-full max-w-2xl rounded-2xl border border-sky-400/30 shadow-2xl overflow-hidden flex flex-col max-h-[80vh] animate-slideUp"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Header */}
        <div className="p-4 border-b border-slate-800 flex items-center gap-3 bg-surface-container/80">
          <Search className="w-5 h-5 text-sky-400 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search across all 60+ discovery questions by keyword or number (e.g. 'budget', 'SEO', 'e-commerce', 'Q4')..."
            className="w-full bg-transparent border-none text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none"
          />
          {searchTerm && (
            <button 
              onClick={() => setSearchTerm('')}
              className="text-slate-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <kbd className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-black/40 border border-slate-700 text-slate-400">
            ESC
          </kbd>
        </div>

        {/* Results List */}
        <div className="overflow-y-auto p-2 flex flex-col gap-1.5 flex-grow">
          {filteredQuestions.length === 0 ? (
            <div className="text-center py-12 text-slate-500 text-xs">
              No questions found matching "<span className="text-slate-300">{searchTerm}</span>"
            </div>
          ) : (
            filteredQuestions.map((q) => {
              const sec = SECTIONS.find(s => s.id === q.sectionId);
              const ans = answers[q.id];
              const isAnswered = (Array.isArray(ans) && ans.length > 0) || (ans !== undefined && ans !== null && String(ans).trim().length > 0);

              return (
                <button
                  key={q.id}
                  onClick={() => {
                    onSelectQuestion(q.sectionId, q.id);
                    onClose();
                  }}
                  className="w-full p-3 rounded-xl bg-surface-container/40 hover:bg-sky-400/10 border border-slate-800/80 hover:border-sky-400/30 text-left flex items-start justify-between gap-3 group transition-all"
                >
                  <div className="flex items-start gap-3">
                    <span className="text-xs font-mono font-bold px-2 py-0.5 rounded-lg bg-surface-container-high border border-slate-700 text-sky-300 shrink-0 mt-0.5">
                      {q.num === 'Final' ? '★' : `Q${q.num}`}
                    </span>
                    <div>
                      <span className="text-xs text-slate-400 block mb-0.5">
                        {sec?.title || 'Section'}
                      </span>
                      <h4 className="text-xs sm:text-sm font-medium text-slate-200 group-hover:text-sky-200 leading-snug">
                        {q.title}
                      </h4>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0 self-center">
                    {isAnswered ? (
                      <span className="flex items-center gap-1 text-[10px] text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                        <CheckCircle2 className="w-3 h-3" />
                        <span className="hidden sm:inline">Answered</span>
                      </span>
                    ) : (
                      <span className="text-[10px] text-slate-500 bg-slate-800/50 px-2 py-0.5 rounded-full">
                        Pending
                      </span>
                    )}
                    <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-sky-300 group-hover:translate-x-0.5 transition-all" />
                  </div>
                </button>
              );
            })
          )}
        </div>

        {/* Footer info */}
        <div className="p-3 bg-surface-container/70 border-t border-slate-800 text-[11px] text-slate-400 flex justify-between items-center px-4">
          <span>Showing {filteredQuestions.length} of {QUESTIONS.length} questions</span>
          <span>Click any question to jump directly to it</span>
        </div>

      </div>
    </div>
  );
}
