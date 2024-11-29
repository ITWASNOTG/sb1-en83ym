import React, { useState } from 'react';
import { Download, X, Loader2, Twitter, Facebook, Send, MessageCircle } from 'lucide-react';
import { ShareData, getSocialShareUrls } from '../utils/sharing';

interface ShareModalProps {
  onClose: () => void;
  onDownload: () => void;
  shareData: ShareData;
}

export function ShareModal({ onClose, onDownload, shareData }: ShareModalProps) {
  const [isGenerating, setIsGenerating] = useState(false);
  const socialUrls = getSocialShareUrls(shareData);

  const handleDownload = async () => {
    setIsGenerating(true);
    try {
      await onDownload();
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 animate-fade-in">
      <div className="bg-white rounded-2xl p-6 max-w-sm w-full mx-4 animate-scale-in">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-display font-bold text-gray-900">
            Compartir mi historia
          </h3>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        <div className="space-y-4">
          <button
            onClick={handleDownload}
            disabled={isGenerating}
            className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-gray-100 hover:bg-gray-200 disabled:bg-gray-50 disabled:cursor-wait rounded-xl font-medium text-gray-700 transition-colors"
          >
            {isGenerating ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Generando PDF...
              </>
            ) : (
              <>
                <Download className="w-5 h-5" />
                Descargar como PDF
              </>
            )}
          </button>

          <div className="grid grid-cols-2 gap-3">
            <a
              href={socialUrls.twitter}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 py-3 bg-[#1DA1F2] text-white rounded-xl font-medium hover:bg-[#1a8cd8] transition-colors"
            >
              <Twitter className="w-5 h-5" />
              Twitter
            </a>
            <a
              href={socialUrls.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 py-3 bg-[#1877F2] text-white rounded-xl font-medium hover:bg-[#166fe5] transition-colors"
            >
              <Facebook className="w-5 h-5" />
              Facebook
            </a>
            <a
              href={socialUrls.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 py-3 bg-[#25D366] text-white rounded-xl font-medium hover:bg-[#22c35e] transition-colors"
            >
              <MessageCircle className="w-5 h-5" />
              WhatsApp
            </a>
            <a
              href={socialUrls.telegram}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 py-3 bg-[#0088cc] text-white rounded-xl font-medium hover:bg-[#0077b3] transition-colors"
            >
              <Send className="w-5 h-5" />
              Telegram
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}