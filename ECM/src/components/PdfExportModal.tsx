import React, { useState } from 'react';
import { ChapterId } from '../types';

interface PdfExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  activeChapter: ChapterId;
}

export const PdfExportModal: React.FC<PdfExportModalProps> = ({
  isOpen,
  onClose,
  activeChapter,
}) => {
  const [exportScope, setExportScope] = useState<'current' | 'full'>('current');
  const [includeVouchers, setIncludeVouchers] = useState<boolean>(true);
  const [highContrast, setHighContrast] = useState<boolean>(false);
  const [isExporting, setIsExporting] = useState<boolean>(false);
  const [downloadSuccess, setDownloadSuccess] = useState<boolean>(false);

  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadPdf = () => {
    setIsExporting(true);
    setTimeout(() => {
      setIsExporting(false);
      setDownloadSuccess(true);
      // Trigger a synthetic download of the dossier metadata text file as proof of export
      const blob = new Blob([
        `CONVERGENCE MUNICIPAL GAZETTE - ISSUE 04 AUTUMN EDITION\n` +
        `Department of Social Cohesion & Municipal Inclusion\n` +
        `ISSN: 2841-0982 | Policy Ref: MUN-SPACE-40\n\n` +
        `Scope: ${exportScope === 'full' ? 'Complete 48-Page Dossier' : `Active Chapter (${activeChapter})`}\n` +
        `Timestamp: ${new Date().toISOString()}\n` +
        `Archival Audit: Section 508 & WCAG 2.1 AA Compliant\n\n` +
        `Included Documents:\n` +
        `- Chapter 01: Language Tandems & MOD-01 to MOD-03\n` +
        `- Chapter 02: Vocational Accreditation & Apprenticeship Syllabus\n` +
        `- Chapter 03: The 5 Pillars & Active District Commons Network (6 Hubs)\n` +
        `- Resident Action Guide: Hosting an Activity under Ordinance 2021-08\n`
      ], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `Convergence_Gazette_Issue_04_${exportScope}.txt`;
      a.click();
      URL.revokeObjectURL(url);
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
      <div className="bg-[#fbf9f5] w-full max-w-lg border border-[#e4e2de] shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="bg-[#061523] text-white px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#ffb59c]">picture_as_pdf</span>
            <div>
              <span className="text-[10px] tracking-widest uppercase font-bold text-[#b8c8da] block">
                MUNICIPAL ARCHIVAL PRINT SERVICE
              </span>
              <h3 className="font-serif font-bold text-lg text-white">
                Export Gazette Publication
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

        {downloadSuccess ? (
          <div className="p-6 text-center space-y-4">
            <div className="w-12 h-12 bg-[#c6e8d2] text-[#476554] rounded-full flex items-center justify-center mx-auto">
              <span className="material-symbols-outlined text-2xl">download_done</span>
            </div>
            <div>
              <h4 className="font-serif font-bold text-lg text-[#061523]">
                Dossier Archival Export Prepared
              </h4>
              <p className="text-xs text-[#44474c] mt-1">
                The high-resolution municipal document package has been formatted and saved to your device with authentic editorial styling.
              </p>
            </div>
            <div className="pt-2 flex justify-center gap-3">
              <button
                type="button"
                onClick={handlePrint}
                className="bg-[#eae8e4] hover:bg-[#e4e2de] text-[#061523] text-xs font-bold px-4 py-2 flex items-center gap-1.5"
              >
                <span className="material-symbols-outlined text-sm">print</span>
                <span>Send to Printer</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  setDownloadSuccess(false);
                  onClose();
                }}
                className="bg-[#061523] text-white text-xs font-bold px-6 py-2"
              >
                Done
              </button>
            </div>
          </div>
        ) : (
          <div className="p-6 space-y-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#44474c] mb-2 font-sans">
                Export Range
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setExportScope('current')}
                  className={`p-3 text-left border text-xs transition-all ${
                    exportScope === 'current'
                      ? 'border-[#476554] bg-[#c6e8d2]/20 font-bold text-[#061523]'
                      : 'border-[#e4e2de] bg-white text-[#44474c]'
                  }`}
                >
                  <strong className="block text-xs text-[#061523]">Active Chapter Spread</strong>
                  <span className="text-[11px] text-[#44474c]">Current open 2-page broadside</span>
                </button>
                <button
                  type="button"
                  onClick={() => setExportScope('full')}
                  className={`p-3 text-left border text-xs transition-all ${
                    exportScope === 'full'
                      ? 'border-[#476554] bg-[#c6e8d2]/20 font-bold text-[#061523]'
                      : 'border-[#e4e2de] bg-white text-[#44474c]'
                  }`}
                >
                  <strong className="block text-xs text-[#061523]">Complete Dossier</strong>
                  <span className="text-[11px] text-[#44474c]">All 4 Chapters + 32-Program Directory</span>
                </button>
              </div>
            </div>

            {/* Options */}
            <div className="space-y-2 pt-2 border-t border-[#e4e2de]">
              <label className="flex items-center gap-2 text-xs text-[#1b1c1a] cursor-pointer">
                <input
                  type="checkbox"
                  checked={includeVouchers}
                  onChange={(e) => setIncludeVouchers(e.target.checked)}
                  className="text-[#476554] rounded focus:ring-[#476554]"
                />
                <span>Include printable intake vouchers and reservation door badges</span>
              </label>

              <label className="flex items-center gap-2 text-xs text-[#1b1c1a] cursor-pointer">
                <input
                  type="checkbox"
                  checked={highContrast}
                  onChange={(e) => setHighContrast(e.target.checked)}
                  className="text-[#476554] rounded focus:ring-[#476554]"
                />
                <span>Optimize for high-contrast grayscale monochrome laser printing</span>
              </label>
            </div>

            <div className="bg-[#f5f3ef] p-3 text-[11px] text-[#44474c] border border-[#e4e2de]">
              <strong>Public Domain License:</strong> Reproduction and physical printing across neighborhood centres, mutual-aid collectives, and libraries is authorized under Open Municipal License 4.0.
            </div>

            {/* Actions */}
            <div className="pt-3 flex items-center justify-between">
              <button
                type="button"
                onClick={handlePrint}
                className="text-xs text-[#061523] font-bold hover:text-[#476554] flex items-center gap-1"
              >
                <span className="material-symbols-outlined text-sm">print</span>
                <span>Direct Print Preview</span>
              </button>

              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="text-xs text-[#44474c] hover:text-[#061523] px-3 py-2"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  disabled={isExporting}
                  onClick={handleDownloadPdf}
                  className="bg-[#061523] hover:bg-[#476554] text-white text-xs font-bold px-5 py-2 transition-colors flex items-center gap-1.5 shadow-sm"
                >
                  <span className="material-symbols-outlined text-sm">download</span>
                  <span>{isExporting ? 'Generating PDF...' : 'Download PDF Edition'}</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
