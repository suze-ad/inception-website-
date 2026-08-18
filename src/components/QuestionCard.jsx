import React, { useState } from 'react';
import { 
  Check, 
  Plus, 
  X, 
  Sparkles, 
  HelpCircle, 
  CheckCircle2, 
  Circle,
  Tag
} from 'lucide-react';

export default function QuestionCard({
  question,
  answer,
  onChange,
  onClear
}) {
  const [tagInputValue, setTagInputValue] = useState('');
  const [showTips, setShowTips] = useState(false);

  // Check if current question is considered answered
  const isAnswered = (() => {
    if (!answer) return false;
    if (typeof answer === 'object' && !Array.isArray(answer)) {
      if (answer.selected && (Array.isArray(answer.selected) ? answer.selected.length > 0 : answer.selected !== null)) return true;
      if (answer.custom && answer.custom.trim().length > 0) return true;
      return false;
    }
    if (Array.isArray(answer)) return answer.length > 0;
    return String(answer).trim().length > 0;
  })();

  // Handlers for Tag Inputs
  const handleAddTag = (tagText) => {
    const trimmed = tagText.trim();
    if (!trimmed) return;
    const currentTags = Array.isArray(answer) ? answer : (answer ? [answer] : []);
    if (!currentTags.includes(trimmed)) {
      onChange(question.id, [...currentTags, trimmed]);
    }
    setTagInputValue('');
  };

  const handleRemoveTag = (tagToRemove) => {
    const currentTags = Array.isArray(answer) ? answer : [];
    onChange(question.id, currentTags.filter(t => t !== tagToRemove));
  };

  const handleKeyDownTag = (e) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      handleAddTag(tagInputValue);
    }
  };

  // Handlers for Multi-select Custom
  const handleToggleMultiOption = (optionValue) => {
    const current = Array.isArray(answer) ? answer : (answer ? [answer] : []);
    if (current.includes(optionValue)) {
      onChange(question.id, current.filter(item => item !== optionValue));
    } else {
      onChange(question.id, [...current, optionValue]);
    }
  };

  // Suggestion click for Textarea
  const handleApplySuggestion = (suggestionText) => {
    const currentText = typeof answer === 'string' ? answer : '';
    if (!currentText.trim()) {
      onChange(question.id, suggestionText);
    } else if (!currentText.includes(suggestionText)) {
      onChange(question.id, `${currentText}\n• ${suggestionText}`);
    }
  };

  return (
    <div 
      id={`question-${question.id}`}
      className={`glass-panel rounded-2xl p-5 sm:p-7 md:p-8 transition-all duration-300 relative group overflow-hidden border ${
        isAnswered 
          ? 'border-sky-400/25 bg-[#0f1524]/75 shadow-[0_4px_25px_rgba(0,0,0,0.3)]' 
          : 'border-slate-800 bg-[#0f1524]/60 hover:border-slate-700'
      }`}
    >
      {/* Decorative subtle ambient glow */}
      <div className="absolute top-0 right-0 w-48 h-48 bg-sky-500/5 rounded-full blur-3xl pointer-events-none group-hover:bg-sky-500/10 transition-colors" />

      {/* Question Header */}
      <div className="flex items-start justify-between gap-4 mb-4">
        <div className="flex items-start gap-3">
          <span className={`px-2.5 py-1 rounded-lg text-xs font-mono font-bold flex items-center justify-center shrink-0 mt-0.5 ${
            isAnswered 
              ? 'bg-sky-400/20 text-sky-300 border border-sky-400/30' 
              : 'bg-surface-container-high text-slate-400 border border-slate-700'
          }`}>
            {question.num === 'Final' ? '★' : `Q${question.num}`}
          </span>

          <div>
            <h3 className="text-base sm:text-lg font-semibold text-slate-100 leading-snug font-headline">
              {question.title}
            </h3>
            {question.description && (
              <p className="text-xs sm:text-sm text-slate-400 mt-1 leading-relaxed">
                {question.description}
              </p>
            )}
          </div>
        </div>

        {/* Status Indicator & Clear */}
        <div className="flex items-center gap-2 shrink-0">
          {isAnswered ? (
            <span className="flex items-center gap-1 text-[11px] font-medium text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-full">
              <CheckCircle2 className="w-3 h-3" />
              <span className="hidden sm:inline">Answered</span>
            </span>
          ) : (
            <span className="text-[11px] font-medium text-slate-500 bg-slate-800/40 border border-slate-700/50 px-2 py-0.5 rounded-full hidden sm:inline-block">
              Required / Optional
            </span>
          )}

          {isAnswered && (
            <button
              onClick={() => onClear(question.id)}
              className="p-1 rounded-lg text-slate-500 hover:text-rose-400 hover:bg-rose-500/10 transition-colors"
              title="Clear this answer"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Dynamic Input Renderers */}
      <div className="mt-4">

        {/* 1. TEXTAREA (Standard and with Suggestions) */}
        {(question.type === 'textarea' || !question.type) && (
          <div className="flex flex-col gap-3">
            <textarea
              value={typeof answer === 'string' ? answer : ''}
              onChange={(e) => onChange(question.id, e.target.value)}
              placeholder={question.placeholder || 'Type your detailed answer here...'}
              rows={4}
              className="w-full glass-input rounded-xl p-4 text-sm text-slate-100 placeholder:text-slate-500 focus:ring-1 focus:ring-sky-400/50 resize-y leading-relaxed font-sans"
            />

            {/* Suggestion Chips */}
            {question.suggestions && question.suggestions.length > 0 && (
              <div className="flex flex-col gap-1.5 mt-1">
                <span className="text-[11px] font-medium text-slate-400 flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-sky-400" />
                  Quick Inspiration / Click to Add:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {question.suggestions.map((sug, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => handleApplySuggestion(sug)}
                      className="px-2.5 py-1 rounded-lg text-xs bg-surface-container-high/60 hover:bg-sky-400/15 hover:text-sky-300 border border-slate-700/60 hover:border-sky-400/30 text-slate-300 transition-all text-left"
                    >
                      + {sug}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* 2. RADIO CUSTOM CARDS */}
        {question.type === 'radio_custom' && (
          <div className="flex flex-col gap-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {question.options?.map((opt, idx) => {
                const optLabel = typeof opt === 'string' ? opt : opt.label;
                const optDesc = typeof opt === 'object' ? opt.desc : null;
                
                let isSelected = false;
                if (typeof answer === 'string') isSelected = answer === optLabel;
                else if (typeof answer === 'object' && answer !== null) isSelected = answer.selected === optLabel;

                const handleRadioSelect = () => {
                  if (typeof answer === 'object' && answer !== null) {
                    onChange(question.id, { ...answer, selected: optLabel });
                  } else {
                    onChange(question.id, { selected: optLabel, custom: '' });
                  }
                };

                return (
                  <label
                    key={idx}
                    onClick={handleRadioSelect}
                    className={`cursor-pointer p-4 rounded-xl border flex items-start gap-3 transition-all duration-200 ${
                      isSelected
                        ? 'bg-sky-400/10 border-sky-400 shadow-[0_0_20px_rgba(125,211,252,0.12)]'
                        : 'bg-surface-container/40 border-slate-800 hover:border-slate-700 hover:bg-surface-container/70'
                    }`}
                  >
                    <div className="pt-0.5 shrink-0">
                      <div className={`w-4 h-4 rounded-full border flex items-center justify-center transition-colors ${
                        isSelected ? 'border-sky-400 bg-sky-400' : 'border-slate-600'
                      }`}>
                        {isSelected && <div className="w-1.5 h-1.5 rounded-full bg-slate-950" />}
                      </div>
                    </div>
                    <div>
                      <div className={`text-sm font-semibold ${isSelected ? 'text-sky-200' : 'text-slate-200'}`}>
                        {optLabel}
                      </div>
                      {optDesc && (
                        <p className="text-xs text-slate-400 mt-0.5 leading-normal">
                          {optDesc}
                        </p>
                      )}
                    </div>
                  </label>
                );
              })}
            </div>

            {/* Additional Detail Input */}
            <div className="mt-2">
              <label className="text-xs text-slate-400 mb-1.5 block">Additional details (optional):</label>
              <textarea
                rows={2}
                placeholder="Write more here..."
                value={typeof answer === 'object' && answer !== null ? (answer.custom || '') : ''}
                onChange={(e) => {
                  const currentSelected = typeof answer === 'object' && answer !== null ? answer.selected : (typeof answer === 'string' ? answer : null);
                  onChange(question.id, { selected: currentSelected, custom: e.target.value });
                }}
                className="w-full glass-input rounded-xl p-3 text-sm text-slate-200 placeholder:text-slate-500 focus:ring-1 focus:ring-sky-400/50 resize-y"
              />
            </div>
          </div>
        )}

        {/* 3. MULTI-SELECT CUSTOM CARDS */}
        {(question.type === 'multiselect_custom' || question.type === 'multi_select') && (
          <div className="flex flex-col gap-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {question.options?.map((opt, idx) => {
                const optText = typeof opt === 'string' ? opt : opt.label;
                const optDesc = typeof opt === 'object' ? opt.desc : null;
                
                const selectedArray = (typeof answer === 'object' && answer !== null && Array.isArray(answer.selected)) 
                  ? answer.selected 
                  : (Array.isArray(answer) ? answer : []);
                  
                const isChecked = selectedArray.includes(optText);

                const handleToggleMulti = () => {
                  let newSelected;
                  if (isChecked) {
                    newSelected = selectedArray.filter(item => item !== optText);
                  } else {
                    newSelected = [...selectedArray, optText];
                  }
                  
                  const customText = (typeof answer === 'object' && answer !== null && !Array.isArray(answer)) ? answer.custom : '';
                  onChange(question.id, { selected: newSelected, custom: customText });
                };

                return (
                  <button
                    key={idx}
                    type="button"
                    onClick={handleToggleMulti}
                    className={`p-3 rounded-xl border text-left flex items-start gap-3 transition-all duration-200 ${
                      isChecked
                        ? 'bg-sky-400/10 border-sky-400 shadow-[0_0_15px_rgba(125,211,252,0.1)]'
                        : 'bg-surface-container/40 border-slate-800/80 hover:border-slate-700'
                    }`}
                  >
                    <div className={`w-4 h-4 rounded mt-0.5 shrink-0 border flex items-center justify-center transition-colors ${
                      isChecked ? 'bg-sky-400 border-sky-400 text-slate-950' : 'border-slate-600 bg-black/20'
                    }`}>
                      {isChecked && <Check className="w-3 h-3 stroke-[3]" />}
                    </div>
                    <div>
                      <div className={`text-sm font-semibold ${isChecked ? 'text-sky-200' : 'text-slate-300'}`}>
                        {optText}
                      </div>
                      {optDesc && (
                        <p className="text-xs text-slate-400 mt-0.5 leading-normal">
                          {optDesc}
                        </p>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Custom Notes for Multi-select */}
            <div className="mt-2">
              <label className="text-xs text-slate-400 mb-1.5 block">Additional details (optional):</label>
              <textarea
                placeholder="Write more here..."
                rows={2}
                value={(typeof answer === 'object' && answer !== null && !Array.isArray(answer)) ? (answer.custom || '') : ''}
                onChange={(e) => {
                  const currentSelected = (typeof answer === 'object' && answer !== null && Array.isArray(answer.selected)) 
                    ? answer.selected 
                    : (Array.isArray(answer) ? answer : []);
                  onChange(question.id, { selected: currentSelected, custom: e.target.value });
                }}
                className="w-full glass-input rounded-xl p-3 text-sm text-slate-200 placeholder:text-slate-500 focus:ring-1 focus:ring-sky-400/50 resize-y"
              />
            </div>
          </div>
        )}

        {/* 4. TAGS INPUT / CHIPS */}
        {(question.type === 'tags_input' || question.type === 'select_tags') && (
          <div className="flex flex-col gap-3">
            {/* Active Tags Display */}
            <div className="flex flex-wrap gap-2 min-h-[38px] p-2 rounded-xl bg-surface-container/60 border border-slate-800">
              {Array.isArray(answer) && answer.map((tag, idx) => (
                <span
                  key={idx}
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-sky-500/15 border border-sky-400/30 text-sky-200 text-xs font-medium animate-fadeIn"
                >
                  <Tag className="w-3 h-3 text-sky-400" />
                  {tag}
                  <button
                    type="button"
                    onClick={() => handleRemoveTag(tag)}
                    className="hover:text-rose-400 ml-1 transition-colors"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}

              <input
                type="text"
                value={tagInputValue}
                onChange={(e) => setTagInputValue(e.target.value)}
                onKeyDown={handleKeyDownTag}
                placeholder={Array.isArray(answer) && answer.length > 0 ? "Type and press Enter to add more..." : question.placeholder || "Type tag and press Enter..."}
                className="bg-transparent border-none text-xs text-slate-200 placeholder:text-slate-500 focus:outline-none flex-grow min-w-[160px] py-1 px-2"
              />
            </div>

            {/* Quick Suggestions for tags */}
            {question.suggestions && (
              <div className="flex flex-wrap gap-1.5 items-center">
                <span className="text-[11px] text-slate-500 mr-1">Suggested:</span>
                {question.suggestions.map((sug, idx) => {
                  const isSelected = Array.isArray(answer) && answer.includes(sug);
                  return (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => isSelected ? handleRemoveTag(sug) : handleAddTag(sug)}
                      className={`px-2.5 py-1 rounded-lg text-xs border transition-all ${
                        isSelected
                          ? 'bg-sky-400/20 border-sky-400 text-sky-300 font-semibold'
                          : 'bg-surface-container-high/40 border-slate-800 hover:border-slate-700 text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      {isSelected ? '✓ ' : '+ '} {sug}
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  );
}
