import type { ImageSourcePropType } from 'react-native';

const img = {
  catSeedling: require('@assets/images/marketplace/cat-seedling.png'),
  catCrop: require('@assets/images/marketplace/cat-crop.png'),
  catMachinery: require('@assets/images/marketplace/cat-machinery.png'),
  catLivestock: require('@assets/images/marketplace/cat-livestock.png'),
  tagSeed: require('@assets/images/marketplace/tag-seed.png'),
  tagFertilizer: require('@assets/images/marketplace/tag-fertilizer.png'),
  tagFertilizerHand: require('@assets/images/marketplace/tag-fertilizer-hand.png'),
  equipTractor: require('@assets/images/marketplace/equip-tractor.png'),
  equipTrailer: require('@assets/images/marketplace/equip-trailer.png'),
  equipSeedDrill: require('@assets/images/marketplace/equip-seed-drill.png'),
  qaOrder: require('@assets/images/marketplace/qa-order.png'),
  qaMandi: require('@assets/images/marketplace/qa-mandi.png'),
} as const;

export const marketBanner: ImageSourcePropType = require('@assets/images/marketplace/banner.png');

export type Category = { id: string; label: string; icon: ImageSourcePropType };

export const categories: Category[] = [
  { id: 'seedling', label: 'Seedling', icon: img.catSeedling },
  { id: 'crop', label: 'Crop', icon: img.catCrop },
  { id: 'machinery', label: 'Machinery', icon: img.catMachinery },
  { id: 'livestock', label: 'Livestock', icon: img.catLivestock },
];

/** Screen titles for `/marketplace/category/<id>` (Home links seeds / fertilizer / equipment). */
export const categoryTitles: Record<string, string> = {
  seeds: 'Seeds',
  fertilizer: 'Fertilizer',
  equipment: "Equipment's",
  seedling: 'Seedling',
  crop: 'Crop',
  machinery: 'Machinery',
  livestock: 'Livestock',
};

export type Tag = { label: string; icon: ImageSourcePropType };

export const tags = {
  seed: { label: 'Seed', icon: img.tagSeed },
  fertilizer: { label: 'Fertilizer', icon: img.tagFertilizer },
  fertilizerHand: { label: 'Fertilizer', icon: img.tagFertilizerHand },
} satisfies Record<string, Tag>;

/** `partial` = only the left strip of the photo is visible in Figma (card clipped by the frame edge). */
export type PartialPhoto = { width: number; fill: string };

export type FeatureItem = { id: string; name: string; price: string; tag: Tag; image: ImageSourcePropType; partial?: PartialPhoto };

export const featureItems: FeatureItem[] = [
  {
    id: 'cotton-hybrid-seeds',
    name: 'Cotton Hybrid Seeds',
    price: '$50/kg',
    tag: tags.seed,
    image: require('@assets/images/marketplace/feature-raisins.png'),
  },
  {
    id: 'organic-fertilizer',
    name: 'Organic Fertilizer',
    price: '$40/kg',
    tag: tags.fertilizerHand,
    image: require('@assets/images/marketplace/feature-organic.png'),
    partial: { width: 73, fill: '#584A37' },
  },
];

export type Equipment = { id: string; label: string; icon: ImageSourcePropType };

export const equipments: Equipment[] = [
  { id: 'tractor', label: 'Tractor', icon: img.equipTractor },
  { id: 'trailer', label: 'Trailer', icon: img.equipTrailer },
  { id: 'seed-drill', label: 'Seed Drill', icon: img.equipSeedDrill },
  { id: 'rotavator', label: 'Rotavator', icon: img.equipTractor },
];

export type RecommendedItem = {
  id: string;
  name: string;
  brand: string;
  price: string;
  size: string;
  tag: Tag;
  image: ImageSourcePropType;
  partial?: PartialPhoto;
};

