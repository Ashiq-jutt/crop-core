import type { ImageSourcePropType } from 'react-native';

export type Severity = { label: string; tone: 'warning' };

export type DetectedIssue = { id: string; title: string; area: string; severity: Severity };

export type SuggestedAction = {
  id: string;
  label: string;
  title: string;
  icon: ImageSourcePropType;
  iconBackground: string;
};

export type SuggestedProduct = {
  id: string;
  image: ImageSourcePropType;
  category: string;
  name: string;
  brand: string;
  price: string;
  size: string;
};

const moderate: Severity = { label: 'Moderate', tone: 'warning' };

/** Result of the AI scan, exactly as drawn on "AI Result" / "Summary Details". */
export const diagnosis = {
  crop: 'Cotton',
  badge: require('@assets/images/diagnosis/cotton-badge.png') as ImageSourcePropType,
  detectedJustNow: 'Detected : 2 Min Ago',
  detectedEarlier: 'Detected : 2 Hours Ago',
  confidence: { label: '82% ✅', tone: 'success' as const },
  issues: [
    { id: 'fungal', title: 'Fungal Infection', area: 'Affected Area :Cotton Balls', severity: moderate },
    { id: 'roots', title: 'Dry Roots', area: 'Affected Area :Root Area', severity: moderate },
  ] satisfies DetectedIssue[],
  quickAction: { label: 'Suggested Action', title: 'Schedule Irrigation in 24hrs' },
};

export const suggestedActions: SuggestedAction[] = [
  {
    id: 'irrigation',
    label: 'Suggested Action',
    title: 'Schedule Irrigation In 24 hrs',
    icon: require('@assets/images/diagnosis/irrigation.png'),
    iconBackground: '#E0EFFF',
  },
  {
    id: 'fertilizer',
    label: 'Suggested Action',
    title: 'Schedule Irrigation In 24 hrs',
    icon: require('@assets/images/diagnosis/fertilizer-bag.png'),
    iconBackground: '#EDF4EC',
  },
];

const sprayer = require('@assets/images/diagnosis/product-sprayer.png');

export const suggestedProducts: SuggestedProduct[] = [1, 2].map((n) => ({
  id: `giolife-${n}`,
  image: sprayer,
  category: 'Fertilizer',
  name: 'Giolife No Virus Bio Viricide',
  brand: 'Goodlife Agritech Pvt Ltd..',
  price: '$50',
  size: 'Size : 250 ml',
}));

/** Pre-filled "Add Task" sheet opened from a suggested action. */
export const taskDraft = {
  field: { name: 'Cotton', area: '1.3 Acers', location: 'North-fields' },
  taskType: { label: 'Irrigation', icon: require('@assets/images/diagnosis/irrigation.png') as ImageSourcePropType },
};

/** Seconds the camera "scans" before the result opens. */
export const SCAN_DURATION_MS = 4000;
