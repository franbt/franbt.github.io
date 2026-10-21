import React from 'react';
import { ChapterId, ViewMode } from '../types';
import { GAZETTE_META, IMAGES } from '../data/gazetteData';

interface HeaderProps {
  activeChapter: ChapterId;
  onSelectChapter: (chapter: ChapterId) => void;
  viewMode: ViewMode;
  onToggleViewMode: (mode: ViewMode) => void;
  zoomLevel: number;
  onZoomChange: (delta: number) => void;
  onOpenToc: () => void;
  onOpenPdfExport: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeChapter,
  onSelectChapter,
  viewMode,
  onToggleViewMode,
  zoomLevel,
  onZoomChange,
  onOpenToc,
  onOpenPdfExport,
}) => {
  const chapters: { id: ChapterId; label: string }[] = [
    { id: 'cover-foreword', label: 'Cover & Foreword' },
    { id: 'language-exchange', label: 'Chapter 1: Language & Cultural Exchange' },
    { id: 'vocational-pathways', label: 'Chapter 2: Vocational & Skills Pathways' },
    { id: 'civic-spaces', label: 'Chapter 3: Civic Spaces & Community Hubs' },
    { id: 'activity-directory', label: 'Activity Directory & Registration' },
  ];

  return (
    <header className="fixed top-0 w-full z-50 bg-[#fbf9f5]/95 backdrop-blur-md shadow-[0_1px_8px_rgba(0,0,0,0.04)] border-b border-[#e4e2de]">
      <div className="w-full px-4 lg:px-12 flex flex-col justify-between py-2.5">
        {/* Top Institutional Row */}
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <button
              onClick={() => onSelectChapter('cover-foreword')}
              className="flex flex-col text-left group focus:outline-none"
            >
              <span className="text-[11px] font-bold tracking-widest text-[#44474c] uppercase font-sans">
                {GAZETTE_META.subtitle}
              </span>
              <span className="text-xl md:text-2xl font-bold font-serif text-[#061523] tracking-tight group-hover:text-[#476554] transition-colors">
                {GAZETTE_META.title}
              </span>
            </button>

            <span className="hidden sm:inline-block bg-[#eae8e4] text-[#1b1c1a] text-[11px] font-bold px-2.5 py-1 tracking-wider uppercase font-sans">
              {GAZETTE_META.edition}
            </span>

            <div className="hidden lg:flex items-center gap-1.5 bg-[#c6e8d2]/40 px-2.5 py-1">
              <span className="text-[11px] font-bold text-[#4b6958] uppercase font-sans tracking-wide">
                {GAZETTE_META.subtext}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-1.5 bg-[#efeeea] px-2.5 py-1 text-xs">
              <span className="material-symbols-outlined text-[#44474c] text-base">menu_book</span>
              <span className="text-[#1b1c1a] font-medium font-sans">Interactive Reader</span>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={onOpenPdfExport}
                className="bg-[#061523] text-white text-xs font-semibold px-3 py-1.5 flex items-center gap-1.5 hover:bg-[#4f1500] hover:text-white transition-colors shadow-sm"
                title="Export or Print this issue"
              >
                <span className="material-symbols-outlined text-sm">download</span>
                <span className="hidden xs:inline">Export PDF</span>
              </button>

              <button
                type="button"
                onClick={() => onSelectChapter('cover-foreword')}
                className="w-8 h-8 rounded-full overflow-hidden border border-[#c4c6cc] focus:outline-none focus:ring-2 focus:ring-[#476554]"
                title="Institutional Seal"
              >
                <img
                  src={IMAGES.seal}
                  alt="Municipal Seal"
                  className="w-full h-full object-cover"
                />
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Navigation & Reader Controls Row */}
        <div className="flex items-center justify-between pt-2 border-t border-[#efeeea]/80 mt-1">
          <nav className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5" aria-label="Issue Chapters">
            {chapters.map((chap) => {
              const isActive = activeChapter === chap.id;
              return (
                <button
                  key={chap.id}
                  type="button"
                  onClick={() => onSelectChapter(chap.id)}
                  className={`text-xs md:text-sm px-2.5 py-1 transition-colors whitespace-nowrap font-medium ${
                    isActive
                      ? 'bg-[#061523] text-white font-bold shadow-xs'
                      : 'text-[#44474c] hover:text-[#061523] hover:bg-[#efeeea]'
                  }`}
                  aria-current={isActive ? 'page' : undefined}
                >
                  {chap.label}
                </button>
              );
            })}
          </nav>

          <div className="hidden md:flex items-center gap-1 text-[#44474c] shrink-0 pl-2">
            <button
              type="button"
              onClick={onOpenToc}
              className="p-1 hover:text-[#061523] hover:bg-[#efeeea] transition-colors rounded-xs"
              title="Table of Contents Drawer"
            >
              <span className="material-symbols-outlined text-lg">format_list_bulleted</span>
            </button>

            <button
              type="button"
              onClick={() => onToggleViewMode('spread')}
              className={`p-1 transition-colors rounded-xs ${
                viewMode === 'spread' ? 'text-[#061523] bg-[#efeeea] font-bold' : 'hover:text-[#061523]'
              }`}
              title="Broadside Dual-Spread View"
            >
              <span className="material-symbols-outlined text-lg">auto_stories</span>
            </button>

            <button
              type="button"
              onClick={() => onToggleViewMode('single')}
              className={`p-1 transition-colors rounded-xs ${
                viewMode === 'single' ? 'text-[#061523] bg-[#efeeea] font-bold' : 'hover:text-[#061523]'
              }`}
              title="Single Page Reading View"
            >
              <span className="material-symbols-outlined text-lg">description</span>
            </button>

            {/* Zoom Controls */}
            <div className="flex items-center gap-0.5 bg-[#f5f3ef] border border-[#e4e2de] px-1 py-0 ml-1">
              <button
                type="button"
                onClick={() => onZoomChange(-10)}
                disabled={zoomLevel <= 70}
                className="p-1 hover:text-[#061523] disabled:opacity-30 disabled:hover:text-[#44474c]"
                title="Zoom Out"
              >
                <span className="material-symbols-outlined text-sm">remove</span>
              </button>
              <span className="text-[11px] font-mono text-[#1b1c1a] px-1 min-w-[36px] text-center font-bold">
                {zoomLevel}%
              </span>
              <button
                type="button"
                onClick={() => onZoomChange(10)}
                disabled={zoomLevel >= 150}
                className="p-1 hover:text-[#061523] disabled:opacity-30 disabled:hover:text-[#44474c]"
                title="Zoom In"
              >
                <span className="material-symbols-outlined text-sm">add</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
