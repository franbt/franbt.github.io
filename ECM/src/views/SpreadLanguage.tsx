import React, { useState } from 'react';
import { IMAGES, EXCHANGE_MODULES } from '../data/gazetteData';
import { ChapterId } from '../types';

interface SpreadLanguageProps {
  onOpenTandemModal: () => void;
  onNavigateChapter: (chapId: ChapterId) => void;
}

export const SpreadLanguage: React.FC<SpreadLanguageProps> = ({
  onOpenTandemModal,
  onNavigateChapter,
}) => {
  const [quickEnrollFeedback, setQuickEnrollFeedback] = useState<boolean>(false);

  const handleQuickAction = () => {
    setQuickEnrollFeedback(true);
    setTimeout(() => {
      setQuickEnrollFeedback(false);
      onOpenTandemModal();
    }, 400);
  };

  return (
    <div className="flex flex-col w-full">
      {/* Folio Running Head */}
      <div className="w-full px-4 lg:px-12 py-2 bg-[#eae8e4]/70 flex items-center justify-between text-[#44474c] text-[11px] font-bold uppercase tracking-widest border-b border-[#e4e2de] font-sans">
        <div className="flex items-center gap-2">
          <span className="text-[#061523] font-bold">CHAPTER 01</span>
          <span>·</span>
          <span>INTERCULTURAL BRIDGES</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="bg-[#061523] text-white px-2 py-0.5 font-mono">PAGES 08–09</span>
          <span className="hidden md:inline">MUNICIPAL CIVIC GAZETTE · AUTUMN EDITION</span>
        </div>
      </div>

      {/* Spread Container (Two-Page Broadside Layout) */}
      <div className="w-full px-4 lg:px-12 py-6 lg:py-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* ================= LEFT PAGE: NARRATIVE & ANALYTICAL ESSAY (P. 08) ================= */}
          <section className="lg:col-span-6 flex flex-col bg-white p-6 md:p-8 shadow-sm border border-[#e4e2de]">
            {/* Folio Header Inside Page */}
            <div className="flex items-center justify-between pb-2 mb-4 bg-[#f5f3ef] px-3 py-1.5 border border-[#e4e2de]">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#476554] font-sans">
                Public Innovation Dossier
              </span>
              <span className="text-[11px] text-[#44474c] font-mono">Spread Leaf 08 / 34</span>
            </div>

            {/* Headline Group */}
            <div className="space-y-2 mb-6">
              <div className="inline-flex items-center gap-1.5 bg-[#c6e8d2]/40 px-2.5 py-1">
                <span className="material-symbols-outlined text-[#476554] text-sm">forum</span>
                <span className="text-[10px] font-bold text-[#476554] uppercase tracking-wider font-sans">
                  Municipal Language Partnership Program
                </span>
              </div>
              <h1 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-[#061523] tracking-tight leading-tight">
                Conversations That Rebuild Belonging: The Dual-Track Tandem Experiment
              </h1>
              <p className="text-sm md:text-base text-[#44474c] italic font-serif pt-1 leading-relaxed">
                How decentralized, task-centered dialogues displaced conventional chalk-and-slate pedagogy across 14 municipal districts.
              </p>
            </div>

            {/* Metric Triptych Banner */}
            <div className="grid grid-cols-3 gap-2 bg-[#f5f3ef] p-4 mb-6 border border-[#e4e2de]">
              <div className="flex flex-col">
                <span className="font-serif text-2xl sm:text-3xl font-bold text-[#061523]">
                  +1,420
                </span>
                <span className="text-[10px] font-bold text-[#44474c] uppercase tracking-wider mt-1 font-sans">
                  Active Pairs Formed
                </span>
              </div>
              <div className="flex flex-col bg-white p-2 border border-[#e4e2de]">
                <span className="font-serif text-2xl sm:text-3xl font-bold text-[#476554]">
                  18
                </span>
                <span className="text-[10px] font-bold text-[#44474c] uppercase tracking-wider mt-1 font-sans">
                  Civic Venues Active
                </span>
              </div>
              <div className="flex flex-col pl-1">
                <span className="font-serif text-2xl sm:text-3xl font-bold text-[#dd724b]">
                  94%
                </span>
                <span className="text-[10px] font-bold text-[#44474c] uppercase tracking-wider mt-1 font-sans">
                  Transit &amp; Clinic Autonomy
                </span>
              </div>
            </div>

            {/* Documentary Photo with Contextual Caption */}
            <div className="flex flex-col mb-6 bg-[#f5f3ef] p-1 border border-[#e4e2de]">
              <div className="relative w-full h-64 md:h-72 bg-[#eae8e4] overflow-hidden">
                <img
                  className="w-full h-full object-cover grayscale contrast-125"
                  alt="Language exchange session in sunlit library conservatory"
                  src={IMAGES.languagePhoto}
                  onError={(e) => {
                    const target = e.target as HTMLElement;
                    target.parentElement!.innerHTML = '<div class="w-full h-full flex flex-col items-center justify-center p-6 bg-[#eae8e4] text-[#476554]"><span class="material-symbols-outlined text-5xl mb-2">forum</span><span class="font-serif font-bold text-sm">St. Jude Civic Conservatory</span><span class="text-xs text-[#74777c]">Intergenerational Tandem Session</span></div>';
                  }}
                />
                <div className="absolute top-2 left-2 bg-[#061523]/90 text-white text-[10px] font-bold px-2 py-0.5 uppercase tracking-wider">
                  Field Documentation · District 4 Library
                </div>
              </div>
              <div className="bg-[#eae8e4] px-3 py-1.5 flex flex-wrap items-center justify-between text-[11px] text-[#44474c] font-sans">
                <span>Photo: M. Santos / Department Archives</span>
                <span>Archival Ref: #D04-LANG-882</span>
                <span>Location: St. Jude Civic Conservatory</span>
              </div>
            </div>

            {/* Two-Column Body Text */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-xs md:text-sm text-[#1b1c1a] leading-relaxed mb-6 text-justify">
              <div className="space-y-3">
                <p>
                  <span className="float-left font-serif text-4xl font-bold text-[#061523] leading-none pr-2 pt-0.5">
                    W
                  </span>
                  hen the Municipal Council instituted the Dual-Track Tandem model in March 2023, standard intake assessments presented a grim portraiture: over 71% of newly resettled adults remained socially isolated after twelve months of standard classroom grammar instruction. The passive memorization of nominative cases offered scant utility during transit interruptions or urgent pediatric visits.
                </p>
                <p>
                  "We realized early on that syntax is mastered through shared motor actions rather than rote repetition," reflects Dr. Leyla Vane, Director of Newcomer Transition. "Pairing a retired railway supervisor who possesses local historical context with an apprentice electrical technician seeking technical vocabulary turned passive language into shared spatial conquest."
                </p>
              </div>

              <div className="space-y-3">
                <p>
                  Each partner commits ninety minutes weekly: forty-five minutes conversing strictly in the municipal vernacular, followed by forty-five minutes navigating the partner’s native tongue—ranging from Levantine Arabic and Ukrainian to Tigrinya and Dari. The mutual vulnerability dismantles traditional institutional hierarchy.
                </p>
                <p>
                  Rather than stationary desks, participants are equipped with district field guides: navigating weekly produce markets, filing utility repair permits, or conducting shared botanic surveys across municipal greenbelts.
                </p>
              </div>
            </div>

            {/* Empirical Observation Callout */}
            <div className="bg-[#efeeea] p-4 relative overflow-hidden mb-4 border-l-3 border-[#476554]">
              <div className="flex items-start gap-3">
                <span className="material-symbols-outlined text-[#476554] text-xl mt-0.5">lightbulb</span>
                <div className="space-y-1">
                  <span className="text-[10px] font-bold text-[#476554] uppercase tracking-widest font-sans">
                    Empirical Field Observation #09
                  </span>
                  <p className="font-serif font-bold text-sm text-[#061523] leading-snug">
                    Why standard classrooms fail adult newcomers — and why cooking classes and walking tours achieve 84% retention.
                  </p>
                  <p className="text-xs text-[#44474c] leading-relaxed">
                    Contextual sensory immersion reduces conversational cortisol. When participants manipulate bread dough or interpret pharmacy labeling together, semantic retrieval fires alongside kinetic memory, doubling language retention thresholds over six months.
                  </p>
                </div>
              </div>
            </div>

            {/* Left Page Base Micro-Colophon */}
            <div className="pt-3 border-t border-[#e4e2de] flex items-center justify-between text-[#44474c] text-[11px] font-mono">
              <span>Official Paper: DCMI-PUB-2024-C1</span>
              <span>Section Lead: Civic Integration Branch</span>
              <span>[08]</span>
            </div>
          </section>

          {/* ================= RIGHT PAGE: PROGRAM MATRIX & ACTION GUIDE (P. 09) ================= */}
          <section className="lg:col-span-6 flex flex-col bg-white p-6 md:p-8 shadow-sm border border-[#e4e2de]">
            {/* Folio Header Inside Page */}
            <div className="flex items-center justify-between pb-2 mb-4 bg-[#f5f3ef] px-3 py-1.5 border border-[#e4e2de]">
              <span className="text-[11px] text-[#44474c] font-mono">Spread Leaf 09 / 34</span>
              <span className="text-[10px] font-bold text-[#dd724b] uppercase tracking-wider font-sans">
                Weekly Operating Matrix
              </span>
            </div>

            {/* Title */}
            <div className="mb-4">
              <span className="text-[10px] font-bold text-[#44474c] uppercase tracking-widest font-sans">
                Public Catalog · Autumn Timetable
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#061523] mt-1 leading-tight">
                Modular Schedule &amp; Civic Exchange Modules
              </h2>
              <p className="text-xs text-[#44474c] mt-1">
                Open-access, no-fee municipal assemblies. Drop-ins accommodated subject to safety capacity.
              </p>
            </div>

            {/* Featured Quote */}
            <div className="my-4 py-4 bg-[#f5f3ef] px-6 text-center border-y border-[#e4e2de] relative">
              <div className="text-[#dd724b] font-serif text-3xl leading-none mb-1">“</div>
              <blockquote className="font-serif italic text-base sm:text-lg text-[#061523] max-w-md mx-auto leading-relaxed">
                When we learn someone’s phrasing, we inherit their geography.
              </blockquote>
              <div className="mt-2 text-[10px] font-bold text-[#44474c] tracking-widest uppercase font-sans">
                — Halima O.-Mercier, Intercultural Mediator &amp; Tandem Fellow
              </div>
            </div>

            {/* Modular Program Matrix (3 Modules) */}
            <div className="space-y-3 mb-6">
              {EXCHANGE_MODULES.map((mod) => (
                <div
                  key={mod.id}
                  className="bg-[#f5f3ef] p-4 border border-[#e4e2de] hover:border-[#476554] transition-colors"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-2">
                    <div className="flex items-center gap-2">
                      <span className={`${mod.badgeColorClass} text-[10px] font-bold px-2 py-0.5 uppercase tracking-wider`}>
                        {mod.modNum}
                      </span>
                      <h3 className="font-serif font-bold text-sm text-[#061523]">{mod.title}</h3>
                    </div>
                    <span className="text-[10px] bg-[#c6e8d2] text-[#032014] px-2 py-0.5 font-bold font-sans">
                      {mod.schedule}
                    </span>
                  </div>
                  <p className="text-xs text-[#44474c] mb-2 leading-relaxed">
                    {mod.description}
                  </p>
                  <div className="flex flex-wrap items-center gap-2 text-[10px] text-[#44474c] bg-white p-2 border border-[#e4e2de]">
                    <span className="flex items-center gap-1">
                      <span className="material-symbols-outlined text-xs text-[#476554]">location_on</span>
                      <span>{mod.location}</span>
                    </span>
                    {mod.features.map((feat, idx) => (
                      <span key={idx} className="flex items-center gap-1 border-l pl-2 border-[#e4e2de]">
                        <span className="material-symbols-outlined text-xs text-[#476554]">check_circle</span>
                        <span>{feat}</span>
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Interactive Sign-Up & Civic Registry Box */}
            <div className="bg-[#061523] text-white p-5 flex flex-col md:flex-row gap-4 items-center justify-between mt-auto shadow-md">
              <div className="space-y-1.5 max-w-sm text-center md:text-left">
                <span className="text-[10px] font-bold text-[#c9ead5] uppercase tracking-widest font-sans block">
                  Civic Intake Registration
                </span>
                <h4 className="font-serif font-bold text-lg text-white">
                  Register as a Tandem Fellow
                </h4>
                <p className="text-xs text-[#b8c8da] leading-relaxed">
                  Matched based on geographic district, spoken dialects, and vocational affinities.
                </p>
                {/* Accessibility indicators */}
                <div className="pt-2 flex flex-wrap items-center justify-center md:justify-start gap-3 text-[#b8c8da] text-[10px]">
                  <span className="flex items-center gap-1" title="Wheelchair Accessible">
                    <span className="material-symbols-outlined text-sm text-[#c9ead5]">accessible</span>
                    <span>ADA Compliant</span>
                  </span>
                  <span className="flex items-center gap-1" title="Childcare Available">
                    <span className="material-symbols-outlined text-sm text-[#c9ead5]">family_restroom</span>
                    <span>Crèche On-site</span>
                  </span>
                  <span className="flex items-center gap-1" title="Hearing Loops Installed">
                    <span className="material-symbols-outlined text-sm text-[#c9ead5]">hearing</span>
                    <span>Loop Inducted</span>
                  </span>
                </div>
              </div>

              {/* QR Stamp Box */}
              <div className="flex flex-col items-center bg-white text-[#061523] p-3 shadow-md min-w-[150px] text-center border border-[#e4e2de]">
                <div
                  onClick={onOpenTandemModal}
                  className="w-20 h-20 bg-[#f5f3ef] p-1 flex items-center justify-center cursor-pointer hover:opacity-85 transition-opacity"
                  title="Click to Enroll"
                >
                  <svg className="w-full h-full text-[#061523]" fill="currentColor" viewBox="0 0 100 100">
                    <rect height="30" width="30" x="0" y="0"></rect>
                    <rect fill="#fff" height="20" width="20" x="5" y="5"></rect>
                    <rect height="12" width="12" x="9" y="9"></rect>
                    <rect height="30" width="30" x="70" y="0"></rect>
                    <rect fill="#fff" height="20" width="20" x="75" y="5"></rect>
                    <rect height="12" width="12" x="79" y="9"></rect>
                    <rect height="30" width="30" x="0" y="70"></rect>
                    <rect fill="#fff" height="20" width="20" x="5" y="75"></rect>
                    <rect height="12" width="12" x="9" y="79"></rect>
                    <rect height="10" width="10" x="40" y="10"></rect>
                    <rect height="15" width="10" x="55" y="20"></rect>
                    <rect height="10" width="25" x="35" y="45"></rect>
                    <rect height="10" width="15" x="70" y="45"></rect>
                    <rect height="15" width="15" x="45" y="70"></rect>
                    <rect height="15" width="15" x="75" y="75"></rect>
                  </svg>
                </div>
                <span className="text-[10px] font-bold mt-1 text-[#061523] tracking-wider uppercase font-sans">
                  Scan to Enroll
                </span>
                <span className="text-[9px] text-[#44474c] font-mono">tandem.civic.gov</span>
                <button
                  type="button"
                  onClick={handleQuickAction}
                  className={`w-full mt-2 text-[10px] font-bold py-1 uppercase tracking-wider transition-all ${
                    quickEnrollFeedback
                      ? 'bg-[#476554] text-white'
                      : 'bg-[#4f1500] hover:bg-[#dd724b] text-white'
                  }`}
                >
                  {quickEnrollFeedback ? 'Opening Portal...' : 'Express Sign-up'}
                </button>
              </div>
            </div>

            {/* Right Page Base Micro-Colophon */}
            <div className="pt-3 border-t border-[#e4e2de] flex items-center justify-between text-[#44474c] text-[11px] font-mono mt-4">
              <a href="mailto:exchange@civic.gov" className="hover:underline">
                Inquiries: exchange@civic.gov
              </a>
              <button
                type="button"
                onClick={() => onNavigateChapter('vocational-pathways')}
                className="hover:text-[#061523] hover:underline"
              >
                Next Spread: Chapter 02 Vocational Pathways →
              </button>
              <span>[09]</span>
            </div>
          </section>
        </div>

        {/* Editorial Footnote Bar */}
        <div className="mt-6 p-3 bg-[#eae8e4] flex flex-col md:flex-row items-start md:items-center justify-between text-xs text-[#44474c] border border-[#e4e2de] gap-2">
          <div className="flex items-center gap-2">
            <strong className="text-[#061523]">EDITORIAL FOOTNOTE:</strong>
            <span>Statistical tracking compiled by the Department of Social Cohesion based on Q1-Q3 2024 biometric and civic participation logs.</span>
          </div>
          <div className="flex items-center gap-2 font-bold uppercase text-[10px] text-[#476554] font-sans">
            <span>● ARCHIVAL AUDIT COMPLIANT</span>
            <span>|</span>
            <span>ACCESSIBILITY VERIFIED WCAG 2.1 AA</span>
          </div>
        </div>
      </div>
    </div>
  );
};
