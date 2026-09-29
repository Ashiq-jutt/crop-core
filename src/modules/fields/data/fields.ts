import type { CropKey } from './crops';

export type StatusTone = 'success' | 'warning';

export type CropStatus = { label: string; tone: StatusTone };

export type FieldGroup = 'attention' | 'healthy' | 'empty';

export type FieldCrop = {
  crop: CropKey;
  name: string;
  area: string;
  status: CropStatus;
};

export type Field = {
  id: string;
  name: string;
  area: string;
  group: FieldGroup;
  crops: FieldCrop[];
};

const healthy: CropStatus = { label: 'Healthy ✅', tone: 'success' };

/** Fields tab list, exactly as drawn on "Field Management". */
export const fields: Field[] = [
  {
    id: 'north',
    name: 'North Fields',
    area: '2.3 Acers',
    group: 'attention',
    crops: [
      { crop: 'groundnut', name: 'Groundnuts', area: '1.3 Acers', status: { label: 'Irrigation Due 💧', tone: 'warning' } },
      { crop: 'cotton', name: 'Cottons', area: '1.0 Acers', status: healthy },
    ],
  },
  {
    id: 'south',
    name: 'South Fields',
    area: '1.3 Acers',
    group: 'healthy',
    crops: [{ crop: 'mango', name: 'Mango', area: '1.3 Acers', status: healthy }],
  },
  {
    id: 'north-east',
    name: 'North Fields',
    area: '2.3 Acers',
    group: 'healthy',
    crops: [{ crop: 'cotton', name: 'Cottons', area: '1.0 Acers', status: healthy }],
  },
  { id: 'south-north', name: 'South North Fields', area: '2.3 Acers', group: 'empty', crops: [] },
];

export const fieldStats = [
  { value: '3', label: 'Total Fields', bg: '#E8F8EC' },
  { value: '7.4', label: 'Acers', bg: '#EEF4FC' },
  { value: '4', label: 'Total Crop', bg: '#FEEDE1' },
] as const;

export const fieldGroups: { key: FieldGroup; title: string }[] = [
  { key: 'attention', title: 'Need Attention' },
  { key: 'healthy', title: 'Healthy' },
  { key: 'empty', title: 'Empty Fields' },
];

export type TodayTask = { name: string; duration: string; time: string };

export type ManagedCrop = {
  id: string;
  crop: CropKey;
  name: string;
  area: string;
  stage: string;
  status: CropStatus;
  planted: string;
  harvesting: string;
  lastUpdate: string;
  task: TodayTask;
};

export type FieldDetails = {
  id: string;
  name: string;
  area: string;
  location: string;
  soil: string;
  crops: ManagedCrop[];
};

function managedCrop(id: string, crop: CropKey, name: string, area: string, time: string, status = healthy): ManagedCrop {
  return {
    id,
    crop,
    name,
    area,
    stage: 'Mid-Season',
    status,
    planted: '10-6-2025',
    harvesting: '10-6-2025',
    lastUpdate: 'Last Update On 31 September',
    task: { name: 'Irrigation', duration: '4 Hours', time },
  };
}

/** "Field Details" content; North Fields is the one drawn in the design. */
const details: Record<string, Omit<FieldDetails, 'id'>> = {
  north: {
    name: 'North Fields',
    area: '2.3 Acers',
    location: 'Uma Nagar Bhu Kutch',
    soil: 'Sandy',
    crops: [
      managedCrop('groundnut-1', 'groundnut', 'Groundnuts', '1.3 Acers', '11:00 AM'),
      managedCrop('groundnut-2', 'groundnut', 'Groundnuts', '1.3 Acers', '3:00 PM'),
    ],
  },
  south: {
    name: 'South Fields',
    area: '1.3 Acers',
    location: 'Uma Nagar Bhu Kutch',
    soil: 'Loamy',
    crops: [managedCrop('mango-1', 'mango', 'Mango', '1.3 Acers', '11:00 AM')],
  },
  'north-east': {
    name: 'North Fields',
    area: '2.3 Acers',
    location: 'Uma Nagar Bhu Kutch',
    soil: 'Clay',
    crops: [managedCrop('cotton-1', 'cotton', 'Cottons', '1.0 Acers', '11:00 AM')],
  },
  'south-north': {
    name: 'South North Fields',
    area: '2.3 Acers',
    location: 'Uma Nagar Bhu Kutch',
    soil: 'Sandy',
    crops: [],
  },
};

