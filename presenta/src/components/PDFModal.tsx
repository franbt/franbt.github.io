import React from 'react';
import { X, Download, Printer, CheckCircle2, Sparkles, FileDown } from 'lucide-react';

interface PDFModalProps {
  isOpen: boolean;
  onClose: () => void;
  onDirectDownload: () => void;
  onVectorPrint: () => void;
  isExporting: boolean;
  exportProgress: number;
  exportStatusText: string;
  lang: 'es' | 'en';
}

export const PDFModal: React.FC<PDFModalProps> = ({
  isOpen,
  onClose,
  onDirectDownload,
  onVectorPrint,
  isExporting,
  exportProgress,
  exportStatusText,
  lang,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/45 backdrop-blur-xs animate-in fade-in duration-200">
      <div
        className="w-full max-w-lg bg-[#fbf9f3] text-[#1b1c18] rounded-lg shadow-2xl border border-[#c5c6cb]/60 overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-[#c5c6cb]/40 bg-[#f5f3ed]/60">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded bg-[#785837] text-white flex items-center justify-center shadow-xs">
              <FileDown className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-display font-medium text-base text-[#080e15] leading-tight">
                {lang === 'es' ? 'Exportar Curriculum Vitae' : 'Export Curriculum Vitae'}
              </h3>
              <p className="font-sans text-[11px] text-[#44474b]">
                {lang === 'es' ? 'Formato A4 Estándar (210 × 297 mm)' : 'Standard A4 Format (210 × 297 mm)'}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            disabled={isExporting}
            className="p-1 rounded-md text-[#44474b] hover:text-[#080e15] hover:bg-[#eae8e2] transition-colors disabled:opacity-40"
            type="button"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 flex flex-col gap-4">
          {isExporting ? (
            /* Progress view */
            <div className="py-6 px-4 flex flex-col items-center justify-center gap-4 text-center">
              <div className="w-12 h-12 rounded-full border-3 border-[#785837] border-t-transparent animate-spin"></div>
              <div className="flex flex-col gap-1">
                <span className="font-display text-base font-semibold text-[#080e15]">
                  {exportStatusText || (lang === 'es' ? 'Generando PDF...' : 'Generating PDF...')}
                </span>
                <span className="text-xs text-[#785837] font-mono font-medium">
                  {exportProgress}%
                </span>
              </div>
              <div className="w-full bg-[#eae8e2] rounded-full h-2 overflow-hidden max-w-xs">
                <div
                  className="bg-[#785837] h-full transition-all duration-300 rounded-full"
                  style={{ width: `${exportProgress}%` }}
                ></div>
              </div>
              <p className="text-[11px] text-[#44474b] max-w-sm">
                {lang === 'es'
                  ? 'Compilando tipografías, vectores y maquetación en alta resolución...'
                  : 'Compiling fonts, vectors and layout in high resolution...'}
              </p>
            </div>
          ) : (
            /* Choice view */
            <>
              <p className="text-xs text-[#44474b] leading-relaxed">
                {lang === 'es'
                  ? 'Selecciona cómo deseas obtener tu documento. Ambas opciones son 100% funcionales para sitios estáticos en GitHub Pages:'
                  : 'Select your preferred export method. Both options are fully functional for static hosting on GitHub Pages:'}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {/* Method 1: Direct PDF file download */}
                <div
                  onClick={onDirectDownload}
                  className="p-4 rounded border border-[#c5c6cb]/60 bg-white hover:border-[#785837] hover:shadow-md transition-all cursor-pointer flex flex-col justify-between group"
                >
                  <div className="flex flex-col gap-2">
                    <div className="w-9 h-9 rounded bg-[#f5f3ed] text-[#785837] flex items-center justify-center group-hover:bg-[#785837] group-hover:text-white transition-colors">
                      <Download className="w-5 h-5" />
                    </div>
                    <h4 className="font-display font-medium text-sm text-[#080e15]">
                      {lang === 'es' ? 'Descarga Directa (.pdf)' : 'Direct Download (.pdf)'}
                    </h4>
                    <p className="text-[11px] text-[#44474b] leading-normal">
                      {lang === 'es'
                        ? 'Genera y descarga un archivo PDF listo para enviar por email o adjuntar a candidaturas.'
                        : 'Generates and downloads a .pdf file ready to email or attach to job applications.'}
                    </p>
                  </div>
                  <div className="mt-4 pt-2 border-t border-[#c5c6cb]/30 flex items-center gap-1.5 text-[11px] font-sans font-semibold uppercase tracking-wider text-[#785837]">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>{lang === 'es' ? 'Descargar Archivo' : 'Download File'}</span>
                  </div>
                </div>

                {/* Method 2: Native Vector Print / Save as PDF */}
                <div
                  onClick={onVectorPrint}
                  className="p-4 rounded border border-[#c5c6cb]/60 bg-white hover:border-[#080e15] hover:shadow-md transition-all cursor-pointer flex flex-col justify-between group"
                >
                  <div className="flex flex-col gap-2">
                    <div className="w-9 h-9 rounded bg-[#f5f3ed] text-[#080e15] flex items-center justify-center group-hover:bg-[#080e15] group-hover:text-white transition-colors">
                      <Printer className="w-5 h-5" />
                    </div>
                    <h4 className="font-display font-medium text-sm text-[#080e15]">
                      {lang === 'es' ? 'Impresión / PDF Vectorial' : 'Vector Print / Save as PDF'}
                    </h4>
                    <p className="text-[11px] text-[#44474b] leading-normal">
                      {lang === 'es'
                        ? 'Abre el diálogo del navegador. Texto vectorial 100% nítido, enlaces cliqueables y peso ultraligero.'
                        : 'Opens browser print dialog. Crisp vector typography, selectable text, and clickable links.'}
                    </p>
                  </div>
                  <div className="mt-4 pt-2 border-t border-[#c5c6cb]/30 flex items-center gap-1.5 text-[11px] font-sans font-semibold uppercase tracking-wider text-[#080e15]">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    <span>{lang === 'es' ? 'Imprimir / Guardar' : 'Print / Save'}</span>
                  </div>
                </div>
              </div>

              {/* Tips */}
              <div className="p-3 bg-[#f5f3ed] rounded border border-[#c5c6cb]/40 text-[11px] text-[#44474b] flex items-start gap-2">
                <span className="font-semibold text-[#785837] shrink-0">Tip:</span>
                <span>
                  {lang === 'es'
                    ? 'Para la máxima nitidez en imprenta o lectores digitales, el método Vectorial conserva el texto seleccionable al 100%.'
                    : 'For maximum crispness in print shops or PDF viewers, the Vector method keeps text 100% selectable.'}
                </span>
              </div>
            </>
          )}
        </div>

        {/* Footer */}
        <div className="px-5 py-3 border-t border-[#c5c6cb]/40 bg-[#f5f3ed]/60 flex items-center justify-end">
          <button
            onClick={onClose}
            disabled={isExporting}
            type="button"
            className="px-4 py-1.5 rounded text-xs font-sans font-semibold uppercase tracking-wider text-[#44474b] hover:text-[#080e15] hover:bg-[#eae8e2] transition-colors disabled:opacity-40"
          >
            {lang === 'es' ? 'Cerrar' : 'Close'}
          </button>
        </div>
      </div>
    </div>
  );
};
