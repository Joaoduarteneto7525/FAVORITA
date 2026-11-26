const BASE = import.meta.env.BASE_URL;

export const IMAGES = {
  heroEditorial: `${BASE}src/assets/images/hero_fashion_editorial_1795696846394.jpg`,
  atelierStillLife: `${BASE}src/assets/images/overview_atelier_editorial_1795696851399.jpg`,
  logoSketches: `${BASE}assets/aistudio/Design_sem_nome__5__6341d9f8.png`,
  monogramMedallion: `${BASE}src/assets/images/favorita_monogram_medallion_1795696907662.jpg`,
  clothingTags: `${BASE}assets/aistudio/Etiquetas_de_moda_Favorita_elegantes_82a1abb6.png`,
  shoppingBag: `${BASE}src/assets/images/favorita_shopping_bag_1795696912325.jpg`,
  orderBoxCard: `${BASE}src/assets/images/favorita_order_box_card_1795696911977.jpg`,
  tissueSeal: `${BASE}src/assets/images/favorita_tissue_seal_detail_1795696912541.jpg`,
  productVestido: `${BASE}src/assets/images/product_vestido_seda_1795696854348.jpg`,
  productBlazer: `${BASE}src/assets/images/product_blazer_alfaiataria_1795696855997.jpg`,
  productConjunto: `${BASE}src/assets/images/product_conjunto_linho_1795696858422.jpg`,
  productTrico: `${BASE}src/assets/images/product_trico_espresso_1795696857244.jpg`,
  finalCampaign: `${BASE}src/assets/images/final_showcase_campaign_1795696859732.jpg`,
  officialLogoImage: `${BASE}assets/aistudio/FAVORITA_LG__1___1__cd02f2b3.png`,
} as const;

export interface ColorSwatch {
  name: string;
  hex: string;
  lightText: boolean;
}

export interface ColorGroup {
  title: string;
  swatches: ColorSwatch[];
}

export const COLOR_PALETTE: ColorGroup[] = [
  {
    title: 'Fundos Escuros',
    swatches: [
      { name: 'Dark Graphite', hex: '#2F2B2A', lightText: true },
      { name: 'Charcoal', hex: '#2A2625', lightText: true },
      { name: 'Deep Black', hex: '#171313', lightText: true },
    ],
  },
  {
    title: 'Tons de Identidade',
    swatches: [
      { name: 'Espresso', hex: '#2A180F', lightText: true },
      { name: 'Coffee', hex: '#4B2E22', lightText: true },
      { name: 'Cocoa', hex: '#6E4B3B', lightText: true },
      { name: 'Rose Beige', hex: '#C79579', lightText: false },
      { name: 'Sand', hex: '#DCC8B5', lightText: false },
    ],
  },
  {
    title: 'Dourados e Destaques',
    swatches: [
      { name: 'Champagne Gold', hex: '#FFE08A', lightText: false },
      { name: 'Soft Gold', hex: '#FFE8AF', lightText: false },
      { name: 'Pale Gold', hex: '#FFEFC6', lightText: false },
    ],
  },
  {
    title: 'Papel e Base Clara',
    swatches: [{ name: 'Ivory', hex: '#F7F2EC', lightText: false }],
  },
];

export interface BrandApplicationItem {
  id: string;
  number: string;
  title: string;
  category: string;
  material: string;
  image: string;
  span: 'wide' | 'standard';
}

export const BRAND_APPLICATIONS: BrandApplicationItem[] = [
  {
    id: 'tags-etiquetas',
    number: '01 — 03',
    title: 'Etiqueta Monograma, Tag de Preço e Composição',
    category: 'Identificação de Peça',
    material: 'Algodão 450g marfim · hot stamping dourado · etiqueta tecida',
    image: IMAGES.clothingTags,
    span: 'wide',
  },
  {
    id: 'sacola-seda',
    number: '04 — 05',
    title: 'Sacola Boutique e Papel de Seda',
    category: 'Experiência de Loja',
    material: 'Papel fosco marfim · alças de gorgurão espresso',
    image: IMAGES.shoppingBag,
    span: 'standard',
  },
  {
    id: 'papel-seda-lacre',
    number: '05 & 08',
    title: 'Papel de Seda e Lacre Monograma',
    category: 'Selagem',
    material: 'Seda marfim 35g · lacre metálico champagne escovado',
    image: IMAGES.tissueSeal,
    span: 'standard',
  },
  {
    id: 'caixa-cartao-lacre',
    number: '06 — 08',
    title: 'Embalagem de Pedidos, Cartão e Lacre de Cera',
    category: 'Unboxing',
    material: 'Caixa rígida espresso · fita cacau · lacre de cera F',
    image: IMAGES.orderBoxCard,
    span: 'wide',
  },
];

