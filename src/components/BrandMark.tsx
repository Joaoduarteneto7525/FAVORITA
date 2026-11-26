import React from 'react';

export type BrandTone = 'champagne' | 'paleGold' | 'espresso' | 'ivory' | 'coffee';

const TONE_HEX: Record<BrandTone, string> = {
  champagne: '#FFE08A',
  paleGold: '#FFEFC6',
  espresso: '#2A180F',
  ivory: '#F7F2EC',
  coffee: '#4B2E22',
};

interface MonogramProps {
  size?: number;
  tone?: BrandTone;
  doubleRing?: boolean;
  className?: string;
}

export const FavoritaMonogram: React.FC<MonogramProps> = ({
  size = 56,
  tone = 'champagne',
  doubleRing = true,
  className = '',
}) => {
  const color = TONE_HEX[tone];

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 120 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="Monograma F — FAVORITA VESTUÁRIO"
      role="img"
    >
      {/* Outer precision circle */}
      <circle cx="60" cy="60" r="56" stroke={color} strokeWidth="1.5" />
      {/* Delicate inner concentric hairline */}
      {doubleRing && (
        <circle cx="60" cy="60" r="50.5" stroke={color} strokeWidth="0.65" strokeOpacity="0.65" />
      )}
      {/* High-contrast editorial serif capital F (Playfair Display) */}
      <text
        x="60"
        y="62"
        textAnchor="middle"
        dominantBaseline="central"
        fill={color}
        style={{
          fontFamily: '"Playfair Display", Georgia, serif',
          fontSize: '68px',
          fontWeight: 600,
          letterSpacing: '-0.02em',
        }}
      >
        F
      </text>
    </svg>
  );
};

