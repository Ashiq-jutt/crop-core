export const currentUser = {
  name: 'Michal Wilson',
  avatar: require('@assets/images/home/avatar.png'),
};

export const todayForecast = {
  location: 'Uma Nagar Bhuj Kutch - 370001',
  condition: 'Cloudy',
  conditionIcon: require('@assets/images/home/weather-cloudy.png'),
  advice: 'Cloudy Today - Good For Irrigation',
  metrics: [
    { id: 'soil', value: '22°C', label: 'Soil Temp', icon: require('@assets/images/home/metric-soil-temp.png') },
    { id: 'humidity', value: '69%', label: 'Humidity', icon: require('@assets/images/home/metric-humidity.png') },
    { id: 'wind', value: '6 M/s', label: 'Wind', icon: require('@assets/images/home/metric-wind.png') },
    {
      id: 'precipitation',
      value: '10 %',
      label: 'Precipition',
      icon: require('@assets/images/home/metric-precipitation.png'),
    },
  ],
};

export type FieldStatusTone = 'warning' | 'success';

export type FieldCrop = {
  name: string;
  area: string;
  badge: number;
  status: { label: string; tone: FieldStatusTone; emoji: string };
};

export const featuredField = {
  id: 'north',
  name: 'North Fields',
  area: '2.3 Acers',
  icon: require('@assets/images/home/field-plot.png'),
  crops: [
    {
      name: 'Groundnuts',
      area: '1.3 Acers',
      badge: require('@assets/images/home/badge-groundnut.png'),
      status: { label: 'Irrigation Due', tone: 'warning', emoji: '💧' },
    },
    {
      name: 'Cottons',
      area: '1.0 Acers',
      badge: require('@assets/images/home/badge-cotton.png'),
      status: { label: 'Healthy', tone: 'success', emoji: '✅' },
    },
  ] satisfies FieldCrop[],
};

const cropIcons = {
  wheat: require('@assets/images/home/crop-wheat.png'),
  cotton: require('@assets/images/home/crop-cotton.png'),
  mango: require('@assets/images/home/crop-mango.png'),
};

export type TodayTask = {
  id: string;
  title: string;
  crop: string;
  icon: number;
  field: string;
  time: string;
  done: boolean;
};

export const todayTasks: TodayTask[] = [
  { id: 't1', title: 'Irrigation', crop: 'Wheat', icon: cropIcons.wheat, field: 'North Fields', time: '7:00 AM', done: false },
  { id: 't2', title: 'Harvest', crop: 'Cotton', icon: cropIcons.cotton, field: 'North Fields', time: '11:00 AM', done: false },
  {
    id: 't3',
    title: 'Pesticide spray',
    crop: 'Mango',
    icon: cropIcons.mango,
    field: 'North Fields',
    time: '5:30 PM',
    done: false,
  },
];

export const alerts = [
  {
    id: 'a1',
    title: 'High Risk of Leaf Miner',
    subtitle: ['North Fields', 'Wheat'],
    action: 'Manage Now',
    width: 180,
    icon: require('@assets/images/home/alert-pest.png'),
  },
  {
    id: 'a2',
    title: 'Irrigation Needed',
    subtitle: ['South Fields', 'Mango'],
    action: 'Schedule',
    width: 164,
    icon: require('@assets/images/home/alert-irrigation.png'),
  },
];

export const marketCategories = [
  { id: 'seeds', label: 'Seeds', icon: require('@assets/images/home/market-seeds.png') },
  { id: 'fertilizer', label: 'Fertilizer', icon: require('@assets/images/home/market-fertilizer.png') },
  { id: 'equipment', label: "Equipment's", icon: require('@assets/images/home/market-equipment.png') },
];

export type MarketRate = { name: string; icon: number; price: string; change: number };

export const marketRates = {
  mandi: 'Bhuj',
  rates: [
    { name: 'Cotton', icon: cropIcons.cotton, price: '₹1100/kg', change: -1.5 },
    { name: 'Mango', icon: cropIcons.mango, price: '₹150/kg', change: 0.5 },
    { name: 'Wheat', icon: cropIcons.wheat, price: '₹1500/kg', change: 3.5 },
  ] satisfies MarketRate[],
};

export const quickActions = [
  { id: 'crop-care', label: 'Crop Care', icon: require('@assets/images/home/quick-crop-care.png') },
  {
    id: 'collaborative',
    label: 'Collaborative Farming',
    icon: require('@assets/images/home/quick-collaborative.png'),
  },
];

export const referral = {
  title: 'Refer to Your Friend and Earn',
  subtitle: 'Earn Up to $100 For Every Refreal',
  cta: 'Refer Now',
  illustration: require('@assets/images/home/refer-illustration.png'),
};
