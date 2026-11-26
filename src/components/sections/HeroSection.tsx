import React from 'react';
import { motion } from 'motion/react';
import { ArrowDown } from 'lucide-react';
import { EditorialImage } from '../EditorialImage';
import { IMAGES } from '../../data/brandData';

interface HeroSectionProps {
  onExplore: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onExplore }) => {
  return (
    <section
      id="abertura"
      className="relative min-h-[92vh] bg-[#2F2B2A] text-[#F7F2EC] pt-24 pb-14 lg:pt-28 lg:pb-16 flex flex-col justify-between overflow-hidden"
    >
      <div className="relative mx-auto w-full max-w-[1360px] px-6 lg:px-10 my-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Minimalist Left Column */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6 space-y-6"
          >
            <h1 className="font-serif text-[clamp(2.85rem,5.2vw,4.75rem)] font-semibold leading-[1.02] tracking-[0.06em] text-[#FFEFC6] uppercase">
              FAVORITA
              <span className="block mt-2 font-sans text-xs sm:text-sm font-light tracking-[0.48em] text-[#FFE8AF]">
                VESTUÁRIO
              </span>
            </h1>

            <p className="font-serif italic text-2xl sm:text-[1.75rem] font-normal text-[#FFE08A] leading-snug max-w-md">
              Uma identidade. Uma experiência. Uma assinatura.
            </p>

            <p className="text-[15px] font-light leading-[1.75] text-[#DCC8B5] max-w-md">
              Identidade visual, papelaria tátil e e-commerce criados para traduzir a elegância
              contemporânea da moda feminina brasileira.
            </p>

            <div className="pt-4">
              <button
                type="button"
                onClick={onExplore}
                className="inline-flex items-center gap-3 px-7 py-3.5 bg-[#FFE08A] text-[#171313] text-xs font-medium uppercase tracking-[0.2em] hover:bg-[#FFE8AF] transition-colors duration-200 whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FFEFC6]"
              >
                Explorar Projeto
                <ArrowDown className="h-3.5 w-3.5" />
              </button>
            </div>
          </motion.div>

          {/* Clean Uncluttered Editorial Portrait */}
          <motion.div
            initial={{ opacity: 0, scale: 0.985 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.85, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6"
          >
            <div className="p-3 border border-[#FFE08A]/18 bg-[#2A2625]">
              <EditorialImage
                src={IMAGES.heroEditorial}
                alt="Editorial de moda feminina FAVORITA VESTUÁRIO"
                aspectClass="aspect-[4/5]"
                imgClassName="object-top"
                fallbackTitle="FAVORITA VESTUÁRIO"
              />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Discreet scroll cue */}
      <div className="mx-auto mt-10 flex w-full max-w-[1360px] justify-end px-6 lg:px-10">
        <button
          type="button"
          onClick={onExplore}
          className="inline-flex items-center gap-3 text-[11px] uppercase tracking-[0.26em] text-[#DCC8B5]/70 hover:text-[#FFE08A] transition-colors"
        >
          <span>Role para explorar</span>
          <span className="inline-block h-5 w-px bg-[#FFE08A]/60" aria-hidden="true" />
        </button>
      </div>
    </section>
  );
};