interface LockupProps {
  variant?: 'vertical' | 'horizontal' | 'compact' | 'wordmark';
  tone?: BrandTone;
  showSubtitle?: boolean;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const FavoritaLockup: React.FC<LockupProps> = ({
  variant = 'vertical',
  tone = 'champagne',
  showSubtitle = true,
  size = 'md',
  className = '',
}) => {
  const color = TONE_HEX[tone];

  const monogramSizes = {
    sm: 36,
    md: 54,
    lg: 78,
  };

  const titleClasses = {
    sm: 'text-xl tracking-[0.12em] font-semibold',
    md: 'text-3xl tracking-[0.12em] font-semibold',
    lg: 'text-4xl sm:text-5xl tracking-[0.14em] font-semibold',
  };

  const subtitleClasses = {
    sm: 'text-[9px] tracking-[0.42em]',
    md: 'text-[10px] tracking-[0.46em]',
    lg: 'text-xs tracking-[0.5em]',
  };

  if (variant === 'wordmark') {
    return (
      <div className={`inline-flex flex-col items-center ${className}`} style={{ color }}>
        <span className={`font-serif uppercase leading-none ${titleClasses[size]}`}>
          FAVORITA
        </span>
        {showSubtitle && (
          <span className={`mt-2 font-sans font-light uppercase opacity-80 leading-none ${subtitleClasses[size]}`}>
            VESTUÁRIO
          </span>
        )}
      </div>
    );
  }

  if (variant === 'horizontal') {
    return (
      <div className={`inline-flex items-center gap-4 ${className}`} style={{ color }}>
        <FavoritaMonogram size={monogramSizes[size]} tone={tone} />
        <div className="h-9 w-px opacity-30" style={{ backgroundColor: color }} aria-hidden="true" />
        <div className="flex flex-col items-start">
          <span className={`font-serif uppercase leading-none ${titleClasses[size]}`}>
            FAVORITA
          </span>
          {showSubtitle && (
            <span className={`mt-1.5 font-sans font-light uppercase opacity-80 leading-none ${subtitleClasses[size]}`}>
              VESTUÁRIO
            </span>
          )}
        </div>
      </div>
    );
  }

  if (variant === 'compact') {
    return (
      <div className={`inline-flex items-center justify-center ${className}`} style={{ color }}>
        <span className="font-serif text-lg font-semibold uppercase tracking-[0.18em] leading-none">
          FAVORITA
        </span>
      </div>
    );
  }

  // Clean wordmark without circular symbol stacked above
  return (
    <div className={`inline-flex flex-col items-center ${className}`} style={{ color }}>
      <span className={`font-serif uppercase leading-none ${titleClasses[size]}`}>
        FAVORITA
      </span>
      {showSubtitle && (
        <span className={`mt-2.5 font-sans font-light uppercase opacity-80 leading-none ${subtitleClasses[size]}`}>
          VESTUÁRIO
        </span>
      )}
    </div>
  );
};

interface ConstructionGridProps {
  showGrid: boolean;
  showAxes: boolean;
  showClearspace: boolean;
}

export const MonogramConstructionGrid: React.FC<ConstructionGridProps> = ({
  showGrid,
  showAxes,
  showClearspace,
}) => {
  return (
    <div className="relative w-full aspect-[4/3] bg-[#F7F2EC] border border-[#2A180F]/15 overflow-hidden flex items-center justify-center p-6 sm:p-10">
      <svg
        viewBox="0 0 480 360"
        className="w-full h-full max-w-[440px]"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        role="img"
        aria-label="Estudo geométrico de proporção e alinhamento do monograma circular F da FAVORITA"
      >
        {/* Subtle 8px architectural grid */}
        {showGrid && (
          <g stroke="#6E4B3B" strokeOpacity="0.16" strokeWidth="0.6">
            {Array.from({ length: 19 }).map((_, i) => (
              <line key={`v-${i}`} x1={40 + i * 22} y1="24" x2={40 + i * 22} y2="336" />
            ))}
            {Array.from({ length: 15 }).map((_, i) => (
              <line key={`h-${i}`} x1="40" y1={24 + i * 22} x2="436" y2={24 + i * 22} />
            ))}
          </g>
        )}

        {/* Clearspace boundary box */}
        {showClearspace && (
          <g>
            <rect
              x="104"
              y="44"
              width="272"
              height="272"
              stroke="#C79579"
              strokeWidth="1"
              strokeDasharray="4 4"
            />
            {/* Corner clearspace module markers (x) */}
            <rect x="104" y="44" width="28" height="28" fill="#C79579" fillOpacity="0.18" stroke="#6E4B3B" strokeWidth="0.7" />
            <rect x="348" y="288" width="28" height="28" fill="#C79579" fillOpacity="0.18" stroke="#6E4B3B" strokeWidth="0.7" />
            <text x="118" y="61" textAnchor="middle" fill="#4B2E22" fontSize="9" fontFamily="JetBrains Mono, monospace">
              x
            </text>
            <text x="362" y="305" textAnchor="middle" fill="#4B2E22" fontSize="9" fontFamily="JetBrains Mono, monospace">
              x
            </text>
            <text x="240" y="35" textAnchor="middle" fill="#6E4B3B" fontSize="9" fontFamily="JetBrains Mono, monospace" letterSpacing="1.5">
              ÁREA DE RESPIRO MÍNIMA (1X)
            </text>
          </g>
        )}

        {/* Golden ratio & alignment axes */}
        {showAxes && (
          <g stroke="#6E4B3B" strokeOpacity="0.55" strokeWidth="0.8">
            {/* Horizontal and vertical centerlines */}
            <line x1="72" y1="180" x2="408" y2="180" strokeDasharray="3 3" />
            <line x1="240" y1="24" x2="240" y2="336" strokeDasharray="3 3" />
            {/* Diagonals */}
            <line x1="132" y1="72" x2="348" y2="288" strokeOpacity="0.3" />
            <line x1="348" y1="72" x2="132" y2="288" strokeOpacity="0.3" />
            {/* Inner proportion circles */}
            <circle cx="240" cy="180" r="68" stroke="#C79579" strokeWidth="0.8" strokeDasharray="2 3" />
            <circle cx="240" cy="180" r="108" stroke="#2A180F" strokeOpacity="0.35" strokeWidth="0.7" />
            {/* Dimension markers */}
            <line x1="132" y1="326" x2="348" y2="326" stroke="#4B2E22" strokeWidth="0.7" />
            <line x1="132" y1="321" x2="132" y2="331" stroke="#4B2E22" strokeWidth="0.7" />
            <line x1="348" y1="321" x2="348" y2="331" stroke="#4B2E22" strokeWidth="0.7" />
            <text x="240" y="341" textAnchor="middle" fill="#4B2E22" fontSize="9" fontFamily="JetBrains Mono, monospace">
              Ø 1.000 · PROPORÇÃO ÁUREA 1 : 1.618
            </text>
            {/* Cap height callout */}
            <line x1="372" y1="122" x2="372" y2="238" stroke="#4B2E22" strokeWidth="0.7" />
            <line x1="367" y1="122" x2="377" y2="122" stroke="#4B2E22" strokeWidth="0.7" />
            <line x1="367" y1="238" x2="377" y2="238" stroke="#4B2E22" strokeWidth="0.7" />
            <text x="382" y="183" fill="#4B2E22" fontSize="9" fontFamily="JetBrains Mono, monospace">
              0.618 Ø
            </text>
          </g>
        )}

        {/* Primary circular monogram */}
        <circle cx="240" cy="180" r="100" stroke="#2A180F" strokeWidth="2.2" />
        <circle cx="240" cy="180" r="91" stroke="#6E4B3B" strokeWidth="0.9" strokeOpacity="0.7" />
        <text
          x="240"
          y="183"
          textAnchor="middle"
          dominantBaseline="central"
          fill="#2A180F"
          style={{
            fontFamily: '"Playfair Display", Georgia, serif',
            fontSize: '124px',
            fontWeight: 600,
          }}
        >
          F
        </text>
      </svg>
    </div>
  );
};
