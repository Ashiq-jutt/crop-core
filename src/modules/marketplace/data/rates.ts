import type { ImageSourcePropType } from 'react-native';

export type Crop = {
  id: string;
  name: string;
  price: string;
  change: string;
  up: boolean;
  icon: ImageSourcePropType;
  yesterday: string;
  weekly: string;
  monthly: string;
};

export const crops: Crop[] = [
  {
    id: 'cotton',
    name: 'Cotton',
    price: '$110.00/Kg',
    change: '+1.2 %',
    up: true,
    icon: require('@assets/images/marketplace/crop-cotton.png'),
    yesterday: '$100.00',
    weekly: '$98.00',
    monthly: '$96.00',
  },
  {
    id: 'wheat',
    name: 'Wheat',
    price: '$85.00/Kg',
    change: '-0.5 %',
    up: false,
    icon: require('@assets/images/marketplace/crop-wheat.png'),
    yesterday: '$86.00',
    weekly: '$83.00',
    monthly: '$86.00',
  },
  {
    id: 'mango',
    name: 'Mango',
    price: '$70.00/Kg',
    change: '+0.5 %',
    up: true,
    icon: require('@assets/images/marketplace/crop-mango.png'),
    yesterday: '$69.45',
    weekly: '$68.00',
    monthly: '$66.00',
  },
];

export const getCrop = (id: string | undefined) => crops.find((c) => c.id === id) ?? crops[0];

export const markets = ['Bhuj Market', 'Anjar Market', 'Rajkot Market'];
export const sortOptions = ['Sort By Prize', 'Sort By Name'];
export const units = ['$/kg', '$/quintal'];

export const homeMarket = { name: 'Bhuj Market', distance: '2 KM Away', updated: 'Last Updated : 31 Oct, 9:30 AM' };

export const topMovers = {
  gainer: { label: 'Top Gainer', name: 'Onion', change: '+5.2 %', image: require('@assets/images/marketplace/onion.png') as ImageSourcePropType },
  loser: { label: 'Top Loser', name: 'Wheat', change: '-10.2 %', image: require('@assets/images/marketplace/wheat-outline.png') as ImageSourcePropType },
};

const grain: ImageSourcePropType = require('@assets/images/marketplace/chip-grain.png');

export const rateFilters: { id: string; label: string; icon?: ImageSourcePropType }[] = [
  { id: 'all', label: 'All' },
  { id: 'grain', label: 'Grain', icon: grain },
  { id: 'vegetables', label: 'Vegetables', icon: grain },
  { id: 'fruit', label: 'Fruit', icon: grain },
];

export type Mover = { id: string; name: string; price: string; change: string; icon: ImageSourcePropType };

export const gainers: Mover[] = [
  { id: 'onion', name: 'Onion', price: '$115.00/Kg', change: '+1.2%', icon: require('@assets/images/marketplace/crop-onion-sm.png') },
  { id: 'cotton', name: 'Cotton', price: '$110.00/Kg', change: '+1.0%', icon: require('@assets/images/marketplace/crop-cotton-sm.png') },
  { id: 'mango', name: 'Cotton', price: '$70.00/Kg', change: '+0.5%', icon: require('@assets/images/marketplace/crop-mango-sm.png') },
];

export const losers: Mover[] = [
  { id: 'wheat', name: 'Wheat', price: '$85.00/Kg', change: '-10.2%', icon: require('@assets/images/marketplace/crop-cotton-sm.png') },
  { id: 'mango', name: 'Mango', price: '$70.00/Kg', change: '-0.5%', icon: require('@assets/images/marketplace/crop-mango-sm.png') },
];

export const trendHistory = [
  { date: '31 Oct 2025', price: '$110.00/Kg', change: '+1.2 %', up: true },
  { date: '30 Oct 2025', price: '$106.00/Kg', change: '+1.2 %', up: false },
  { date: '29 Oct 2025', price: '$104.00/Kg', change: '+2.2 %', up: false },
];

export const insight = {
  title: 'Cotton Prize Have Increased 4.2 % In This Week',
  body: 'Main Reason Behind is No Rain During Harvesting Session',
};

export type MarketOption = { id: string; name: string; district: string; distance: string; short: string };

export const nearbyMarkets: MarketOption[] = [
  { id: 'anjar', name: 'Anjar', district: 'Kutch', distance: '42 KM', short: 'Anjar' },
  { id: 'rajkot', name: 'Rajkot', district: 'Rajkot', distance: '248 KM', short: 'Rajkot' },
  { id: 'jetpur', name: 'Jetpur', district: 'Rajkot', distance: '289 KM', short: 'Jetpur' },
];

export const radiusOptions = ['300 KM', '100 KM', '50 KM'];

/** Column values per market id, in table-row order. */
export const compareColumns: Record<string, { name: string; values: { text: string; up?: boolean }[] }> = {
  bhuj: { name: 'Bhuj', values: [{ text: '$110.00' }, { text: '+1.2 %', up: true }, { text: '-1.5 %', up: false }, { text: '2 KM' }] },
  anjar: { name: 'Anjar', values: [{ text: '$108.22' }, { text: '+0.5 %', up: true }, { text: '+1.5 %', up: true }, { text: '38 KM' }] },
  rajkot: { name: 'Rajkot', values: [{ text: '$105.21' }, { text: '-0.5 %', up: false }, { text: '+1.0 %', up: true }, { text: '296 KM' }] },
  jetpur: { name: 'Jetpur', values: [{ text: '$104.80' }, { text: '+0.3 %', up: true }, { text: '-0.4 %', up: false }, { text: '289 KM' }] },
};

export const compareRows = ['Current\nprize', '24hr\nChange', '7 Day\nChange', 'Distance'];

export const chartTooltip = { date: '26/10/2025', bhuj: '$110.8', anjar: '$96.5', rajkot: '$105.4' };

export const marketInsights = [
  { label: 'Best to Sell In : ', text: 'Bhuj Market ₹1442/\nkg (₹28 higher than lowest)' },
  { label: 'Prize Trends : ', text: 'Mix Trends Across All Market' },
  { label: 'Logistic : ', text: 'Closest Market Is Bhuj' },
];
