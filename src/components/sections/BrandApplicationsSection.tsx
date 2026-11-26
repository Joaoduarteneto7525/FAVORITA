import React from 'react';
import { motion } from 'motion/react';
import { BRAND_APPLICATIONS } from '../../data/brandData';
import { EditorialImage } from '../EditorialImage';

interface BrandApplicationsSectionProps {
  onInspectImage: (src: string, title: string, category: string, description: string) => void;
}

const TOUCHPOINT_INDEX = [
  '01. Etiqueta com monograma F',
  '02. Tag de preço FAVORITA',
  '03. Etiqueta de composição',
  '04. Sacola de compras',
  '05. Papel de seda personalizado',
  '06. Embalagem de pedidos',
  '07. Cartão de agradecimento',
  '08. Lacre com monograma F',
];

export const BrandApplicationsSection: React.FC<BrandApplicationsSectionProps> = ({
  onInspectImage,
}) => {
  return (
    <section
      id="aplicacoes"
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
              05. Aplicações da Marca
            </p>
            <h2 className="font-serif text-[clamp(2.1rem,3.8vw,3.3rem)] font-normal leading-[1.1] text-[#2A180F]">
              Da identidade ao toque.
            </h2>
          </div>
          <div className="lg:col-span-5">
            <p className="text-[15px] leading-[1.75] text-[#4B2E22]">
              Papel algodão marfim, impressão espresso, detalhes dourados e acabamentos em relevo.
            </p>
          </div>
        </motion.div>

        {/* Compact index of the 8 physical touchpoints */}
        <div className="py-6 border-b border-[#2A180F]/15 grid grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-2.5">
          {TOUCHPOINT_INDEX.map((item) => (
            <p key={item} className="text-xs tracking-[0.04em] text-[#4B2E22]">
              {item}
            </p>
          ))}
        </div>

        {/* Clean editorial mockup gallery */}
        <div className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-8">
          {BRAND_APPLICATIONS.map((item, idx) => {
            const isWide = item.span === 'wide';
            return (
              <motion.article
                key={item.id}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.65, delay: (idx % 2) * 0.08 }}
                className={`${
                  isWide ? 'lg:col-span-7' : 'lg:col-span-5'
                } bg-[#F7F2EC] border border-[#2A180F]/12 p-4 flex flex-col justify-between`}
              >
                <EditorialImage
                  src={item.image}
                  alt={item.title}
                  aspectClass="aspect-[4/3]"
                  darkFallback={false}
                  onInspect={() =>
                    onInspectImage(
                      item.image,
                      item.title,
                      `05. Aplicações · ${item.category}`,
                      item.material
                    )
                  }
                />

                <div className="mt-4 px-1 flex flex-col gap-1">
                  <div className="flex items-center justify-between text-[11px] uppercase tracking-[0.2em] text-[#6E4B3B]">
                    <span>{item.category}</span>
                    <span className="font-mono tabular-nums">{item.number}</span>
                  </div>
                  <h3 className="font-serif text-xl sm:text-2xl font-normal text-[#2A180F]">
                    {item.title}
                  </h3>
                  <p className="text-xs text-[#6E4B3B]">{item.material}</p>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
};
