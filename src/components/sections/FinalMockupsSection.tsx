import React from 'react';
import { motion } from 'motion/react';
import { EditorialImage } from '../EditorialImage';
import { IMAGES } from '../../data/brandData';

interface FinalMockupsSectionProps {
  onInspectImage: (src: string, title: string, category: string, description: string) => void;
}

const FINAL_MOCKUPS = [
  {
    id: 'campanha',
    src: IMAGES.finalCampaign,
    title: 'Campanha Editorial FAVORITA',
    caption: 'Campanha editorial',
  },
  {
    id: 'caixa-cartao',
    src: IMAGES.orderBoxCard,
    title: 'Embalagem Rígida, Cartão e Lacre',
    caption: 'Embalagem e papelaria',
  },
  {
    id: 'logo-oficial',
    src: IMAGES.officialLogoImage,
    title: 'Logotipo Oficial FAVORITA',
    caption: 'Logotipo oficial',
  },
  {
    id: 'sacola',
    src: IMAGES.shoppingBag,
    title: 'Sacola Boutique & Papel de Seda',
    caption: 'Sacola boutique',
  },
  {
    id: 'etiquetas',
    src: IMAGES.clothingTags,
    title: 'Etiquetas e Tag de Preço',
    caption: 'Etiquetas e tag de peça',
  },
  {
    id: 'seda-lacre',
    src: IMAGES.tissueSeal,
    title: 'Papel de Seda e Lacre F',
    caption: 'Seda e lacre metálico',
  },
  {
    id: 'medalhao',
    src: IMAGES.monogramMedallion,
    title: 'Medalhão Metálico e Lacre de Cera',
    caption: 'Medalhão e selo de cera',
  },
];

export const FinalMockupsSection: React.FC<FinalMockupsSectionProps> = ({ onInspectImage }) => {
  return (
    <section
      id="mockups-finais"
      className="bg-[#2A2625] text-[#F7F2EC] py-20 lg:py-28 border-t border-[#FFE08A]/10"
    >
      <div className="mx-auto max-w-[1360px] px-6 lg:px-10">
        {/* Clean Editorial Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.65 }}
          className="pb-12 border-b border-[#F7F2EC]/12"
        >
          <p className="text-[11px] font-sans uppercase tracking-[0.32em] text-[#FFE08A] mb-3">
            07. Mockups Finais
          </p>
          <h2 className="font-serif text-[clamp(2.1rem,3.8vw,3.3rem)] font-normal leading-[1.1] text-[#FFEFC6]">
            A FAVORITA em cada detalhe.
          </h2>
        </motion.div>

        {/* Unobstructed Curated Asymmetric Gallery */}
        <div className="mt-12 space-y-8">
          {/* Row 1: Wide Campaign */}
          <div className="border border-[#FFE08A]/18 bg-[#171313] p-3 sm:p-4">
            <EditorialImage
              src={FINAL_MOCKUPS[0].src}
              alt={FINAL_MOCKUPS[0].title}
              aspectClass="aspect-[16/9]"
              onInspect={() =>
                onInspectImage(
                  FINAL_MOCKUPS[0].src,
                  FINAL_MOCKUPS[0].title,
                  'Mockups Finais',
                  'Direção fotográfica em luz dourada na paleta oficial FAVORITA.'
                )
              }
            />
            <div className="mt-3 px-2 pb-1 flex items-center justify-between text-xs text-[#DCC8B5]">
              <span>{FINAL_MOCKUPS[0].caption}</span>
              <span className="font-mono text-[#FFE08A]">01</span>
            </div>
          </div>

          {/* Row 2: 7 / 5 split */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            <div className="lg:col-span-7 border border-[#F7F2EC]/12 bg-[#171313] p-3 sm:p-4 flex flex-col justify-between">
              <EditorialImage
                src={FINAL_MOCKUPS[1].src}
                alt={FINAL_MOCKUPS[1].title}
                aspectClass="aspect-[4/3]"
                onInspect={() =>
                  onInspectImage(
                    FINAL_MOCKUPS[1].src,
                    FINAL_MOCKUPS[1].title,
                    'Mockups Finais',
                    'Caixa rígida espresso, fita acetinada e cartão com lacre de cera.'
                  )
                }
              />
              <div className="mt-3 px-2 pb-1 flex items-center justify-between text-xs text-[#DCC8B5]">
                <span>{FINAL_MOCKUPS[1].caption}</span>
                <span className="font-mono text-[#FFE08A]">02</span>
              </div>
            </div>

            <div className="lg:col-span-5 flex flex-col gap-8">
              <div className="border border-[#FFE08A]/20 bg-[#171313] p-3 flex-1 flex flex-col justify-between">
                <EditorialImage
                  src={FINAL_MOCKUPS[2].src}
                  alt={FINAL_MOCKUPS[2].title}
                  aspectClass="aspect-[4/3]"
                  onInspect={() =>
                    onInspectImage(
                      FINAL_MOCKUPS[2].src,
                      FINAL_MOCKUPS[2].title,
                      'Mockups Finais',
                      'Logotipo oficial FAVORITA em tipografia Playfair Display.'
                    )
                  }
                />
                <p className="mt-3 px-1 text-xs text-[#DCC8B5]">{FINAL_MOCKUPS[2].caption}</p>
              </div>

              <div className="border border-[#F7F2EC]/12 bg-[#171313] p-3 flex flex-col justify-between">
                <EditorialImage
                  src={FINAL_MOCKUPS[3].src}
                  alt={FINAL_MOCKUPS[3].title}
                  aspectClass="aspect-[4/3]"
                  onInspect={() =>
                    onInspectImage(
                      FINAL_MOCKUPS[3].src,
                      FINAL_MOCKUPS[3].title,
                      'Mockups Finais',
                      'Sacola marfim com alças espresso e papel de seda personalizado.'
                    )
                  }
                />
                <p className="mt-3 px-1 text-xs text-[#DCC8B5]">{FINAL_MOCKUPS[3].caption}</p>
              </div>
            </div>
          </div>

          {/* Row 3: Complementary Trio */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {FINAL_MOCKUPS.slice(4).map((item) => (
              <div
                key={item.id}
                className="border border-[#F7F2EC]/12 bg-[#171313] p-3 flex flex-col justify-between"
              >
                <EditorialImage
                  src={item.src}
                  alt={item.title}
                  aspectClass="aspect-[4/3]"
                  onInspect={() =>
                    onInspectImage(item.src, item.title, 'Mockups Finais', item.caption)
                  }
                />
                <p className="mt-3 px-1 text-xs text-[#DCC8B5]">{item.caption}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