export interface StoreProduct {
  id: string;
  sku: string;
  name: string;
  category: 'Vestidos' | 'Alfaiataria' | 'Conjuntos' | 'Tricô & Seda';
  collection: string;
  price: number;
  promoPrice?: number;
  image: string;
  colors: { name: string; hex: string }[];
  sizes: string[];
  stock: number;
  featured: boolean;
  description: string;
  composition: string;
}

export const INITIAL_PRODUCTS: StoreProduct[] = [
  {
    id: 'fv-01',
    sku: 'FAV-VES-014',
    name: 'Vestido Midi Seda Cacau',
    category: 'Vestidos',
    collection: 'Essência Outono',
    price: 890,
    promoPrice: 740,
    image: IMAGES.productVestido,
    colors: [
      { name: 'Cacau', hex: '#6E4B3B' },
      { name: 'Espresso', hex: '#2A180F' },
      { name: 'Marfim', hex: '#F7F2EC' },
    ],
    sizes: ['PP', 'P', 'M', 'G'],
    stock: 14,
    featured: true,
    description: 'Corte enviesado em seda pura com caimento fluido e acabamento em costura francesa.',
    composition: '100% Seda Mulberry · Modelagem brasileira',
  },
  {
    id: 'fv-02',
    sku: 'FAV-ALF-028',
    name: 'Blazer Alfaiataria Areia',
    category: 'Alfaiataria',
    collection: 'Assinatura Clássica',
    price: 1180,
    image: IMAGES.productBlazer,
    colors: [
      { name: 'Areia', hex: '#DCC8B5' },
      { name: 'Café', hex: '#4B2E22' },
      { name: 'Grafite', hex: '#2F2B2A' },
    ],
    sizes: ['PP', 'P', 'M', 'G'],
    stock: 9,
    featured: true,
    description: 'Alfaiataria estruturada com abotoamento duplo, lapelas alongadas e botões naturais.',
    composition: '78% Lã Fria, 20% Viscose, 2% Elastano',
  },
  {
    id: 'fv-03',
    sku: 'FAV-CNJ-009',
    name: 'Conjunto Linho Marfim',
    category: 'Conjuntos',
    collection: 'Atelier Solar',
    price: 960,
    promoPrice: 820,
    image: IMAGES.productConjunto,
    colors: [
      { name: 'Marfim', hex: '#F7F2EC' },
      { name: 'Areia', hex: '#DCC8B5' },
      { name: 'Rose Beige', hex: '#C79579' },
    ],
    sizes: ['PP', 'P', 'M', 'G'],
    stock: 18,
    featured: true,
    description: 'Colete estruturado de linhas puras combinado com pantalona de pregas em linho puro.',
    composition: '100% Linho Puro Pré-lavado',
  },
  {
    id: 'fv-04',
    sku: 'FAV-TRI-031',
    name: 'Tricô Canelado Espresso & Saia Rosé',
    category: 'Tricô & Seda',
    collection: 'Essência Outono',
    price: 780,
    image: IMAGES.productTrico,
    colors: [
      { name: 'Espresso', hex: '#2A180F' },
      { name: 'Rose Beige', hex: '#C79579' },
      { name: 'Cacau', hex: '#6E4B3B' },
    ],
    sizes: ['PP', 'P', 'M', 'G'],
    stock: 6,
    featured: true,
    description: 'Malha fina canelada em toque térmico suave combinada à saia midi acetinada Rose Beige.',
    composition: '70% Viscose Nobre, 30% Cashmere',
  },
];

export function formatBRL(value: number): string {
  return value.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  });
}

export async function downloadAsset(url: string, filename: string): Promise<void> {
  try {
    const response = await fetch(url);
    const blob = await response.blob();
    const objectUrl = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = objectUrl;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(objectUrl);
  } catch {
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
}
