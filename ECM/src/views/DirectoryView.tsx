import React, { useState } from 'react';
import { DIRECTORY_PROGRAMS } from '../data/gazetteData';
import { DirectoryProgram } from '../types';

interface DirectoryViewProps {
  onOpenBookingModal: (hubId?: string) => void;
  onOpenTandemModal: () => void;
}

export const DirectoryView: React.FC<DirectoryViewProps> = ({
  onOpenBookingModal,
  onOpenTandemModal,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [bookmarkedIds, setBookmarkedIds] = useState<string[]>(() => {
    try {
      return JSON.parse(localStorage.getItem('convergence_bookmarks') || '[]');
    } catch {
      return [];
    }
  });

  const categories = ['All', 'Language', 'Vocational', 'Civic Space', 'Mutual Aid', 'Youth & Senior'];

  const toggleBookmark = (id: string) => {
    const updated = bookmarkedIds.includes(id)
      ? bookmarkedIds.filter((bId) => bId !== id)
      : [...bookmarkedIds, id];
    setBookmarkedIds(updated);
    try {
      localStorage.setItem('convergence_bookmarks', JSON.stringify(updated));
    } catch {
      // fallback
    }
  };

  const filteredPrograms = DIRECTORY_PROGRAMS.filter((prog) => {
    const matchesCategory = selectedCategory === 'All' || prog.category === selectedCategory;
    const matchesSearch =
      prog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      prog.district.toLowerCase().includes(searchQuery.toLowerCase()) ||
      prog.venue.toLowerCase().includes(searchQuery.toLowerCase()) ||
      prog.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="flex flex-col w-full">
      {/* Running Header */}
      <div className="w-full bg-[#eae8e4]/70 px-4 lg:px-12 py-2 flex items-center justify-between text-[#44474c] text-[11px] font-bold uppercase tracking-widest border-b border-[#e4e2de] font-sans">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 bg-[#476554] inline-block"></span>
          <span className="text-[#061523] font-bold">Comprehensive Municipal Directory</span>
          <span>/</span>
          <span>Folio 36 · 32 Free Community Programs</span>
        </div>
        <div className="flex items-center gap-2 font-mono">
          <span>PAGE 036 / 048</span>
          <span>•</span>
          <span>COHESION INDEX VERIFIED</span>
        </div>
      </div>

      <div className="w-full px-4 lg:px-12 py-6 lg:py-10">
        {/* Lead Section */}
        <div className="bg-white p-6 md:p-8 border border-[#e4e2de] shadow-sm mb-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-widest text-[#476554] font-sans block">
                Public Domain Program Index · 14 Regional Wards
              </span>
              <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#061523] mt-1">
                Active Neighborhood Assemblies &amp; Workshops
              </h1>
              <p className="text-xs md:text-sm text-[#44474c] mt-1 max-w-2xl leading-relaxed">
                All listed programs are 100% free of charge for residents, supported by municipal inclusion levies under Civic Ordinance 2021-08.
              </p>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <button
                type="button"
                onClick={onOpenTandemModal}
                className="bg-[#4f1500] hover:bg-[#dd724b] text-white text-xs font-bold px-4 py-2 transition-colors flex items-center gap-1.5 shadow-xs"
              >
                <span className="material-symbols-outlined text-sm">forum</span>
                <span>Language Tandem Portal</span>
              </button>
              <button
                type="button"
                onClick={() => onOpenBookingModal()}
                className="bg-[#061523] hover:bg-[#476554] text-white text-xs font-bold px-4 py-2 transition-colors flex items-center gap-1.5 shadow-xs"
              >
                <span className="material-symbols-outlined text-sm">meeting_room</span>
                <span>Book Space (MUN-40)</span>
              </button>
            </div>
          </div>

          {/* Search & Category Filter Toolbar */}
          <div className="mt-6 pt-5 border-t border-[#e4e2de] flex flex-col md:flex-row gap-4 justify-between items-stretch md:items-center">
            {/* Category pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1">
              {categories.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setSelectedCategory(cat)}
                  className={`text-xs px-3 py-1.5 transition-colors whitespace-nowrap font-medium border ${
                    selectedCategory === cat
                      ? 'bg-[#061523] text-white font-bold border-[#061523]'
                      : 'bg-[#f5f3ef] text-[#44474c] hover:text-[#061523] border-[#e4e2de]'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Search Input */}
            <div className="relative min-w-[260px]">
              <span className="material-symbols-outlined absolute left-2.5 top-1/2 -translate-y-1/2 text-sm text-[#74777c]">
                search
              </span>
              <input
                type="text"
                placeholder="Search programs, wards, venues..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-[#f5f3ef] border border-[#e4e2de] pl-8 pr-3 py-1.5 text-xs text-[#1b1c1a] focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#476554]"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs text-[#74777c] hover:text-[#1b1c1a]"
                >
                  ✕
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Programs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredPrograms.map((prog) => {
            const isBookmarked = bookmarkedIds.includes(prog.id);
            return (
              <div
                key={prog.id}
                className="bg-white p-5 border border-[#e4e2de] shadow-xs flex flex-col justify-between hover:border-[#476554] transition-all group"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 bg-[#eae8e4] text-[#061523] font-sans">
                      {prog.category}
                    </span>
                    <button
                      type="button"
                      onClick={() => toggleBookmark(prog.id)}
                      className={`text-[#74777c] hover:text-[#061523] transition-colors ${
                        isBookmarked ? 'text-[#476554]' : ''
                      }`}
                      title={isBookmarked ? 'Remove Bookmark' : 'Save to Bookmarks'}
                    >
                      <span className="material-symbols-outlined text-base">
                        {isBookmarked ? 'bookmark' : 'bookmark_border'}
                      </span>
                    </button>
                  </div>

                  <h3 className="font-serif font-bold text-base text-[#061523] group-hover:text-[#476554] transition-colors">
                    {prog.title}
                  </h3>
                  <span className="text-[11px] text-[#476554] font-medium block mt-0.5 font-mono">
                    {prog.district}
                  </span>

                  <p className="text-xs text-[#44474c] mt-2 leading-relaxed">
                    {prog.description}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-[#e4e2de] space-y-2 text-[11px] text-[#44474c]">
                  <div className="flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-xs text-[#74777c]">schedule</span>
                    <strong className="text-[#1b1c1a]">{prog.schedule}</strong>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-xs text-[#74777c]">location_on</span>
                    <span>{prog.venue}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-xs text-[#74777c]">directions_subway</span>
                    <span>{prog.transit}</span>
                  </div>

                  <div className="pt-2 flex items-center justify-between border-t border-[#efeeea]">
                    <span className="text-[10px] bg-[#c6e8d2]/60 text-[#032014] px-1.5 py-0.5 font-bold">
                      Free Participation
                    </span>
                    <button
                      type="button"
                      onClick={() => {
                        if (prog.category === 'Language') {
                          onOpenTandemModal();
                        } else {
                          onOpenBookingModal();
                        }
                      }}
                      className="text-xs font-bold text-[#061523] hover:text-[#476554] flex items-center gap-1"
                    >
                      <span>Join / Register</span>
                      <span className="material-symbols-outlined text-xs">arrow_forward</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {filteredPrograms.length === 0 && (
          <div className="bg-white p-12 text-center border border-[#e4e2de]">
            <span className="material-symbols-outlined text-4xl text-[#74777c] mb-2">search_off</span>
            <h4 className="font-serif font-bold text-lg text-[#061523]">No matching civic programs found</h4>
            <p className="text-xs text-[#44474c] max-w-sm mx-auto mt-1">
              Try adjusting your search criteria or clearing active filters to browse all 32 municipal assemblies.
            </p>
            <button
              type="button"
              onClick={() => {
                setSelectedCategory('All');
                setSearchQuery('');
              }}
              className="mt-4 bg-[#061523] text-white text-xs font-bold px-4 py-2"
            >
              Reset Search Filter
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