export function getFieldDetails(id: string | undefined): FieldDetails {
  const key = id && details[id] ? id : 'north';
  return { id: key, ...details[key] };
}

export function getManagedCrop(fieldId: string | undefined, cropId: string | undefined) {
  const field = getFieldDetails(fieldId);
  const crop = field.crops.find((c) => c.id === cropId) ?? field.crops[0] ?? details.north.crops[0];
  return { field, crop };
}

export const fieldWeather = {
  condition: 'Cloudy',
  day: 'Today',
  date: '10 July',
  temperature: '24°C / 20°C',
  rain: '40% Rain',
  advice: 'No irrigation needed today',
};

/** Field being created in the Add Field → Add Crop → Area Distribute flow. */
export const draftField = {
  name: 'North West',
  size: '2.5',
  unit: 'Acer',
  measuredArea: '2.3 Acers',
  location: 'Uma Nagar, Bhuj Kutch',
  summaryTitle: '2.3 Acers - North West',
  summaryLocation: 'Uma Nager Bhuj',
};

export const editFieldDraft = {
  title: 'North Feilds',
  name: 'North West',
  size: '2.1',
  unit: 'Acer',
  measuredArea: '2.0 Acers',
  location: 'Uma Nagar, Bhuj Kutch',
};

export type Allocation = {
  crop: CropKey;
  name: string;
  acres: number;
  stage: string;
  irrigation: string;
  planted: string;
  harvest: string;
};

export const TOTAL_ACRES = 2.3;

/** Allocation cards on "Area Distribute" (new field). */
export const newFieldAllocations: Allocation[] = [
  { crop: 'cotton', name: 'Cotton', acres: 1.5, stage: 'Mid Season', irrigation: 'Drip', planted: '10-06-2025', harvest: '10-09-2025' },
];

/** Allocation cards on "Area Distribution" (adding crops to an existing field). */
export const existingFieldAllocations: Allocation[] = [
  { crop: 'cotton', name: 'Cotton', acres: 1.5, stage: 'Mid Season', irrigation: 'Drip', planted: '10-04-2025', harvest: '10-08-2025' },
  { crop: 'groundnut', name: 'Groundnuts', acres: 0.8, stage: 'Mid Season', irrigation: 'Drip', planted: '22-04-2025', harvest: '15-07-2025' },
];

/** "Adjust Area" after the field shrank from 2.3 to 2.0 acres. */
export const ADJUSTED_TOTAL_ACRES = 2.0;
export const adjustAllocations: Allocation[] = [
  { crop: 'cotton', name: 'Cotton', acres: 1.0, stage: 'Mid Season', irrigation: 'Drip', planted: '10-04-2025', harvest: '10-08-2025' },
  { crop: 'groundnut', name: 'Groundnuts', acres: 0.8, stage: 'Mid Season', irrigation: 'Drip', planted: '22-04-2025', harvest: '15-07-2025' },
];

export const cropAdjustmentReasons = ['Harvested', 'Abandoned', 'Ignore', 'Damaged', 'Washout'] as const;

export const cropActivity = [{ title: 'Drip irrigation applied - 2 hours', time: 'Yesterday' }];

export const healthInsight = {
  title: 'Health Insight',
  body: 'Some attention needed. Monitor for pests and ensure adequate water and nutrients.',
};
