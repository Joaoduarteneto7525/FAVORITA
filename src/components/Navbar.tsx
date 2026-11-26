import React, { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';

interface NavbarProps {
  activeSection: string;
}

const NAV_ITEMS = [
  { id: 'visao-geral', label: 'Identidade' },
  { id: 'sistema-logotipos', label: 'Logotipo' },
  { id: 'aplicacoes', label: 'Aplicações' },
  { id: 'ecommerce', label: 'E-commerce' },
  { id: 'mockups-finais', label: 'Mockups' },
];

export const Navbar: React.FC<NavbarProps> = ({ activeSection }) => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? Math.min(100, Math.max(0, (scrollTop / docHeight) * 100)) : 0;
      setScrollProgress(progress);
      setIsScrolled(scrollTop > 40);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-colors duration-300 ${
        isScrolled
          ? 'bg-[#171313]/92 backdrop-blur-md border-b border-[#FFE08A]/12'
          : 'bg-[#2F2B2A]/75 backdrop-blur-sm border-b border-transparent'
      }`}
    >
      {/* Discreet scroll progress hairline */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-[#F7F2EC]/10 overflow-hidden">
        <div
          className="h-full bg-[#FFE08A] transition-[width] duration-150 ease-out"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* Strict 3-Zone Top Bar Contract */}
      <div className="mx-auto flex h-16 max-w-[1360px] items-center justify-between gap-8 px-6 lg:px-10">
        {/* Zone 1: Single-line Brand Wordmark */}
        <a
          href="#abertura"
          onClick={(e) => {
            e.preventDefault();
            scrollToSection('abertura');
          }}
          className="font-serif text-xl font-normal uppercase tracking-[0.3em] text-[#FFEFC6] hover:text-[#FFE08A] transition-colors whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#FFE08A]"
        >
          FAVORITA
        </a>

        {/* Zone 2: 5 concise single-line nav links */}
        <nav className="hidden md:flex items-center gap-7" aria-label="Navegação principal">
          {NAV_ITEMS.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection(item.id);
                }}
                className={`relative py-1 text-[13px] font-normal tracking-[0.12em] transition-colors whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#FFE08A] ${
                  isActive ? 'text-[#FFE08A]' : 'text-[#F7F2EC]/80 hover:text-[#FFEFC6]'
                }`}
              >
                {item.label}
                <span
                  className={`absolute bottom-0 left-0 h-px bg-[#FFE08A] transition-all duration-300 ${
                    isActive ? 'w-full opacity-100' : 'w-0 opacity-0'
                  }`}
                />
              </a>
            );
          })}
        </nav>

        {/* Zone 3: 1 primary action button + mobile menu trigger */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={() => scrollToSection('ecommerce')}
            className="hidden sm:inline-flex items-center justify-center px-5 py-2 text-xs font-medium tracking-[0.16em] uppercase text-[#171313] bg-[#FFE08A] hover:bg-[#FFE8AF] transition-colors duration-200 whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FFEFC6]"
          >
            Explorar Loja
          </button>

          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            className="inline-flex md:hidden h-10 w-10 items-center justify-center text-[#FFEFC6] hover:text-[#FFE08A] transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#FFE08A]"
            aria-label={mobileMenuOpen ? 'Fechar menu' : 'Abrir menu'}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile navigation drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-[#FFE08A]/15 bg-[#171313] px-6 py-6">
          <nav className="flex flex-col gap-4" aria-label="Navegação mobile">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection(item.id);
                }}
                className={`py-2 text-sm tracking-[0.14em] border-b border-[#F7F2EC]/8 transition-colors ${
                  activeSection === item.id ? 'text-[#FFE08A]' : 'text-[#F7F2EC]/85'
                }`}
              >
                {item.label}
              </a>
            ))}
            <button
              type="button"
              onClick={() => scrollToSection('ecommerce')}
              className="mt-2 w-full py-3 text-xs font-medium tracking-[0.18em] uppercase text-[#171313] bg-[#FFE08A] hover:bg-[#FFE8AF] transition-colors"
            >
              Explorar Loja
            </button>
          </nav>
        </div>
      )}
    </header>
  );
};
