import React from 'react';
import { 
  Sparkles, 
  Search, 
  User, 
  FileCheck2, 
  RotateCcw, 
  FileText,
  CheckCircle2
} from 'lucide-react';

export default function Header({
  activeSection,
  setActiveSection,
  onOpenClientModal,
  onOpenSearch,
  onLoadSampleData,
  onResetAnswers,
  lastSavedTime,
  answeredCount,
  totalQuestions,
  clientInfo
}) {
  const percentage = Math.round((answeredCount / totalQuestions) * 100);

  return (
    <header className="sticky top-0 w-full z-40 bg-[#0f1524]/80 backdrop-blur-xl border-b border-sky-400/15 shadow-[0_4px_30px_rgba(0,0,0,0.5)] transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        
        {/* Brand / Logo */}
        <div className="flex items-center gap-4 sm:gap-6">
          <button 
            onClick={() => setActiveSection(1)}
            className="flex items-center gap-2.5 group text-left focus:outline-none"
          >
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-sky-400/30 via-sky-400/10 to-transparent border border-sky-400/30 flex items-center justify-center shadow-[0_0_15px_rgba(125,211,252,0.2)] group-hover:border-sky-400/60 group-hover:shadow-[0_0_20px_rgba(125,211,252,0.4)] transition-all">
              <Sparkles className="w-4 h-4 text-sky-300 group-hover:rotate-12 transition-transform duration-300" />
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-black tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-sky-300 via-white to-sky-200">
                INCEPTION
              </span>
              <span className="text-[10px] text-sky-400/70 font-medium tracking-widest uppercase hidden sm:inline">
                Discovery Engine
              </span>
            </div>
          </button>

          {/* Quick client name tag */}
          {clientInfo?.companyName && (
            <button
              onClick={onOpenClientModal}
              className="hidden lg:flex items-center gap-2 px-3 py-1 rounded-full bg-surface-container-high/60 border border-sky-400/15 text-xs text-on-surface-variant hover:text-sky-300 hover:border-sky-400/40 transition-all"
              title="Click to edit client details"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
              <span className="font-medium text-slate-200 truncate max-w-[140px]">{clientInfo.companyName}</span>
            </button>
          )}
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2 sm:gap-3">
          
          {/* Quick Question Search */}
          <button
            onClick={onOpenSearch}
            className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-surface-container/80 border border-outline-variant/60 hover:border-sky-400/40 text-on-surface-variant hover:text-sky-200 text-xs transition-all group"
            title="Search all 60+ questions (Ctrl+K)"
          >
            <Search className="w-3.5 h-3.5 text-sky-400 group-hover:scale-110 transition-transform" />
            <span className="hidden md:inline">Search Questions</span>
            <kbd className="hidden sm:inline-block px-1.5 py-0.5 text-[10px] font-mono bg-black/40 border border-white/10 rounded text-slate-400">
              ⌘K
            </kbd>
          </button>

          {/* Load Sample Demo Data */}
          <button
            onClick={onLoadSampleData}
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-purple-500/10 border border-purple-400/20 hover:bg-purple-500/20 hover:border-purple-400/40 text-purple-300 text-xs font-medium transition-all"
            title="Pre-fill with rich real-world sample responses"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Load Sample</span>
          </button>

          {/* Client Details Modal Trigger */}
          <button
            onClick={onOpenClientModal}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-surface-container/80 border border-outline-variant/60 hover:border-sky-400/40 text-on-surface-variant hover:text-sky-200 text-xs font-medium transition-all"
            title="Edit Client & Project Info"
          >
            <User className="w-3.5 h-3.5 text-sky-400" />
            <span className="hidden sm:inline">Project Info</span>
          </button>

          {/* Review & Export Button */}
          <button
            onClick={() => setActiveSection(9)}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all duration-300 shadow-sm ${
              activeSection === 9
                ? 'bg-sky-400 text-slate-950 shadow-[0_0_20px_rgba(125,211,252,0.4)]'
                : 'bg-gradient-to-r from-sky-400/20 via-sky-400/30 to-sky-400/20 border border-sky-400/40 text-sky-200 hover:bg-sky-400/35 hover:shadow-[0_0_15px_rgba(125,211,252,0.25)]'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Review & Export</span>
            <span className="px-1.5 py-0.2 bg-black/40 rounded-full text-[10px] text-sky-300 font-mono">
              {percentage}%
            </span>
          </button>

          {/* Reset button */}
          <button
            onClick={onResetAnswers}
            className="p-2 rounded-xl text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 border border-transparent hover:border-rose-500/20 transition-all"
            title="Reset all answers"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>

      </div>
    </header>
  );
}
