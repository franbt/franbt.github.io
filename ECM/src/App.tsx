import React, { useState, useEffect } from 'react';
import { ChapterId, ViewMode, VocationalTrack } from './types';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { ReadingProgressDrawer } from './components/ReadingProgressDrawer';
import { SpreadCoverForeword } from './views/SpreadCoverForeword';
import { SpreadLanguage } from './views/SpreadLanguage';
import { SpreadVocational } from './views/SpreadVocational';
import { SpreadCommons } from './views/SpreadCommons';
import { DirectoryView } from './views/DirectoryView';
import { BookingModal } from './components/BookingModal';
import { TandemModal } from './components/TandemModal';
import { SyllabusModal } from './components/SyllabusModal';
import { TableOfContentsDrawer } from './components/TableOfContentsDrawer';
import { PdfExportModal } from './components/PdfExportModal';

export default function App() {
  const [activeChapter, setActiveChapter] = useState<ChapterId>('cover-foreword');
  const [viewMode, setViewMode] = useState<ViewMode>('spread');
  const [zoomLevel, setZoomLevel] = useState<number>(100);

  // Modals state
  const [bookingModalOpen, setBookingModalOpen] = useState<boolean>(false);
  const [bookingPreselectedHubId, setBookingPreselectedHubId] = useState<string | undefined>(undefined);
  const [tandemModalOpen, setTandemModalOpen] = useState<boolean>(false);
  const [selectedTrack, setSelectedTrack] = useState<VocationalTrack | null>(null);
  const [tocDrawerOpen, setTocDrawerOpen] = useState<boolean>(false);
  const [pdfExportModalOpen, setPdfExportModalOpen] = useState<boolean>(false);

  // Keyboard navigation for spread paging
  const chapterOrder: ChapterId[] = [
    'cover-foreword',
    'language-exchange',
    'vocational-pathways',
    'civic-spaces',
    'activity-directory',
  ];

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't intercept when inside inputs/textareas
      if (['INPUT', 'TEXTAREA', 'SELECT'].includes((e.target as HTMLElement).tagName)) {
        return;
      }
      if (e.key === 'ArrowRight') {
        const currIdx = chapterOrder.indexOf(activeChapter);
        if (currIdx < chapterOrder.length - 1) {
          setActiveChapter(chapterOrder[currIdx + 1]);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
      } else if (e.key === 'ArrowLeft') {
        const currIdx = chapterOrder.indexOf(activeChapter);
        if (currIdx > 0) {
          setActiveChapter(chapterOrder[currIdx - 1]);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeChapter]);

  const handleZoomChange = (delta: number) => {
    setZoomLevel((prev) => Math.min(150, Math.max(70, prev + delta)));
  };

  const handleOpenBooking = (hubId?: string) => {
    setBookingPreselectedHubId(hubId);
    setBookingModalOpen(true);
  };

  const handleSelectChapter = (chapId: ChapterId) => {
    setActiveChapter(chapId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleScrollToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#fbf9f5] text-[#1b1c1a]">
      {/* Top Gazette Navigation Header */}
      <Header
        activeChapter={activeChapter}
        onSelectChapter={handleSelectChapter}
        viewMode={viewMode}
        onToggleViewMode={setViewMode}
        zoomLevel={zoomLevel}
        onZoomChange={handleZoomChange}
        onOpenToc={() => setTocDrawerOpen(true)}
        onOpenPdfExport={() => setPdfExportModalOpen(true)}
      />

      {/* Main Broadside Content Canvas */}
      <main
        className="w-full pt-28 flex-1 transition-all duration-200"
        style={{
          fontSize: zoomLevel !== 100 ? `${(zoomLevel / 100).toFixed(2)}rem` : undefined,
        }}
      >
        <div
          className={`w-full mx-auto transition-all ${
            viewMode === 'single'
              ? 'max-w-4xl px-4'
              : 'w-full'
          }`}
        >
          {activeChapter === 'cover-foreword' && (
            <SpreadCoverForeword
              onNavigateChapter={handleSelectChapter}
              onOpenPdfExport={() => setPdfExportModalOpen(true)}
            />
          )}

          {activeChapter === 'language-exchange' && (
            <SpreadLanguage
              onOpenTandemModal={() => setTandemModalOpen(true)}
              onNavigateChapter={handleSelectChapter}
            />
          )}

          {activeChapter === 'vocational-pathways' && (
            <SpreadVocational
              onOpenSyllabus={(track) => setSelectedTrack(track)}
              onOpenPdfExport={() => setPdfExportModalOpen(true)}
              onNavigateChapter={handleSelectChapter}
            />
          )}

          {activeChapter === 'civic-spaces' && (
            <SpreadCommons
              onOpenBookingModal={handleOpenBooking}
              onNavigateChapter={handleSelectChapter}
            />
          )}

          {activeChapter === 'activity-directory' && (
            <DirectoryView
              onOpenBookingModal={handleOpenBooking}
              onOpenTandemModal={() => setTandemModalOpen(true)}
            />
          )}
        </div>

        {/* Bottom Reading Progress Drawer with Quick-Jump Links */}
        <ReadingProgressDrawer
          activeChapter={activeChapter}
          onSelectChapter={handleSelectChapter}
          onScrollToSection={handleScrollToSection}
        />
      </main>

      {/* Institutional Colophon Footer */}
      <Footer />

      {/* Interactive Modals */}
      <BookingModal
        isOpen={bookingModalOpen}
        onClose={() => setBookingModalOpen(false)}
        preselectedHubId={bookingPreselectedHubId}
      />

      <TandemModal
        isOpen={tandemModalOpen}
        onClose={() => setTandemModalOpen(false)}
      />

      <SyllabusModal
        track={selectedTrack}
        onClose={() => setSelectedTrack(null)}
        onBookCounselor={() => {
          setActiveChapter('vocational-pathways');
          const counselorBtn = document.querySelector('button:has-text("Book Counselor")') as HTMLElement;
          counselorBtn?.scrollIntoView({ behavior: 'smooth' });
        }}
      />

      <TableOfContentsDrawer
        isOpen={tocDrawerOpen}
        onClose={() => setTocDrawerOpen(false)}
        activeChapter={activeChapter}
        onSelectChapter={handleSelectChapter}
      />

      <PdfExportModal
        isOpen={pdfExportModalOpen}
        onClose={() => setPdfExportModalOpen(false)}
        activeChapter={activeChapter}
      />
    </div>
  );
}
