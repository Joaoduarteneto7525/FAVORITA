import React, { useState } from 'react';
import { motion } from 'motion/react';
import { FavoritaLockup, FavoritaMonogram } from '../BrandMark';
import { EditorialImage } from '../EditorialImage';
import { IMAGES } from '../../data/brandData';

interface LogoSystemSectionProps {
  onInspectImage: (src: string, title: string, category: string, description: string) => void;
}

export const LogoSystemSection: React.FC<LogoSystemSectionProps> = ({ onInspectImage }) => {
  const [previewSurface, setPreviewSurface] = useState<'dark' | 'light'>('dark');

  return (
    <section
      id="sistema-logotipos"
      className="bg-[#2A2625] text-[#F7F2EC] py-20 lg:py-28 border-t border-[#FFE08A]/10"
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
              03. Sistema Final de Logotipos
            </p>
            <h2 className="font-serif text-[clamp(2.1rem,3.8vw,3.3rem)] font-normal leading-[1.1] text-[#FFEFC6]">
              Uma assinatura. Um símbolo. Uma identidade.
            </h2>
          </div>
          <div className="lg:col-span-5 flex flex-col items-start lg:items-end justify-end">
            <div className="inline-flex items-center border border-[#FFE08A]/25 p-1 bg-[#171313]">
              <button
                type="button"
                onClick={() => setPreviewSurface('dark')}
                className={`px-4 py-1.5 text-[11px] uppercase tracking-[0.18em] transition-colors whitespace-nowrap shrink-0 ${
                  previewSurface === 'dark'
                    ? 'bg-[#FFE08A] text-[#171313] font-medium'
                    : 'text-[#DCC8B5] hover:text-[#FFEFC6]'
                }`}
              >
                Champagne / Escuro
              </button>
              <button
                type="button"
                onClick={() => setPreviewSurface('light')}
                className={`px-4 py-1.5 text-[11px] uppercase tracking-[0.18em] transition-colors whitespace-nowrap shrink-0 ${
                  previewSurface === 'light'
                    ? 'bg-[#F7F2EC] text-[#2A180F] font-medium'
                    : 'text-[#DCC8B5] hover:text-[#FFEFC6]'
                }`}
              >
                Espresso / Claro
              </button>
            </div>
          </div>
        </motion.div>

        {/* 01. Primary Logo (Official Image on dark / Pure FAVORITA Playfair Display on light) + 02. Circular Monogram */}
        <div className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* 01. Primary Logo — Strictly manual Playfair Display FAVORITA on both dark and light */}
          <div
            className={`lg:col-span-7 flex flex-col justify-between min-h-[340px] p-8 sm:p-10 border transition-colors duration-300 ${
              previewSurface === 'dark'
                ? 'bg-[#171313] border-[#FFE08A]/18 text-[#FFEFC6]'
                : 'bg-[#F7F2EC] border-[#2A180F]/15 text-[#2A180F]'
            }`}
          >
            <div className="flex items-center justify-between text-[11px] uppercase tracking-[0.26em] opacity-75">
              <span>01. Logotipo Principal</span>
              <span className="font-mono">
                {previewSurface === 'dark' ? '#FFE08A / #171313' : '#2A180F / #F7F2EC'}
              </span>
            </div>

            <div className="my-8 flex items-center justify-center flex-1">
              <span
                className={`font-serif text-5xl sm:text-6xl font-semibold uppercase tracking-[0.06em] leading-none transition-colors duration-300 ${
                  previewSurface === 'dark' ? 'text-[#FFE08A]' : 'text-[#2A180F]'
                }`}
              >
                FAVORITA
              </span>
            </div>

            <span className="text-xs opacity-65">Playfair Display · Assinatura principal</span>
          </div>

          {/* 02. Circular F Monogram */}
          <div
            className={`lg:col-span-5 flex flex-col justify-between min-h-[340px] p-8 sm:p-10 border transition-colors duration-300 ${
              previewSurface === 'dark'
                ? 'bg-[#2A180F] border-[#FFE08A]/20 text-[#FFEFC6]'
                : 'bg-[#DCC8B5] border-[#2A180F]/15 text-[#2A180F]'
            }`}
          >
            <div className="flex items-center justify-between text-[11px] uppercase tracking-[0.26em] opacity-75">
              <span>02. Monograma Circular</span>
              <span className="font-mono">
                {previewSurface === 'dark' ? '#FFE08A / #2A180F' : '#2A180F / #DCC8B5'}
              </span>
            </div>

            <div className="my-8 flex items-center justify-center flex-1">
              <FavoritaMonogram
                size={146}
                tone={previewSurface === 'dark' ? 'champagne' : 'espresso'}
              />
            </div>

            <span className="text-xs opacity-65">Medalhões, lacres e favícones</span>
          </div>
        </div>

        {/* 03. Horizontal (with circular F) & 04. Compact (pure FAVORITA wordmark) */}
        <div className="mt-6 grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div
            className={`lg:col-span-7 flex flex-col justify-between min-h-[200px] p-8 border transition-colors duration-300 ${
              previewSurface === 'dark'
                ? 'bg-[#2F2B2A] border-[#F7F2EC]/12 text-[#FFEFC6]'
                : 'bg-[#F7F2EC] border-[#2A180F]/15 text-[#2A180F]'
            }`}
          >
            <span className="text-[11px] uppercase tracking-[0.26em] opacity-70">
              03. Versão Horizontal
            </span>
            <div className="my-6 flex items-center justify-center">
              <FavoritaLockup
                variant="horizontal"
                tone={previewSurface === 'dark' ? 'paleGold' : 'espresso'}
                size="md"
                showSubtitle={false}
              />
            </div>
            <span className="text-xs opacity-65">Cabeçalhos digitais e assinaturas</span>
          </div>

          <div
            className={`lg:col-span-5 flex flex-col justify-between min-h-[200px] p-8 border transition-colors duration-300 ${
              previewSurface === 'dark'
                ? 'bg-[#171313] border-[#F7F2EC]/12 text-[#FFEFC6]'
                : 'bg-[#F7F2EC] border-[#2A180F]/15 text-[#2A180F]'
            }`}
          >
            <span className="text-[11px] uppercase tracking-[0.26em] opacity-70">
              04. Versão Compacta
            </span>
            <div className="my-6 flex items-center justify-center">
              <FavoritaLockup
                variant="compact"
                tone={previewSurface === 'dark' ? 'champagne' : 'espresso'}
                size="md"
              />
            </div>
            <span className="text-xs opacity-65">Etiquetas internas e reduções</span>
          </div>
        </div>

        {/* 05. Contrast Matrix + Medallion Photo */}
        <div className="mt-12 pt-12 border-t border-[#F7F2EC]/12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-6 space-y-5">
            <p className="text-[11px] uppercase tracking-[0.28em] text-[#FFE08A]">
              05. Aplicações em Fundos Claros e Escuros
            </p>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-[#171313] border border-[#FFE08A]/20 p-6 flex flex-col items-center justify-center gap-3">
                <FavoritaMonogram size={46} tone="champagne" />
                <span className="font-mono text-[10px] tracking-widest text-[#FFE8AF]">#171313</span>
              </div>
              <div className="bg-[#2A180F] border border-[#FFE08A]/20 p-6 flex flex-col items-center justify-center gap-3">
                <FavoritaMonogram size={46} tone="paleGold" />
                <span className="font-mono text-[10px] tracking-widest text-[#FFEFC6]">#2A180F</span>
              </div>
              <div className="bg-[#DCC8B5] border border-[#2A180F]/15 p-6 flex flex-col items-center justify-center gap-3">
                <FavoritaMonogram size={46} tone="espresso" />
                <span className="font-mono text-[10px] tracking-widest text-[#2A180F]">#DCC8B5</span>
              </div>
              <div className="bg-[#F7F2EC] border border-[#2A180F]/15 p-6 flex flex-col items-center justify-center gap-3">
                <FavoritaMonogram size={46} tone="espresso" />
                <span className="font-mono text-[10px] tracking-widest text-[#2A180F]">#F7F2EC</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="border border-[#FFE08A]/20 bg-[#171313] p-3">
              <EditorialImage
                src={IMAGES.monogramMedallion}
                alt="Medalhão dourado champagne e lacre espresso FAVORITA"
                aspectClass="aspect-[4/3]"
                onInspect={() =>
                  onInspectImage(
                    IMAGES.monogramMedallion,
                    'Medalhão Metálico e Lacre de Cera FAVORITA',
                    '03. Sistema Final de Logotipos',
                    'Monograma circular F em metal escovado dourado e cera marrom espresso.'
                  )
                }
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
