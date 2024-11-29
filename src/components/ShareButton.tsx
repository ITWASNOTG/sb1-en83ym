import React, { useState } from 'react';
import { Share2, Download } from 'lucide-react';
import { shareContent, ShareData } from '../utils/sharing';
import { generatePDF } from '../utils/pdfGenerator';
import { ShareModal } from './ShareModal';

interface ShareButtonProps {
  stats: {
    milliseconds: number;
    seconds: number;
    minutes: number;
    hours: number;
    days: number;
    months: number;
    years: number;
    daysUntilBirthday: number;
    conceptionDate: Date;
  };
  birthDate: Date;
}

export function ShareButton({ stats, birthDate }: ShareButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);

  const shareData: ShareData = {
    title: 'Mi Historia en Números',
    text: `¡Descubre tu historia! Nací hace ${stats.years} años, ${stats.days.toLocaleString()} días, ${stats.hours.toLocaleString()} horas...`,
    url: window.location.href,
  };

  const handleShare = async () => {
    try {
      await shareContent(shareData);
    } catch (error) {
      if ((error as Error).message === 'Web Share API not supported') {
        setIsOpen(true);
      }
    }
  };

  const handleDownload = async () => {
    setIsGenerating(true);
    try {
      await generatePDF(stats);
    } catch (error) {
      console.error('Failed to generate PDF:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="flex flex-col sm:flex-row items-center justify-center gap-3 md:gap-4 px-4">
      <button
        onClick={handleShare}
        className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3 bg-blue-600 text-white rounded-xl font-display font-semibold shadow-lg shadow-blue-200 hover:bg-blue-700 transition-all duration-300 hover:shadow-xl hover:scale-105 focus:ring-4 focus:ring-blue-200 gap-2"
      >
        <Share2 className="w-5 h-5" />
        Compartir
      </button>

      <button
        onClick={handleDownload}
        disabled={isGenerating}
        className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3 bg-gray-800 text-white rounded-xl font-display font-semibold shadow-lg shadow-gray-200 hover:bg-gray-900 transition-all duration-300 hover:shadow-xl hover:scale-105 focus:ring-4 focus:ring-gray-200 gap-2 disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:scale-100"
      >
        {isGenerating ? (
          <span className="animate-pulse">Generando PDF...</span>
        ) : (
          <>
            <Download className="w-5 h-5" />
            Descargar PDF
          </>
        )}
      </button>

      {isOpen && (
        <ShareModal
          onClose={() => setIsOpen(false)}
          onDownload={handleDownload}
          shareData={shareData}
        />
      )}
    </div>
  );
}