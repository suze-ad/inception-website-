import React, { useState, useEffect } from 'react';
import { X, User, Building, Globe, Calendar, Briefcase, FileText, Check, Mail } from 'lucide-react';

export default function ClientInfoModal({
  isOpen,
  onClose,
  clientInfo,
  onSaveClientInfo
}) {
  const [formData, setFormData] = useState({ ...clientInfo });

  useEffect(() => {
    setFormData({ ...clientInfo });
  }, [clientInfo, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    onSaveClientInfo(formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-fadeIn">
      <div 
        className="glass-panel-glow w-full max-w-xl rounded-2xl border border-sky-400/30 p-6 sm:p-8 shadow-2xl relative animate-slideUp overflow-hidden max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Glow */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-sky-400/10 rounded-full blur-3xl pointer-events-none" />

        {/* Modal Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-sky-400/20 border border-sky-400/30 flex items-center justify-center text-sky-300">
              <Building className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold font-headline text-slate-100">
                Project & Client Information
              </h3>
              <p className="text-xs text-slate-400">
                Metadata included in the discovery brief header & submission
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 overflow-y-auto pr-1 py-4 flex-grow">
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Client Stakeholder */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-medium text-slate-300 flex items-center gap-1.5">
                <User className="w-3.5 h-3.5 text-sky-400" />
                Primary Client Contact
              </label>
              <input
                type="text"
                value={formData.clientName || ''}
                onChange={(e) => setFormData({ ...formData, clientName: e.target.value })}
                placeholder="e.g. John Doe, VP Marketing"
                className="glass-input rounded-xl px-3.5 py-2 text-xs text-slate-100 placeholder:text-slate-500"
              />
            </div>

            {/* Client Email */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-medium text-slate-300 flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-sky-400" />
                Contact Email
              </label>
              <input
                type="email"
                value={formData.email || ''}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="e.g. client@company.com"
                className="glass-input rounded-xl px-3.5 py-2 text-xs text-slate-100 placeholder:text-slate-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Company Name */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-medium text-slate-300 flex items-center gap-1.5">
                <Building className="w-3.5 h-3.5 text-sky-400" />
                Company / Organization
              </label>
              <input
                type="text"
                value={formData.companyName || ''}
                onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                placeholder="e.g. Acme Corporation"
                className="glass-input rounded-xl px-3.5 py-2 text-xs text-slate-100 placeholder:text-slate-500"
              />
            </div>

            {/* Current Website */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-medium text-slate-300 flex items-center gap-1.5">
                <Globe className="w-3.5 h-3.5 text-sky-400" />
                Current Website URL
              </label>
              <input
                type="text"
                value={formData.currentWebsite || ''}
                onChange={(e) => setFormData({ ...formData, currentWebsite: e.target.value })}
                placeholder="https://acme.com"
                className="glass-input rounded-xl px-3.5 py-2 text-xs text-slate-100 placeholder:text-slate-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Target Launch Date */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-medium text-slate-300 flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-sky-400" />
                Target Launch Date
              </label>
              <input
                type="text"
                value={formData.targetLaunchDate || ''}
                onChange={(e) => setFormData({ ...formData, targetLaunchDate: e.target.value })}
                placeholder="e.g. Q4 2026 or Dec 15, 2026"
                className="glass-input rounded-xl px-3.5 py-2 text-xs text-slate-100 placeholder:text-slate-500"
              />
            </div>

            {/* Industry */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-medium text-slate-300 flex items-center gap-1.5">
                <Briefcase className="w-3.5 h-3.5 text-sky-400" />
                Industry / Vertical
              </label>
              <input
                type="text"
                value={formData.industry || ''}
                onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
                placeholder="e.g. B2B Enterprise SaaS"
                className="glass-input rounded-xl px-3.5 py-2 text-xs text-slate-100 placeholder:text-slate-500"
              />
            </div>
          </div>

          {/* Prepared By */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-medium text-slate-300 flex items-center gap-1.5">
              <FileText className="w-3.5 h-3.5 text-sky-400" />
              Prepared By (Agency/Lead)
            </label>
            <input
              type="text"
              value={formData.preparedBy || ''}
              onChange={(e) => setFormData({ ...formData, preparedBy: e.target.value })}
              placeholder="INCEPTION Discovery Team"
              className="glass-input rounded-xl px-3.5 py-2 text-xs text-slate-100 placeholder:text-slate-500"
            />
          </div>

          {/* Internal Notes */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-medium text-slate-300">
              Project Context / Internal Notes
            </label>
            <textarea
              rows={3}
              value={formData.notes || ''}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              placeholder="Internal project background, key stakeholder personalities, or initial engagement notes..."
              className="glass-input rounded-xl p-3 text-xs text-slate-100 placeholder:text-slate-500 resize-none"
            />
          </div>

          {/* Footer Actions */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-800 mt-2 shrink-0">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-medium text-slate-400 hover:text-white hover:bg-white/5 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl bg-sky-400 hover:bg-sky-300 text-slate-950 font-bold text-xs flex items-center gap-2 shadow-[0_0_15px_rgba(125,211,252,0.3)] transition-all"
            >
              <Check className="w-4 h-4" />
              Save Details
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}
