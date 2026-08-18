import React, { useState, useEffect } from 'react';
import StepProgress from './components/StepProgress';
import SectionView from './components/SectionView';
import ReviewExportView from './components/ReviewExportView';
import ClientInfoModal from './components/ClientInfoModal';
import SearchModal from './components/SearchModal';
import Toast from './components/Toast';
import { QUESTIONS, INITIAL_CLIENT_INFO, SAMPLE_ANSWERS } from './data/questionnaireData';
import { Sparkles } from 'lucide-react';
import LiquidWave from '../components/rareui/LiquidWave/LiquidWave';

const STORAGE_KEY_ANSWERS = 'inception_discovery_answers_v1';
const STORAGE_KEY_CLIENT = 'inception_discovery_client_v1';

export default function App() {
  const [activeSection, setActiveSection] = useState(1);
  const [answers, setAnswers] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_ANSWERS);
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  const [clientInfo, setClientInfo] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_CLIENT);
      return saved ? JSON.parse(saved) : INITIAL_CLIENT_INFO;
    } catch {
      return INITIAL_CLIENT_INFO;
    }
  });

  const [isStarted, setIsStarted] = useState(false);
  const [lastSavedTime, setLastSavedTime] = useState('');
  const [isClientModalOpen, setIsClientModalOpen] = useState(false);
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  const [toasts, setToasts] = useState([]);

  // Auto-save to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_ANSWERS, JSON.stringify(answers));
      localStorage.setItem(STORAGE_KEY_CLIENT, JSON.stringify(clientInfo));
      const now = new Date();
      setLastSavedTime(now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }));
    } catch (e) {
      console.error('Failed to save to localStorage', e);
    }
  }, [answers, clientInfo]);

  // Toast helper
  const showToast = (message, type = 'success') => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 3500);
  };

  const handleAnswerChange = (questionId, value) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: value
    }));
  };

  const handleClearAnswer = (questionId) => {
    setAnswers(prev => {
      const copy = { ...prev };
      delete copy[questionId];
      return copy;
    });
    showToast(`Question answer cleared`, 'warning');
  };

  const handleSelectQuestionFromSearch = (sectionId, questionId) => {
    setActiveSection(sectionId);
    setIsStarted(true);
    setTimeout(() => {
      const el = document.getElementById(`question-${questionId}`);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }, 150);
  };

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
  const progressPercentage = Math.round((answeredCount / totalQuestions) * 100);

  return (
    <div className="min-h-screen bg-[#0a0e1a] text-slate-100 flex flex-col relative selection:bg-sky-500/20 selection:text-sky-300">
      
      {/* Liquid Wave Background */}
      <div className="fixed inset-0 z-0 opacity-40 pointer-events-none">
        <LiquidWave 
          color1="#5227FF"
          color2="#FF9FFC"
          color3="#B19EEF"
          mouseForce={30}
          cursorSize={150}
        />
      </div>

      {/* Ambient background glows */}
      <div className="fixed inset-0 z-0 ambient-mesh pointer-events-none" />
      <div className="fixed -top-40 -left-40 w-96 h-96 bg-sky-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="fixed -bottom-40 -right-40 w-96 h-96 bg-purple-500/10 rounded-full blur-[120px] pointer-events-none" />

      {/* Just the name INCEPTION */}
      <div className="relative z-20 w-full max-w-5xl mx-auto px-4 sm:px-6 pt-10 pb-4 flex items-center justify-center">
        <button
          onClick={() => {
            setActiveSection(1);
            setIsStarted(false);
          }}
          className="flex items-center gap-2.5 group focus:outline-none"
        >
          <span className="text-2xl sm:text-3xl font-black tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-sky-300 via-white to-sky-200 uppercase font-headline">
            INCEPTION
          </span>
        </button>
      </div>

      {/* Main Questionnaire Canvas */}
      <main className="flex-grow relative z-10 px-4 sm:px-6 lg:px-8 pt-4 pb-16">
        
        {/* Progress Bar (Visible when started) */}
        {isStarted && activeSection <= 8 && (
          <div className="w-full max-w-5xl mx-auto mb-8">
            <div className="flex justify-between items-center mb-2">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Overall Progress</span>
              <span className="text-xs font-bold text-sky-400 font-mono">{progressPercentage}%</span>
            </div>
            <div className="w-full h-2 bg-slate-800/80 rounded-full overflow-hidden border border-slate-700/50">
              <div 
                className="h-full bg-gradient-to-r from-sky-500 to-sky-300 rounded-full transition-all duration-500 ease-out relative"
                style={{ width: `${progressPercentage}%` }}
              >
                <div className="absolute top-0 right-0 bottom-0 w-20 bg-gradient-to-r from-transparent to-white/30 blur-[2px]"></div>
              </div>
            </div>
          </div>
        )}

        {/* Dynamic Section View (1-8) or Review View (9) */}
        {!isStarted ? (
          <div className="flex flex-col items-center justify-center min-h-[50vh] text-center max-w-2xl mx-auto gap-6 animate-fadeIn">
            <h1 className="text-3xl sm:text-5xl font-bold font-headline text-slate-100 leading-tight">
              Website Client Discovery Questionnaire
            </h1>
            <p className="text-lg text-slate-400">
              These questions will help us understand what type of website you want and ensure we align on your business goals, target audience, and project scope.
            </p>
            <button
              onClick={() => {
                setAnswers({});
                setClientInfo(INITIAL_CLIENT_INFO);
                localStorage.removeItem(STORAGE_KEY_ANSWERS);
                localStorage.removeItem(STORAGE_KEY_CLIENT);
                setActiveSection(1);
                setIsStarted(true);
              }}
              className="mt-4 px-10 py-4 rounded-xl bg-gradient-to-r from-sky-400 via-sky-300 to-sky-400 text-slate-950 font-semibold text-lg hover:shadow-[0_0_30px_rgba(125,211,252,0.4)] hover:brightness-110 active:scale-95 transition-all flex items-center justify-center gap-3 shadow-lg shadow-sky-500/10"
            >
              Let's Start
            </button>
          </div>
        ) : activeSection <= 8 ? (
          <SectionView
            activeSection={activeSection}
            setActiveSection={setActiveSection}
            answers={answers}
            onAnswerChange={handleAnswerChange}
            onClearAnswer={handleClearAnswer}
          />
        ) : (
          <ReviewExportView
            clientInfo={clientInfo}
            answers={answers}
            onAnswerChange={handleAnswerChange}
            onClearAnswer={handleClearAnswer}
            setActiveSection={setActiveSection}
            onShowToast={showToast}
          />
        )}

      </main>

      {/* Modals & Overlays */}
      <ClientInfoModal
        isOpen={isClientModalOpen}
        onClose={() => setIsClientModalOpen(false)}
        clientInfo={clientInfo}
        onSaveClientInfo={(updated) => {
          setClientInfo(updated);
          showToast('Client & project info updated', 'success');
        }}
      />

      <SearchModal
        isOpen={isSearchModalOpen}
        onClose={() => setIsSearchModalOpen(false)}
        answers={answers}
        onSelectQuestion={handleSelectQuestionFromSearch}
      />

      <Toast
        toasts={toasts}
        onDismiss={(id) => setToasts(prev => prev.filter(t => t.id !== id))}
      />

      {/* Footer */}
      <footer className="py-6 px-4 text-center text-xs text-slate-400 border-t border-slate-800/60 relative z-10 font-sans tracking-wide">
        inception © 2026 utmata. All rights reserved.
      </footer>

    </div>
  );
}
