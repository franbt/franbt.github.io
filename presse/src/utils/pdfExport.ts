import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

export interface PDFExportOptions {
  filename?: string;
  onProgress?: (progress: number, message: string) => void;
}

/**
 * Downloads a rendered DOM element as a crisp, high-resolution PDF file.
 * Perfectly calibrated for A4 dimensions (210 x 297 mm).
 */
export async function downloadElementAsPDF(
  element: HTMLElement,
  options: PDFExportOptions = {}
): Promise<boolean> {
  const filename = options.filename || 'Francisco_Jose_Bermejo_Tarifa_CV.pdf';
  const onProgress = options.onProgress || (() => {});

  try {
    onProgress(15, 'Preparando lienzo para exportación A4...');

    // Save previous styles if necessary
    const prevScroll = window.scrollY;
    window.scrollTo(0, 0);

    onProgress(35, 'Renderizando documento en alta resolución...');

    // Render using html2canvas with optimal settings
    const canvas = await html2canvas(element, {
      scale: 2.2, // Crisp retina clarity
      useCORS: true,
      allowTaint: true,
      backgroundColor: '#ffffff',
      logging: false,
      windowWidth: element.scrollWidth,
      windowHeight: element.scrollHeight,
      onclone: (clonedDoc) => {
        // Ensure cloned element has white background and no shadows
        const clonedEl = clonedDoc.querySelector('.cv-carrier') as HTMLElement | null;
        if (clonedEl) {
          clonedEl.style.boxShadow = 'none';
          clonedEl.style.transform = 'none';
        }
      },
    });

    onProgress(70, 'Compilando páginas en formato A4...');

    const imgData = canvas.toDataURL('image/jpeg', 0.98);

    // Standard A4 dimensions in mm: 210mm wide x 297mm high
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
      compress: true,
    });

    const pdfWidth = pdf.internal.pageSize.getWidth(); // 210
    const pdfHeight = pdf.internal.pageSize.getHeight(); // 297

    const imgProps = pdf.getImageProperties(imgData);
    const calculatedImgHeight = (imgProps.height * pdfWidth) / imgProps.width;

    // Check if height exceeds 1 page
    if (calculatedImgHeight <= pdfHeight) {
      // Fits in 1 single page
      pdf.addImage(imgData, 'JPEG', 0, 0, pdfWidth, calculatedImgHeight, undefined, 'FAST');
    } else {
      // Multi-page slicing if user customized extra content
      let heightLeft = calculatedImgHeight;
      let position = 0;

      pdf.addImage(imgData, 'JPEG', 0, position, pdfWidth, calculatedImgHeight, undefined, 'FAST');
      heightLeft -= pdfHeight;

      while (heightLeft > 0) {
        position = heightLeft - calculatedImgHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'JPEG', 0, position, pdfWidth, calculatedImgHeight, undefined, 'FAST');
        heightLeft -= pdfHeight;
      }
    }

    onProgress(95, 'Guardando archivo PDF...');
    pdf.save(filename);

    window.scrollTo(0, prevScroll);
    onProgress(100, '¡PDF descargado con éxito!');
    return true;
  } catch (error) {
    console.error('Error generating PDF with html2canvas/jspdf:', error);
    // Fallback to native print dialog which can always "Save as PDF"
    onProgress(100, 'Abriendo diálogo de impresión / Guardar como PDF...');
    window.print();
    return false;
  }
}

/**
 * Triggers native vector printing (Save as PDF).
 * Vector text guarantees selectable text and ultra-crisp printouts.
 */
export function printVectorPDF(): void {
  window.print();
}
