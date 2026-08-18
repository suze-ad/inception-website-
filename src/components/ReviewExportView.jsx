import React, { useState } from 'react';
import { 
  FileText, 
  Copy, 
  Download, 
  Printer, 
  Check, 
  Sparkles, 
  ChevronDown, 
  ChevronUp, 
  Edit3, 
  ExternalLink,
  ShieldCheck,
  Zap,
  Layers,
  Award,
  Share2
} from 'lucide-react';
import confetti from 'canvas-confetti';
import QuestionCard from './QuestionCard';
import { SECTIONS, QUESTIONS } from '../data/questionnaireData';
import { generateMarkdownReport, downloadFile, formatAnswerForDisplay } from '../utils/exportUtils';

export default function ReviewExportView({
  clientInfo,
  answers,
  onAnswerChange,
  onClearAnswer,
  setActiveSection,
  onShowToast
}) {
  const [copied, setCopied] = useState(false);
  const [expandedSections, setExpandedSections] = useState({
    1: true,
    2: true,
    3: true,
    4: true,
    5: true,
    6: true,
    7: true,
    8: true,
    9: true
  });

  const finalQuestion = QUESTIONS.find(q => q.id === 'q_final');

  const totalQuestions = QUESTIONS.length;
  const answeredCount = QUESTIONS.filter(q => {
    const val = answers[q.id];
    if (!val) return false;
    if (typeof val === 'object' && !Array.isArray(val)) {
      if (val.selected && (Array.isArray(val.selected) ? val.selected.length > 0 : val.selected !== null)) return true;
      if (val.custom && val.custom.trim().length > 0) return true;
      return false;
    }
    if (Array.isArray(val)) return val.length > 0;
    return String(val).trim().length > 0;
  }).length;

  const percentage = Math.min(100, Math.round((answeredCount / totalQuestions) * 100));

  const toggleSection = (id) => {
    setExpandedSections(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const expandAll = () => {
    setExpandedSections({
      1: true, 2: true, 3: true, 4: true, 5: true, 6: true, 7: true, 8: true, 9: true
    });
  };

  const collapseAll = () => {
    setExpandedSections({
      1: false, 2: false, 3: false, 4: false, 5: false, 6: false, 7: false, 8: false, 9: false
    });
  };

  // Export handlers
  const handleCopyMarkdown = () => {
    const report = generateMarkdownReport(clientInfo, answers);
    navigator.clipboard.writeText(report);
    setCopied(true);
    onShowToast('Discovery Brief copied to clipboard in Markdown format!', 'success');
    setTimeout(() => setCopied(false), 2500);

    // Trigger celebratory confetti
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 }
    });
  };

  const handleDownloadMarkdown = () => {
    const report = generateMarkdownReport(clientInfo, answers);
    const filename = `${(clientInfo.companyName || 'client').toLowerCase().replace(/\s+/g, '-')}-discovery-brief.md`;
    downloadFile(filename, report, 'text/markdown');
    onShowToast(`Downloaded ${filename}`, 'success');
  };

  const handleDownloadJSON = () => {
    const data = {
      clientInfo,
      generatedAt: new Date().toISOString(),
      completionRate: `${percentage}%`,
      answers
    };
    const filename = `${(clientInfo.companyName || 'client').toLowerCase().replace(/\s+/g, '-')}-discovery-data.json`;
    downloadFile(filename, JSON.stringify(data, null, 2), 'application/json');
    onShowToast(`Downloaded ${filename}`, 'success');
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="w-full max-w-5xl mx-auto flex flex-col gap-8 animate-fadeIn pb-16">
      
      {/* Top Banner & Final Question */}
      {finalQuestion && (
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-purple-400 animate-pulse"></span>
            <span className="text-xs font-semibold text-purple-300 uppercase tracking-widest">
              Final Discovery Step
            </span>
          </div>
          <QuestionCard
            question={finalQuestion}
            answer={answers[finalQuestion.id]}
            onChange={onAnswerChange}
            onClear={onClearAnswer}
          />
        </div>
      )}

      {/* Executive Discovery Dashboard */}
      <div className="glass-panel-glow rounded-2xl p-6 sm:p-8 border border-sky-400/25 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-sky-400/10 rounded-full blur-[100px] pointer-events-none" />

        <div className="relative z-10 flex flex-col gap-6">
          
          {/* Header row */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-800">
            <div>
              <div className="flex items-center gap-2 mb-1.5">
                <Award className="w-5 h-5 text-sky-400" />
                <span className="text-xs font-mono font-semibold text-sky-300 uppercase tracking-wider">
                  Executive Brief Summary
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold font-headline text-slate-100">
                {clientInfo.companyName || 'Client Project'} Discovery Document
              </h2>
              <p className="text-xs sm:text-sm text-slate-400 mt-1">
                Prepared by <span className="text-slate-200">{clientInfo.preparedBy || 'INCEPTION Team'}</span> for <span className="text-slate-200">{clientInfo.clientName || 'Client Stakeholders'}</span>
              </p>
            </div>

            {/* Score Pill */}
            <div className="flex items-center gap-3 bg-surface-container-high/80 border border-sky-400/20 px-5 py-3 rounded-2xl backdrop-blur-md shadow-lg">
              <div className="text-right">
                <div className="text-[10px] uppercase font-mono text-slate-400 tracking-wider">Readiness Score</div>
                <div className="text-2xl font-black text-sky-300 font-mono">{percentage}%</div>
              </div>
              <div className="w-10 h-10 rounded-xl bg-sky-400/20 border border-sky-400/30 flex items-center justify-center text-sky-300">
                <ShieldCheck className="w-5 h-5" />
              </div>
            </div>
          </div>

          {/* Key Metric Tiles */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-4 rounded-xl bg-surface-container/60 border border-slate-800 flex flex-col gap-1">
              <span className="text-[11px] text-slate-400">Total Questions</span>
              <span className="text-xl font-bold text-slate-100 font-mono">{totalQuestions}</span>
            </div>
            <div className="p-4 rounded-xl bg-surface-container/60 border border-slate-800 flex flex-col gap-1">
              <span className="text-[11px] text-slate-400">Answered</span>
              <span className="text-xl font-bold text-emerald-400 font-mono">{answeredCount}</span>
            </div>
            <div className="p-4 rounded-xl bg-surface-container/60 border border-slate-800 flex flex-col gap-1">
              <span className="text-[11px] text-slate-400">Target Launch</span>
              <span className="text-base font-semibold text-sky-300 truncate">{clientInfo.targetLaunchDate || 'TBD'}</span>
            </div>
            <div className="p-4 rounded-xl bg-surface-container/60 border border-slate-800 flex flex-col gap-1">
              <span className="text-[11px] text-slate-400">Industry Sector</span>
              <span className="text-base font-semibold text-purple-300 truncate">{clientInfo.industry || 'Technology'}</span>
            </div>
          </div>

          {/* Quick Action Export Buttons */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            
            {/* Copy Markdown */}
            <button
              onClick={handleCopyMarkdown}
              className="flex-1 min-w-[170px] px-4 py-3 rounded-xl bg-sky-400 hover:bg-sky-300 text-slate-950 font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(125,211,252,0.3)] active:scale-95 transition-all"
            >
              {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              <span>{copied ? 'Copied to Clipboard!' : 'Copy Formatted Markdown'}</span>
            </button>

            {/* Download MD */}
            <button
              onClick={handleDownloadMarkdown}
              className="px-4 py-3 rounded-xl bg-surface-container-high/80 hover:bg-white/10 border border-slate-700 hover:border-sky-400/40 text-slate-200 font-medium text-xs sm:text-sm flex items-center justify-center gap-2 active:scale-95 transition-all"
            >
              <Download className="w-4 h-4 text-sky-400" />
              <span>Download .MD</span>
            </button>

            {/* Download JSON */}
            <button
              onClick={handleDownloadJSON}
              className="px-4 py-3 rounded-xl bg-surface-container-high/80 hover:bg-white/10 border border-slate-700 hover:border-sky-400/40 text-slate-200 font-medium text-xs sm:text-sm flex items-center justify-center gap-2 active:scale-95 transition-all"
            >
              <FileText className="w-4 h-4 text-purple-400" />
              <span>Export JSON</span>
            </button>

            {/* Print PDF */}
            <button
              onClick={handlePrint}
              className="px-4 py-3 rounded-xl bg-surface-container-high/80 hover:bg-white/10 border border-slate-700 hover:border-sky-400/40 text-slate-200 font-medium text-xs sm:text-sm flex items-center justify-center gap-2 active:scale-95 transition-all"
            >
              <Printer className="w-4 h-4 text-emerald-400" />
              <span>Print / Save PDF</span>
            </button>
          </div>

        </div>
      </div>

      {/* Full Questionnaire Review Breakdown */}
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-bold font-headline text-slate-200">
              Detailed Question Responses
            </h3>
            <p className="text-xs text-slate-400">
              Review answers across all sections or jump in to edit any item.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={expandAll}
              className="text-xs text-sky-400 hover:text-sky-300 font-medium px-2.5 py-1 rounded-lg bg-sky-400/10 border border-sky-400/20"
            >
              Expand All
            </button>
            <button
              onClick={collapseAll}
              className="text-xs text-slate-400 hover:text-slate-200 font-medium px-2.5 py-1 rounded-lg bg-surface-container border border-slate-800"
            >
              Collapse All
            </button>
          </div>
        </div>

        {/* Section Accordions */}
        <div className="flex flex-col gap-4">
          {SECTIONS.map((sec) => {
            const secQuestions = QUESTIONS.filter(q => q.sectionId === sec.id);
            const isExpanded = expandedSections[sec.id];
            const answeredInSec = secQuestions.filter(q => {
              const val = answers[q.id];
              if (Array.isArray(val)) return val.length > 0;
              return val !== undefined && val !== null && String(val).trim().length > 0;
            }).length;

            return (
              <div 
                key={sec.id}
                className="glass-panel rounded-2xl border border-slate-800 overflow-hidden transition-all"
              >
                {/* Accordion Bar */}
                <button
                  type="button"
                  onClick={() => toggleSection(sec.id)}
                  className="w-full px-5 sm:px-6 py-4 flex items-center justify-between gap-4 bg-surface-container/40 hover:bg-surface-container/70 text-left transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <span className="w-6 h-6 rounded-lg bg-sky-400/10 border border-sky-400/20 text-sky-300 text-xs font-bold flex items-center justify-center font-mono">
                      {sec.id === 9 ? '★' : sec.id}
                    </span>
                    <div>
                      <h4 className="text-sm sm:text-base font-semibold text-slate-200">
                        {sec.title}
                      </h4>
                      <span className="text-xs text-slate-400">
                        {answeredInSec} of {secQuestions.length} answered
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    {sec.id !== 9 && (
                      <span 
                        onClick={(e) => {
                          e.stopPropagation();
                          setActiveSection(sec.id);
                          window.scrollTo({ top: 0, behavior: 'smooth' });
                        }}
                        className="text-xs text-sky-400 hover:text-sky-300 flex items-center gap-1 hover:underline p-1"
                      >
                        <Edit3 className="w-3 h-3" />
                        <span className="hidden sm:inline">Edit Section</span>
                      </span>
                    )}

                    {isExpanded ? (
                      <ChevronUp className="w-4 h-4 text-slate-400" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-slate-400" />
                    )}
                  </div>
                </button>

                {/* Expanded Section Content */}
                {isExpanded && (
                  <div className="p-5 sm:p-6 flex flex-col gap-4 border-t border-slate-800/80 bg-black/20">
                    {secQuestions.map((q) => {
                      const ans = answers[q.id];
                      const hasAns = (Array.isArray(ans) && ans.length > 0) || (ans !== undefined && ans !== null && String(ans).trim().length > 0);

                      return (
                        <div 
                          key={q.id}
                          className="p-4 rounded-xl bg-surface-container/50 border border-slate-800/70 flex flex-col gap-2"
                        >
                          <div className="flex items-start justify-between gap-2">
                            <span className="text-xs font-mono font-semibold text-sky-400">
                              {q.num === 'Final' ? 'Final Question' : `Q${q.num}: ${q.title}`}
                            </span>
                            
                            <button
                              onClick={() => {
                                setActiveSection(q.sectionId);
                                setTimeout(() => {
                                  document.getElementById(`question-${q.id}`)?.scrollIntoView({ behavior: 'smooth' });
                                }, 100);
                              }}
                              className="text-[11px] text-slate-400 hover:text-sky-300 transition-colors shrink-0 flex items-center gap-1"
                            >
                              <Edit3 className="w-3 h-3" />
                              <span>Edit</span>
                            </button>
                          </div>

                          <div className="text-xs sm:text-sm text-slate-200 whitespace-pre-line leading-relaxed pl-2 border-l-2 border-slate-700/60">
                            {hasAns ? (
                              formatAnswerForDisplay(ans)
                            ) : (
                              <span className="text-slate-500 italic">No answer provided yet</span>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
}