export const recommended: RecommendedItem[] = [
  {
    id: 'giolife-viricide',
    name: 'Giolife No Virus Bio Viricide',
    brand: 'Goodlife Agritech Pvt Ltd..',
    price: '$50',
    size: 'Size : 250 ml',
    tag: tags.fertilizer,
    image: require('@assets/images/marketplace/rec-spray.png'),
  },
  {
    id: 'agrogrow-seeds',
    name: 'AgroGrow Wheat Seeds',
    brand: 'GreenGrow Agro Pvt Ltd..',
    price: '$120',
    size: 'Size : 1 Kg',
    tag: tags.seed,
    image: require('@assets/images/marketplace/rec-grains.png'),
    partial: { width: 73, fill: '#AC7C4D' },
  },
];

export const quickActions = [
  { id: 'orders', label: 'My Order', icon: img.qaOrder, href: '/marketplace/orders' },
  { id: 'rates', label: 'Mandi Prize', icon: img.qaMandi, href: '/marketplace/rates' },
] as const;

export type OfferItem = { id: string; off: string; name: string; price: string; oldPrice: string; size: string; image: ImageSourcePropType };

const bottle: ImageSourcePropType = require('@assets/images/marketplace/offer-bottle.png');

export const offers: OfferItem[] = [
  { id: 'giolife-offer-1', off: '10% Off', name: 'Giolife No Virus Bio Viricide', price: '$50', oldPrice: '$65', size: 'Size : 250 ml', image: bottle },
  { id: 'giolife-offer-2', off: '10% Off', name: 'Giolife No Virus Bio Viricide', price: '$50', oldPrice: '$65', size: 'Size : 250 ml', image: bottle },
];

export const agroSupplies: OfferItem[] = [
  { id: 'giolife-supply', off: '10% Off', name: 'Giolife No Virus Bio Viricide', price: '$50', oldPrice: '$65', size: 'Size : 250 ml', image: bottle },
];

export const categoryFilters = ['Organic', 'Hybrid', 'Fast Growth', 'Healthy Crop'];

export type GridItem = {
  id: string;
  name: string;
  price: string;
  oldPrice?: string;
  size: string;
  image: ImageSourcePropType;
};

/** Browse-category grid. The "50% Off" badge and heart disc are part of the Figma photo crops. */
export const categoryGrid: GridItem[] = [
  { id: 'giolife-1', name: 'Giolife No Virus Bio Viricide', price: '$50', oldPrice: '$65', size: 'Size : 250 ml', image: require('@assets/images/marketplace/grid-spray.png') },
  { id: 'giolife-2', name: 'Giolife No Virus Bio Viricide', price: '$50', size: 'Size : 250 ml', image: require('@assets/images/marketplace/grid-soil.png') },
  { id: 'giolife-3', name: 'Giolife No Virus Bio Viricide', price: '$50', oldPrice: '$65', size: 'Size : 250 ml', image: require('@assets/images/marketplace/grid-grains.png') },
  { id: 'giolife-4', name: 'Giolife No Virus Bio Viricide', price: '$50', size: 'Size : 250 ml', image: require('@assets/images/marketplace/grid-almonds.png') },
];

export const wishlistFilters = ['Seeds', 'Fertilizer', "Equipment's", 'Crop'];

export type WishItem = { id: string; name: string; brand: string; price: string; oldPrice: string; size: string; image: ImageSourcePropType };

export const wishlist: WishItem[] = [
  { id: 'wish-1', name: 'Giolife No Virus Bio Viricide', brand: 'Goodlife Agritech Pvt Ltd..', price: '$ 100.00', oldPrice: '$ 200.00', size: 'Size : 250 ml', image: require('@assets/images/marketplace/wish-soil.png') },
  { id: 'wish-2', name: 'Giolife No Virus Bio Viricide', brand: 'Goodlife Agritech Pvt Ltd..', price: '$ 100.00', oldPrice: '$ 200.00', size: 'Size : 250 ml', image: require('@assets/images/marketplace/wish-almonds.png') },
  { id: 'wish-3', name: 'Giolife No Virus Bio Viricide', brand: 'Goodlife Agritech Pvt Ltd..', price: '$ 100.00', oldPrice: '$ 200.00', size: 'Size : 250 ml', image: require('@assets/images/marketplace/wish-spray.png') },
];
