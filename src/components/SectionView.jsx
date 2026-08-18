import React from 'react';
import { 
  ArrowLeft, 
  ArrowRight, 
  Sparkles, 
  CheckCircle2, 
  FileText,
  Target,
  Users,
  Palette,
  Layout,
  Cpu,
  Network,
  TrendingUp,
  Calendar
} from 'lucide-react';
import QuestionCard from './QuestionCard';
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

export default function SectionView({
  activeSection,
  setActiveSection,
  answers,
  onAnswerChange,
  onClearAnswer
}) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = React.useState(0);

  React.useEffect(() => {
    setCurrentQuestionIndex(0);
  }, [activeSection]);

  const section = SECTIONS.find(s => s.id === activeSection);
  if (!section) return null;

  const sectionQuestions = QUESTIONS.filter(q => q.sectionId === activeSection);
  const IconComponent = ICONS[section.icon] || Sparkles;

  const answeredCount = sectionQuestions.filter(q => {
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

  const totalCount = sectionQuestions.length;
  const isSectionComplete = totalCount > 0 && answeredCount === totalCount;
  
  const currentQuestion = sectionQuestions[currentQuestionIndex];

  const handleNext = () => {
    if (currentQuestionIndex < sectionQuestions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      if (activeSection < 9) {
        setActiveSection(activeSection + 1);
      }
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBack = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    } else if (activeSection > 1) {
      setActiveSection(activeSection - 1);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (!currentQuestion) return null;

  return (
    <div className="w-full max-w-5xl mx-auto flex flex-col gap-6 animate-fadeIn">
      
      {/* Question */}
      <div className="flex flex-col gap-5">
        <QuestionCard
          key={currentQuestion.id}
          question={currentQuestion}
          answer={answers[currentQuestion.id]}
          onChange={onAnswerChange}
          onClear={onClearAnswer}
        />
      </div>

      {/* Navigation Footer Controls */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-6 pt-4 border-t border-slate-800">
        
        {/* Back Button */}
        <button
          type="button"
          onClick={handleBack}
          disabled={activeSection === 1 && currentQuestionIndex === 0}
          className={`w-full sm:w-auto px-6 py-3 rounded-xl border font-medium text-sm flex items-center justify-center gap-2 transition-all ${
            activeSection === 1 && currentQuestionIndex === 0
              ? 'opacity-40 border-slate-800 text-slate-600 cursor-not-allowed'
              : 'border-slate-700 text-slate-300 hover:text-white hover:border-slate-600 hover:bg-white/5 active:scale-95'
          }`}
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </button>

        <div className="flex items-center gap-4 w-full sm:w-auto">
          {/* Skip Button */}
          <button
            type="button"
            onClick={handleNext}
            className="w-full sm:w-auto px-6 py-3 rounded-xl border font-medium text-sm flex items-center justify-center gap-2 transition-all border-slate-700 text-slate-300 hover:text-white hover:border-slate-600 hover:bg-white/5 active:scale-95"
          >
            Skip
          </button>

          {/* Next Button */}
          <button
            type="button"
            onClick={handleNext}
            className="w-full sm:w-auto px-8 py-3 rounded-xl bg-gradient-to-r from-sky-400 via-sky-300 to-sky-400 text-slate-950 font-semibold text-sm hover:shadow-[0_0_25px_rgba(125,211,252,0.4)] hover:brightness-110 active:scale-95 transition-all flex items-center justify-center gap-2 shadow-lg shadow-sky-500/10"
          >
            <span>Next</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

    </div>
  );
}
