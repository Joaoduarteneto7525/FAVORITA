import { useEffect, useState } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/sections/HeroSection';
import { OverviewSection } from './components/sections/OverviewSection';
import { SketchesSection } from './components/sections/SketchesSection';
import { LogoSystemSection } from './components/sections/LogoSystemSection';
import { VisualIdentitySection } from './components/sections/VisualIdentitySection';
import { BrandApplicationsSection } from './components/sections/BrandApplicationsSection';
import { EcommerceSection } from './components/sections/EcommerceSection';
import { FinalMockupsSection } from './components/sections/FinalMockupsSection';
import { ClosingSection } from './components/sections/ClosingSection';
import { LightboxItem, LightboxModal } from './components/LightboxModal';
import { INITIAL_PRODUCTS } from './data/brandData';

const TRACKED_SECTIONS = [
  'abertura',
  'visao-geral',
  'esbocos',
  'sistema-logotipos',
  'identidade-visual',
  'aplicacoes',
  'ecommerce',
  'mockups-finais',
  'encerramento',
];

export default function App() {
  const [activeSection, setActiveSection] = useState<string>('abertura');
  const [lightboxItems, setLightboxItems] = useState<LightboxItem[]>([]);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]?.target.id) {
          setActiveSection(visible[0].target.id);
        }
      },
      { rootMargin: '-25% 0px -55% 0px', threshold: [0.1, 0.25, 0.5] }
    );

    TRACKED_SECTIONS.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const handleInspectImage = (
    src: string,
    title: string,
    category: string,
    description: string
  ) => {
    setLightboxItems([{ src, title, category, description }]);
    setLightboxIndex(0);
  };

  const scrollToOverview = () => {
    const el = document.getElementById('visao-geral');
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div className="min-h-screen bg-[#2F2B2A] text-[#F7F2EC]">
      <Navbar activeSection={activeSection} />

      <main>
        {/* ABERTURA — HERO SECTION (#2F2B2A) */}
        <HeroSection onExplore={scrollToOverview} />

        {/* 01 — VISÃO GERAL (#F7F2EC) */}
        <OverviewSection />

        {/* 02 — ESBOÇOS E DIREÇÃO CRIATIVA (#DCC8B5) */}
        <SketchesSection onInspectImage={handleInspectImage} />

        {/* 03 — SISTEMA FINAL DE LOGOTIPOS (#2A2625) */}
        <LogoSystemSection onInspectImage={handleInspectImage} />

        {/* 04 — PALETA CROMÁTICA E TIPOGRAFIA (#171313) */}
        <VisualIdentitySection />

        {/* 05 — APLICAÇÕES DA MARCA (#DCC8B5) */}
        <BrandApplicationsSection onInspectImage={handleInspectImage} />

        {/* 06 — EXPERIÊNCIA DE E-COMMERCE (#F7F2EC) */}
        <EcommerceSection products={INITIAL_PRODUCTS} />

        {/* 07 — MOCKUPS FINAIS (#2A2625) */}
        <FinalMockupsSection onInspectImage={handleInspectImage} />
      </main>

      {/* ENCERRAMENTO (#171313) */}
      <ClosingSection />

      {/* Fullscreen Lightbox with Download */}
      <LightboxModal
        items={lightboxItems}
        currentIndex={lightboxIndex}
        onClose={() => setLightboxIndex(null)}
        onNavigate={(idx) => setLightboxIndex(idx)}
      />
    </div>
  );
}
