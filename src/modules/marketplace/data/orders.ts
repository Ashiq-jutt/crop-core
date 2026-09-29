import type { ImageSourcePropType } from 'react-native';

export type Order = {
  id: string;
  name: string;
  size?: string;
  orderNo: string;
  amount: string;
  cents: string;
  image: ImageSourcePropType;
};

const tractor: ImageSourcePropType = require('@assets/images/marketplace/order-tractor.png');
const spray: ImageSourcePropType = require('@assets/images/marketplace/order-spray.png');

export const completedOrders: Order[] = [
  { id: 'ord-2845-tractor', name: 'John Deere 5050D', orderNo: 'ORD# 2845', amount: '$500', cents: '.00', image: tractor },
  { id: 'ord-2845-giolife', name: 'Giolife No Virus Bio Viricide', size: 'Size 250 ML', orderNo: 'ORD# 2845', amount: '$100', cents: '.00', image: spray },
];

export const incomingOrders: Order[] = [
  { id: 'ord-2851-giolife', name: 'Giolife No Virus Bio Viricide', size: 'Size 250 ML', orderNo: 'ORD# 2851', amount: '$110', cents: '.00', image: spray },
];

export const reviewChips = [
  'Good build quality',
  'Delivered on time',
  'Worth the money',
  'Needs better packaging',
  'Requires frequent maintenance',
  'Grain',
];
