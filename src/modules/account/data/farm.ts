export type FarmCrop = { id: string; name: string; area: string; image: number };

export type FarmField = {
  id: string;
  name: string;
  area: string;
  location: string;
  soil: string;
  crops: FarmCrop[];
};

const groundnut = require('@assets/images/account/crop-groundnut.png');
const cotton = require('@assets/images/account/crop-cotton.png');
const mango = require('@assets/images/account/crop-mango.png');

export const farmFields: FarmField[] = [
  {
    id: 'f1',
    name: 'North Fields',
    area: '2.3 Acers',
    location: 'Uma Nagar Bhuj Kutch',
    soil: 'Sandy',
    crops: [
      { id: 'c1', name: 'Groundnuts', area: '1.3 Acers', image: groundnut },
      { id: 'c2', name: 'Cotton', area: '1.0 Acers', image: cotton },
    ],
  },
  {
    id: 'f2',
    name: 'North Fields',
    area: '2.3 Acers',
    location: 'Uma Nagar Bhuj Kutch',
    soil: 'Sandy',
    crops: [{ id: 'c3', name: 'Mango', area: '2.3 Acers', image: mango }],
  },
  {
    id: 'f3',
    name: 'South North Feilds',
    area: '1.0 Acers',
    location: 'Rural Bhuj Area',
    soil: 'Sandy',
    crops: [],
  },
];

export const noCrop = {
  title: 'No Crop Assigned',
  body: 'Select a Crop to Plant This Season From Field Management',
};
