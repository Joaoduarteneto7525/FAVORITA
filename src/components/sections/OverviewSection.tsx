import React from 'react';
import { motion } from 'motion/react';

const OVERVIEW_BLOCKS = [
  { label: 'Segmento', value: 'Moda feminina' },
  { label: 'Mercado', value: 'Brasil' },
  { label: 'Experiência', value: 'E-commerce' },
  { label: 'Plataforma', value: 'Loja virtual' },
];

export const OverviewSection: React.FC = () => {
  return (
    <section
      id="visao-geral"
      className="bg-[#F7F2EC] text-[#2A180F] py-20 lg:py-28 border-t border-[#2A180F]/8"
    >
      <div className="mx-auto max-w-[1360px] px-6 lg:px-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.65 }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end pb-12 border-b border-[#2A180F]/12"
        >
          <div className="lg:col-span-7">
            <p className="text-[11px] font-sans uppercase tracking-[0.32em] text-[#6E4B3B] mb-3">
              01. Visão Geral
            </p>
            <h2 className="font-serif text-[clamp(2.1rem,3.8vw,3.3rem)] font-normal leading-[1.1] text-[#2A180F]">
              Uma identidade criada para vestir a elegância.
            </h2>
          </div>
          <div className="lg:col-span-5">
            <p className="text-[15px] leading-[1.75] text-[#4B2E22]">
              Um sistema visual completo — da assinatura tipográfica às embalagens físicas e à
              experiência digital de compra.
            </p>
          </div>
        </motion.div>

        {/* 4 Structured Project Metadata Blocks */}
        <div className="grid grid-cols-2 lg:grid-cols-4 border-b border-[#2A180F]/12">
          {OVERVIEW_BLOCKS.map((item, idx) => (
            <div
              key={item.label}
              className={`py-8 lg:py-10 ${
                idx !== 0 ? 'lg:border-l lg:border-[#2A180F]/12 lg:pl-8' : ''
              } ${idx < 3 ? 'lg:pr-8' : ''}`}
            >
              <p className="text-[11px] uppercase tracking-[0.26em] text-[#6E4B3B]">{item.label}</p>
              <p className="mt-2 font-serif text-xl sm:text-2xl font-normal text-[#2A180F]">
                {item.value}
              </p>
            </div>
          ))}
        </div>

        {/* Minimal editorial statement */}
        <div className="mt-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <p className="font-serif italic text-xl sm:text-2xl text-[#2A180F] leading-snug">
            “Sofisticação sem exageros, feminilidade atemporal e precisão nos detalhes.”
          </p>
          <span className="text-[11px] uppercase tracking-[0.26em] text-[#6E4B3B] shrink-0">
            FAVORITA VESTUÁRIO
          </span>
        </div>
      </div>
    </section>
  );
};
