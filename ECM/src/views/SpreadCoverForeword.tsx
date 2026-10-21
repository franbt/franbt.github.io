import React, { useState } from 'react';
import { ChapterId } from '../types';
import { IMAGES } from '../data/gazetteData';

interface SpreadCoverForewordProps {
  onNavigateChapter: (chapId: ChapterId) => void;
  onOpenPdfExport: () => void;
}

export const SpreadCoverForeword: React.FC<SpreadCoverForewordProps> = ({
  onNavigateChapter,
  onOpenPdfExport,
}) => {
  const [isSaved, setIsSaved] = useState<boolean>(false);
  const [shareToast, setShareToast] = useState<string | null>(null);

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    setShareToast('Archival permanent link copied to clipboard.');
    setTimeout(() => setShareToast(null), 3000);
  };

  const handleToggleSave = () => {
    setIsSaved(!isSaved);
    setShareToast(!isSaved ? 'Spread bookmarked in local reading session.' : 'Bookmark removed.');
    setTimeout(() => setShareToast(null), 2500);
  };

  return (
    <div className="flex flex-col w-full">
      {/* Spread Viewing Mode Folio Ribbon */}
      <div className="w-full px-4 lg:px-12 py-2 bg-[#eae8e4] flex flex-wrap items-center justify-between gap-2 border-b border-[#e4e2de] text-xs">
        <div className="flex items-center gap-3">
          <span className="font-bold text-[#061523] uppercase tracking-widest text-[11px] font-sans">
            Opening Folio
          </span>
          <span className="text-[#44474c] font-sans hidden sm:inline">
            Dual-Page Spread View · Spreads 001–002
          </span>
          <span className="bg-[#476554]/15 text-[#476554] px-2 py-0.5 font-bold uppercase text-[10px]">
            Official Municipal Publication
          </span>
        </div>
        <div className="flex items-center gap-4 text-[#44474c]">
          <span className="font-mono text-[11px] hidden md:inline">
            Archival Registration: DLG-2024-CIV-049
          </span>
          <button
            type="button"
            onClick={handleToggleSave}
            className={`flex items-center gap-1 hover:text-[#061523] transition-colors ${
              isSaved ? 'text-[#476554] font-bold' : ''
            }`}
          >
            <span className="material-symbols-outlined text-sm">
              {isSaved ? 'bookmark_added' : 'bookmark_add'}
            </span>
            <span>{isSaved ? 'Spread Saved' : 'Save Spread'}</span>
          </button>
          <button
            type="button"
            onClick={() => window.print()}
            className="flex items-center gap-1 hover:text-[#061523] transition-colors"
          >
            <span className="material-symbols-outlined text-sm">print</span>
            <span>Print Master</span>
          </button>
        </div>
      </div>

      {/* Toast */}
      {shareToast && (
        <div className="fixed bottom-20 right-8 z-50 bg-[#061523] text-white text-xs px-4 py-2.5 shadow-xl border border-[#c6e8d2] flex items-center gap-2 animate-fade-in">
          <span className="material-symbols-outlined text-[#c6e8d2] text-sm">check_circle</span>
          <span>{shareToast}</span>
        </div>
      )}

      {/* Classical Broadside Two-Page Spread Container */}
      <div className="w-full px-4 lg:px-12 py-6 lg:py-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 shadow-xl border border-[#e4e2de]">
          {/* ================= LEFT PAGE: Institutional Cover (Cols 1-6) ================= */}
          <section
            id="cover-page"
            className="lg:col-span-6 bg-[#061523] text-white flex flex-col justify-between relative overflow-hidden p-6 md:p-10 min-h-[880px]"
          >
            {/* Background Ink-Wash Texture */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#061523] via-[#1b2a38] to-[#061523] pointer-events-none opacity-95"></div>
            <div className="absolute -right-24 -top-24 w-96 h-96 rounded-full bg-[#4f1500]/25 blur-3xl pointer-events-none"></div>

            {/* Cover Header & Civic Seal */}
            <div className="relative z-10">
              <div className="flex items-start justify-between gap-4 mb-6">
                <div className="flex flex-col">
                  <span className="text-[11px] font-bold tracking-widest text-[#8291a2] uppercase font-sans">
                    Autumn–Winter Edition · Vol. IV / No. 2
                  </span>
                  <span className="text-xs text-[#c6e8d2] mt-1 font-sans">
                    Municipal Directorate for Social Cohesion &amp; Civic Inclusion
                  </span>
                </div>
                {/* Institutional Seal Badge */}
                <div className="w-14 h-14 bg-white p-1 rounded shadow-md shrink-0 flex items-center justify-center">
                  <img
                    alt="Civic Cohesion Seal"
                    className="w-full h-full object-contain"
                    src={IMAGES.seal}
                    onError={(e) => {
                      (e.target as HTMLElement).style.display = 'none';
                    }}
                  />
                </div>
              </div>

              {/* Folio Spine Marker */}
              <div className="flex items-center gap-2 mb-6">
                <div className="w-8 h-px bg-[#ffb59c]"></div>
                <span className="text-[11px] font-bold text-[#ffb59c] tracking-widest uppercase font-sans">
                  Journal of Civic Inclusion &amp; Local Participation
                </span>
              </div>

              {/* Cover Title */}
              <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold text-[#fbf9f5] tracking-tight leading-none mb-6">
                CONVERGENCE
              </h1>

              {/* Main Spread Thesis / Headline */}
              <div className="bg-[#1b2a38]/80 p-5 mt-4 border-l-2 border-[#ffb59c]">
                <span className="text-[10px] font-bold text-[#ffb59c] uppercase tracking-wider block mb-1 font-sans">
                  Lead Dispatch
                </span>
                <p className="font-serif text-xl sm:text-2xl text-[#fbf9f5] leading-tight">
                  Bridges Across Neighborhoods: Pathways for Welcoming &amp; Inserting New Communities into Civic Life
                </p>
              </div>
            </div>

            {/* Documentary Graphic Centerpiece: Cohesion Metrics */}
            <div className="relative z-10 my-6 bg-white/5 p-4 border border-white/10">
              <div className="grid grid-cols-3 gap-4 text-center">
                <div className="p-1">
                  <span className="font-serif text-3xl sm:text-4xl font-bold text-[#c6e8d2] block">
                    14
                  </span>
                  <span className="text-[11px] text-[#8291a2] uppercase tracking-wider block mt-1 font-sans">
                    Civic Districts
                  </span>
                </div>
                <div className="p-1 border-x border-white/10">
                  <span className="font-serif text-3xl sm:text-4xl font-bold text-[#ffdbcf] block">
                    3,420
                  </span>
                  <span className="text-[11px] text-[#8291a2] uppercase tracking-wider block mt-1 font-sans">
                    New Residents
                  </span>
                </div>
                <div className="p-1">
                  <span className="font-serif text-3xl sm:text-4xl font-bold text-[#fbf9f5] block">
                    94%
                  </span>
                  <span className="text-[11px] text-[#8291a2] uppercase tracking-wider block mt-1 font-sans">
                    Retention Index
                  </span>
                </div>
              </div>
            </div>

            {/* Featured Index & Bottom Metadata */}
            <div className="relative z-10">
              <span className="text-[11px] font-bold uppercase tracking-widest text-[#8291a2] block mb-2 font-sans">
                Featured Folio Index
              </span>
              <div className="space-y-1 mb-6 text-xs">
                <button
                  type="button"
                  onClick={() => onNavigateChapter('language-exchange')}
                  className="w-full flex items-baseline justify-between p-2 hover:bg-white/10 transition-colors text-left group"
                >
                  <span className="font-serif text-[#fbf9f5] group-hover:text-[#c6e8d2] text-sm">
                    01. Intercultural Cafés &amp; Language Tandems
                  </span>
                  <span className="text-[#ffb59c] font-mono text-xs">Folio 04</span>
                </button>
                <button
                  type="button"
                  onClick={() => onNavigateChapter('vocational-pathways')}
                  className="w-full flex items-baseline justify-between p-2 hover:bg-white/10 transition-colors text-left group"
                >
                  <span className="font-serif text-[#fbf9f5] group-hover:text-[#c6e8d2] text-sm">
                    02. Apprenticeships &amp; Micro-Enterprise Incubators
                  </span>
                  <span className="text-[#ffb59c] font-mono text-xs">Folio 12</span>
                </button>
                <button
                  type="button"
                  onClick={() => onNavigateChapter('civic-spaces')}
                  className="w-full flex items-baseline justify-between p-2 hover:bg-white/10 transition-colors text-left group"
                >
                  <span className="font-serif text-[#fbf9f5] group-hover:text-[#c6e8d2] text-sm">
                    03. The Neighborhood Living Rooms Initiative
                  </span>
                  <span className="text-[#ffb59c] font-mono text-xs">Folio 22</span>
                </button>
                <button
                  type="button"
                  onClick={() => onNavigateChapter('activity-directory')}
                  className="w-full flex items-baseline justify-between p-2 hover:bg-white/10 transition-colors text-left group"
                >
                  <span className="font-serif text-[#fbf9f5] group-hover:text-[#c6e8d2] text-sm">
                    04. Comprehensive Local Directory: 32 Free Programs
                  </span>
                  <span className="text-[#ffb59c] font-mono text-xs">Folio 36</span>
                </button>
              </div>

              {/* Bottom Archival Strip */}
              <div className="pt-3 border-t border-white/15 flex items-center justify-between text-[#8291a2] text-[11px] font-mono">
                <span>CITY PRINT OFFICE · DEPT. SC-MI</span>
                <span>SPREAD 001 · ARCHIVE COV</span>
              </div>
            </div>
          </section>

          {/* ================= RIGHT PAGE: Editorial Foreword & Table of Contents (Cols 7-12) ================= */}
          <section
            id="foreword-page"
            className="lg:col-span-6 bg-white text-[#1b1c1a] flex flex-col justify-between p-6 md:p-10 min-h-[880px]"
          >
            <div>
              {/* Right Header Ribbon */}
              <div className="flex items-center justify-between pb-3 mb-4 border-b border-[#e4e2de]">
                <div className="flex items-center gap-2">
                  <span className="bg-[#476554] text-white text-[10px] font-bold px-2 py-0.5 uppercase tracking-wider font-sans">
                    Gazette Editorial
                  </span>
                  <span className="text-[11px] font-bold text-[#44474c] uppercase tracking-wider font-sans">
                    Opening Foreword
                  </span>
                </div>
                <span className="font-mono text-[#44474c] text-xs">PAGE 002 / 048</span>
              </div>

              {/* Director Lead Title */}
              <div className="mb-6">
                <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#061523] tracking-tight leading-tight">
                  A City Measured by Its Welcoming Threshold
                </h2>
                <p className="text-sm md:text-base text-[#44474c] mt-2 italic font-serif leading-relaxed">
                  "A city is only as resilient as its newest neighbor. How localized social architecture creates belonging from arrival to leadership."
                </p>
              </div>

              {/* Foreword Body & Portrait Split Grid */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-5 mb-6">
                {/* Director Portrait Card & Signature Block */}
                <div className="md:col-span-5 bg-[#f5f3ef] p-4 flex flex-col justify-between border border-[#e4e2de]">
                  <div>
                    <div className="w-full aspect-square overflow-hidden mb-3 shadow-xs bg-[#eae8e4] relative">
                      <img
                        alt="Elena Rostova, Director of Civic Integration & Neighborhood Affairs"
                        className="w-full h-full object-cover"
                        src={IMAGES.director}
                        onError={(e) => {
                          const target = e.target as HTMLElement;
                          target.parentElement!.innerHTML = '<div class="w-full h-full flex flex-col items-center justify-center p-4 bg-[#eae8e4] text-[#476554]"><span class="material-symbols-outlined text-4xl mb-1">person</span><span class="text-[11px] font-bold">Elena Rostova</span><span class="text-[9px] text-[#74777c]">Director of Civic Integration</span></div>';
                        }}
                      />
                    </div>
                    <div className="space-y-0.5">
                      <h3 className="font-serif font-bold text-sm text-[#061523]">
                        Elena Rostova
                      </h3>
                      <p className="text-[11px] text-[#44474c] leading-tight">
                        Director of Civic Integration &amp; Neighborhood Affairs
                      </p>
                      <p className="text-[11px] text-[#476554] font-medium">
                        Municipal Office of Social Cohesion
                      </p>
                    </div>
                  </div>
                  <div className="mt-4 pt-2 border-t border-[#e4e2de]">
                    <span className="font-serif italic text-[#061523] text-base tracking-wide block">
                      E. Rostova
                    </span>
                    <span className="text-[9px] font-mono text-[#74777c] uppercase tracking-wider block mt-0.5">
                      OFFICIAL MUNICIPAL SIGNOFF · 14 OCT 2024
                    </span>
                  </div>
                </div>

                {/* Two-Column Editorial Essay */}
                <div className="md:col-span-7 space-y-3 text-xs md:text-sm text-[#44474c] leading-relaxed text-justify">
                  <p>
                    <span className="float-left font-serif text-4xl font-bold text-[#061523] leading-none pr-2 pt-0.5">
                      W
                    </span>
                    hen we examine our public libraries, public squares, and community bakeries in early dawn, we witness the quiet machinery of mutual adaptation. Integration is neither passive nor unilateral; it is an active municipal practice of making room at every decision-making table.
                  </p>
                  <p>
                    Over the past semester, our fourteen civic districts piloted the Neighborhood Living Rooms project, opening municipal annexes for evening dialogue, shared workspace, and peer-to-peer administrative accompaniment.
                  </p>
                  {/* Pull Quote */}
                  <div className="bg-[#efeeea] p-4 my-3 border-l-2 border-[#476554]">
                    <div className="text-[#4f1500] font-serif text-2xl leading-none mb-1">“</div>
                    <p className="font-serif italic text-sm text-[#061523] leading-snug">
                      Integration is not an assimilation into quiet corners, but active co-creation of the public square.
                    </p>
                    <span className="block mt-1.5 text-[10px] font-bold text-[#44474c] uppercase tracking-wider font-sans">
                      — MUNICIPAL CHARTER FOR PUBLIC ASSEMBLY, §4
                    </span>
                  </div>
                  <p>
                    As you page through this Gazette, we invite you to view each profile not as distant case studies, but as an open invitation to participate, mentor, translate, or co-host our shared civic future.
                  </p>
                </div>
              </div>

              {/* Section: Detailed Table of Contents & Folio Directory */}
              <div className="pt-4 bg-[#f5f3ef] p-4 border border-[#e4e2de]">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-[#061523] text-base">
                      format_list_numbered
                    </span>
                    <h3 className="text-xs font-bold uppercase tracking-wider text-[#061523] font-sans">
                      Gazette Contents &amp; Departmental Registers
                    </h3>
                  </div>
                  <span className="text-[10px] text-[#44474c] font-mono">Issue 04 Index</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  <button
                    type="button"
                    onClick={() => onNavigateChapter('language-exchange')}
                    className="bg-white p-3 shadow-xs border border-[#e4e2de] text-left hover:border-[#476554] transition-colors group"
                  >
                    <div className="flex items-start justify-between">
                      <span className="bg-[#c6e8d2]/50 text-[#032014] px-1.5 py-0.5 text-[9px] font-bold uppercase">
                        Cultural Exchange
                      </span>
                      <span className="font-serif font-bold text-xs text-[#061523]">Fol. 04</span>
                    </div>
                    <h4 className="font-serif font-bold text-xs text-[#061523] mt-1 group-hover:text-[#476554]">
                      Intercultural Cafés &amp; Multilingual Tandems
                    </h4>
                    <p className="text-[11px] text-[#44474c] mt-0.5 line-clamp-2">
                      Conversational roundtables across eight public branches breaking language barriers.
                    </p>
                  </button>

                  <button
                    type="button"
                    onClick={() => onNavigateChapter('vocational-pathways')}
                    className="bg-white p-3 shadow-xs border border-[#e4e2de] text-left hover:border-[#476554] transition-colors group"
                  >
                    <div className="flex items-start justify-between">
                      <span className="bg-[#ffb59c]/30 text-[#4f1500] px-1.5 py-0.5 text-[9px] font-bold uppercase">
                        Economic Inclusion
                      </span>
                      <span className="font-serif font-bold text-xs text-[#061523]">Fol. 12</span>
                    </div>
                    <h4 className="font-serif font-bold text-xs text-[#061523] mt-1 group-hover:text-[#476554]">
                      Apprenticeships &amp; Micro-Incubators
                    </h4>
                    <p className="text-[11px] text-[#44474c] mt-0.5 line-clamp-2">
                      Vocational fast-tracks, foreign credential recognition, and municipal startup grants.
                    </p>
                  </button>

                  <button
                    type="button"
                    onClick={() => onNavigateChapter('civic-spaces')}
                    className="bg-white p-3 shadow-xs border border-[#e4e2de] text-left hover:border-[#476554] transition-colors group"
                  >
                    <div className="flex items-start justify-between">
                      <span className="bg-[#c6e8d2]/50 text-[#032014] px-1.5 py-0.5 text-[9px] font-bold uppercase">
                        Intergenerational
                      </span>
                      <span className="font-serif font-bold text-xs text-[#061523]">Fol. 22</span>
                    </div>
                    <h4 className="font-serif font-bold text-xs text-[#061523] mt-1 group-hover:text-[#476554]">
                      The Neighborhood Living Rooms Initiative
                    </h4>
                    <p className="text-[11px] text-[#44474c] mt-0.5 line-clamp-2">
                      Elder-youth mentorship, communal kitchens, and open repair ateliers.
                    </p>
                  </button>

                  <button
                    type="button"
                    onClick={() => onNavigateChapter('activity-directory')}
                    className="bg-white p-3 shadow-xs border border-[#e4e2de] text-left hover:border-[#476554] transition-colors group"
                  >
                    <div className="flex items-start justify-between">
                      <span className="bg-[#061523]/10 text-[#061523] px-1.5 py-0.5 text-[9px] font-bold uppercase">
                        Citizen Mentorship
                      </span>
                      <span className="font-serif font-bold text-xs text-[#061523]">Fol. 36</span>
                    </div>
                    <h4 className="font-serif font-bold text-xs text-[#061523] mt-1 group-hover:text-[#476554]">
                      Civic Directory: 32 Municipal Programs
                    </h4>
                    <p className="text-[11px] text-[#44474c] mt-0.5 line-clamp-2">
                      Complete schedules, transit coordinates, accessible facilities, and instant enrollments.
                    </p>
                  </button>
                </div>
              </div>
            </div>

            {/* Download & Reader Action Panel */}
            <div className="mt-6 pt-4 border-t border-[#e4e2de] flex flex-wrap items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={onOpenPdfExport}
                  className="bg-[#061523] hover:bg-[#4f1500] text-white px-3.5 py-1.5 flex items-center gap-1.5 transition-colors font-semibold shadow-xs"
                >
                  <span className="material-symbols-outlined text-sm">picture_as_pdf</span>
                  <span>Download High-Res PDF Edition (24.8 MB)</span>
                </button>
                <button
                  type="button"
                  onClick={handleShare}
                  className="bg-[#eae8e4] hover:bg-[#e4e2de] text-[#061523] px-3 py-1.5 flex items-center gap-1.5 transition-colors font-medium border border-[#c4c6cc]"
                >
                  <span className="material-symbols-outlined text-sm">share</span>
                  <span>Share Spread</span>
                </button>
              </div>

              <div className="flex items-center gap-2 text-[#44474c] text-[11px]">
                <span className="flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#476554]"></span>
                  Accessible Text Track Active
                </span>
                <span>|</span>
                <button
                  type="button"
                  onClick={() => onNavigateChapter('language-exchange')}
                  className="text-[#061523] hover:underline font-bold"
                >
                  Jump to Chapter 1 →
                </button>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};
