import React, { useMemo, useState } from 'react';
import { motion } from 'motion/react';
import {
  ArrowRight,
  Check,
  MessageCircle,
  Minus,
  Monitor,
  Plus,
  ShoppingBag,
  Smartphone,
  Trash2,
} from 'lucide-react';
import { FavoritaLockup, FavoritaMonogram } from '../BrandMark';
import { formatBRL, IMAGES, StoreProduct } from '../../data/brandData';

interface EcommerceSectionProps {
  products: StoreProduct[];
}

type StoreScreen = 'home' | 'collection' | 'product' | 'checkout';
type DeviceMode = 'split' | 'desktop' | 'mobile';

interface CartItem {
  product: StoreProduct;
  color: string;
  size: string;
  quantity: number;
}

export const EcommerceSection: React.FC<EcommerceSectionProps> = ({ products }) => {
  const [deviceMode, setDeviceMode] = useState<DeviceMode>('split');
  const [screen, setScreen] = useState<StoreScreen>('home');
  const [selectedCategory, setSelectedCategory] = useState<string>('Todos');
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc'>('featured');
  const [activeProductId, setActiveProductId] = useState<string>(products[0]?.id ?? 'fv-01');
  const [selectedColor, setSelectedColor] = useState<string>(products[0]?.colors[0]?.name ?? 'Cacau');
  const [selectedSize, setSelectedSize] = useState<string>('P');
  const [addedNotice, setAddedNotice] = useState(false);

  const [cart, setCart] = useState<CartItem[]>([
    {
      product: products[0],
      color: products[0].colors[0].name,
      size: 'P',
      quantity: 1,
    },
  ]);

  const [cep, setCep] = useState('01414-001');
  const [shippingQuote, setShippingQuote] = useState<{ label: string; cost: number } | null>({
    label: 'Entrega Expressa · 2 dias úteis (Demonstrativo)',
    cost: 0,
  });
  const [orderCompleted, setOrderCompleted] = useState(false);

  const activeProduct = useMemo(
    () => products.find((p) => p.id === activeProductId) ?? products[0],
    [products, activeProductId]
  );

  const categories = useMemo(
    () => ['Todos', ...Array.from(new Set(products.map((p) => p.category)))],
    [products]
  );

  const filteredProducts = useMemo(() => {
    const base =
      selectedCategory === 'Todos'
        ? [...products]
        : products.filter((p) => p.category === selectedCategory);

    if (sortBy === 'price-asc') {
      base.sort((a, b) => (a.promoPrice ?? a.price) - (b.promoPrice ?? b.price));
    } else if (sortBy === 'price-desc') {
      base.sort((a, b) => (b.promoPrice ?? b.price) - (a.promoPrice ?? a.price));
    }
    return base;
  }, [products, selectedCategory, sortBy]);

  const totalItems = useMemo(
    () => cart.reduce((acc, item) => acc + item.quantity, 0),
    [cart]
  );

  const subtotal = useMemo(
    () =>
      cart.reduce(
        (acc, item) => acc + (item.product.promoPrice ?? item.product.price) * item.quantity,
        0
      ),
    [cart]
  );

  const openProduct = (product: StoreProduct) => {
    setActiveProductId(product.id);
    setSelectedColor(product.colors[0]?.name ?? '');
    setSelectedSize(product.sizes[1] ?? product.sizes[0] ?? 'P');
    setScreen('product');
  };

  const addToCart = (product: StoreProduct, color: string, size: string) => {
    setOrderCompleted(false);
    setCart((prev) => {
      const idx = prev.findIndex(
        (i) => i.product.id === product.id && i.color === color && i.size === size
      );
      if (idx >= 0) {
        const next = [...prev];
        next[idx] = { ...next[idx], quantity: next[idx].quantity + 1 };
        return next;
      }
      return [...prev, { product, color, size, quantity: 1 }];
    });
    setAddedNotice(true);
    window.setTimeout(() => setAddedNotice(false), 1800);
  };

  const updateQuantity = (index: number, delta: number) => {
    setCart((prev) => {
      const next = [...prev];
      const newQty = next[index].quantity + delta;
      if (newQty <= 0) {
        next.splice(index, 1);
      } else {
        next[index] = { ...next[index], quantity: newQty };
      }
      return next;
    });
  };

  const calculateShipping = (e: React.FormEvent) => {
    e.preventDefault();
    const cleaned = cep.replace(/\D/g, '');
    if (cleaned.length < 5) {
      setShippingQuote({ label: 'Informe um CEP válido (ex: 01414-001)', cost: 0 });
      return;
    }
    if (subtotal >= 700) {
      setShippingQuote({
        label: 'Frete Cortesia FAVORITA · 2 a 3 dias úteis (Demonstrativo)',
        cost: 0,
      });
    } else {
      setShippingQuote({
        label: 'Entrega Sedex Boutique · 2 a 4 dias úteis (Demonstrativo)',
        cost: 32,
      });
    }
  };

  const renderStoreContent = (compact: boolean) => {
    return (
      <div className="bg-[#F7F2EC] text-[#2A180F] flex flex-col min-h-[560px]">
        {/* Storefront header */}
        <div className="sticky top-0 z-10 bg-[#F7F2EC]/95 backdrop-blur-sm border-b border-[#2A180F]/10 px-4 sm:px-6 py-3.5 flex items-center justify-between gap-4">
          <button
            type="button"
            onClick={() => setScreen('home')}
            className="font-serif text-base sm:text-lg tracking-[0.26em] uppercase text-[#2A180F] whitespace-nowrap shrink-0"
          >
            FAVORITA
          </button>

          {!compact && (
            <nav className="hidden sm:flex items-center gap-5 text-[11px] uppercase tracking-[0.18em] text-[#4B2E22]">
              <button
                type="button"
                onClick={() => setScreen('home')}
                className={`whitespace-nowrap ${screen === 'home' ? 'text-[#2A180F] underline underline-offset-4' : 'hover:text-[#2A180F]'}`}
              >
                Início
              </button>
              <button
                type="button"
                onClick={() => setScreen('collection')}
                className={`whitespace-nowrap ${screen === 'collection' ? 'text-[#2A180F] underline underline-offset-4' : 'hover:text-[#2A180F]'}`}
              >
                Coleções
              </button>
              <button
                type="button"
                onClick={() => setScreen('product')}
                className={`whitespace-nowrap ${screen === 'product' ? 'text-[#2A180F] underline underline-offset-4' : 'hover:text-[#2A180F]'}`}
              >
                Peça em Destaque
              </button>
            </nav>
          )}

          <button
            type="button"
            onClick={() => setScreen('checkout')}
            className="inline-flex items-center gap-2 text-xs text-[#2A180F] hover:text-[#6E4B3B] transition-colors whitespace-nowrap shrink-0"
            aria-label="Abrir sacola de compras"
          >
            <ShoppingBag className="h-4 w-4" />
            <span className="font-mono tabular-nums text-[11px]">({totalItems})</span>
          </button>
        </div>

        {/* Store Screen Body */}
        <div className="flex-1">
          {screen === 'home' && (
            <div>
              {/* Editorial Collection Banner */}
              <div className="relative bg-[#2F2B2A] text-[#F7F2EC] overflow-hidden">
                <div className={`grid ${compact ? 'grid-cols-1' : 'grid-cols-12'} items-stretch`}>
                  <div className={`${compact ? 'p-6' : 'col-span-6 p-8 sm:p-10'} flex flex-col justify-center`}>
                    <p className="text-[10px] uppercase tracking-[0.3em] text-[#FFE08A]">
                      Coleção Essência · Edição Demonstrativa
                    </p>
                    <h4 className={`mt-3 font-serif ${compact ? 'text-2xl' : 'text-3xl sm:text-4xl'} font-light text-[#FFEFC6] leading-tight`}>
                      Alfaiataria fluida e sedas atemporais.
                    </h4>
                    <p className="mt-3 text-xs leading-relaxed text-[#DCC8B5] max-w-sm">
                      Silhuetas femininas desenvolvidas em tons espresso, cacau, areia e marfim.
                    </p>
                    <div className="mt-6">
                      <button
                        type="button"
                        onClick={() => setScreen('collection')}
                        className="inline-flex items-center gap-2 bg-[#FFE08A] text-[#171313] px-5 py-2.5 text-[11px] font-medium uppercase tracking-[0.18em] hover:bg-[#FFE8AF] transition-colors whitespace-nowrap"
                      >
                        Ver Coleção
                        <ArrowRight className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </div>
                  <div className={compact ? 'h-48' : 'col-span-6 min-h-[260px]'}>
                    <img
                      src={IMAGES.finalCampaign}
                      alt="Banner editorial da coleção Essência FAVORITA"
                      referrerPolicy="no-referrer"
                      className="h-full w-full object-cover"
                    />
                  </div>
                </div>
              </div>

              {/* Categories strip */}
              <div className="px-4 sm:px-6 py-5 border-b border-[#2A180F]/10 flex items-center justify-between gap-3 overflow-x-auto">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => {
                      setSelectedCategory(cat);
                      setScreen('collection');
                    }}
                    className="text-[11px] uppercase tracking-[0.2em] text-[#4B2E22] hover:text-[#2A180F] transition-colors whitespace-nowrap shrink-0"
                  >
                    {cat}
                  </button>
                ))}
              </div>

              {/* Featured Products */}
              <div className="p-4 sm:p-6">
                <div className="flex items-baseline justify-between mb-5">
                  <h5 className="font-serif text-xl sm:text-2xl text-[#2A180F]">
                    Destaques da Temporada
                  </h5>
                  <button
                    type="button"
                    onClick={() => setScreen('collection')}
                    className="text-[11px] uppercase tracking-[0.18em] text-[#6E4B3B] hover:text-[#2A180F] underline underline-offset-4 whitespace-nowrap"
                  >
                    Ver tudo
                  </button>
                </div>

                <div className={`grid ${compact ? 'grid-cols-2 gap-3' : 'grid-cols-2 sm:grid-cols-4 gap-4'}`}>
                  {products.slice(0, 4).map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => openProduct(item)}
                      className="group text-left flex flex-col focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#2A180F]"
                    >
                      <div className="relative aspect-[3/4] w-full overflow-hidden bg-[#DCC8B5]/35">
                        <img
                          src={item.image}
                          alt={item.name}
                          referrerPolicy="no-referrer"
                          className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                        />
                        {item.promoPrice && (
                          <span className="absolute top-2 left-2 bg-[#2A180F] text-[#FFEFC6] px-2 py-0.5 text-[9px] uppercase tracking-[0.18em]">
                            Seleção
                          </span>
                        )}
                      </div>
                      <span className="mt-2.5 text-[10px] uppercase tracking-[0.16em] text-[#6E4B3B]">
                        {item.category}
                      </span>
                      <span className="mt-0.5 font-serif text-sm sm:text-base text-[#2A180F] leading-snug line-clamp-1">
                        {item.name}
                      </span>
                      <div className="mt-1 flex items-baseline gap-2 font-mono text-xs tabular-nums">
                        {item.promoPrice ? (
                          <>
                            <span className="text-[#2A180F] font-medium">
                              {formatBRL(item.promoPrice)}
                            </span>
                            <span className="text-[#6E4B3B]/70 line-through text-[11px]">
                              {formatBRL(item.price)}
                            </span>
                          </>
                        ) : (
                          <span className="text-[#2A180F]">{formatBRL(item.price)}</span>
                        )}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Store institutional footer */}
              <div className="mt-4 bg-[#2A2625] text-[#DCC8B5] px-4 sm:px-6 py-5 flex flex-wrap items-center justify-between gap-4 text-[11px]">
                <FavoritaLockup variant="wordmark" tone="paleGold" size="sm" showSubtitle={false} />
                <span className="text-[#C79579]">
                  Vitrine interativa demonstrativa · Frete cortesia acima de R$ 700
                </span>
              </div>
            </div>
          )}

          {screen === 'collection' && (
            <div className="p-4 sm:p-6">
              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-5 border-b border-[#2A180F]/12">
                <div>
                  <p className="text-[10px] uppercase tracking-[0.26em] text-[#6E4B3B]">
                    Catálogo Digital · Dados Demonstrativos
                  </p>
                  <h4 className="mt-1 font-serif text-2xl sm:text-3xl text-[#2A180F]">
                    {selectedCategory === 'Todos' ? 'Todas as Peças' : selectedCategory}
                  </h4>
                </div>

                <div className="flex flex-wrap items-center gap-3">
                  <label className="sr-only" htmlFor={compact ? 'sort-mobile' : 'sort-desktop'}>
                    Ordenar produtos
                  </label>
                  <select
                    id={compact ? 'sort-mobile' : 'sort-desktop'}
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
                    className="bg-transparent border border-[#2A180F]/20 px-3 py-1.5 text-xs text-[#2A180F] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#2A180F]"
                  >
                    <option value="featured">Ordenar: Destaques</option>
                    <option value="price-asc">Menor preço</option>
                    <option value="price-desc">Maior preço</option>
                  </select>
                </div>
              </div>

              {/* Interactive category filter controls */}
              <div className="mt-4 flex flex-wrap items-center gap-1.5">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-3 py-1.5 text-[11px] uppercase tracking-[0.14em] transition-colors whitespace-nowrap shrink-0 ${
                      selectedCategory === cat
                        ? 'bg-[#2A180F] text-[#FFEFC6]'
                        : 'bg-[#DCC8B5]/45 text-[#4B2E22] hover:bg-[#DCC8B5]'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              {/* Filtered grid */}
              <div className={`mt-6 grid ${compact ? 'grid-cols-2 gap-3' : 'grid-cols-2 sm:grid-cols-4 gap-5'}`}>
                {filteredProducts.map((item) => (
                  <div key={item.id} className="group flex flex-col">
                    <button
                      type="button"
                      onClick={() => openProduct(item)}
                      className="text-left focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#2A180F]"
                    >
                      <div className="aspect-[3/4] w-full overflow-hidden bg-[#DCC8B5]/35">
                        <img
                          src={item.image}
                          alt={item.name}
                          referrerPolicy="no-referrer"
                          className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                        />
                      </div>
                      <p className="mt-2.5 text-[10px] uppercase tracking-[0.16em] text-[#6E4B3B]">
                        {item.collection}
                      </p>
                      <p className="mt-0.5 font-serif text-base text-[#2A180F] leading-snug">
                        {item.name}
                      </p>
                      <div className="mt-1 flex items-center justify-between">
                        <span className="font-mono text-xs tabular-nums text-[#2A180F]">
                          {formatBRL(item.promoPrice ?? item.price)}
                        </span>
                        <div className="flex items-center gap-1">
                          {item.colors.map((c) => (
                            <span
                              key={c.name}
                              className="h-2.5 w-2.5 rounded-full border border-[#2A180F]/25"
                              style={{ backgroundColor: c.hex }}
                              title={c.name}
                            />
                          ))}
                        </div>
                      </div>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {screen === 'product' && activeProduct && (
            <div className={`p-4 sm:p-6 grid ${compact ? 'grid-cols-1 gap-5' : 'grid-cols-12 gap-8'} items-start`}>
              <div className={compact ? '' : 'col-span-5'}>
                <div className="aspect-[3/4] bg-[#DCC8B5]/35 overflow-hidden">
                  <img
                    src={activeProduct.image}
                    alt={activeProduct.name}
                    referrerPolicy="no-referrer"
                    className="h-full w-full object-cover object-top"
                  />
                </div>
              </div>

              <div className={`${compact ? '' : 'col-span-7'} flex flex-col justify-between space-y-5`}>
                <div>
                  <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.22em] text-[#6E4B3B]">
                    <span>{activeProduct.category}</span>
                    <span aria-hidden="true">·</span>
                    <span>{activeProduct.collection}</span>
                    <span aria-hidden="true">·</span>
                    <span className="font-mono">{activeProduct.sku}</span>
                  </div>

                  <h4 className="mt-2 font-serif text-2xl sm:text-3xl font-normal text-[#2A180F]">
                    {activeProduct.name}
                  </h4>

                  <div className="mt-3 flex items-baseline gap-3 font-mono tabular-nums">
                    {activeProduct.promoPrice ? (
                      <>
                        <span className="text-xl text-[#2A180F] font-medium">
                          {formatBRL(activeProduct.promoPrice)}
                        </span>
                        <span className="text-sm text-[#6E4B3B]/70 line-through">
                          {formatBRL(activeProduct.price)}
                        </span>
                      </>
                    ) : (
                      <span className="text-xl text-[#2A180F]">
                        {formatBRL(activeProduct.price)}
                      </span>
                    )}
                    <span className="text-[11px] font-sans text-[#6E4B3B]">
                      ou 6x sem juros (demonstrativo)
                    </span>
                  </div>

                  <p className="mt-4 text-xs sm:text-sm leading-relaxed text-[#4B2E22]">
                    {activeProduct.description}
                  </p>
                  <p className="mt-2 text-[11px] text-[#6E4B3B]">{activeProduct.composition}</p>
                </div>

                {/* Color Selection */}
                <div className="pt-4 border-t border-[#2A180F]/10 space-y-2.5">
                  <p className="text-[11px] uppercase tracking-[0.18em] text-[#4B2E22]">
                    Cor selecionada: <strong className="font-medium text-[#2A180F]">{selectedColor}</strong>
                  </p>
                  <div className="flex items-center gap-2.5">
                    {activeProduct.colors.map((c) => (
                      <button
                        key={c.name}
                        type="button"
                        onClick={() => setSelectedColor(c.name)}
                        className={`h-8 w-8 rounded-full border transition-transform ${
                          selectedColor === c.name
                            ? 'ring-2 ring-offset-2 ring-offset-[#F7F2EC] ring-[#2A180F] scale-105'
                            : 'border-[#2A180F]/25 hover:scale-105'
                        }`}
                        style={{ backgroundColor: c.hex }}
                        aria-label={`Selecionar cor ${c.name}`}
                        title={c.name}
                      />
                    ))}
                  </div>
                </div>

                {/* Size Selection */}
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between text-[11px] uppercase tracking-[0.18em]">
                    <span className="text-[#4B2E22]">Tamanho</span>
                    <span className="text-[#6E4B3B] font-mono tabular-nums">
                      Disponível ({activeProduct.stock} un.)
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    {activeProduct.sizes.map((size) => (
                      <button
                        key={size}
                        type="button"
                        onClick={() => setSelectedSize(size)}
                        className={`h-10 w-12 text-xs font-medium border transition-colors ${
                          selectedSize === size
                            ? 'bg-[#2A180F] text-[#FFEFC6] border-[#2A180F]'
                            : 'bg-transparent text-[#2A180F] border-[#2A180F]/20 hover:border-[#2A180F]'
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Primary Buy CTA */}
                <div className="flex flex-col sm:flex-row gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => addToCart(activeProduct, selectedColor, selectedSize)}
                    className="flex-1 inline-flex items-center justify-center gap-2 bg-[#2A180F] text-[#FFEFC6] px-6 py-3.5 text-xs uppercase tracking-[0.2em] hover:bg-[#4B2E22] transition-colors whitespace-nowrap"
                  >
                    {addedNotice ? (
                      <>
                        <Check className="h-4 w-4 text-[#FFE08A]" />
                        Adicionado à Sacola
                      </>
                    ) : (
                      <>
                        <ShoppingBag className="h-4 w-4 text-[#FFE08A]" />
                        Adicionar à Sacola
                      </>
                    )}
                  </button>
                  <button
                    type="button"
                    onClick={() => setScreen('checkout')}
                    className="px-5 py-3.5 border border-[#2A180F]/25 text-[#2A180F] text-xs uppercase tracking-[0.18em] hover:bg-[#DCC8B5]/45 transition-colors whitespace-nowrap"
                  >
                    Ir para Sacola
                  </button>
                </div>
              </div>
            </div>
          )}

          {screen === 'checkout' && (
            <div className="p-4 sm:p-6">
              <div className="flex items-baseline justify-between pb-4 border-b border-[#2A180F]/12">
                <div>
                  <p className="text-[10px] uppercase tracking-[0.24em] text-[#6E4B3B]">
                    Finalização · Simulação Interativa
                  </p>
                  <h4 className="mt-1 font-serif text-2xl sm:text-3xl text-[#2A180F]">
                    Sua Sacola FAVORITA
                  </h4>
                </div>
                <button
                  type="button"
                  onClick={() => setScreen('collection')}
                  className="text-xs text-[#6E4B3B] hover:text-[#2A180F] underline underline-offset-4 whitespace-nowrap"
                >
                  Continuar comprando
                </button>
              </div>

              {orderCompleted ? (
                <div className="my-10 p-8 border border-[#2A180F]/15 bg-[#DCC8B5]/35 text-center space-y-4">
                  <div className="flex justify-center">
                    <FavoritaMonogram size={52} tone="espresso" />
                  </div>
                  <h5 className="font-serif text-2xl text-[#2A180F]">
                    Pedido Demonstrativo Registrado
                  </h5>
                  <p className="text-sm text-[#4B2E22] max-w-md mx-auto leading-relaxed">
                    Esta simulação demonstra o fluxo completo de compra da loja virtual FAVORITA
                    VESTUÁRIO — da escolha da peça à confirmação com embalagem personalizada.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setOrderCompleted(false);
                      setScreen('home');
                    }}
                    className="mt-2 inline-flex items-center px-6 py-2.5 bg-[#2A180F] text-[#FFEFC6] text-xs uppercase tracking-[0.18em] hover:bg-[#4B2E22] transition-colors"
                  >
                    Voltar à Vitrine
                  </button>
                </div>
              ) : cart.length === 0 ? (
                <div className="py-12 text-center space-y-4">
                  <p className="font-serif text-xl text-[#4B2E22]">Sua sacola está vazia.</p>
                  <button
                    type="button"
                    onClick={() => setScreen('collection')}
                    className="px-6 py-2.5 bg-[#2A180F] text-[#FFEFC6] text-xs uppercase tracking-[0.18em]"
                  >
                    Explorar Coleção
                  </button>
                </div>
              ) : (
                <div className={`mt-6 grid ${compact ? 'grid-cols-1 gap-6' : 'grid-cols-12 gap-8'}`}>
                  {/* Bag items */}
                  <div className={compact ? 'space-y-4' : 'col-span-7 space-y-4'}>
                    {cart.map((item, idx) => (
                      <div
                        key={`${item.product.id}-${item.color}-${item.size}`}
                        className="flex gap-4 pb-4 border-b border-[#2A180F]/10"
                      >
                        <img
                          src={item.product.image}
                          alt={item.product.name}
                          referrerPolicy="no-referrer"
                          className="h-24 w-20 object-cover object-top bg-[#DCC8B5]/35 shrink-0"
                        />
                        <div className="flex-1 min-w-0 flex flex-col justify-between">
                          <div className="flex items-start justify-between gap-2">
                            <div>
                              <p className="font-serif text-base text-[#2A180F] leading-snug">
                                {item.product.name}
                              </p>
                              <p className="mt-0.5 text-xs text-[#6E4B3B]">
                                Cor: {item.color} · Tamanho: {item.size}
                              </p>
                            </div>
                            <button
                              type="button"
                              onClick={() => updateQuantity(idx, -item.quantity)}
                              className="p-1 text-[#6E4B3B] hover:text-[#2A180F]"
                              aria-label={`Remover ${item.product.name}`}
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>

                          <div className="mt-3 flex items-center justify-between">
                            <div className="inline-flex items-center border border-[#2A180F]/20">
                              <button
                                type="button"
                                onClick={() => updateQuantity(idx, -1)}
                                className="h-7 w-7 inline-flex items-center justify-center hover:bg-[#DCC8B5]/40"
                                aria-label="Diminuir quantidade"
                              >
                                <Minus className="h-3 w-3" />
                              </button>
                              <span className="w-8 text-center font-mono text-xs tabular-nums">
                                {item.quantity}
                              </span>
                              <button
                                type="button"
                                onClick={() => updateQuantity(idx, 1)}
                                className="h-7 w-7 inline-flex items-center justify-center hover:bg-[#DCC8B5]/40"
                                aria-label="Aumentar quantidade"
                              >
                                <Plus className="h-3 w-3" />
                              </button>
                            </div>

                            <span className="font-mono text-sm tabular-nums text-[#2A180F]">
                              {formatBRL(
                                (item.product.promoPrice ?? item.product.price) * item.quantity
                              )}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Summary, Shipping Calculator & WhatsApp Concierge */}
                  <div className={`${compact ? '' : 'col-span-5'} bg-[#DCC8B5]/30 border border-[#2A180F]/12 p-5 space-y-5`}>
                    <p className="text-[11px] uppercase tracking-[0.22em] text-[#4B2E22]">
                      Resumo do Pedido
                    </p>

                    <form onSubmit={calculateShipping} className="space-y-2">
                      <label
                        htmlFor={compact ? 'cep-m' : 'cep-d'}
                        className="block text-[11px] text-[#4B2E22]"
                      >
                        Cálculo de frete (CEP)
                      </label>
                      <div className="flex gap-2">
                        <input
                          id={compact ? 'cep-m' : 'cep-d'}
                          type="text"
                          value={cep}
                          onChange={(e) => setCep(e.target.value)}
                          placeholder="00000-000"
                          className="flex-1 min-w-0 bg-[#F7F2EC] border border-[#2A180F]/20 px-3 py-2 text-xs font-mono text-[#2A180F] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#2A180F]"
                        />
                        <button
                          type="submit"
                          className="px-3.5 py-2 bg-[#4B2E22] text-[#FFEFC6] text-[11px] uppercase tracking-[0.14em] hover:bg-[#2A180F] transition-colors whitespace-nowrap"
                        >
                          Calcular
                        </button>
                      </div>
                      {shippingQuote && (
                        <p className="text-[11px] text-[#4B2E22]">{shippingQuote.label}</p>
                      )}
                    </form>

                    <div className="space-y-2 pt-3 border-t border-[#2A180F]/12 text-xs">
                      <div className="flex justify-between text-[#4B2E22]">
                        <span>Subtotal</span>
                        <span className="font-mono tabular-nums">{formatBRL(subtotal)}</span>
                      </div>
                      <div className="flex justify-between text-[#4B2E22]">
                        <span>Frete</span>
                        <span className="font-mono tabular-nums">
                          {shippingQuote && shippingQuote.cost > 0
                            ? formatBRL(shippingQuote.cost)
                            : 'Cortesia'}
                        </span>
                      </div>
                      <div className="flex justify-between pt-2 border-t border-[#2A180F]/12 text-sm font-medium text-[#2A180F]">
                        <span>Total</span>
                        <span className="font-mono tabular-nums">
                          {formatBRL(subtotal + (shippingQuote?.cost ?? 0))}
                        </span>
                      </div>
                    </div>

                    <div className="space-y-2.5 pt-1">
                      <button
                        type="button"
                        onClick={() => setOrderCompleted(true)}
                        className="w-full py-3 bg-[#2A180F] text-[#FFEFC6] text-xs uppercase tracking-[0.2em] hover:bg-[#4B2E22] transition-colors"
                      >
                        Finalizar Compra (Demo)
                      </button>

                      <a
                        href="#ecommerce"
                        onClick={(e) => {
                          e.preventDefault();
                          setOrderCompleted(true);
                        }}
                        className="w-full inline-flex items-center justify-center gap-2 py-2.5 border border-[#2A180F]/25 text-[#2A180F] text-xs tracking-[0.12em] hover:bg-[#F7F2EC] transition-colors"
                      >
                        <MessageCircle className="h-3.5 w-3.5 text-[#4B2E22]" />
                        Atendimento pelo WhatsApp
                      </a>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <section
      id="ecommerce"
      className="bg-[#F7F2EC] text-[#2A180F] py-24 lg:py-32 border-t border-[#2A180F]/10"
    >
      <div className="mx-auto max-w-[1360px] px-6 lg:px-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.7 }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end pb-12 border-b border-[#2A180F]/12"
        >
          <div className="lg:col-span-7">
            <p className="text-[11px] font-sans uppercase tracking-[0.32em] text-[#6E4B3B] mb-4">
              06. Experiência de E-commerce
            </p>
            <h2 className="font-serif text-[clamp(2.2rem,4vw,3.5rem)] font-normal leading-[1.1] text-[#2A180F]">
              Uma experiência de compra pensada para encantar.
            </h2>
          </div>
          <div className="lg:col-span-5">
            <p className="text-[15px] leading-[1.75] text-[#4B2E22]">
              Vitrine mobile-first e desktop interativa com filtros, seleção de variantes e sacola
              demonstrativa.
            </p>
          </div>
        </motion.div>

        {/* Interactive Toolbar: Screen Switcher + Device Frame Switcher */}
        <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
          {/* Screen tabs */}
          <div className="flex flex-wrap items-center gap-1 p-1 bg-[#DCC8B5]/45 border border-[#2A180F]/10">
            {[
              { id: 'home', label: 'Página Inicial' },
              { id: 'collection', label: 'Coleção' },
              { id: 'product', label: 'Produto' },
              { id: 'checkout', label: `Sacola (${totalItems})` },
            ].map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setScreen(tab.id as StoreScreen)}
                className={`px-4 py-2 text-xs tracking-[0.12em] transition-colors whitespace-nowrap shrink-0 ${
                  screen === tab.id
                    ? 'bg-[#2A180F] text-[#FFEFC6] font-medium'
                    : 'text-[#4B2E22] hover:text-[#2A180F]'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Device display selector */}
          <div className="hidden lg:inline-flex items-center gap-1 p-1 bg-[#DCC8B5]/45 border border-[#2A180F]/10">
            <button
              type="button"
              onClick={() => setDeviceMode('split')}
              className={`px-3.5 py-2 text-xs tracking-[0.1em] transition-colors whitespace-nowrap shrink-0 ${
                deviceMode === 'split'
                  ? 'bg-[#2A180F] text-[#FFEFC6]'
                  : 'text-[#4B2E22] hover:text-[#2A180F]'
              }`}
            >
              Desktop + Mobile
            </button>
            <button
              type="button"
              onClick={() => setDeviceMode('desktop')}
              className={`inline-flex items-center gap-1.5 px-3.5 py-2 text-xs tracking-[0.1em] transition-colors whitespace-nowrap shrink-0 ${
                deviceMode === 'desktop'
                  ? 'bg-[#2A180F] text-[#FFEFC6]'
                  : 'text-[#4B2E22] hover:text-[#2A180F]'
              }`}
            >
              <Monitor className="h-3.5 w-3.5" />
              Desktop
            </button>
            <button
              type="button"
              onClick={() => setDeviceMode('mobile')}
              className={`inline-flex items-center gap-1.5 px-3.5 py-2 text-xs tracking-[0.1em] transition-colors whitespace-nowrap shrink-0 ${
                deviceMode === 'mobile'
                  ? 'bg-[#2A180F] text-[#FFEFC6]'
                  : 'text-[#4B2E22] hover:text-[#2A180F]'
              }`}
            >
              <Smartphone className="h-3.5 w-3.5" />
              Mobile
            </button>
          </div>
        </div>

        {/* Interactive Desktop & Mobile Storefront Mockups */}
        <div className="mt-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Desktop Browser Frame */}
          {deviceMode !== 'mobile' && (
            <div
              className={
                deviceMode === 'desktop' ? 'lg:col-span-12' : 'lg:col-span-8'
              }
            >
              <div className="border border-[#2A180F]/20 bg-[#2F2B2A] shadow-xl overflow-hidden">
                {/* Browser chrome */}
                <div className="flex items-center justify-between px-4 py-2.5 bg-[#2A2625] border-b border-[#F7F2EC]/10">
                  <div className="flex items-center gap-1.5">
                    <span className="h-2.5 w-2.5 rounded-full bg-[#6E4B3B]" />
                    <span className="h-2.5 w-2.5 rounded-full bg-[#C79579]" />
                    <span className="h-2.5 w-2.5 rounded-full bg-[#FFE08A]/70" />
                  </div>
                  <span className="font-mono text-[11px] text-[#DCC8B5]/80 tracking-wide">
                    favoritavestuario.com.br · demonstração interativa
                  </span>
                  <span className="text-[10px] uppercase tracking-[0.2em] text-[#FFE8AF]">
                    Desktop
                  </span>
                </div>
                <div className="max-h-[680px] overflow-y-auto">{renderStoreContent(false)}</div>
              </div>
            </div>
          )}

          {/* Smartphone Frame (synchronized with live storefront state!) */}
          {deviceMode !== 'desktop' && (
            <div
              className={
                deviceMode === 'mobile'
                  ? 'lg:col-span-12 flex justify-center'
                  : 'lg:col-span-4 flex justify-center'
              }
            >
              <div className="w-full max-w-[360px] rounded-[34px] border-[8px] border-[#171313] bg-[#171313] shadow-2xl overflow-hidden">
                {/* Phone notch bar */}
                <div className="bg-[#171313] px-6 py-2.5 flex items-center justify-between text-[10px] font-mono text-[#DCC8B5]">
                  <span>9:41</span>
                  <span className="h-3.5 w-20 rounded-full bg-[#2A2625]" />
                  <span>Mobile</span>
                </div>
                <div className="h-[640px] overflow-y-auto rounded-b-[24px] bg-[#F7F2EC]">
                  {renderStoreContent(true)}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
