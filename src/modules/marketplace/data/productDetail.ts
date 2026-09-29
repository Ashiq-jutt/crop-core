import type { ImageSourcePropType } from 'react-native';

export const productDetail = {
  image: require('@assets/images/marketplace/product-raisins.png') as ImageSourcePropType,
  name: 'Giolife No Virus Bio Viricide',
  brand: 'Goodlife Agritech Pvt Ltd..',
  rating: '4.5',
  reviews: '(500+ Review)',
  oldPrice: '$ 200.00',
  price: '$ 110.00',
  size: 'Size : 250 ml',
  discount: 'Get 10% Discount On this Product',
  description: 'Lorem ipsum dolor sit amet, consectetur adipiscing Lorem ipsum dolor ',
  specs: [
    { label: 'Crop Type', value: 'Cotton, Wheat, Vegitable' },
    { label: 'Form', value: 'Liquide' },
    { label: 'Quantity', value: '1 Liters' },
    { label: 'Application', value: 'Spray or Mix Irrigation' },
  ],
  variants: [
    { id: '250ml', off: '50% Off', size: '250 ml', footSize: '250 ML', price: '$ 100.00', oldPrice: '$ 200.00', total: '$100.00' },
    { id: '500ml', off: '10% Off', size: '500 ml', footSize: '500 ML', price: '$ 100.00', oldPrice: '$ 110.00', total: '$100.00' },
    { id: '1kg', off: '10% Off', size: '1 kg', footSize: '1 KG', price: '$ 100.00', oldPrice: '$ 110.00', total: '$100.00' },
    { id: '2kg', off: '10% Off', size: '2 kg', footSize: '2 KG', price: '$ 180.00', oldPrice: '$ 200.00', total: '$180.00' },
  ],
};

export const delivery = {
  places: ['Bhuj , 370001', 'Anjar , 370110', 'Rajkot , 360001'],
  date: 'Thu, June 27',
};

export const ratingSummary = {
  average: '4.8',
  total: '3,105 Ratings',
  starsImage: require('@assets/images/marketplace/rating-stars.png') as ImageSourcePropType,
  /** `fill` = orange bar length, `shift` reproduces the design's per-row horizontal offset. */
  bars: [
    { star: '5', fill: 65, count: '1,250', shift: 0 },
    { star: '4', fill: 38, count: '550', shift: 0 },
    { star: '3', fill: 14, count: '30', shift: 0 },
    { star: '2', fill: 20, count: '80', shift: -1 },
    { star: '1', fill: 12, count: '25', shift: -4 },
  ],
};

export type Review = { id: string; name: string; ago: string; stars: number; chip: string; text: string; avatar: ImageSourcePropType };

const raj: ImageSourcePropType = require('@assets/images/marketplace/avatar-raj.png');

export const productReviews: Review[] = [
  { id: 'r1', name: 'Raj Maheta', ago: '2 Days Ago', stars: 4, chip: '🌱 Good Quality', text: 'Excellent quality seeds — germination rate was really good!', avatar: raj },
  { id: 'r2', name: 'Raj Maheta', ago: '2 Days Ago', stars: 4, chip: '🌱 Good Quality', text: 'Excellent quality seeds — germination rate was really good!', avatar: raj },
];

export const comboOffer = {
  items: [
    { id: 'combo-1', name: 'Giolife No Virus Bio Viricide', brand: 'Goodlife Agritech Pvt Ltd..', size: 'Size : 250 ml', image: require('@assets/images/marketplace/combo-almonds.png') as ImageSourcePropType },
    { id: 'combo-2', name: 'Giolife No Virus Bio Viricide', brand: 'Goodlife Agritech Pvt Ltd..', size: 'Size : 250 ml', image: require('@assets/images/marketplace/combo-soil.png') as ImageSourcePropType },
  ],
  label: 'Buy 2  At',
  price: '$100.00',
};
