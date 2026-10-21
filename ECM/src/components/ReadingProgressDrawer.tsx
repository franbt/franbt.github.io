import React from 'react';
import { ChapterId } from '../types';

interface ReadingProgressDrawerProps {
  activeChapter: ChapterId;
  onSelectChapter: (chapter: ChapterId) => void;
  onScrollToSection?: (sectionId: string) => void;
}

export const ReadingProgressDrawer: React.FC<ReadingProgressDrawerProps> = ({
  activeChapter,
  onSelectChapter,
  onScrollToSection,
}) => {
  const getChapterInfo = () => {
    switch (activeChapter) {
      case 'cover-foreword':
        return {
          title: 'Reading Progress: Introduction & Overview',
          spread: 'Spread 01 of 24 · Approx. 6 min read for the complete foreword section',
        };
      case 'language-exchange':
        return {
          title: 'Reading Progress: Chapter 01 · Intercultural Bridges',
          spread: 'Pages 08–09 · Approx. 8 min read · The Dual-Track Tandem Experiment',
        };
      case 'vocational-pathways':
        return {
          title: 'Reading Progress: Chapter 02 · Economic Participation',
          spread: 'Folio Spread 14–15 · Approx. 9 min read · Vocational Accreditation & Guild Tracks',
        };
      case 'civic-spaces':
        return {
          title: 'Reading Progress: Chapter 03 · The Shared Commons',
          spread: 'Pages 20–21 · Approx. 10 min read · District Commons Network & Space Access',
        };
      case 'activity-directory':
        return {
          title: 'Reading Progress: Comprehensive Activity Directory',
          spread: 'Folio Register 36 · 32 Municipal Programs across 14 Districts',
        };
    }
  };

  const info = getChapterInfo();

  return (
    <aside className="w-full px-4 lg:px-16 py-3 bg-[#f5f3ef] border-t border-b border-[#e4e2de] mt-8 shadow-xs">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-[#476554]/15 flex items-center justify-center text-[#476554] shrink-0">
            <span className="material-symbols-outlined text-lg">menu_book</span>
          </div>
          <div>
            <h4 className="text-sm md:text-base font-serif font-bold text-[#061523] leading-tight">
              {info.title}
            </h4>
            <p className="text-[11px] text-[#44474c] mt-0.5">
              {info.spread}
            </p>
          </div>
        </div>

        {/* Quick Skip Buttons */}
        <div className="flex items-center flex-wrap gap-1.5 self-stretch md:self-auto">
          <span className="text-[11px] font-bold text-[#44474c] uppercase tracking-wider mr-1 font-sans">
            Quick Skip:
          </span>
          <button
            type="button"
            onClick={() => {
              onSelectChapter('cover-foreword');
              onScrollToSection?.('cover-page');
            }}
            className={`text-xs px-2.5 py-1 transition-colors ${
              activeChapter === 'cover-foreword'
                ? 'bg-[#061523] text-white font-bold'
                : 'bg-[#eae8e4] hover:bg-[#e4e2de] text-[#1b1c1a]'
            }`}
          >
            Cover
          </button>

          <button
            type="button"
            onClick={() => {
              onSelectChapter('cover-foreword');
              onScrollToSection?.('foreword-page');
            }}
            className="text-xs px-2.5 py-1 bg-[#eae8e4] hover:bg-[#e4e2de] text-[#1b1c1a] transition-colors"
          >
            Foreword
          </button>

          <button
            type="button"
            onClick={() => onSelectChapter('language-exchange')}
            className={`text-xs px-2.5 py-1 transition-colors ${
              activeChapter === 'language-exchange'
                ? 'bg-[#061523] text-white font-bold'
                : 'bg-[#eae8e4] hover:bg-[#e4e2de] text-[#1b1c1a]'
            }`}
          >
            Chap. 1: Language
          </button>

          <button
            type="button"
            onClick={() => onSelectChapter('vocational-pathways')}
            className={`text-xs px-2.5 py-1 transition-colors ${
              activeChapter === 'vocational-pathways'
                ? 'bg-[#061523] text-white font-bold'
                : 'bg-[#eae8e4] hover:bg-[#e4e2de] text-[#1b1c1a]'
            }`}
          >
            Chap. 2: Skills
          </button>

          <button
            type="button"
            onClick={() => onSelectChapter('civic-spaces')}
            className={`text-xs px-2.5 py-1 transition-colors ${
              activeChapter === 'civic-spaces'
                ? 'bg-[#061523] text-white font-bold'
                : 'bg-[#eae8e4] hover:bg-[#e4e2de] text-[#1b1c1a]'
            }`}
          >
            Chap. 3: Commons
          </button>

          <button
            type="button"
            onClick={() => onSelectChapter('activity-directory')}
            className={`text-xs px-2.5 py-1 transition-colors ${
              activeChapter === 'activity-directory'
                ? 'bg-[#061523] text-white font-bold'
                : 'bg-[#eae8e4] hover:bg-[#e4e2de] text-[#1b1c1a]'
            }`}
          >
            Directory
          </button>
        </div>
      </div>
    </aside>
  );
};
