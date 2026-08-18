import React from 'react';
import { 
  Target, 
  Users, 
  Palette, 
  Layout, 
  Cpu, 
  Network, 
  TrendingUp, 
  Calendar, 
  Sparkles,
  Check,
  CheckCircle2
} from 'lucide-react';
import { SECTIONS, QUESTIONS } from '../data/questionnaireData';

const ICONS = {
  Target,
  Users,
  Palette,
  Layout,
  Cpu,
  Network,
  TrendingUp,
  Calendar,
  Sparkles
};

export default function StepProgress({
  activeSection,
  setActiveSection,
  answers,
  lastSavedTime
}) {
  // Calculate section progress
  const getSectionStats = (sectionId) => {
    const sectionQuestions = QUESTIONS.filter(q => q.sectionId === sectionId);
    const total = sectionQuestions.length;
    const answered = sectionQuestions.filter(q => {
      const val = answers[q.id];
      if (Array.isArray(val)) return val.length > 0;
      return val !== undefined && val !== null && String(val).trim().length > 0;
    }).length;

    const isComplete = total > 0 && answered === total;
    return { total, answered, isComplete };
  };

  const totalQuestions = QUESTIONS.length;
  const totalAnswered = QUESTIONS.filter(q => {
    const val = answers[q.id];
    if (Array.isArray(val)) return val.length > 0;
    return val !== undefined && val !== null && String(val).trim().length > 0;
  }).length;

  const overallPercentage = Math.min(100, Math.round((totalAnswered / totalQuestions) * 100));

  return (
    <div className="w-full max-w-5xl mx-auto mb-8 sm:mb-12">
      {/* Top Meta Bar */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-4">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="inline-block w-2 h-2 rounded-full bg-sky-400 animate-pulse"></span>
            <span className="text-xs font-semibold text-sky-400 tracking-widest uppercase">
              {activeSection === 9 ? 'Final Review & Export' : `Section ${activeSection} of 8`}
            </span>
            <span className="text-slate-500">•</span>
            <span className="text-xs text-slate-400 font-mono">
              {totalAnswered} / {totalQuestions} Questions Done
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-headline font-bold text-slate-100 tracking-tight">
            {SECTIONS.find(s => s.id === activeSection)?.title || 'Questionnaire Overview'}
          </h1>
        </div>

        <div className="flex items-center gap-3">
          {lastSavedTime && (
            <div className="hidden md:flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface-container-high/60 border border-sky-400/10 text-[11px] text-slate-400">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
              <span>Saved {lastSavedTime}</span>
            </div>
          )}

          <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-surface-container-high/80 border border-sky-400/20 backdrop-blur-md shadow-inner">
            <span className="text-xs text-slate-400">Progress</span>
            <span className="text-sm font-bold text-sky-300 font-mono">{overallPercentage}%</span>
          </div>
        </div>
      </div>

      {/* Main Progress Bar */}
      <div className="h-2 w-full bg-[#141c2e] rounded-full overflow-hidden border border-slate-700/40 p-0.5 shadow-inner">
        <div 
          className="h-full bg-gradient-to-r from-sky-500 via-sky-400 to-indigo-400 shadow-[0_0_15px_rgba(125,211,252,0.8)] rounded-full transition-all duration-700 ease-out"
          style={{ width: `${overallPercentage}%` }}
        />
      </div>

      {/* Step Pills Navigator */}
      <div className="grid grid-cols-3 sm:grid-cols-5 md:grid-cols-9 gap-2 mt-4">
        {SECTIONS.map((sec) => {
          const stats = getSectionStats(sec.id);
          const isActive = activeSection === sec.id;
          const IconComponent = ICONS[sec.icon] || Sparkles;

          return (
            <button
              key={sec.id}
              onClick={() => setActiveSection(sec.id)}
              className={`p-2 sm:p-2.5 rounded-xl border text-left flex flex-col justify-between gap-1.5 transition-all duration-200 group relative ${
                isActive
                  ? 'bg-sky-400/15 border-sky-400/60 shadow-[0_0_20px_rgba(125,211,252,0.15)] ring-1 ring-sky-400/30'
                  : stats.isComplete
                  ? 'bg-emerald-500/10 border-emerald-500/30 hover:border-emerald-500/50'
                  : 'bg-surface-container/50 border-outline-variant/50 hover:border-slate-600 hover:bg-surface-container-high/40'
              }`}
            >
              <div className="flex items-center justify-between w-full">
                <div className={`w-5 h-5 rounded-md flex items-center justify-center text-[10px] font-bold ${
                  isActive
                    ? 'bg-sky-400 text-slate-950 shadow-sm'
                    : stats.isComplete
                    ? 'bg-emerald-400 text-slate-950'
                    : 'bg-surface-container-high text-slate-400 group-hover:text-slate-200'
                }`}>
                  {stats.isComplete ? (
                    <Check className="w-3 h-3 stroke-[3]" />
                  ) : (
                    sec.id === 9 ? '★' : sec.id
                  )}
                </div>

                <span className="text-[9px] font-mono text-slate-500 group-hover:text-slate-400 hidden sm:inline">
                  {sec.questionRange}
                </span>
              </div>

              <div className="truncate w-full">
                <span className={`text-[11px] font-medium block truncate ${
                  isActive ? 'text-sky-300 font-semibold' : 'text-slate-300 group-hover:text-white'
                }`}>
                  {sec.shortTitle}
                </span>
                <span className="text-[10px] text-slate-400 flex items-center gap-1">
                  {sec.id === 9 ? 'Export' : `${stats.answered}/${stats.total}`}
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
