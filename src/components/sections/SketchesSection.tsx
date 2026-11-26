import React, { useState } from 'react';
import { motion } from 'motion/react';
import { EditorialImage } from '../EditorialImage';
import { MonogramConstructionGrid } from '../BrandMark';
import { IMAGES } from '../../data/brandData';

interface SketchesSectionProps {
  onInspectImage: (src: string, title: string, category: string, description: string) => void;
}

const PROCESS_HIGHLIGHTS = [
  '01. Estudos tipográficos',
  '02. Esboços da letra F',
  '03. Proporção e contraste',
  '04. Monograma circular',
  '05. Alinhamento e respiro',
  '06. Assinatura final',
];

export const SketchesSection: React.FC<SketchesSectionProps> = ({ onInspectImage }) => {
  const [showGrid, setShowGrid] = useState(true);
  const [showAxes, setShowAxes] = useState(true);
  const [showClearspace, setShowClearspace] = useState(true);

  return (
    <section
      id="esbocos"
      className="bg-[#DCC8B5] text-[#2A180F] py-20 lg:py-28 border-t border-[#2A180F]/10"
    >
      <div className="mx-auto max-w-[1360px] px-6 lg:px-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.65 }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end pb-12 border-b border-[#2A180F]/15"
        >
          <div className="lg:col-span-7">
            <p className="text-[11px] font-sans uppercase tracking-[0.32em] text-[#4B2E22] mb-3">
              02. Esboços e Direção Criativa
            </p>
            <h2 className="font-serif text-[clamp(2.1rem,3.8vw,3.3rem)] font-normal leading-[1.1] text-[#2A180F]">
              Toda identidade começa com uma assinatura.
            </h2>
          </div>
          <div className="lg:col-span-5">
            <p className="text-[15px] leading-[1.75] text-[#4B2E22]">
              Estudos de proporção, contraste serifado e refinamento sobre papel texturizado até a
              assinatura definitiva.
            </p>
          </div>
        </motion.div>

        {/* Visual studies: User's uploaded image 1 + Interactive geometric construction */}
        <div className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          <div className="lg:col-span-7 bg-[#F7F2EC] p-3 border border-[#2A180F]/15 flex flex-col justify-between">
            <EditorialImage
              src={IMAGES.logoSketches}
              alt="Estudo da assinatura FAVORITA em papel texturizado com notas de direção criativa"
              aspectClass="aspect-[16/10]"
              darkFallback={false}
              onInspect={() =>
                onInspectImage(
                  IMAGES.logoSketches,
                  'Estudo Tipográfico e Direção Criativa FAVORITA',
                  '02. Esboços e Direção Criativa',
                  'Elegância, sofisticação e tipografia clássica atemporal em alto-relevo sobre papel texturizado.'
                )
              }
            />
            <div className="mt-3 px-2 pb-1 flex items-center justify-between text-xs text-[#4B2E22]">
              <span>Estudo de assinatura e relevo sobre papel algodão</span>
              <span className="font-mono tabular-nums text-[#6E4B3B]">PRANCHA 01</span>
            </div>
          </div>

          <div className="lg:col-span-5 bg-[#F7F2EC] p-3 border border-[#2A180F]/15 flex flex-col justify-between">
            <MonogramConstructionGrid
              showGrid={showGrid}
              showAxes={showAxes}
              showClearspace={showClearspace}
            />

            <div className="mt-3 px-2 pb-1 flex flex-wrap items-center justify-between gap-2">
              <span className="text-xs text-[#4B2E22]">Malha do monograma</span>
              <div className="flex items-center gap-1" role="group" aria-label="Camadas da malha construtiva">
                <button
                  type="button"
                  onClick={() => setShowGrid((v) => !v)}
                  className={`px-2.5 py-1 text-[10px] uppercase tracking-[0.14em] transition-colors whitespace-nowrap ${
                    showGrid
                      ? 'bg-[#2A180F] text-[#FFEFC6]'
                      : 'bg-[#DCC8B5]/60 text-[#4B2E22] hover:bg-[#DCC8B5]'
                  }`}
                >
                  Malha
                </button>
                <button
                  type="button"
                  onClick={() => setShowAxes((v) => !v)}
                  className={`px-2.5 py-1 text-[10px] uppercase tracking-[0.14em] transition-colors whitespace-nowrap ${
                    showAxes
                      ? 'bg-[#2A180F] text-[#FFEFC6]'
                      : 'bg-[#DCC8B5]/60 text-[#4B2E22] hover:bg-[#DCC8B5]'
                  }`}
                >
                  Eixos
                </button>
                <button
                  type="button"
                  onClick={() => setShowClearspace((v) => !v)}
                  className={`px-2.5 py-1 text-[10px] uppercase tracking-[0.14em] transition-colors whitespace-nowrap ${
                    showClearspace
                      ? 'bg-[#2A180F] text-[#FFEFC6]'
                      : 'bg-[#DCC8B5]/60 text-[#4B2E22] hover:bg-[#DCC8B5]'
                  }`}
                >
                  Respiro
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Concise process index */}
        <div className="mt-10 pt-8 border-t border-[#2A180F]/15 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {PROCESS_HIGHLIGHTS.map((step) => (
            <p key={step} className="text-xs tracking-[0.04em] text-[#4B2E22]">
              {step}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
};
