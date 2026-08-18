import React from 'react';
import { CheckCircle2, Info, AlertTriangle, X } from 'lucide-react';

export default function Toast({ toasts, onDismiss }) {
  if (!toasts || toasts.length === 0) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-2 pointer-events-none max-w-sm w-full">
      {toasts.map((toast) => {
        const isSuccess = toast.type === 'success';
        const isWarning = toast.type === 'warning';

        return (
          <div
            key={toast.id}
            className={`pointer-events-auto p-4 rounded-xl border backdrop-blur-xl shadow-2xl flex items-center justify-between gap-3 text-xs sm:text-sm animate-slideUp transition-all duration-300 ${
              isSuccess
                ? 'bg-[#0f1524]/95 border-sky-400/50 text-slate-100 shadow-[0_0_25px_rgba(125,211,252,0.2)]'
                : isWarning
                ? 'bg-[#1e1520]/95 border-amber-400/50 text-amber-200 shadow-[0_0_25px_rgba(251,191,36,0.2)]'
                : 'bg-[#141c2e]/95 border-slate-700 text-slate-200'
            }`}
          >
            <div className="flex items-center gap-3">
              {isSuccess ? (
                <CheckCircle2 className="w-5 h-5 text-sky-400 shrink-0" />
              ) : isWarning ? (
                <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0" />
              ) : (
                <Info className="w-5 h-5 text-sky-400 shrink-0" />
              )}
              <span className="font-medium leading-snug">{toast.message}</span>
            </div>

            <button
              onClick={() => onDismiss(toast.id)}
              className="text-slate-400 hover:text-white p-0.5 rounded transition-colors shrink-0"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        );
      })}
    </div>
  );
}
