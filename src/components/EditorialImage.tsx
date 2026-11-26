import React, { useState } from 'react';
import { Maximize2 } from 'lucide-react';
import { FavoritaMonogram } from './BrandMark';

interface EditorialImageProps {
  src: string;
  alt: string;
  aspectClass?: string;
  className?: string;
  imgClassName?: string;
  onInspect?: () => void;
  fallbackTitle?: string;
  darkFallback?: boolean;
}

export const EditorialImage: React.FC<EditorialImageProps> = ({
  src,
  alt,
  aspectClass = 'aspect-[4/3]',
  className = '',
  imgClassName = '',
  onInspect,
  fallbackTitle = 'FAVORITA VESTUÁRIO',
  darkFallback = true,
}) => {
  const [hasError, setHasError] = useState(false);

  const containerBg = darkFallback ? 'bg-[#2A2625]' : 'bg-[#DCC8B5]/40';

  return (
    <div
      className={`group relative overflow-hidden ${containerBg} ${aspectClass} ${
        onInspect ? 'cursor-pointer' : ''
      } ${className}`}
      onClick={onInspect}
      role={onInspect ? 'button' : undefined}
      tabIndex={onInspect ? 0 : undefined}
      onKeyDown={
        onInspect
          ? (e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                onInspect();
              }
            }
          : undefined
      }
      aria-label={onInspect ? `Ampliar imagem: ${alt}` : undefined}
    >
      {!hasError ? (
        <img
          src={src}
          alt={alt}
          referrerPolicy="no-referrer"
          loading="lazy"
          onError={() => setHasError(true)}
          className={`h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03] ${imgClassName}`}
        />
      ) : (
        <div
          className={`flex h-full w-full flex-col items-center justify-center gap-4 p-8 text-center ${
            darkFallback
              ? 'bg-gradient-to-br from-[#2F2B2A] via-[#2A180F] to-[#171313] text-[#FFEFC6]'
              : 'bg-gradient-to-br from-[#F7F2EC] via-[#DCC8B5]/50 to-[#C79579]/25 text-[#2A180F]'
          }`}
        >
          <FavoritaMonogram size={48} tone={darkFallback ? 'champagne' : 'espresso'} />
          <span className="font-serif text-lg tracking-wide">{fallbackTitle}</span>
        </div>
      )}

      {onInspect && !hasError && (
        <div className="pointer-events-none absolute inset-0 flex items-end justify-end p-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100 bg-gradient-to-t from-[#171313]/45 via-transparent to-transparent">
          <span className="inline-flex items-center gap-1.5 bg-[#171313]/80 backdrop-blur-sm px-3 py-1.5 text-[11px] tracking-[0.18em] uppercase text-[#FFEFC6] border border-[#FFE08A]/25">
            <Maximize2 className="h-3.5 w-3.5 text-[#FFE08A]" />
            Ampliar
          </span>
        </div>
      )}
    </div>
  );
};
