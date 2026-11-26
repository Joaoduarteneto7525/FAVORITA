import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Check, Copy } from 'lucide-react';
import { COLOR_PALETTE } from '../../data/brandData';

export const VisualIdentitySection: React.FC = () => {
  const [copiedHex, setCopiedHex] = useState<string | null>(null);

  const handleCopyHex = (hex: string) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(hex).catch(() => {});
    }
    setCopiedHex(hex);
    window.setTimeout(() => {
      setCopiedHex((curr) => (curr === hex ? null : curr));
    }, 1800);
  };

  return (
    <section
      id="identidade-visual"
      className="bg-[#171313] text-[#F7F2EC] py-20 lg:py-28 border-t border-[#FFE08A]/10"
    >
      <div className="mx-auto max-w-[1360px] px-6 lg:px-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.65 }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end pb-12 border-b border-[#F7F2EC]/12"
        >
          <div className="lg:col-span-7">
            <p className="text-[11px] font-sans uppercase tracking-[0.32em] text-[#FFE08A] mb-3">
              04. Paleta Cromática e Tipografia
            </p>
            <h2 className="font-serif text-[clamp(2.1rem,3.8vw,3.3rem)] font-normal leading-[1.1] text-[#FFEFC6]">
              Contraste, profundidade e sofisticação.
            </h2>
          </div>
          <div className="lg:col-span-5">
            <p className="text-[15px] leading-[1.75] text-[#DCC8B5]">
              Paleta oficial composta por escuros profundos, tons terrosos, dourados champagne e
              base marfim. Clique para copiar qualquer código HEX.
            </p>
          </div>
        </motion.div>

        {/* Clean Official Color Swatch Groups */}
        <div className="mt-12 space-y-10">
          {COLOR_PALETTE.map((group) => (
            <div key={group.title}>
              <h3 className="mb-4 font-serif text-xl font-normal text-[#FFEFC6]">{group.title}</h3>
              <div
                className={`grid gap-3.5 ${
                  group.swatches.length === 1
                    ? 'grid-cols-1'
                    : group.swatches.length === 3
                    ? 'grid-cols-1 sm:grid-cols-3'
                    : 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-5'
                }`}
              >
                {group.swatches.map((swatch) => {
                  const isCopied = copiedHex === swatch.hex;
                  const textColor = swatch.lightText ? 'text-[#F7F2EC]' : 'text-[#2A180F]';

                  return (
                    <button
                      key={swatch.hex}
                      type="button"
                      onClick={() => handleCopyHex(swatch.hex)}
                      className="group text-left flex flex-col justify-between min-h-[126px] p-5 border border-[#F7F2EC]/12 transition-transform duration-200 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FFE08A]"
                      style={{ backgroundColor: swatch.hex }}
                      aria-label={`Copiar código hexadecimal ${swatch.hex} da cor ${swatch.name}`}
                    >
                      <div className={`flex items-center justify-between gap-2 ${textColor}`}>
                        <span className="font-mono text-xs tracking-wider uppercase font-medium">
                          {swatch.hex}
                        </span>
                        <span className="opacity-70 group-hover:opacity-100">
                          {isCopied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
                        </span>
                      </div>

                      <p className={`mt-6 font-serif text-lg font-medium ${textColor}`}>
                        {swatch.name}
                      </p>
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Concise Typographic Pairing */}
        <div className="mt-16 pt-12 border-t border-[#F7F2EC]/12 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="p-7 bg-[#2A2625]/60 border border-[#F7F2EC]/10 flex flex-col justify-between gap-4">
            <span className="text-[11px] uppercase tracking-[0.26em] text-[#FFE08A]">
              Logotipo &amp; Títulos
            </span>
            <p className="font-serif text-4xl font-semibold text-[#FFEFC6]">Playfair Display</p>
            <p className="font-serif italic text-lg text-[#DCC8B5]">Aa Bb Cc · 123456</p>
          </div>

          <div className="p-7 bg-[#2A2625]/60 border border-[#F7F2EC]/10 flex flex-col justify-between gap-4">
            <span className="text-[11px] uppercase tracking-[0.26em] text-[#FFE08A]">
              Textos &amp; Interface
            </span>
            <p className="font-sans text-3xl sm:text-4xl font-light text-[#FFEFC6]">
              Plus Jakarta Sans
            </p>
            <p className="font-sans text-sm text-[#DCC8B5]">Aa Bb Cc · Navegação e leitura limpa</p>
          </div>
        </div>

        {/* Institutional Quote */}
        <div className="mt-16 pt-12 border-t border-[#FFE08A]/15 text-center">
          <p className="font-serif italic text-2xl sm:text-3xl lg:text-4xl font-normal text-[#FFEFC6] leading-tight max-w-2xl mx-auto">
            “Elegância está na harmonia entre cada detalhe.”
          </p>
        </div>
      </div>
    </section>
  );
};
