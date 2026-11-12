import { CVData } from '../data/cvData';

export interface ShareOptions {
  title?: string;
  text?: string;
  url?: string;
}

/**
 * Checks if native Web Share API is supported and usable.
 */
export function isWebShareSupported(): boolean {
  return typeof navigator !== 'undefined' && typeof navigator.share === 'function';
}

/**
 * Executes native sharing or returns false if unavailable.
 */
export async function shareNative(options: ShareOptions): Promise<boolean> {
  if (!isWebShareSupported()) {
    return false;
  }

  try {
    const shareData = {
      title: options.title || 'Francisco José Bermejo Tarifa - CV',
      text: options.text || 'Curriculum Vitae de Francisco José Bermejo Tarifa, Diseñador de Apps y Soluciones Telemáticas',
      url: options.url || (typeof window !== 'undefined' ? window.location.href : 'https://franbt.github.io/'),
    };

    if (navigator.canShare && !navigator.canShare(shareData)) {
      return false;
    }

    await navigator.share(shareData);
    return true;
  } catch (error: any) {
    if (error?.name === 'AbortError') {
      // User cancelled the share dialog
      return false;
    }
    console.warn('Native share failed or dismissed, falling back:', error);
    return false;
  }
}

/**
 * Copies arbitrary text (e.g. current URL or email) to clipboard.
 */
export async function copyToClipboard(text: string): Promise<boolean> {
  if (typeof navigator !== 'undefined' && navigator.clipboard && navigator.clipboard.writeText) {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch {
      // fallback below
    }
  }

  // Fallback for older browsers or restricted iframe environments
  try {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.left = '-999999px';
    textArea.style.top = '-999999px';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    const successful = document.execCommand('copy');
    textArea.remove();
    return successful;
  } catch (err) {
    console.error('Clipboard copy failed:', err);
    return false;
  }
}

/**
 * Generates and downloads a .vcf contact card file for 1-tap phone address book import.
 */
export function downloadVCard(data: CVData): void {
  const vcard = [
    'BEGIN:VCARD',
    'VERSION:3.0',
    `FN:${data.fullName}`,
    `N:Bermejo Tarifa;Francisco José;;;`,
    `TITLE:${data.title}`,
    `EMAIL;TYPE=INTERNET,HOME:${data.email}`,
    `TEL;TYPE=CELL,VOICE:${data.phone}`,
    `ADR;TYPE=HOME:;;${data.location};;${data.country}`,
    `URL:https://${data.website}`,
    `NOTE:Disponibilidad: ${data.availability}`,
    'END:VCARD',
  ].join('\r\n');

  const blob = new Blob([vcard], { type: 'text/vcard;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', 'Francisco_Jose_Bermejo_Tarifa.vcf');
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

/**
 * Prepares direct messaging / social share links.
 */
export function getSocialShareLinks(url: string, cvData: CVData) {
  const shareTitle = encodeURIComponent(`${cvData.fullName} - ${cvData.title}`);
  const shareUrl = encodeURIComponent(url);
  const shareSummary = encodeURIComponent(
    `Echa un vistazo al CV de ${cvData.fullName}, ${cvData.title}. Enlace: ${url}`
  );

  return {
    whatsapp: `https://api.whatsapp.com/send?text=${shareSummary}`,
    email: `mailto:?subject=${shareTitle}&body=${shareSummary}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${shareUrl}`,
    telegram: `https://t.me/share/url?url=${shareUrl}&text=${shareTitle}`,
    twitter: `https://twitter.com/intent/tweet?text=${shareTitle}&url=${shareUrl}`,
  };
}
