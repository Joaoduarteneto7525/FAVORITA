import React from 'react';
import { motion } from 'motion/react';
import { ArrowUp } from 'lucide-react';
import { IMAGES } from '../../data/brandData';

export const ClosingSection: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer
      id="encerramento"
      className="bg-[#171313] text-[#F7F2EC] pt-24 pb-14 lg:pt-32 lg:pb-16 border-t border-[#FFE08A]/15"
    >
      <div className="mx-auto max-w-[1360px] px-6 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.75 }}
          className="flex flex-col items-center text-center max-w-xl mx-auto"
        >
          <img
            src={IMAGES.officialLogoImage}
            alt="FAVORITA"
            referrerPolicy="no-referrer"
            className="h-28 sm:h-36 w-auto object-contain"
          />

          <h2 className="mt-6 font-serif text-[clamp(2rem,3.6vw,3.1rem)] font-normal leading-[1.15] text-[#FFEFC6]">
            Uma identidade feita para permanecer.
          </h2>

          <p className="mt-4 text-sm sm:text-[15px] font-light leading-[1.8] text-[#DCC8B5]">
            Da primeira assinatura à experiência de compra, cada detalhe traduz a essência da
            FAVORITA VESTUÁRIO.
          </p>

          <button
            type="button"
            onClick={scrollToTop}
            className="mt-10 inline-flex items-center gap-3 px-6 py-3 border border-[#FFE08A]/35 text-[#FFE08A] text-xs uppercase tracking-[0.22em] hover:bg-[#FFE08A] hover:text-[#171313] transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FFEFC6]"
          >
            Voltar ao Início
            <ArrowUp className="h-3.5 w-3.5" />
          </button>
        </motion.div>

        <div className="mt-20 pt-6 border-t border-[#F7F2EC]/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#C79579]">
          <p>FAVORITA VESTUÁRIO</p>
          <div className="flex items-center gap-3">
            <span>Branding</span>
            <span aria-hidden="true">·</span>
            <span>Identidade Visual</span>
            <span aria-hidden="true">·</span>
            <span>E-commerce</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
