import React from 'react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export interface ToastMessage {
  id: string;
  type: 'success' | 'error' | 'info';
  message: string;
}

interface ToastProps {
  toasts: ToastMessage[];
  onDismiss: (id: string) => void;
}

export const Toast: React.FC<ToastProps> = ({ toasts, onDismiss }) => {
  if (toasts.length === 0) return null;

  return (
    <div className="no-print fixed bottom-5 right-5 z-50 flex flex-col gap-2 max-w-sm pointer-events-none">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className="pointer-events-auto flex items-center gap-2.5 px-4 py-3 rounded-md shadow-lg bg-[#080e15] text-[#fbf9f3] border border-[#785837]/40 text-xs animate-in slide-in-from-bottom-2 duration-200"
        >
          {toast.type === 'success' && (
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          )}
          {toast.type === 'error' && (
            <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
          )}
          {toast.type === 'info' && (
            <Info className="w-4 h-4 text-sky-400 shrink-0" />
          )}
          <span className="flex-1 font-sans">{toast.message}</span>
          <button
            onClick={() => onDismiss(toast.id)}
            className="p-0.5 rounded text-[#858b94] hover:text-white transition-colors"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      ))}
    </div>
  );
};
