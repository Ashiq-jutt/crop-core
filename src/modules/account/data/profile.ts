import type { Href } from 'expo-router';
import { Activity, Gift, I24Support, Notification, Shield, DocumentText, Translate, type Icon } from 'iconsax-react-native';

import { accountColors } from '../components/tokens';

export const profileUser = {
  name: 'Michal Wilson',
  location: 'Uma Nagar Bhuj Kutch - 370001',
  avatar: require('@assets/images/account/avatar.png'),
  farmSetup: '100%',
  farmSetupProgress: 1,
};

export type FarmStat = { id: string; value: string; label: string; color: string; background: string };

export const farmStats: FarmStat[] = [
  { id: 'fields', value: '03', label: 'Feilds', color: accountColors.statBlue, background: accountColors.statBlueBg },
  { id: 'acres', value: '12.4', label: 'Acers', color: accountColors.statOrange, background: accountColors.statOrangeBg },
  { id: 'crops', value: '06', label: 'Crop', color: accountColors.statPink, background: accountColors.statPinkBg },
];

/** The My Farms header repeats the tiles, but its crop count is orange in the design. */
export const myFarmStats: FarmStat[] = farmStats.map((stat) =>
  stat.id === 'crops' ? { ...stat, color: accountColors.statOrange } : stat,
);

export const currentPlan = {
  title: 'Current Plan',
  price: '$99.00',
  nextBilling: 'Next Billing : Oct 15, 2025',
};

export type ProfileMenuItem = { id: string; title: string; icon: Icon; href: Href };

export const profileMenu: ProfileMenuItem[] = [
  { id: 'farm', title: 'My Farm', icon: Activity, href: '/account/farm' },
  { id: 'notification', title: 'Notification', icon: Notification, href: '/account/notifications' },
  { id: 'language', title: 'Language', icon: Translate, href: '/account/language' },
  { id: 'refer', title: 'Refer & Earn', icon: Gift, href: '/account/refer' },
  { id: 'help', title: 'Help Support', icon: I24Support, href: '/account/help' },
  { id: 'privacy', title: 'Privacy & Setting', icon: Shield, href: '/account/privacy' },
  { id: 'legal', title: 'Legal & About', icon: DocumentText, href: '/account/legal' },
];

export const editProfile = {
  avatar: require('@assets/images/account/avatar-large.png'),
  cameraBadge: require('@assets/images/account/camera-badge.png'),
  name: 'Ramesh Kumar',
  mobile: '+91 9988776655',
  location: 'Bhuj Kutch Gujarat 370001',
};
