import type { ImageSource } from 'expo-image';

/** Number of numbered steps shown in the "n/4" progress bar (profile → area distribution). */
export const SETUP_STEPS = 4;

/** Colours sampled from the flattened setup screens that have no theme token. */
export const setupColors = {
  headerBorder: '#F2F4F6',
  stepTrack: '#E3E5E8',
  mutedLabel: '#545963',
  cardBorder: '#E3E5E8',
  success: '#3CBF61',
  sliderTrack: '#FEECE2',
  tip: '#3D434F',
} as const;

type LocationBenefit = { id: string; title: string; description: string; icon: ImageSource | number };

export const locationBenefits: LocationBenefit[] = [
  {
    id: 'weather',
    title: 'Weather Update',
    description: 'Rain alerts, wind speed, and sowing recommendations',
    icon: require('@assets/images/setup/benefit-weather.png'),
  },
  {
    id: 'market',
    title: 'Local Market',
    description: 'Real-time crop rates from nearby mandis',
    icon: require('@assets/images/setup/benefit-market.png'),
  },
  {
    id: 'mapping',
    title: 'Smart Field Mapping',
    description: 'Auto-tag your farm for future planning',
    icon: require('@assets/images/setup/benefit-mapping.png'),
  },
  {
    id: 'services',
    title: 'Nearby Farming Services',
    description: 'Rain alerts, wind speed, and sowing recommendations',
    icon: require('@assets/images/setup/benefit-services.png'),
  },
];

export const profileDefaults = {
  name: 'Ramesh Kumar',
  mobile: '+91 9988776655',
  location: 'Bhuj Kutch Gujarat 370001',
};

export const fieldUnits = ['Acer', 'Hectare', 'Bigha'] as const;
export type FieldUnit = (typeof fieldUnits)[number];

export const fieldDefaults: { name: string; size: string; unit: FieldUnit } = {
  name: 'North West',
  size: '2.5',
  unit: 'Acer',
};

/** The boundary drawn on the map and the place it resolves to. */
export const mappedField = {
  area: '2.3 Acers',
  place: 'Uma Nagar, Bhuj Kutch',
};

/** Summary card shown on the crop and area-distribution steps. */
export const fieldSummary = {
  title: '2.3 Acers - North West',
  subtitle: 'Uma Nager Bhuj',
};

type CropCategory = { id: string; label: string; icon?: ImageSource | number };

export const cropCategories: CropCategory[] = [
  { id: 'popular', label: 'Popular Crops' },
  { id: 'oilseed', label: 'Oilseed', icon: require('@assets/images/setup/chip-oilseed.png') },
  { id: 'cereal', label: 'Cereal', icon: require('@assets/images/setup/chip-cereal.png') },
];

export type CropOption = { id: string; name: string; icon: ImageSource | number; categories: string[] };

export const cropOptions: CropOption[] = [
  { id: 'wheat', name: 'Wheat', icon: require('@assets/images/setup/crop-wheat.png'), categories: ['popular', 'cereal'] },
  {
    id: 'sugarcane',
    name: 'Sugarcane',
    icon: require('@assets/images/setup/crop-sugarcane.png'),
    categories: ['popular'],
  },
  { id: 'rice', name: 'Rice', icon: require('@assets/images/setup/crop-rice.png'), categories: ['popular', 'cereal'] },
  {
    id: 'groundnuts',
    name: 'Groundnuts',
    icon: require('@assets/images/setup/crop-groundnuts.png'),
    categories: ['popular', 'oilseed'],
  },
  { id: 'cotton', name: 'Cotton', icon: require('@assets/images/setup/crop-cotton.png'), categories: ['popular'] },
  { id: 'mango', name: 'Mango', icon: require('@assets/images/setup/crop-mango.png'), categories: ['popular'] },
];

export const initialSelectedCrops = ['groundnuts', 'cotton'];

export const totalAcres = 2.3;

export const cropStages = ['Land Ready', 'Sowing', 'Mid Season', 'Harvesting'] as const;
export const irrigationTypes = ['Ramified', 'Barwell', 'Drip', 'Canal'] as const;
type CropStage = (typeof cropStages)[number];
type IrrigationType = (typeof irrigationTypes)[number];

export type CropAllocation = {
  cropId: string;
  acres: number;
  stage: CropStage;
  irrigation: IrrigationType;
};

export const initialAllocations: CropAllocation[] = [
  { cropId: 'cotton', acres: 1.5, stage: 'Mid Season', irrigation: 'Drip' },
  { cropId: 'groundnuts', acres: 0.8, stage: 'Sowing', irrigation: 'Canal' },
];

export const formatAcres = (acres: number) => `${Number(acres.toFixed(1))} Acers`;
