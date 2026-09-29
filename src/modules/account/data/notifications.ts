export type NotificationFilter = 'all' | 'weather' | 'crop-health' | 'tasks' | 'market';

export const notificationFilters: { value: NotificationFilter; label: string }[] = [
  { value: 'all', label: 'All' },
  { value: 'weather', label: 'Weather' },
  { value: 'crop-health', label: 'Crop Health' },
  { value: 'tasks', label: 'Tasks' },
  { value: 'market', label: 'Market' },
];

export type NotificationIcon =
  | { kind: 'image'; source: number }
  | { kind: 'tick' }
  | { kind: 'cart' };

export type AppNotification = {
  id: string;
  category: Exclude<NotificationFilter, 'all'>;
  section: 'Today' | 'This Week';
  icon: NotificationIcon;
  title: string;
  body: string;
  time: string;
};

const groundnut = require('@assets/images/account/notif-groundnut.png');
const cotton = require('@assets/images/account/notif-cotton.png');

export const notifications: AppNotification[] = [
  {
    id: 'n1',
    category: 'tasks',
    section: 'Today',
    icon: { kind: 'image', source: groundnut },
    title: 'Groundnuts - Irrigation Due',
    body: 'Groundnuts in North Field Scheduled watering today.',
    time: 'Today, 9:15 AM',
  },
  {
    id: 'n2',
    category: 'crop-health',
    section: 'Today',
    icon: { kind: 'image', source: cotton },
    title: 'Pest Risk Detection In Cotton',
    body: 'Pest Detection Is Schedule Today at 4:30 PM',
    time: 'Today, 8:00 AM',
  },
  {
    id: 'n3',
    category: 'tasks',
    section: 'This Week',
    icon: { kind: 'tick' },
    title: 'Task Completed - Mango Fertilizers',
    body: 'Marked Done By You at 7:30 PM',
    time: 'Mon, 8:00 PM',
  },
  {
    id: 'n4',
    category: 'market',
    section: 'This Week',
    icon: { kind: 'cart' },
    title: 'Order Shipped - Bio Pestside',
    body: 'Delivery Expected On Tommrow',
    time: 'Sunday, 5:45 PM',
  },
  {
    id: 'n5',
    category: 'crop-health',
    section: 'This Week',
    icon: { kind: 'image', source: cotton },
    title: 'Pest Risk Detection In Cotton',
    body: 'Pest Detection Is Schedule Today at 4:30 PM',
    time: 'Sunday, 8:00 AM',
  },
];

export type NotificationPreference = {
  id: string;
  category: Exclude<NotificationFilter, 'all'>;
  title: string;
  subtitle: string;
  icon: number;
  enabled: boolean;
};

const weatherIcon = require('@assets/images/account/pref-weather.png');
const cropIcon = require('@assets/images/account/pref-crop.png');

export const notificationPreferences: NotificationPreference[] = [
  { id: 'p1', category: 'weather', title: 'Weather', subtitle: 'Rain, Heat, Wind Updates', icon: weatherIcon, enabled: true },
  { id: 'p2', category: 'crop-health', title: 'Crop Alert', subtitle: 'Rain, Heat, Wind Updates', icon: cropIcon, enabled: true },
  { id: 'p3', category: 'tasks', title: 'Task Reminder', subtitle: 'Reminder For Schedule Task', icon: cropIcon, enabled: true },
  { id: 'p4', category: 'tasks', title: 'Field Activity Update', subtitle: 'Notification For Field Management', icon: cropIcon, enabled: false },
  { id: 'p5', category: 'market', title: 'Marketplace & Orders', subtitle: 'Update About Products & Orders', icon: cropIcon, enabled: false },
  { id: 'p6', category: 'tasks', title: 'Celebrative Farming Update', subtitle: 'Update About Request & Responce', icon: cropIcon, enabled: true },
];
