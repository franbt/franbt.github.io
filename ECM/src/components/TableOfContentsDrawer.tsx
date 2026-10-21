import React from 'react';
import { ChapterId } from '../types';

interface TableOfContentsDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  activeChapter: ChapterId;
  onSelectChapter: (chapter: ChapterId) => void;
}

export const TableOfContentsDrawer: React.FC<TableOfContentsDrawerProps> = ({
  isOpen,
  onClose,
  activeChapter,
  onSelectChapter,
}) => {
  if (!isOpen) return null;

  const sections = [
    {
      id: 'cover-foreword' as ChapterId,
      folio: 'Folio 01–02',
      tag: 'Gazette Editorial',
      tagColor: 'bg-[#476554] text-white',
      title: 'Opening Foreword: A City Measured by Its Welcoming Threshold',
      author: 'Dr. Elena Rostova, Director of Civic Integration',
      description: 'The foundational municipal thesis on localized social architecture, mutual adaptation, and the welcoming threshold across 14 districts.',
    },
    {
      id: 'language-exchange' as ChapterId,
      folio: 'Pages 08–09',
      tag: 'Chapter 01 · Cultural Exchange',
      tagColor: 'bg-[#c6e8d2] text-[#032014]',
      title: 'Conversations That Rebuild Belonging: The Dual-Track Tandem Experiment',
      author: 'Civic Integration Branch & Dr. Leyla Vane',
      description: 'How task-centered dialogues replaced chalk-and-slate pedagogy, featuring the modular weekly schedule (MOD-01 to MOD-03).',
    },
    {
      id: 'vocational-pathways' as ChapterId,
      folio: 'Folio 14–15',
      tag: 'Chapter 02 · Economic Inclusion',
      tagColor: 'bg-[#ffb59c]/50 text-[#4f1500]',
      title: 'From Arrival to Enterprise: De-mystifying Local Accreditation & Workplace Entry',
      author: 'Secretariat for Vocational Integration',
      description: 'Competency-first guild observation, the four-stage insertion pipeline, and 3 curated vocational tracks (Culinary, Forestry, Caregiving).',
    },
    {
      id: 'civic-spaces' as ChapterId,
      folio: 'Pages 20–21',
      tag: 'Chapter 03 · Shared Commons',
      tagColor: 'bg-[#476554] text-white',
      title: 'The Third Place as Civic Anchor: Turning Libraries, Allotment Gardens, and Sports Fields into Integration Engines',
      author: 'Urban Participation & Shared Infrastructure Branch',
      description: 'The 5 Pillars of Accessible Civic Hubs, active district cartographic network map (6 hubs), and Resident Action Guide MUN-SPACE-40.',
    },
    {
      id: 'activity-directory' as ChapterId,
      folio: 'Folio 36',
      tag: 'Citizen Mentorship',
      tagColor: 'bg-[#d4e4f7] text-[#0d1d2a]',
      title: 'Civic Directory: 32 Municipal Programs & Open Assembly Access',
      author: 'Municipal Council Secretariat',
      description: 'Searchable timetable, transit coordinates, accessible facilities, and free resident registrations.',
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/50 backdrop-blur-xs">
      <div className="bg-[#fbf9f5] w-full max-w-md h-full border-l border-[#e4e2de] shadow-2xl flex flex-col">
        {/* Header */}
        <div className="p-5 bg-[#061523] text-white flex items-center justify-between border-b border-[#1b2a38]">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#c6e8d2]">format_list_bulleted</span>
            <div>
              <span className="text-[10px] uppercase tracking-widest text-[#8291a2] font-mono block">
                ISSUE 04 TABLE OF CONTENTS
              </span>
              <h3 className="font-serif font-bold text-lg text-white">
                Dossier Folio Register
              </h3>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-[#8291a2] hover:text-white transition-colors"
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        {/* Section List */}
        <div className="p-4 overflow-y-auto space-y-3 flex-1">
          {sections.map((sec) => {
            const isCurrent = activeChapter === sec.id;
            return (
              <button
                key={sec.id}
                type="button"
                onClick={() => {
                  onSelectChapter(sec.id);
                  onClose();
                }}
                className={`w-full text-left p-3.5 border transition-all ${
                  isCurrent
                    ? 'border-[#476554] bg-[#c6e8d2]/20 ring-1 ring-[#476554]'
                    : 'border-[#e4e2de] bg-white hover:bg-[#f5f3ef]'
                }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 font-sans ${sec.tagColor}`}>
                    {sec.tag}
                  </span>
                  <span className="text-xs font-serif font-bold text-[#44474c]">
                    {sec.folio}
                  </span>
                </div>
                <h4 className="font-serif font-bold text-sm text-[#061523] leading-snug">
                  {sec.title}
                </h4>
                <p className="text-[11px] text-[#476554] font-medium mt-1">
                  {sec.author}
                </p>
                <p className="text-[11px] text-[#44474c] mt-1 leading-normal line-clamp-2">
                  {sec.description}
                </p>
              </button>
            );
          })}
        </div>

        {/* Footer info */}
        <div className="p-4 bg-[#eae8e4] border-t border-[#e4e2de] text-[11px] text-[#44474c] flex items-center justify-between">
          <span>Total Pages: 48</span>
          <span>Open Municipal License 4.0</span>
        </div>
      </div>
    </div>
  );
};
