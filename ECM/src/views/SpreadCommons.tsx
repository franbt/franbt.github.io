import React, { useState } from 'react';
import { IMAGES, COMMONS_HUBS, PILLARS_OF_ACCESSIBILITY } from '../data/gazetteData';
import { HubNode, ChapterId } from '../types';

interface SpreadCommonsProps {
  onOpenBookingModal: (preselectedHubId?: string) => void;
  onNavigateChapter: (chapId: ChapterId) => void;
}

export const SpreadCommons: React.FC<SpreadCommonsProps> = ({
  onOpenBookingModal,
}) => {
  const [filterMode, setFilterMode] = useState<'all' | 'open'>('all');
  const [selectedHubId, setSelectedHubId] = useState<string>('hub-1');

  const displayedHubs = COMMONS_HUBS.filter((h) => (filterMode === 'open' ? h.isOpenNow : true));

  const handleSelectHub = (id: string) => {
    setSelectedHubId(id);
    const cardEl = document.getElementById(id);
    if (cardEl) {
      cardEl.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  };

  return (
    <div className="flex flex-col w-full">
      {/* Folio Header Bar */}
      <div className="w-full bg-[#eae8e4]/70 px-4 lg:px-12 py-2 flex flex-wrap items-center justify-between text-[#44474c] text-[11px] font-bold uppercase tracking-widest border-b border-[#e4e2de] font-sans">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 bg-[#476554] inline-block"></span>
          <span className="text-[#061523] font-bold">Chapter 03 · The Shared Commons</span>
          <span>/</span>
          <span>Pages 20–21</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="hidden md:inline text-[#44474c]">Special Municipal Gazette Dossier</span>
          <span className="text-[#c4c6cc] hidden md:inline">/</span>
          <span className="text-[#476554] font-bold">Public Domain Policy Publication</span>
        </div>
      </div>

      {/* Spread Container (A4 / Broadside Split) */}
      <div className="w-full px-4 lg:px-12 py-6 lg:py-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* ================= LEFT PAGE: Public Space & Civic Integration Analysis (Cols 1-6) ================= */}
          <article className="lg:col-span-6 flex flex-col gap-6 bg-white p-6 md:p-8 shadow-sm border border-[#e4e2de]">
            {/* Chapter Category & Folio Stamp */}
            <div className="flex items-center justify-between pb-2 border-b border-[#e4e2de]">
              <div className="flex items-center gap-1.5 bg-[#c6e8d2]/40 px-2 py-0.5">
                <span className="material-symbols-outlined text-[#476554] text-xs">nature_people</span>
                <span className="text-[10px] font-bold text-[#476554] uppercase tracking-wider font-sans">
                  Urban Participation &amp; Shared Infrastructure
                </span>
              </div>
              <span className="text-[11px] text-[#44474c] font-mono">Dossier Ref: CP-03/24-B</span>
            </div>

            {/* Headline & Lead */}
            <div className="space-y-2">
              <h1 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-[#061523] tracking-tight leading-tight">
                The Third Place as Civic Anchor: Turning Neighborhood Libraries, Allotment Gardens, and Sports Fields into Integration Engines
              </h1>
              <p className="text-sm md:text-base text-[#44474c] font-serif italic leading-relaxed">
                Physical proximity and shared routine dissolve the friction of societal isolation, creating fertile ground where migrants, isolated elders, and disengaged youth organically construct a shared municipal belonging.
              </p>
            </div>

            {/* Documentary Photo Feature with Print Framing */}
            <div className="flex flex-col bg-[#f5f3ef] p-1 border border-[#e4e2de]">
              <div className="overflow-hidden relative h-64 md:h-72 w-full bg-[#eae8e4]">
                <img
                  className="w-full h-full object-cover"
                  alt="Intergenerational community garden workshop at Riverside Municipal Commons"
                  src={IMAGES.gardenPhoto}
                  onError={(e) => {
                    const target = e.target as HTMLElement;
                    target.parentElement!.innerHTML = '<div class="w-full h-full flex flex-col items-center justify-center p-6 bg-[#eae8e4] text-[#476554]"><span class="material-symbols-outlined text-5xl mb-2">park</span><span class="font-serif font-bold text-sm">Riverside Municipal Commons</span><span class="text-xs text-[#74777c]">Field Study Plot 14-B</span></div>';
                  }}
                />
                <div className="absolute top-2 left-2 bg-[#061523] text-white text-[10px] font-bold px-2 py-0.5 uppercase tracking-wider">
                  Field Study · Plot 14-B
                </div>
              </div>
              <div className="pt-1.5 px-2 flex flex-wrap items-center justify-between text-[#44474c] text-[10px] font-sans">
                <span>Doc. Record: Riverside Municipal Commons</span>
                <span>Archive Photo: Marcus Lindqvist / Municipal Gazette</span>
              </div>
            </div>

            {/* Two-Column Broadsheet Text Layout */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-xs md:text-sm text-[#1b1c1a] leading-relaxed text-justify">
              <div className="space-y-3">
                <p>
                  <span className="float-left font-serif text-4xl font-bold text-[#061523] leading-none pr-2 pt-0.5">
                    W
                  </span>
                  hen urban sociologist Ray Oldenburg coined the concept of the “Third Place”—distinct from the domesticity of home and the contractual demands of the workplace—he identified an indispensable social buffer. Yet in an era dominated by privatized public realms and algorithmic isolation, public municipalities must reclaim these zones as foundational democratic infrastructure rather than recreational luxuries.
                </p>
                <p className="text-[#44474c]">
                  Our two-year municipal census across fourteen regional wards revealed an alarming paradox: while digital connectivity reached 98% household saturation, voluntary cross-demographic encounters plummeted by 42%. Elderly residents in multi-story council estates routinely endure weeks without a spoken dialogue, while newly arrived migrant families navigate bureaucratic labyrinths without ever establishing casual neighborhood trust.
                </p>
              </div>

              <div className="space-y-3">
                <p>
                  The solution does not lie in specialized, siloed social interventions that label individuals by their deficits. Rather, it flourishes when daily routine intersects over mundane, purposeful shared activities: repairing a broken toaster in a municipal workshop, nursing winter heirloom greens in an allotment bed, or reviewing local housing tenure over a communal samovar.
                </p>
                <p className="text-[#44474c]">
                  By lowering barrier thresholds and embedding deliberate hospitality into physical civic infrastructure, our community hubs transition from static government brick-and-mortar into vibrant engines of civic resilience where social solidarity is practiced daily.
                </p>
              </div>
            </div>

            {/* Pull Quote Block */}
            <div className="bg-[#f5f3ef] p-4 relative border-l-3 border-[#7e2b09]">
              <span className="font-serif text-3xl text-[#dd724b] absolute top-1 left-2 leading-none select-none">“</span>
              <p className="font-serif italic text-sm md:text-base text-[#061523] leading-snug relative z-10 pl-4">
                Integration is not achieved through lecture halls or policy whitepapers; it is forged across potting soil, chess clocks, and shared tea urns.
              </p>
              <div className="mt-2 pl-4 flex items-center justify-between text-[10px] font-bold text-[#44474c] uppercase tracking-wider font-sans">
                <span>— Dr. Elena Rostova, Director of Civic Integration</span>
                <span className="font-mono">ANNUAL REPORT § 4.2</span>
              </div>
            </div>

            {/* The 5 Pillars of Accessible Civic Hubs Infographic */}
            <div className="bg-[#eae8e4] p-5 border border-[#e4e2de] space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[#061523] text-lg">account_balance</span>
                  <h2 className="font-serif font-bold text-sm text-[#061523]">
                    The 5 Pillars of Accessible Civic Hubs
                  </h2>
                </div>
                <span className="bg-white text-[#476554] text-[9px] font-bold px-1.5 py-0.5 uppercase tracking-wider">
                  Municipal Charter Standards
                </span>
              </div>

              <div className="space-y-1.5 text-xs">
                {PILLARS_OF_ACCESSIBILITY.map((pillar) => (
                  <div
                    key={pillar.num}
                    className="bg-white p-3 flex items-start gap-3 border border-[#e4e2de] hover:border-[#476554] transition-all"
                  >
                    <div className="bg-[#061523] text-white font-bold w-5 h-5 flex items-center justify-center text-[10px] shrink-0 font-mono">
                      {pillar.num}
                    </div>
                    <div className="flex-1">
                      <span className="font-bold text-[#061523] block text-xs mb-0.5">{pillar.title}</span>
                      <span className="text-[#44474c] text-[11px] leading-relaxed block">{pillar.description}</span>
                    </div>
                    <span className="material-symbols-outlined text-[#476554] text-sm shrink-0">check_circle</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Metric Stat Strip */}
            <div className="grid grid-cols-3 gap-2 bg-[#061523] text-white p-4 shadow-md">
              <div className="flex flex-col">
                <span className="font-serif text-2xl sm:text-3xl font-bold text-[#c9ead5]">
                  18,400+
                </span>
                <span className="text-[10px] font-bold text-[#b8c8da] uppercase tracking-wider mt-1 font-sans">
                  Monthly Hub Visitors
                </span>
              </div>
              <div className="flex flex-col border-x border-white/10 px-2">
                <span className="font-serif text-2xl sm:text-3xl font-bold text-[#ffb59c]">
                  84%
                </span>
                <span className="text-[10px] font-bold text-[#b8c8da] uppercase tracking-wider mt-1 font-sans">
                  Cross-Group Trust Rate
                </span>
              </div>
              <div className="flex flex-col pl-1">
                <span className="font-serif text-2xl sm:text-3xl font-bold text-[#c6e8d2]">
                  310
                </span>
                <span className="text-[10px] font-bold text-[#b8c8da] uppercase tracking-wider mt-1 font-sans">
                  Grassroots Workshops/Yr
                </span>
              </div>
            </div>
          </article>

          {/* ================= RIGHT PAGE: Neighborhood Directory & Interactive Commons Map (Cols 7-12) ================= */}
          <section className="lg:col-span-6 flex flex-col gap-6 bg-white p-6 md:p-8 shadow-sm border border-[#e4e2de]">
            {/* Header & Sector Filter */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div>
                <span className="text-[10px] font-bold text-[#476554] uppercase tracking-widest block font-sans">
                  Cartographic Index · Autumn 2024
                </span>
                <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#061523] tracking-tight">
                  Active District Commons Network
                </h2>
              </div>
              <div className="flex items-center gap-1 bg-[#efeeea] p-1 border border-[#e4e2de]">
                <button
                  type="button"
                  onClick={() => setFilterMode('all')}
                  className={`px-3 py-1 text-xs font-bold transition-colors ${
                    filterMode === 'all'
                      ? 'bg-[#061523] text-white shadow-xs'
                      : 'text-[#44474c] hover:text-[#061523]'
                  }`}
                >
                  All 6 Hubs
                </button>
                <button
                  type="button"
                  onClick={() => setFilterMode('open')}
                  className={`px-3 py-1 text-xs font-bold transition-colors ${
                    filterMode === 'open'
                      ? 'bg-[#061523] text-white shadow-xs'
                      : 'text-[#44474c] hover:text-[#061523]'
                  }`}
                >
                  Open Now
                </button>
              </div>
            </div>

            {/* Stylized Municipal Cartographic Section */}
            <div className="bg-[#f5f3ef] p-4 border border-[#e4e2de] flex flex-col gap-2">
              <div className="flex items-center justify-between text-[11px] font-mono text-[#44474c]">
                <div className="flex items-center gap-1">
                  <span className="material-symbols-outlined text-sm text-[#476554]">explore</span>
                  <span>GRID REF: WARD 02 THROUGH WARD 09</span>
                </div>
                <span>SCALE: 1:15,000 MUNICIPAL SURVEY</span>
              </div>

              {/* Interactive Vector Map Canvas */}
              <div className="relative w-full h-80 bg-[#eae8e4] overflow-hidden border border-[#c4c6cc] flex items-center justify-center select-none">
                {/* SVG Cartographic District Grid Overlay */}
                <svg className="absolute inset-0 w-full h-full text-[#74777c]/20" xmlns="http://www.w3.org/2000/svg">
                  <defs>
                    <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                      <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="0.75" />
                    </pattern>
                  </defs>
                  <rect width="100%" height="100%" fill="url(#grid)" />
                  {/* Curving River Commons Path */}
                  <path
                    d="M -20,260 C 150,240 220,140 400,120 C 550,100 650,40 850,20"
                    fill="none"
                    stroke="rgba(71, 101, 84, 0.45)"
                    strokeLinecap="round"
                    strokeWidth="24"
                  />
                  <path
                    d="M -20,260 C 150,240 220,140 400,120 C 550,100 650,40 850,20"
                    fill="none"
                    stroke="rgba(198, 232, 210, 0.7)"
                    strokeLinecap="round"
                    strokeWidth="12"
                  />
                  {/* Railway & Transit Spine Lines */}
                  <path d="M 50,-10 L 180,350" fill="none" opacity="0.4" stroke="#74777C" strokeDasharray="6 4" strokeWidth="2" />
                  <path d="M -10,180 L 700,200" fill="none" opacity="0.4" stroke="#74777C" strokeDasharray="6 4" strokeWidth="2" />
                  {/* District Labels */}
                  <text x="50" y="45" fill="#74777c" fontFamily="'Source Sans 3', sans-serif" fontSize="10" fontWeight="700" letterSpacing="0.1em">
                    NORTH HARBOR WARD
                  </text>
                  <text x="320" y="295" fill="#74777c" fontFamily="'Source Sans 3', sans-serif" fontSize="10" fontWeight="700" letterSpacing="0.1em">
                    OLD FOUNDRY QUARTER
                  </text>
                  <text x="320" y="55" fill="#74777c" fontFamily="'Source Sans 3', sans-serif" fontSize="10" fontWeight="700" letterSpacing="0.1em">
                    RIVER PARK CORRIDOR
                  </text>
                </svg>

                {/* 6 Interactive Hub Pins */}
                {COMMONS_HUBS.map((hub) => {
                  const isSelected = selectedHubId === hub.id;
                  return (
                    <button
                      key={hub.id}
                      type="button"
                      onClick={() => handleSelectHub(hub.id)}
                      style={{ top: `${hub.yPercent}%`, left: `${hub.xPercent}%` }}
                      className="absolute -translate-x-1/2 -translate-y-1/2 group z-20 focus:outline-none"
                      title={`${hub.name} - ${hub.subtitle}`}
                    >
                      <div className="relative flex items-center justify-center">
                        {isSelected && (
                          <span className="animate-ping absolute inline-flex h-9 w-9 rounded-full bg-[#476554] opacity-50"></span>
                        )}
                        <span
                          className={`relative w-8 h-8 font-bold text-xs flex items-center justify-center shadow-lg transition-transform ${
                            isSelected
                              ? 'scale-125 ring-2 ring-[#061523] bg-[#061523] text-white'
                              : 'bg-white text-[#061523] border border-[#74777c] group-hover:scale-110'
                          }`}
                        >
                          {hub.num}
                        </span>
                      </div>
                      <span
                        className={`absolute top-9 left-1/2 -translate-x-1/2 whitespace-nowrap text-[10px] font-bold px-1.5 py-0.5 transition-all shadow-xs ${
                          isSelected
                            ? 'bg-[#061523] text-white opacity-100 z-30'
                            : 'bg-white/95 text-[#1b1c1a] border border-[#c4c6cc] opacity-80 group-hover:opacity-100'
                        }`}
                      >
                        {hub.name.replace(' Community Hall', '').replace(' Municipal Library', '')}
                      </span>
                    </button>
                  );
                })}

                {/* Compass Rosette Marker */}
                <div className="absolute bottom-2 right-2 bg-white/90 px-2 py-1 text-[10px] font-mono flex items-center gap-1 shadow-xs border border-[#e4e2de]">
                  <span className="material-symbols-outlined text-xs text-[#061523]">north</span>
                  <span>GRID N-04</span>
                </div>
              </div>

              <div className="flex items-center justify-between text-xs text-[#44474c] pt-1">
                <span className="text-[11px]">Click any node number on map to focus directory entry</span>
                <span className="text-[#476554] font-bold flex items-center gap-1.5 text-[11px]">
                  <span className="w-2 h-2 rounded-full bg-[#476554]"></span>
                  <span>6 of 6 Verified Accessible</span>
                </span>
              </div>
            </div>

            {/* The 6 Active Community Cohesion Hubs: Cards */}
            <div className="space-y-3" id="hubContainer">
              {displayedHubs.map((hub) => {
                const isSelected = selectedHubId === hub.id;
                return (
                  <div
                    key={hub.id}
                    id={hub.id}
                    onClick={() => setSelectedHubId(hub.id)}
                    className={`p-4 border transition-all cursor-pointer ${
                      isSelected
                        ? 'border-[#476554] bg-[#c6e8d2]/15 ring-2 ring-[#476554] shadow-sm'
                        : 'border-[#e4e2de] bg-white hover:border-[#74777c]'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-start gap-3">
                        <div
                          className={`w-7 h-7 font-bold flex items-center justify-center text-xs shrink-0 font-mono ${
                            isSelected ? 'bg-[#061523] text-white' : 'bg-[#eae8e4] text-[#061523]'
                          }`}
                        >
                          {hub.num}
                        </div>
                        <div>
                          <h3 className="font-serif font-bold text-sm md:text-base text-[#061523]">
                            {hub.name}
                          </h3>
                          <p className="text-xs text-[#476554] font-semibold">
                            {hub.subtitle}
                          </p>
                        </div>
                      </div>
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 uppercase tracking-wide shrink-0 font-sans ${
                          hub.isOpenNow
                            ? 'bg-[#c6e8d2] text-[#032014]'
                            : 'bg-[#eae8e4] text-[#74777c]'
                        }`}
                      >
                        {hub.schedule}
                      </span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-2 mt-3 pt-2 text-[11px] text-[#44474c] bg-[#f5f3ef] p-2 border border-[#e4e2de]">
                      <div><strong className="text-[#1b1c1a]">Location:</strong> {hub.location}</div>
                      <div><strong className="text-[#1b1c1a]">Transit:</strong> {hub.transit}</div>
                      <div><strong className="text-[#1b1c1a]">Focus:</strong> {hub.focus}</div>
                    </div>

                    {isSelected && (
                      <div className="mt-2.5 pt-2 border-t border-[#e4e2de] flex items-center justify-between">
                        <span className="text-[11px] text-[#476554] font-medium flex items-center gap-1">
                          <span className="material-symbols-outlined text-xs">pin_drop</span>
                          <span>Centered on Cartographic Grid</span>
                        </span>
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            onOpenBookingModal(hub.id);
                          }}
                          className="text-xs bg-[#061523] hover:bg-[#476554] text-white font-bold px-3 py-1 flex items-center gap-1 transition-colors"
                        >
                          <span>Reserve Space Here</span>
                          <span className="material-symbols-outlined text-xs">arrow_forward</span>
                        </button>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Resident Action Guide: How to Host an Activity */}
            <div className="bg-[#f5f3ef] p-5 border border-[#e4e2de] shadow-xs space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[#7e2b09] text-xl">how_to_reg</span>
                  <h3 className="font-serif font-bold text-sm md:text-base text-[#061523]">
                    Resident Action Guide: Hosting an Activity
                  </h3>
                </div>
                <span className="text-[10px] bg-white px-2 py-0.5 text-[#44474c] font-mono border border-[#e4e2de]">
                  Policy Code: MUN-SPACE-40
                </span>
              </div>
              <p className="text-xs text-[#44474c] leading-relaxed">
                Under municipal ordinance 2021-08, any collective of two or more residents has the statutory right to request free reservation of municipal community rooms for non-commercial educational, social, or mutual-aid programming.
              </p>

              {/* 4 Steps Flow */}
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-2 text-xs">
                <div className="bg-white p-3 flex flex-col justify-between border border-[#e4e2de]">
                  <div>
                    <span className="text-[10px] font-bold text-[#476554] uppercase tracking-wider block mb-0.5">
                      Step 01
                    </span>
                    <strong className="text-[#061523] block mb-1 text-xs">Verify Principles</strong>
                    <p className="text-[11px] text-[#44474c] leading-normal">
                      Activity must be non-profit, free for attendees, and open to all neighborhood residents without discrimination.
                    </p>
                  </div>
                  <span className="text-[9px] text-[#74777c] mt-2 block font-mono">Form § 1.A</span>
                </div>

                <div className="bg-white p-3 flex flex-col justify-between border border-[#e4e2de]">
                  <div>
                    <span className="text-[10px] font-bold text-[#476554] uppercase tracking-wider block mb-0.5">
                      Step 02
                    </span>
                    <strong className="text-[#061523] block mb-1 text-xs">Select Hub &amp; Tier</strong>
                    <p className="text-[11px] text-[#44474c] leading-normal">
                      Choose from Tier A (Multi-purpose Studio), Tier B (Teaching Kitchen), or Tier C (Assembly Hall).
                    </p>
                  </div>
                  <span className="text-[9px] text-[#74777c] mt-2 block font-mono">Form § 2.B</span>
                </div>

                <div className="bg-white p-3 flex flex-col justify-between border border-[#e4e2de]">
                  <div>
                    <span className="text-[10px] font-bold text-[#476554] uppercase tracking-wider block mb-0.5">
                      Step 03
                    </span>
                    <strong className="text-[#061523] block mb-1 text-xs">Submit Application</strong>
                    <p className="text-[11px] text-[#44474c] leading-normal">
                      Log via the municipal portal or file an in-person petition at any library desk at least 10 business days prior.
                    </p>
                  </div>
                  <span className="text-[9px] text-[#74777c] mt-2 block font-mono">10-Day Window</span>
                </div>

                <div className="bg-white p-3 flex flex-col justify-between border border-[#e4e2de]">
                  <div>
                    <span className="text-[10px] font-bold text-[#476554] uppercase tracking-wider block mb-0.5">
                      Step 04
                    </span>
                    <strong className="text-[#061523] block mb-1 text-xs">Door Access Badge</strong>
                    <p className="text-[11px] text-[#44474c] leading-normal">
                      Collect your host credentials, key fob, and safety kit at the site steward's reception desk.
                    </p>
                  </div>
                  <span className="text-[9px] text-[#476554] mt-2 block font-mono font-bold">Issuance Confirmed</span>
                </div>
              </div>

              {/* Action Button */}
              <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-[#e4e2de]">
                <div className="flex items-center gap-1.5 text-xs text-[#44474c]">
                  <span className="material-symbols-outlined text-sm text-[#476554]">verified_user</span>
                  <span className="text-[11px]">Municipal Insurance automatically covers certified gatherings under 120 guests.</span>
                </div>
                <button
                  type="button"
                  onClick={() => onOpenBookingModal(selectedHubId)}
                  className="bg-[#061523] text-white text-xs font-bold px-4 py-2 hover:bg-[#4f1500] transition-colors flex items-center gap-1.5 shadow-sm"
                >
                  <span className="material-symbols-outlined text-sm">calendar_month</span>
                  <span>Initiate Space Booking</span>
                </button>
              </div>
            </div>
          </section>
        </div>

        {/* Spread Footer Running Line */}
        <div className="w-full mt-6 p-3 bg-[#eae8e4] border border-[#e4e2de] flex flex-wrap items-center justify-between text-xs text-[#44474c] font-sans">
          <div className="flex items-center gap-3">
            <span>Gazette Vol. XXIV · No. 4</span>
            <span>•</span>
            <span>Chapter 03: The Shared Commons</span>
            <span>•</span>
            <span>Cohesion Index Reference: § 104-92</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="material-symbols-outlined text-xs text-[#476554]">print</span>
            <span>Municipal Archival Record — Public Reproduction Authorized</span>
          </div>
        </div>
      </div>
    </div>
  );
};
