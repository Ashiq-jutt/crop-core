/** Crop catalogue shared by Home, Fields, Tasks and Marketplace. */
export type CropId = 'wheat' | 'cotton' | 'mango' | 'groundnut';

export const crops: Record<CropId, { name: string; icon: number; badge?: number }> = {
  wheat: { name: 'Wheat', icon: require('@assets/images/crops/wheat.png') },
  cotton: {
    name: 'Cotton',
    icon: require('@assets/images/crops/cotton.png'),
    badge: require('@assets/images/crops/cotton-badge.png'),
  },
  mango: { name: 'Mango', icon: require('@assets/images/crops/mango.png') },
  groundnut: {
    name: 'Groundnut',
    icon: require('@assets/images/crops/groundnut-badge.png'),
    badge: require('@assets/images/crops/groundnut-badge.png'),
  },
};
