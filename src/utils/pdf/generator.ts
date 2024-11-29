import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
import { formatNumber } from '../dateCalculations';
import { Stats, StatData } from './types';
import { containerStyles, fonts } from './styles';
import { createHeader, createStatCard, createQuote } from './components';

function createStatsContainer(stats: Stats): HTMLElement {
  const container = document.createElement('div');
  Object.assign(container.style, containerStyles);
  container.style.fontFamily = fonts.primary;

  // Add header
  container.appendChild(createHeader());

  // Create stats grid
  const grid = document.createElement('div');
  grid.style.display = 'grid';
  grid.style.gridTemplateColumns = 'repeat(3, 1fr)';
  grid.style.gap = '16px';
  grid.style.margin = '24px 0';

  const statsData: StatData[] = [
    { key: 'milliseconds', label: 'Milisegundos', value: formatNumber(stats.milliseconds) },
    { key: 'seconds', label: 'Segundos', value: formatNumber(stats.seconds) },
    { key: 'minutes', label: 'Minutos', value: formatNumber(stats.minutes) },
    { key: 'hours', label: 'Horas', value: formatNumber(stats.hours) },
    { key: 'days', label: 'Días', value: formatNumber(stats.days) },
    { key: 'months', label: 'Meses', value: formatNumber(stats.months) },
    { key: 'years', label: 'Años', value: String(stats.years) },
    { key: 'daysUntilBirthday', label: 'Días para tu cumpleaños', value: String(stats.daysUntilBirthday) },
    { key: 'conceptionDate', label: 'Fecha de concepción', value: stats.conceptionDate.toLocaleDateString() }
  ];

  statsData.forEach(statData => {
    grid.appendChild(createStatCard(statData));
  });

  container.appendChild(grid);
  container.appendChild(createQuote(formatNumber(stats.days)));

  return container;
}

export async function generatePDF(stats: Stats): Promise<void> {
  try {
    const container = createStatsContainer(stats);
    document.body.appendChild(container);

    const canvas = await html2canvas(container, {
      scale: 2, // Reduced scale for better quality/size balance
      useCORS: true,
      allowTaint: true,
      backgroundColor: '#ffffff',
      logging: false,
      onclone: (doc) => {
        const allElements = doc.querySelectorAll('*');
        allElements.forEach((el) => {
          if (el instanceof HTMLElement) {
            el.style.textRendering = 'geometricPrecision';
            el.style.webkitFontSmoothing = 'antialiased';
          }
        });
      }
    });

    document.body.removeChild(container);

    // Create PDF with A4 dimensions
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
      compress: true
    });

    const imgData = canvas.toDataURL('image/jpeg', 1.0);
    
    // Calculate dimensions to fit A4 with margins
    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();
    const margin = 10; // 10mm margins
    
    const imageWidth = pageWidth - (margin * 2);
    const imageHeight = (canvas.height * imageWidth) / canvas.width;
    
    // Center the image vertically if it's shorter than the page
    const yPosition = imageHeight < (pageHeight - (margin * 2)) 
      ? (pageHeight - imageHeight) / 2 
      : margin;

    pdf.addImage(imgData, 'JPEG', margin, yPosition, imageWidth, imageHeight, undefined, 'FAST');

    // Add footer
    const footerText = '© ' + new Date().getFullYear() + ' Tu Historia en Números';
    pdf.setFontSize(8);
    pdf.setTextColor(128, 128, 128);
    pdf.text(footerText, pageWidth / 2, pageHeight - 5, {
      align: 'center',
      baseline: 'bottom'
    });

    pdf.save('mi-historia-en-numeros.pdf');
  } catch (error) {
    console.error('Error generating PDF:', error);
    throw new Error('Failed to generate PDF');
  }
}