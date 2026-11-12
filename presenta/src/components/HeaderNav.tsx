import React from 'react';
import { Download, Share2, Printer, Edit3, Globe } from 'lucide-react';

interface HeaderNavProps {
  onDownloadPDF: () => void;
  onShare: () => void;
  onPrint: () => void;
  onToggleEdit: () => void;
  isEditing: boolean;
  lang: 'es' | 'en';
  onToggleLang: () => void;
  isExporting: boolean;
}

export const HeaderNav: React.FC<HeaderNavProps> = ({
  onDownloadPDF,
  onShare,
  onPrint,
  onToggleEdit,
  isEditing,
  lang,
  onToggleLang,
  isExporting,
}) => {
  return (
    <header className="no-print fixed top-0 w-full z-40 bg-[#fbf9f3]/90 backdrop-blur-md border-b border-[#c5c6cb]/40 shadow-[0_1px_8px_rgba(0,0,0,0.03)] transition-all">
      <div className="h-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 flex items-center justify-between">
        {/* Brand identity */}
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-[#080e15] text-[#fbf9f3] rounded flex items-center justify-center font-display font-semibold text-sm shadow-sm ring-1 ring-[#785837]/30">
            FB
          </div>
          <div className="flex flex-col">
            <span className="font-display font-medium text-sm sm:text-base text-[#080e15] tracking-tight leading-tight">
              Francisco J. Bermejo
            </span>
            <span className="font-sans text-[11px] uppercase tracking-wider text-[#785837] font-medium hidden sm:inline-block">
              {lang === 'es' ? 'Diseñador de Apps & Soluciones' : 'App Designer & Solutions'}
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Language Toggle */}
          <button
            onClick={onToggleLang}
            title={lang === 'es' ? 'Switch to English' : 'Cambiar a Español'}
            className="hidden md:inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded border border-[#c5c6cb]/60 bg-[#fbf9f3] hover:bg-[#eae8e2] text-xs font-sans uppercase tracking-wider font-semibold text-[#1b1c18] transition-colors"
            type="button"
          >
            <Globe className="w-3.5 h-3.5 text-[#785837]" />
            <span>{lang.toUpperCase()}</span>
          </button>

          {/* Quick Edit Mode Toggle */}
          <button
            onClick={onToggleEdit}
            title={isEditing ? 'Cerrar edición' : 'Editar datos del CV'}
            className={`hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded border transition-colors text-xs font-sans uppercase tracking-wider font-semibold ${
              isEditing
                ? 'border-[#785837] bg-[#fed2a9]/50 text-[#795938]'
                : 'border-[#c5c6cb]/60 bg-[#fbf9f3] hover:bg-[#eae8e2] text-[#1b1c18]'
            }`}
            type="button"
          >
            <Edit3 className="w-3.5 h-3.5 text-[#785837]" />
            <span className="hidden lg:inline">{isEditing ? (lang === 'es' ? 'Cerrar Edición' : 'Close Editor') : (lang === 'es' ? 'Personalizar' : 'Customize')}</span>
          </button>

          {/* Native Print button */}
          <button
            onClick={onPrint}
            title={lang === 'es' ? 'Imprimir / Guardar en PDF' : 'Print / Save as PDF'}
            className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded border border-[#c5c6cb]/60 bg-[#fbf9f3] hover:bg-[#eae8e2] text-[#1b1c18] text-xs font-sans uppercase tracking-wider font-semibold transition-colors"
            type="button"
          >
            <Printer className="w-3.5 h-3.5 text-[#785837]" />
            <span className="hidden lg:inline">{lang === 'es' ? 'Imprimir' : 'Print'}</span>
          </button>

          {/* Download PDF button (Primary from design) */}
          <button
            onClick={onDownloadPDF}
            disabled={isExporting}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded border border-[#c5c6cb] bg-[#fbf9f3] hover:bg-[#eae8e2] transition-colors font-sans text-[11px] uppercase tracking-wider font-semibold text-[#1b1c18] disabled:opacity-50 shadow-xs cursor-pointer"
            type="button"
          >
            {isExporting ? (
              <div className="w-4 h-4 border-2 border-[#785837] border-t-transparent rounded-full animate-spin" />
            ) : (
              <Download className="w-4 h-4 text-[#785837]" />
            )}
            <span>{isExporting ? (lang === 'es' ? 'Generando...' : 'Exporting...') : 'Download PDF'}</span>
          </button>

          {/* Share Link button (Accent primary from design) */}
          <button
            onClick={onShare}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded bg-[#080e15] text-[#fbf9f3] hover:bg-[#1e242b] hover:text-[#dde3ec] transition-all font-sans text-[11px] uppercase tracking-wider font-semibold shadow-sm cursor-pointer"
            type="button"
          >
            <Share2 className="w-4 h-4" />
            <span>Share Link</span>
          </button>
        </div>
      </div>
    </header>
  );
};
