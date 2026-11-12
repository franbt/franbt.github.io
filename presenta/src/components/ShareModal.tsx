import React, { useState } from 'react';
import { X, Copy, Check, Share2, MessageSquare, Mail, Linkedin, Smartphone, Download, QrCode } from 'lucide-react';
import { CVData } from '../data/cvData';
import { copyToClipboard, downloadVCard, getSocialShareLinks, isWebShareSupported, shareNative } from '../utils/shareUtils';
import { generateQRCodeSVG } from '../utils/qrCodeGenerator';

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  cvData: CVData;
  lang: 'es' | 'en';
}

export const ShareModal: React.FC<ShareModalProps> = ({
  isOpen,
  onClose,
  cvData,
  lang,
}) => {
  const [copied, setCopied] = useState(false);
  const [showQR, setShowQR] = useState(false);

  if (!isOpen) return null;

  const currentUrl = typeof window !== 'undefined' ? window.location.href : `https://${cvData.website}`;
  const socialLinks = getSocialShareLinks(currentUrl, cvData);
  const supportsNativeShare = isWebShareSupported();
  const qrSvg = generateQRCodeSVG(currentUrl, 160);

  const handleCopy = async () => {
    const success = await copyToClipboard(currentUrl);
    if (success) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const handleNativeShare = async () => {
    await shareNative({
      title: `${cvData.fullName} - ${cvData.title}`,
      text: `CV de ${cvData.fullName}`,
      url: currentUrl,
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/45 backdrop-blur-xs animate-in fade-in duration-200">
      <div
        className="w-full max-w-md bg-[#fbf9f3] text-[#1b1c18] rounded-lg shadow-2xl border border-[#c5c6cb]/60 overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-[#c5c6cb]/40 bg-[#f5f3ed]/60">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded bg-[#080e15] text-white flex items-center justify-center shadow-xs">
              <Share2 className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-display font-medium text-base text-[#080e15] leading-tight">
                {lang === 'es' ? 'Compartir Perfil & CV' : 'Share Profile & CV'}
              </h3>
              <p className="font-sans text-[11px] text-[#44474b]">
                {cvData.fullName} • {cvData.website}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-md text-[#44474b] hover:text-[#080e15] hover:bg-[#eae8e2] transition-colors"
            type="button"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 flex flex-col gap-4 max-h-[80vh] overflow-y-auto">
          {/* Quick Copy Link Box */}
          <div className="flex flex-col gap-1.5">
            <label className="font-sans text-[11px] uppercase tracking-wider text-[#785837] font-semibold">
              {lang === 'es' ? 'Enlace Directo del CV' : 'Direct CV Link'}
            </label>
            <div className="flex items-center gap-2 p-1.5 bg-white rounded border border-[#c5c6cb]/60 focus-within:border-[#785837]">
              <input
                type="text"
                readOnly
                value={currentUrl}
                className="w-full bg-transparent px-2 text-xs font-mono text-[#1b1c18] focus:outline-hidden"
              />
              <button
                onClick={handleCopy}
                type="button"
                className={`inline-flex items-center gap-1 px-3 py-1.5 rounded text-xs font-sans font-semibold uppercase tracking-wider transition-all shrink-0 cursor-pointer ${
                  copied
                    ? 'bg-[#785837] text-white'
                    : 'bg-[#080e15] text-white hover:bg-[#1e242b]'
                }`}
              >
                {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? (lang === 'es' ? '¡Copiado!' : 'Copied!') : (lang === 'es' ? 'Copiar' : 'Copy')}</span>
              </button>
            </div>
          </div>

          {/* Native Web Share button (if supported on mobile/tablet) */}
          {supportsNativeShare && (
            <button
              onClick={handleNativeShare}
              type="button"
              className="w-full py-2.5 px-4 rounded bg-[#080e15] hover:bg-[#1e242b] text-white font-sans text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-2 shadow-xs transition-colors cursor-pointer"
            >
              <Smartphone className="w-4 h-4" />
              <span>{lang === 'es' ? 'Abrir menú de compartir del dispositivo' : 'Open System Share Sheet'}</span>
            </button>
          )}

          {/* Social / Direct Channels */}
          <div className="flex flex-col gap-2">
            <span className="font-sans text-[11px] uppercase tracking-wider text-[#44474b] font-semibold">
              {lang === 'es' ? 'Canales Directos' : 'Direct Channels'}
            </span>
            <div className="grid grid-cols-3 gap-2">
              {/* WhatsApp */}
              <a
                href={socialLinks.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center justify-center p-3 rounded bg-white hover:bg-[#eae8e2]/50 border border-[#c5c6cb]/50 transition-colors group text-center"
              >
                <div className="w-8 h-8 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mb-1 group-hover:scale-105 transition-transform">
                  <MessageSquare className="w-4 h-4" />
                </div>
                <span className="text-[11px] font-sans font-medium text-[#1b1c18]">WhatsApp</span>
              </a>

              {/* Email */}
              <a
                href={socialLinks.email}
                className="flex flex-col items-center justify-center p-3 rounded bg-white hover:bg-[#eae8e2]/50 border border-[#c5c6cb]/50 transition-colors group text-center"
              >
                <div className="w-8 h-8 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center mb-1 group-hover:scale-105 transition-transform">
                  <Mail className="w-4 h-4" />
                </div>
                <span className="text-[11px] font-sans font-medium text-[#1b1c18]">Email</span>
              </a>

              {/* LinkedIn */}
              <a
                href={socialLinks.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center justify-center p-3 rounded bg-white hover:bg-[#eae8e2]/50 border border-[#c5c6cb]/50 transition-colors group text-center"
              >
                <div className="w-8 h-8 rounded-full bg-sky-50 text-sky-700 flex items-center justify-center mb-1 group-hover:scale-105 transition-transform">
                  <Linkedin className="w-4 h-4" />
                </div>
                <span className="text-[11px] font-sans font-medium text-[#1b1c18]">LinkedIn</span>
              </a>
            </div>
          </div>

          {/* Quick Actions: QR Code & vCard */}
          <div className="border-t border-[#c5c6cb]/40 pt-3 flex flex-col gap-2">
            <div className="flex items-center justify-between gap-2">
              <button
                onClick={() => setShowQR(!showQR)}
                type="button"
                className="flex-1 py-2 px-3 rounded border border-[#c5c6cb]/60 bg-white hover:bg-[#eae8e2]/50 text-[#1b1c18] font-sans text-xs font-medium flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
              >
                <QrCode className="w-3.5 h-3.5 text-[#785837]" />
                <span>{showQR ? (lang === 'es' ? 'Ocultar Código QR' : 'Hide QR') : (lang === 'es' ? 'Ver Código QR' : 'Show QR Code')}</span>
              </button>

              <button
                onClick={() => downloadVCard(cvData)}
                type="button"
                className="flex-1 py-2 px-3 rounded border border-[#c5c6cb]/60 bg-white hover:bg-[#eae8e2]/50 text-[#1b1c18] font-sans text-xs font-medium flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                title="Descargar tarjeta de contacto digital para el móvil"
              >
                <Download className="w-3.5 h-3.5 text-[#785837]" />
                <span>{lang === 'es' ? 'Guardar Contacto (.vcf)' : 'Save Contact (.vcf)'}</span>
              </button>
            </div>

            {/* Render QR Code */}
            {showQR && (
              <div className="flex flex-col items-center justify-center p-4 bg-white rounded border border-[#c5c6cb]/50 animate-in fade-in duration-200">
                <div
                  className="rounded p-1 bg-white shadow-xs"
                  dangerouslySetInnerHTML={{ __html: qrSvg }}
                />
                <p className="font-sans text-[11px] text-[#44474b] mt-2 text-center">
                  {lang === 'es'
                    ? 'Escanea con la cámara de cualquier teléfono para abrir el CV al instante'
                    : 'Scan with smartphone camera to open the CV instantly'}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Modal Footer */}
        <div className="px-5 py-3 border-t border-[#c5c6cb]/40 bg-[#f5f3ed]/60 flex items-center justify-end">
          <button
            onClick={onClose}
            type="button"
            className="px-4 py-1.5 rounded text-xs font-sans font-semibold uppercase tracking-wider text-[#44474b] hover:text-[#080e15] hover:bg-[#eae8e2] transition-colors"
          >
            {lang === 'es' ? 'Cerrar' : 'Close'}
          </button>
        </div>
      </div>
    </div>
  );
};
