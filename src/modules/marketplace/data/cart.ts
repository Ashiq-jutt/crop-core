import type { ImageSourcePropType } from 'react-native';

export type CartLine = {
  id: string;
  name: string;
  brand: string;
  price: string;
  oldPrice: string;
  size: string;
  /** Amount the bill adds per unit (the frames bill $100 for the $110 line). */
  billUnit: number;
  qty: number;
  image: ImageSourcePropType;
};

const bottle: ImageSourcePropType = require('@assets/images/marketplace/thumb-bottle.png');
const soil: ImageSourcePropType = require('@assets/images/marketplace/thumb-soil.png');

export const checkoutLines: CartLine[] = [
  { id: 'giolife-bottle', name: 'Giolife No Virus Bio Viricide', brand: 'Goodlife Agritech Pvt Ltd..', price: '$ 110.00', oldPrice: '$ 200.00', size: 'Size : 250 ml', billUnit: 100, qty: 1, image: bottle },
];

export const cartLines: CartLine[] = [
  { id: 'giolife-bottle', name: 'Giolife No Virus Bio Viricide', brand: 'Goodlife Agritech Pvt Ltd..', price: '$ 110.00', oldPrice: '$ 200.00', size: 'Size : 250 ml', billUnit: 110, qty: 1, image: bottle },
  { id: 'giolife-soil', name: 'Giolife No Virus Bio Viricide', brand: 'Goodlife Agritech Pvt Ltd..', price: '$ 100.00', oldPrice: '$ 200.00', size: 'Size : 250 ml', billUnit: 100, qty: 1, image: soil },
];

export const TAX = 1;

export const billSubtotal = (lines: CartLine[]) => lines.reduce((sum, l) => sum + l.billUnit * l.qty, 0);
