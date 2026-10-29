/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef, useEffect } from 'react';
import { HeaderNav } from './components/HeaderNav';
import { UtilityBar } from './components/UtilityBar';
import { CVDocument } from './components/CVDocument';
import { ShareModal } from './components/ShareModal';
import { PDFModal } from './components/PDFModal';
import { EditDrawer } from './components/EditDrawer';
import { Toast, ToastMessage } from './components/Toast';
import { defaultCVDataES, defaultCVDataEN, CVData } from './data/cvData';
import { downloadElementAsPDF, printVectorPDF } from './utils/pdfExport';
import { copyToClipboard, isWebShareSupported, shareNative } from './utils/shareUtils';
import { ShieldCheck, Printer, Download, Share2, Sparkles, Smartphone } from 'lucide-react';

export default function App() {
  const [lang, setLang] = useState<'es' | 'en'>('es');
  const [cvData, setCvData] = useState<CVData>(defaultCVDataES);
  const [zoom, setZoom] = useState<number>(1.0);
  const [isShareModalOpen, setIsShareModalOpen] = useState<boolean>(false);
  const [isPDFModalOpen, setIsPDFModalOpen] = useState<boolean>(false);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [copiedLink, setCopiedLink] = useState<boolean>(false);
  const [isExporting, setIsExporting] = useState<boolean>(false);
  const [exportProgress, setExportProgress] = useState<number>(0);
  const [exportStatusText, setExportStatusText] = useState<string>('');
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const documentRef = useRef<HTMLDivElement | null>(null);

  // Initialize and synchronize with localStorage
  useEffect(() => {
    try {
      const savedLang = localStorage.getItem('franbt_cv_lang') as 'es' | 'en' | null;
      if (savedLang === 'en' || savedLang === 'es') {
        setLang(savedLang);
        const savedData = localStorage.getItem(`franbt_cv_data_${savedLang}`);
        if (savedData) {
          setCvData(JSON.parse(savedData));
        } else {
          setCvData(savedLang === 'en' ? defaultCVDataEN : defaultCVDataES);
        }
      }
    } catch {
      // ignore storage error
    }
  }, []);

  const addToast = (type: 'success' | 'error' | 'info', message: string) => {
    const id = Date.now().toString() + Math.random().toString().slice(2, 6);
    setToasts((prev) => [...prev, { id, type, message }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3500);
  };

  const handleDismissToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Switch between Spanish and English
  const handleToggleLang = () => {
    const nextLang = lang === 'es' ? 'en' : 'es';
    setLang(nextLang);
    try {
      localStorage.setItem('franbt_cv_lang', nextLang);
      const savedData = localStorage.getItem(`franbt_cv_data_${nextLang}`);
      if (savedData) {
        setCvData(JSON.parse(savedData));
      } else {
        setCvData(nextLang === 'en' ? defaultCVDataEN : defaultCVDataES);
      }
    } catch {
      setCvData(nextLang === 'en' ? defaultCVDataEN : defaultCVDataES);
    }
    addToast('info', nextLang === 'es' ? 'Idioma cambiado a Español' : 'Switched language to English');
  };

  // Handle data edits and persist to localStorage
  const handleDataChange = (updated: CVData) => {
    setCvData(updated);
    try {
      localStorage.setItem(`franbt_cv_data_${lang}`, JSON.stringify(updated));
    } catch {
      // ignore
    }
  };

  // Reset to original data
  const handleResetData = () => {
    const original = lang === 'es' ? defaultCVDataES : defaultCVDataEN;
    setCvData(original);
    try {
      localStorage.removeItem(`franbt_cv_data_${lang}`);
    } catch {
      // ignore
    }
    addToast('success', lang === 'es' ? 'Datos restaurados a valores originales' : 'CV restored to original values');
  };

  // Direct client-side PDF file download
  const handleDirectPDFDownload = async () => {
    if (!documentRef.current) return;
    setIsExporting(true);
    setExportProgress(10);
    setExportStatusText(lang === 'es' ? 'Preparando página...' : 'Preparing document...');

    try {
      await downloadElementAsPDF(documentRef.current, {
        filename: `${cvData.fullName.replace(/\s+/g, '_')}_CV.pdf`,
        onProgress: (prog, msg) => {
          setExportProgress(prog);
          setExportStatusText(msg);
        },
      });

      addToast(
        'success',
        lang === 'es' ? '¡PDF descargado exitosamente!' : 'PDF downloaded successfully!'
      );
    } catch (err) {
      console.error(err);
      addToast(
        'error',
        lang === 'es' ? 'Error al generar PDF. Probando impresión directa...' : 'Failed to generate PDF. Trying direct print...'
      );
      printVectorPDF();
    } finally {
      setIsExporting(false);
      setIsPDFModalOpen(false);
    }
  };

  // Native Vector Print / Save as PDF
  const handleVectorPrint = () => {
    setIsPDFModalOpen(false);
    // Give modal time to close before triggering print dialog
    setTimeout(() => {
      printVectorPDF();
    }, 150);
  };

  // Share trigger: uses native share on mobile or opens modal
  const handleShareClick = async () => {
    const currentUrl = typeof window !== 'undefined' ? window.location.href : `https://${cvData.website}`;

    if (isWebShareSupported()) {
      const success = await shareNative({
        title: `${cvData.fullName} - ${cvData.title}`,
        text: `Curriculum Vitae de ${cvData.fullName}`,
        url: currentUrl,
      });
      if (success) {
        addToast('success', lang === 'es' ? '¡Compartido con éxito!' : 'Shared successfully!');
        return;
      }
    }

    // Otherwise show the modal
    setIsShareModalOpen(true);
  };

  // Quick link copy handler
  const handleCopyLink = async () => {
    const url = typeof window !== 'undefined' ? window.location.href : `https://${cvData.website}`;
    const success = await copyToClipboard(url);
    if (success) {
      setCopiedLink(true);
      addToast('success', lang === 'es' ? '¡Enlace copiado al portapapeles!' : 'Link copied to clipboard!');
      setTimeout(() => setCopiedLink(false), 2500);
    }
  };

  return (
    <div className="bg-[#fbf9f3] min-h-screen flex flex-col font-sans text-[#1b1c18] antialiased selection:bg-[#fed2a9] selection:text-[#795938]">
      {/* Fixed Header Navbar */}
      <HeaderNav
        onDownloadPDF={() => setIsPDFModalOpen(true)}
        onShare={handleShareClick}
        onPrint={handleVectorPrint}
        onToggleEdit={() => setIsEditing(!isEditing)}
        isEditing={isEditing}
        lang={lang}
        onToggleLang={handleToggleLang}
        isExporting={isExporting}
      />

      {/* Main Carrier Stage */}
      <main className="w-full pt-20 pb-14 bg-[#fbf9f3] flex-1 flex flex-col items-center">
        <div className="flex flex-col w-full items-center py-4 px-3 sm:px-6 md:px-8">
          {/* Interactive Print / Export Floating Utility Bar */}
          <UtilityBar
            zoom={zoom}
            onZoomChange={setZoom}
            onCopyLink={handleCopyLink}
            copied={copiedLink}
            lang={lang}
          />

          {/* Scaled A4 Document Container */}
          <div
            className="w-full flex justify-center transition-transform duration-200"
            style={{
              transform: zoom !== 1.0 ? `scale(${zoom})` : 'none',
              transformOrigin: 'top center',
            }}
          >
            <CVDocument
              innerRef={documentRef}
              data={cvData}
              lang={lang}
              onContactClick={(type) => {
                if (type === 'email') {
                  addToast('info', lang === 'es' ? 'Abriendo cliente de correo...' : 'Opening email client...');
                } else if (type === 'phone') {
                  addToast('info', lang === 'es' ? 'Iniciando llamada...' : 'Initiating phone call...');
                }
              }}
            />
          </div>

          {/* Quick Floating Action Bar for Mobile / Tablet */}
          <div className="no-print mt-8 flex flex-wrap items-center justify-center gap-3 w-full max-w-[794px] p-4 bg-[#f5f3ed] rounded-lg border border-[#c5c6cb]/50 shadow-xs">
            <span className="text-xs text-[#44474b] font-medium mr-1 hidden sm:inline">
              {lang === 'es' ? 'Acciones rápidas:' : 'Quick actions:'}
            </span>
            <button
              onClick={() => setIsPDFModalOpen(true)}
              type="button"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded bg-[#080e15] text-[#fbf9f3] hover:bg-[#1e242b] font-sans text-xs font-semibold uppercase tracking-wider transition-colors shadow-xs cursor-pointer"
            >
              <Download className="w-3.5 h-3.5 text-[#fed2a9]" />
              <span>{lang === 'es' ? 'Descargar PDF' : 'Download PDF'}</span>
            </button>
            <button
              onClick={handleVectorPrint}
              type="button"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded border border-[#c5c6cb] bg-white hover:bg-[#eae8e2] text-[#1b1c18] font-sans text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5 text-[#785837]" />
              <span>{lang === 'es' ? 'Imprimir / A4' : 'Print / A4'}</span>
            </button>
            <button
              onClick={handleShareClick}
              type="button"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded border border-[#c5c6cb] bg-white hover:bg-[#eae8e2] text-[#1b1c18] font-sans text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer"
            >
              <Share2 className="w-3.5 h-3.5 text-[#785837]" />
              <span>{lang === 'es' ? 'Compartir' : 'Share'}</span>
            </button>
          </div>
        </div>
      </main>

      {/* Archival Site Footer */}
      <footer className="no-print site-footer w-full bg-[#f5f3ed] py-6 border-t border-[#c5c6cb]/60 mt-auto">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-[#44474b]">
          <p className="font-sans text-[11px] uppercase tracking-wider text-[#44474b]">
            © {new Date().getFullYear()} {cvData.fullName} • {cvData.title}
          </p>
          <div className="flex items-center gap-4 font-sans text-[11px] uppercase tracking-wider text-[#785837]">
            <span className="flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>ISO 216 / A4 Standard Format</span>
            </span>
            <span className="hidden sm:inline text-[#c5c6cb]">•</span>
            <span className="hidden sm:inline">Archival Weight 120gsm Print Parity</span>
          </div>
        </div>
      </footer>

      {/* Share Modal */}
      <ShareModal
        isOpen={isShareModalOpen}
        onClose={() => setIsShareModalOpen(false)}
        cvData={cvData}
        lang={lang}
      />

      {/* PDF Export Modal */}
      <PDFModal
        isOpen={isPDFModalOpen}
        onClose={() => setIsPDFModalOpen(false)}
        onDirectDownload={handleDirectPDFDownload}
        onVectorPrint={handleVectorPrint}
        isExporting={isExporting}
        exportProgress={exportProgress}
        exportStatusText={exportStatusText}
        lang={lang}
      />

      {/* Edit Drawer */}
      <EditDrawer
        isOpen={isEditing}
        onClose={() => setIsEditing(false)}
        data={cvData}
        onChange={handleDataChange}
        onReset={handleResetData}
        lang={lang}
      />

      {/* Toast Notifications */}
      <Toast toasts={toasts} onDismiss={handleDismissToast} />
    </div>
  );
}
