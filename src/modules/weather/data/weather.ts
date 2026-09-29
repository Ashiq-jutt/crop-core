export const weatherLocation = 'Uma Nagar Bhuj Kutch - 370001';

export const today = {
  date: 'Today, 7 October',
  illustration: require('@assets/images/weather/hero.png'),
  temperature: '29',
  description: 'Fair / Cloudy Environment Moderate Rain Expected',
  advice: 'Please avoid irrigating the mango crop',
};

export const weatherMetrics = [
  { id: 'soil', value: '22°C', label: 'Soil Temp', icon: require('@assets/images/home/metric-soil-temp.png') },
  { id: 'humidity', value: '69%', label: 'Humidity', icon: require('@assets/images/home/metric-humidity.png') },
  { id: 'wind', value: '6 M/s', label: 'Wind', icon: require('@assets/images/home/metric-wind.png') },
  {
    id: 'precipitation',
    value: '10 %',
    label: 'Precipition',
    icon: require('@assets/images/home/metric-precipitation.png'),
  },
];

const cloudSun = require('@assets/images/weather/hourly-cloud-sun.png');
const stormSun = require('@assets/images/weather/hourly-storm-sun.png');

export type HourlyForecast = { id: string; rain: string; temperature: string; time: string; icon: number };

export const hourlyForecast: HourlyForecast[] = [
  { id: 'h4', rain: '20%', temperature: '29°C', time: '4 PM', icon: cloudSun },
  { id: 'h5', rain: '40%', temperature: '24°C', time: '5 PM', icon: stormSun },
  { id: 'h6', rain: '50%', temperature: '22°C', time: '6 PM', icon: stormSun },
  { id: 'h7', rain: '30%', temperature: '21°C', time: '7 PM', icon: cloudSun },
];

const bulb = require('@assets/images/weather/bulb.png');

export type DailyForecast = {
  id: string;
  condition: string;
  icon: number;
  day: string;
  date: string;
  range: string;
  rain: string;
  advice: string;
};

export const weeklyForecast: DailyForecast[] = [
  {
    id: 'd0',
    condition: 'Cloudy',
    icon: require('@assets/images/weather/weekly-cloudy.png'),
    day: 'Today',
    date: '10 July',
    range: '24°C / 20°C',
    rain: '40% Rain',
    advice: 'No irrigation needed today',
  },
  {
    id: 'd1',
    condition: 'Sunny',
    icon: require('@assets/images/weather/weekly-sunny.png'),
    day: 'Tomorrow',
    date: '11 July',
    range: '31°C / 24°C',
    rain: '5% Rain',
    advice: 'Suitable for irrigation',
  },
];

export const adviceIcon = bulb;

export const aiTips = [
  {
    id: 'tip-water',
    text: 'Water crops early morning; high temp may cause evaporation loss',
    icon: require('@assets/images/weather/tip-irrigation.png'),
  },
  {
    id: 'tip-pest',
    text: 'High humidity could lead to pest risk. Use bio-control if needed.',
    icon: require('@assets/images/weather/tip-pest.png'),
  },
  {
    id: 'tip-wind',
    text: 'Moderate wind after 3 PM — avoid spraying.',
    icon: require('@assets/images/weather/tip-wind.png'),
  },
];
