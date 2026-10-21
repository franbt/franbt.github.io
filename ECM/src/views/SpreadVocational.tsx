import React, { useState } from 'react';
import { IMAGES, VOCATIONAL_TRACKS, FOUR_STAGE_PIPELINE } from '../data/gazetteData';
import { VocationalTrack, ChapterId } from '../types';

interface SpreadVocationalProps {
  onOpenSyllabus: (track: VocationalTrack) => void;
  onOpenPdfExport: () => void;
  onNavigateChapter: (chapId: ChapterId) => void;
}

export const SpreadVocational: React.FC<SpreadVocationalProps> = ({
  onOpenSyllabus,
  onOpenPdfExport,
  onNavigateChapter,
}) => {
  const [counselorBooked, setCounselorBooked] = useState<boolean>(false);
  const [downloadNotice, setDownloadNotice] = useState<string | null>(null);

  const handleBookCounselor = () => {
    setCounselorBooked(true);
    setTimeout(() => setCounselorBooked(false), 3500);
  };

  const handleDownloadIntake = () => {
    setDownloadNotice('Municipal Candidate Intake Form (PDF - Multilingual: EN/AR/UK/ES/FR) initiated for download.');
    setTimeout(() => setDownloadNotice(null), 3000);
  };

  return (
    <div className="flex flex-col w-full">
      {/* Running Header */}
      <section className="w-full px-4 lg:px-12 py-2 bg-[#eae8e4]/70 border-b border-[#e4e2de] text-[11px] font-bold uppercase tracking-widest text-[#44474c] font-sans">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-1">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 bg-[#476554]"></span>
            <span className="text-[#061523] font-bold">Gazette Dossier</span>
            <span>/</span>
            <span>Chapter 02 · Economic Participation</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-[#476554] font-bold hidden sm:inline">Folio Spread 14–15</span>
            <span className="hidden sm:inline">/</span>
            <span>Convergence E-Zine · Bi-Annual Vol. IV</span>
            <div className="flex items-center gap-1 bg-white px-2 py-0.5 border border-[#e4e2de]">
              <span className="material-symbols-outlined text-xs text-[#476554]">verified_user</span>
              <span className="text-[#061523] text-[10px]">Municipal Labor Council Accredited</span>
            </div>
          </div>
        </div>
      </section>

      {/* Toast Alert */}
      {(counselorBooked || downloadNotice) && (
        <div className="fixed bottom-20 right-8 z-50 bg-[#061523] text-white text-xs px-4 py-2.5 shadow-xl border border-[#c6e8d2] flex items-center gap-2 animate-fade-in">
          <span className="material-symbols-outlined text-[#c6e8d2] text-sm">
            {counselorBooked ? 'event_available' : 'file_download'}
          </span>
          <span>
            {counselorBooked
              ? 'Appointment Requested: Counselor desk scheduled for next Tuesday, 09:30 CET at Hall 4, Civic Annex.'
              : downloadNotice}
          </span>
        </div>
      )}

      {/* Dual-Spread Workspace Container */}
      <div className="w-full px-4 lg:px-12 py-6 lg:py-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* ================= LEFT SPREAD (PAGE 14) ================= */}
          <article className="lg:col-span-6 flex flex-col justify-between bg-white p-6 md:p-8 shadow-sm border border-[#e4e2de]">
            {/* Top Ribbon */}
            <div className="flex items-center justify-between pb-3 border-b border-[#e4e2de] mb-4">
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 bg-[#c6e8d2]/60 text-[#032014] text-[10px] font-bold uppercase font-sans">
                  Occupational Integration Initiative
                </span>
                <span className="text-[11px] text-[#44474c] font-mono">Archival Track #SEC-882</span>
              </div>
              <span className="font-serif text-lg text-[#74777c]">P. 14</span>
            </div>

            {/* Headline */}
            <div>
              <h1 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-[#061523] tracking-tight leading-tight">
                From Arrival to Enterprise: De-mystifying Local Accreditation &amp; Workplace Entry
              </h1>
              <p className="text-sm md:text-base text-[#44474c] mt-2 font-serif italic text-justify leading-relaxed">
                Bureaucratic friction should never extinguish vocational mastery. By dismantling credential silos through municipal guild partnerships, our regional pipeline bridges prior foreign tenure directly with dignified urban enterprise.
              </p>
            </div>

            {/* Framed Documentary Photo */}
            <div className="my-5 group bg-[#f5f3ef] p-1 border border-[#e4e2de]">
              <div className="relative overflow-hidden bg-[#eae8e4] h-64">
                <img
                  className="w-full h-full object-cover grayscale contrast-110"
                  alt="Mentor Halim G. with Apprentice Elena V. inspecting woodcraft joint plans"
                  src={IMAGES.carpentryPhoto}
                  onError={(e) => {
                    const target = e.target as HTMLElement;
                    target.parentElement!.innerHTML = '<div class="w-full h-full flex flex-col items-center justify-center p-6 bg-[#eae8e4] text-[#476554]"><span class="material-symbols-outlined text-5xl mb-2">carpenter</span><span class="font-serif font-bold text-sm">Guild Hall 03, Riverside Yards</span><span class="text-xs text-[#74777c]">Plate 14.A Carpentry Guild</span></div>';
                  }}
                />
                <div className="absolute bottom-0 inset-x-0 bg-[#061523]/90 text-white px-3 py-1 flex justify-between items-center text-[11px]">
                  <span>Plate 14.A | Guild Hall 03, Riverside Yards</span>
                  <span className="text-[#ffdbcf]">Mentor Halim G. with Apprentice Elena V.</span>
                </div>
              </div>
              <div className="pt-1.5 px-2 flex justify-between text-[10px] text-[#44474c] font-sans">
                <span>Archival Record: Municipal Carpentry Guild</span>
                <span>Documented: October 2024</span>
              </div>
            </div>

            {/* Two-Column Essay */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-xs md:text-sm text-[#1b1c1a] leading-relaxed text-justify mb-5">
              <div>
                <p>
                  <span className="float-left font-serif text-4xl font-bold leading-none pr-2 pt-0.5 text-[#061523]">
                    W
                  </span>
                  hen international specialists arrive in our municipality, their primary barrier to civic mobility is rarely a deficit in dexterity or diligence. Instead, it is the labyrinthine apparatus of unrecognized foreign diplomas and guild gatekeeping that shunts skilled agronomists, builders, and chefs into precarious gig economies.
                </p>
                <p className="mt-2 text-[#44474c]">
                  The Directorate of Social Cohesion has instituted an assertive counter-model: shifting from paper-based validation to competency-first peer observation directly supervised by trade union councils.
                </p>
              </div>

              <div>
                <p className="text-[#44474c]">
                  By grounding accreditation within municipal works—such as retrofitting social housing and cataloging native urban tree canopies—candidates demonstrate mastery while receiving standard living stipends.
                </p>
                {/* Pull Quote */}
                <div className="mt-3 p-3 bg-[#f5f3ef] border-l-2 border-[#476554] relative">
                  <span className="material-symbols-outlined text-[#476554] text-lg block mb-1">format_quote</span>
                  <p className="font-serif italic text-xs md:text-sm text-[#061523] leading-snug">
                    “We ceased waiting for state bureaucratic equivalence. Today, the work site itself serves as the civic examination chamber.”
                  </p>
                  <div className="mt-1 text-[9px] font-bold text-[#44474c] uppercase tracking-wider font-sans">
                    — Mireille Laurent, President, Urban Commerce Federation
                  </div>
                </div>
              </div>
            </div>

            {/* The Four-Stage Insertion Pipeline */}
            <div className="mt-auto pt-4 bg-[#f5f3ef] p-4 border border-[#e4e2de]">
              <div className="flex items-center justify-between pb-2 border-b border-[#e4e2de] mb-3">
                <div className="flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[#476554] text-sm">hub</span>
                  <h2 className="font-serif font-bold text-xs uppercase tracking-tight text-[#061523]">
                    The Four-Stage Insertion Pipeline
                  </h2>
                </div>
                <span className="text-[10px] text-[#44474c] font-mono">
                  Operational Schematic 2024–25
                </span>
              </div>

              {/* Workflow Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                {FOUR_STAGE_PIPELINE.map((stage) => (
                  <div
                    key={stage.step}
                    className={`p-3 flex flex-col justify-between border ${
                      stage.highlight
                        ? 'bg-[#061523] text-white border-[#061523]'
                        : 'bg-white text-[#1b1c1a] border-[#e4e2de]'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span
                        className={`w-5 h-5 text-[10px] font-bold flex items-center justify-center ${
                          stage.highlight
                            ? 'bg-[#4f1500] text-white'
                            : 'bg-[#061523] text-white'
                        }`}
                      >
                        {stage.step}
                      </span>
                      <span className="material-symbols-outlined text-sm text-[#476554]">
                        {stage.icon}
                      </span>
                    </div>
                    <div>
                      <h3 className="font-serif font-bold text-xs leading-snug">{stage.title}</h3>
                      <p
                        className={`text-[10px] mt-1 leading-normal ${
                          stage.highlight ? 'text-[#b8c8da]' : 'text-[#44474c]'
                        }`}
                      >
                        {stage.description}
                      </p>
                    </div>
                    <div className="mt-2 pt-1 border-t border-current/20 text-[10px] font-bold font-mono">
                      {stage.timing}
                    </div>
                  </div>
                ))}
              </div>

              {/* Metric Stat Ribbon */}
              <div className="grid grid-cols-3 gap-3 mt-4 pt-3 border-t border-[#e4e2de]">
                <div>
                  <span className="font-serif text-xl sm:text-2xl font-bold text-[#061523]">
                    89.4%
                  </span>
                  <span className="text-[10px] text-[#44474c] block mt-0.5">
                    Post-program employment rate at 6 mos.
                  </span>
                </div>
                <div>
                  <span className="font-serif text-xl sm:text-2xl font-bold text-[#061523]">
                    420+
                  </span>
                  <span className="text-[10px] text-[#44474c] block mt-0.5">
                    Guild accredited artisans enrolled
                  </span>
                </div>
                <div>
                  <span className="font-serif text-xl sm:text-2xl font-bold text-[#476554]">
                    $1.2M
                  </span>
                  <span className="text-[10px] text-[#44474c] block mt-0.5">
                    Revolving civic equity fund pool
                  </span>
                </div>
              </div>
            </div>
          </article>

          {/* ================= RIGHT SPREAD (PAGE 15) ================= */}
          <section className="lg:col-span-6 flex flex-col justify-between bg-white p-6 md:p-8 shadow-sm border border-[#e4e2de]">
            {/* Top Ribbon */}
            <div className="flex items-center justify-between pb-3 border-b border-[#e4e2de] mb-4">
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 bg-[#061523] text-white text-[10px] font-bold uppercase font-sans">
                  Official Program Showcase
                </span>
                <span className="text-[11px] text-[#44474c] font-mono">
                  Active Intake: Cohort Winter 2025
                </span>
              </div>
              <span className="font-serif text-lg text-[#74777c]">P. 15</span>
            </div>

            <div>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#061523] tracking-tight">
                Curated Vocational Tracks
              </h2>
              <p className="text-xs md:text-sm text-[#44474c] mt-1">
                Open enrollment programs guaranteed by municipal operating statutes. Tuition is 100% sponsored via civic inclusion levies.
              </p>
            </div>

            {/* Catalog Track Cards (3 Core Tracks) */}
            <div className="space-y-4 my-5">
              {VOCATIONAL_TRACKS.map((track) => (
                <div
                  key={track.id}
                  className="bg-[#f5f3ef] p-4 border border-[#e4e2de] shadow-xs group hover:border-[#476554] transition-all"
                >
                  <div className="flex flex-col sm:flex-row gap-4">
                    <div className="w-full sm:w-1/3 h-32 bg-[#eae8e4] shrink-0 relative overflow-hidden">
                      <img
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        alt={track.imageAlt}
                        src={track.imageUrl}
                        onError={(e) => {
                          const target = e.target as HTMLElement;
                          target.parentElement!.innerHTML = `<div class="w-full h-full flex flex-col items-center justify-center p-3 bg-[#eae8e4] text-[#476554]"><span class="material-symbols-outlined text-3xl">build</span><span class="text-[10px] font-bold">${track.trackNum}</span></div>`;
                        }}
                      />
                      <span className="absolute top-2 left-2 bg-[#061523] text-white text-[9px] font-bold px-1.5 py-0.5 uppercase">
                        {track.trackNum}
                      </span>
                    </div>

                    <div className="w-full sm:w-2/3 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center justify-between text-[11px]">
                          <span className="text-[#476554] font-bold uppercase font-sans">
                            {track.category}
                          </span>
                          <span className="text-[#44474c] font-mono">{track.duration}</span>
                        </div>
                        <h3 className="font-serif font-bold text-sm md:text-base text-[#061523] mt-0.5">
                          {track.title}
                        </h3>
                        <p className="text-xs text-[#44474c] mt-1 leading-normal line-clamp-2">
                          {track.description}
                        </p>
                      </div>

                      <div className="flex items-center justify-between pt-2 mt-2 border-t border-[#e4e2de]">
                        <div className="flex items-center gap-1 text-[11px] text-[#44474c]">
                          <span className="material-symbols-outlined text-xs text-[#476554]">
                            apartment
                          </span>
                          <span className="line-clamp-1">{track.location}</span>
                        </div>
                        <button
                          type="button"
                          onClick={() => onOpenSyllabus(track)}
                          className="text-[#061523] font-bold text-xs flex items-center gap-1 hover:text-[#dd724b] transition-colors shrink-0"
                        >
                          <span>Syllabus</span>
                          <span className="material-symbols-outlined text-xs">arrow_forward</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Participant Support Package Breakdown */}
            <div className="p-4 bg-[#eae8e4] border border-[#e4e2de]">
              <div className="flex items-center gap-1.5 mb-1">
                <span className="material-symbols-outlined text-[#061523] text-base">shield</span>
                <h4 className="font-serif font-bold text-xs uppercase tracking-tight text-[#061523]">
                  Universal Participant Support Package
                </h4>
              </div>
              <p className="text-[11px] text-[#44474c] mb-3">
                All registered apprentices receive direct wraparound civic assistance to eliminate retention dropouts:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-xs">
                <div className="bg-white p-3 border border-[#e4e2de]">
                  <div className="flex items-center gap-1.5 text-[#476554] mb-1">
                    <span className="material-symbols-outlined text-sm">directions_transit</span>
                    <strong className="text-[11px] font-bold">Transit Stipend</strong>
                  </div>
                  <p className="text-[10px] text-[#44474c] leading-normal">
                    Monthly unlimited metropolitan bus and rail pass provided throughout training.
                  </p>
                </div>

                <div className="bg-white p-3 border border-[#e4e2de]">
                  <div className="flex items-center gap-1.5 text-[#476554] mb-1">
                    <span className="material-symbols-outlined text-sm">family_restroom</span>
                    <strong className="text-[11px] font-bold">Childcare Vouchers</strong>
                  </div>
                  <p className="text-[10px] text-[#44474c] leading-normal">
                    Direct municipal subsidies for daytime crèche or registered family care partners.
                  </p>
                </div>

                <div className="bg-white p-3 border border-[#e4e2de]">
                  <div className="flex items-center gap-1.5 text-[#476554] mb-1">
                    <span className="material-symbols-outlined text-sm">gavel</span>
                    <strong className="text-[11px] font-bold">Legal Document Prep</strong>
                  </div>
                  <p className="text-[10px] text-[#44474c] leading-normal">
                    Pro-bono civic attorneys finalize visa permits, business registrations, and tax IDs.
                  </p>
                </div>
              </div>
            </div>

            {/* Application Deadlines & Central Secretariat Registration Desk */}
            <div className="mt-4 bg-[#061523] text-white p-5 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-md">
              <div className="flex flex-col text-center sm:text-left">
                <div className="flex items-center justify-center sm:justify-start gap-1.5 text-[#ffdbcf] text-[10px] font-bold uppercase font-sans">
                  <span className="w-1.5 h-1.5 bg-[#ffdbcf]"></span>
                  <span>Next Deadline: November 28, 2024 · 17:00 CET</span>
                </div>
                <h4 className="font-serif font-bold text-base text-white mt-1">
                  Central Social Secretariat Walk-In Consultations
                </h4>
                <p className="text-[11px] text-[#b8c8da] mt-0.5">
                  Counselor Hours: Tuesday &amp; Thursday, 08:30–14:00 · Hall 4, Civic Annex
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-2 shrink-0">
                <button
                  type="button"
                  onClick={handleDownloadIntake}
                  className="bg-white text-[#061523] text-xs font-bold px-3.5 py-2 flex items-center gap-1 hover:bg-[#ffb59c] transition-colors"
                >
                  <span className="material-symbols-outlined text-sm">file_download</span>
                  <span>Intake Form (PDF)</span>
                </button>
                <button
                  type="button"
                  onClick={handleBookCounselor}
                  className="bg-[#4f1500] hover:bg-[#dd724b] text-white text-xs font-bold px-3.5 py-2 flex items-center gap-1 transition-colors"
                >
                  <span>Book Counselor</span>
                  <span className="material-symbols-outlined text-sm">calendar_month</span>
                </button>
              </div>
            </div>
          </section>
        </div>

        {/* Bottom Colophon Strip */}
        <section className="w-full mt-6 p-3 bg-[#eae8e4] border border-[#e4e2de] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs text-[#44474c] font-sans">
          <div className="flex items-center gap-4">
            <span><strong>Document ID:</strong> GAZ-2024-C02-VSP</span>
            <span><strong>Verified By:</strong> Secretariat for Vocational Integration &amp; Economic Equity</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              <span className="material-symbols-outlined text-xs text-[#476554]">print</span>
              Standard Dual-Page Broadsheet Mode
            </span>
            <span>Published under Open Municipal License 4.0</span>
          </div>
        </section>
      </div>
    </div>
  );
};
