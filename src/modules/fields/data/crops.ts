import type { ImageSourcePropType } from 'react-native';

export type CropKey =
  | 'groundnut'
  | 'sugarcane'
  | 'rice'
  | 'cotton'
  | 'maize'
  | 'mango'
  | 'soybean'
  | 'chili'
  | 'potato'
  | 'onion'
  | 'tomato'
  | 'other';

export type CropCategory = 'popular' | 'oilseed' | 'cereal';

export type CropOption = {
  key: CropKey;
  label: string;
  /** Transparent glyph cropped from a 40pt icon circle (render it at the circle size). */
  glyph: ImageSourcePropType;
  categories: CropCategory[];
};

export const cropOptions: CropOption[] = [
  { key: 'groundnut', label: 'Groundnuts', glyph: require('@assets/images/fields/crop-groundnut.png'), categories: ['popular', 'oilseed'] },
  { key: 'sugarcane', label: 'Sugarcane', glyph: require('@assets/images/fields/crop-sugarcane.png'), categories: ['popular'] },
  { key: 'rice', label: 'Rice', glyph: require('@assets/images/fields/crop-rice.png'), categories: ['popular', 'cereal'] },
  { key: 'cotton', label: 'Cotton', glyph: require('@assets/images/fields/crop-cotton.png'), categories: ['popular'] },
  { key: 'maize', label: 'Maize', glyph: require('@assets/images/fields/crop-maize.png'), categories: ['popular', 'cereal'] },
  { key: 'mango', label: 'Mango', glyph: require('@assets/images/fields/crop-mango.png'), categories: ['popular'] },
  { key: 'soybean', label: 'Soybean', glyph: require('@assets/images/fields/crop-soybean.png'), categories: ['popular', 'oilseed'] },
  { key: 'chili', label: 'Chili', glyph: require('@assets/images/fields/crop-chili.png'), categories: ['popular'] },
  { key: 'potato', label: 'Potato', glyph: require('@assets/images/fields/crop-potato.png'), categories: ['popular'] },
  { key: 'onion', label: 'Onion', glyph: require('@assets/images/fields/crop-onion.png'), categories: ['popular'] },
  { key: 'tomato', label: 'Tomato', glyph: require('@assets/images/fields/crop-tomato.png'), categories: ['popular'] },
  { key: 'other', label: 'Other', glyph: require('@assets/images/fields/crop-other.png'), categories: ['popular', 'oilseed', 'cereal'] },
];

export const cropCategories: { key: CropCategory; label: string; icon?: ImageSourcePropType }[] = [
  { key: 'popular', label: 'Popular Crops' },
  { key: 'oilseed', label: 'Oilseed', icon: require('@assets/images/fields/oilseed.png') },
  { key: 'cereal', label: 'Cereal', icon: require('@assets/images/fields/cereal.png') },
];

export function cropOption(key: CropKey): CropOption {
  return cropOptions.find((c) => c.key === key) ?? cropOptions[cropOptions.length - 1];
}

/** Round crop "badges" as drawn in the cards (the artwork differs from the picker glyphs). */
export const cropBadges: Partial<Record<CropKey, ImageSourcePropType>> = {
  groundnut: require('@assets/images/fields/groundnut-badge-lg.png'),
  cotton: require('@assets/images/fields/cotton-badge.png'),
  mango: require('@assets/images/fields/mango-badge.png'),
};

export const cropBadgesSmall: Partial<Record<CropKey, ImageSourcePropType>> = {
  groundnut: require('@assets/images/fields/groundnut-badge.png'),
  cotton: require('@assets/images/fields/cotton-badge.png'),
  mango: require('@assets/images/fields/mango-badge.png'),
};

export const cropStages = ['Land Ready', 'Sowing', 'Mid Season', 'Harvesting'] as const;
export const statusStages = ['Land Ready', 'Sowing', 'Mid Season', 'Harvested'] as const;
export const irrigationTypes = ['Ramified', 'Barwell', 'Drip', 'Canal'] as const;
export const cropConditions = ['Healthy', 'Moderate', 'Poor'] as const;
export const soilTypes = ['Loamy', 'Clay', 'Sandy', 'Other'] as const;
