import React from 'react';
import { ZoomIn, ZoomOut, Maximize2, Link2, Check, FileText } from 'lucide-react';

interface UtilityBarProps {
  zoom: number;
  onZoomChange: (newZoom: number) => void;
  onCopyLink: () => void;
  copied: boolean;
  lang: 'es' | 'en';
}

export const UtilityBar: React.FC<UtilityBarProps> = ({
  zoom,
  onZoomChange,
  onCopyLink,
  copied,
  lang,
}) => {
  return (
    <div className="no-print w-full max-w-[794px] flex flex-wrap items-center justify-between gap-3 mb-4 px-2 text-xs text-[#44474b]">
      {/* Left side: Document spec tag */}
      <div className="flex items-center gap-2">
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#eae8e2]/60 text-[#1b1c18] font-sans font-medium text-[11px] border border-[#c5c6cb]/40">
          <FileText className="w-3.5 h-3.5 text-[#785837]" />
          <span>A4 (210 × 297 mm)</span>
        </span>
        <span className="hidden sm:inline-block text-[#c5c6cb]">•</span>
        <span className="hidden sm:inline-block font-sans text-[11px] text-[#795938] font-medium">
          {lang === 'es' ? 'Optimizado para GitHub Pages e Impresión' : 'Optimized for GitHub Pages & Print'}
        </span>
      </div>

      {/* Right side: Zoom & Quick link copy */}
      <div className="flex items-center gap-2">
        {/* Zoom Controls */}
        <div className="hidden sm:flex items-center bg-[#eae8e2]/60 border border-[#c5c6cb]/40 rounded p-0.5">
          <button
            onClick={() => onZoomChange(Math.max(0.7, zoom - 0.1))}
            title="Reducir zoom"
            className="p-1 hover:bg-[#ffffff] rounded transition-colors text-[#1b1c18]"
            type="button"
          >
            <ZoomOut className="w-3.5 h-3.5" />
          </button>
          <span className="px-2 font-mono text-[11px] min-w-[42px] text-center font-medium">
            {Math.round(zoom * 100)}%
          </span>
          <button
            onClick={() => onZoomChange(Math.min(1.4, zoom + 0.1))}
            title="Aumentar zoom"
            className="p-1 hover:bg-[#ffffff] rounded transition-colors text-[#1b1c18]"
            type="button"
          >
            <ZoomIn className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => onZoomChange(1.0)}
            title="Restablecer tamaño (100%)"
            className="p-1 hover:bg-[#ffffff] rounded transition-colors text-[#785837] ml-0.5 border-l border-[#c5c6cb]/40 pl-1.5"
            type="button"
          >
            <Maximize2 className="w-3 h-3" />
          </button>
        </div>

        {/* Quick link button matching the attachment script */}
        <button
          id="copy-link-btn"
          onClick={onCopyLink}
          type="button"
          className={`inline-flex items-center gap-1.5 px-3 py-1 rounded text-[11px] font-sans font-semibold uppercase tracking-wider transition-all border ${
            copied
              ? 'bg-[#785837] text-white border-[#785837]'
              : 'bg-[#eae8e2]/80 hover:bg-[#e4e2dd] text-[#1b1c18] border-[#c5c6cb]/50'
          }`}
        >
          {copied ? <Check className="w-3.5 h-3.5" /> : <Link2 className="w-3.5 h-3.5 text-[#785837]" />}
          <span id="copy-btn-text">
            {copied ? (lang === 'es' ? '¡Copiado!' : 'Copied!') : (lang === 'es' ? 'Copiar Enlace' : 'Copy Vector')}
          </span>
        </button>
      </div>
    </div>
  );
};
