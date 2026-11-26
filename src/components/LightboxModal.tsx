import React, { useEffect } from 'react';
import { ChevronLeft, ChevronRight, Download, X } from 'lucide-react';
import { downloadAsset } from '../data/brandData';

export interface LightboxItem {
  src: string;
  title: string;
  category?: string;
  description?: string;
  filename?: string;
}

interface LightboxModalProps {
  items: LightboxItem[];
  currentIndex: number | null;
  onClose: () => void;
  onNavigate: (newIndex: number) => void;
}

export const LightboxModal: React.FC<LightboxModalProps> = ({
  items,
  currentIndex,
  onClose,
  onNavigate,
}) => {
  useEffect(() => {
    if (currentIndex === null) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') {
        onNavigate((currentIndex + 1) % items.length);
      }
      if (e.key === 'ArrowLeft') {
        onNavigate((currentIndex - 1 + items.length) % items.length);
      }
    };

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [currentIndex, items.length, onClose, onNavigate]);

  if (currentIndex === null || !items[currentIndex]) return null;

  const active = items[currentIndex];
  const downloadName =
    active.filename ||
    `favorita-${active.title
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9]+/g, '-')}.jpg`;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#171313]/95 backdrop-blur-md p-4 sm:p-8"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={active.title}
    >
      <div
        className="relative flex w-full max-w-5xl flex-col bg-[#2A2625] border border-[#FFE08A]/20 overflow-hidden shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top bar */}
        <div className="flex items-center justify-between gap-4 border-b border-[#F7F2EC]/10 px-6 py-4">
          <div className="flex items-center gap-3 text-xs text-[#DCC8B5] min-w-0">
            <span className="font-mono tabular-nums text-[#FFE08A]">
              {String(currentIndex + 1).padStart(2, '0')} / {String(items.length).padStart(2, '0')}
            </span>
            {active.category && (
              <>
                <span aria-hidden="true">·</span>
                <span className="truncate uppercase tracking-[0.2em]">{active.category}</span>
              </>
            )}
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => downloadAsset(active.src, downloadName)}
              className="inline-flex items-center gap-2 px-3.5 py-2 text-[11px] uppercase tracking-[0.16em] text-[#171313] bg-[#FFE08A] hover:bg-[#FFE8AF] transition-colors whitespace-nowrap shrink-0"
            >
              <Download className="h-3.5 w-3.5" />
              Baixar
            </button>
            <button
              type="button"
              onClick={onClose}
              className="inline-flex h-10 w-10 items-center justify-center text-[#F7F2EC] hover:text-[#FFE08A] transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#FFE08A]"
              aria-label="Fechar visualização"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Media stage */}
        <div className="relative flex items-center justify-center bg-[#171313] max-h-[72vh] overflow-hidden">
          <img
            src={active.src}
            alt={active.title}
            referrerPolicy="no-referrer"
            className="max-h-[72vh] w-auto object-contain"
          />

          {items.length > 1 && (
            <>
              <button
                type="button"
                onClick={() => onNavigate((currentIndex - 1 + items.length) % items.length)}
                className="absolute left-4 top-1/2 -translate-y-1/2 inline-flex h-11 w-11 items-center justify-center bg-[#171313]/75 text-[#FFEFC6] border border-[#FFE08A]/25 hover:bg-[#2A180F] hover:text-[#FFE08A] transition-colors"
                aria-label="Imagem anterior"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                type="button"
                onClick={() => onNavigate((currentIndex + 1) % items.length)}
                className="absolute right-4 top-1/2 -translate-y-1/2 inline-flex h-11 w-11 items-center justify-center bg-[#171313]/75 text-[#FFEFC6] border border-[#FFE08A]/25 hover:bg-[#2A180F] hover:text-[#FFE08A] transition-colors"
                aria-label="Próxima imagem"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </>
          )}
        </div>

        {/* Caption footer */}
        <div className="px-6 py-4 bg-[#2A2625] border-t border-[#F7F2EC]/10">
          <h3 className="font-serif text-xl font-normal text-[#FFEFC6]">{active.title}</h3>
          {active.description && (
            <p className="mt-1 text-xs leading-relaxed text-[#DCC8B5] max-w-3xl">
              {active.description}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
