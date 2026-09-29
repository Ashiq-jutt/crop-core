import type { ImageSourcePropType } from 'react-native';

export type TaskTypeKey = 'irrigation' | 'fertilizer' | 'spray' | 'harvesting' | 'storage' | 'weeding';

export const taskTypes: { key: TaskTypeKey; label: string; glyph: ImageSourcePropType }[] = [
  { key: 'irrigation', label: 'Irrigation', glyph: require('@assets/images/fields/task-irrigation.png') },
  { key: 'fertilizer', label: 'Fertilizer', glyph: require('@assets/images/fields/task-fertilizer.png') },
  { key: 'spray', label: 'Spray', glyph: require('@assets/images/fields/task-spray.png') },
  { key: 'harvesting', label: 'Harvesting', glyph: require('@assets/images/fields/task-harvesting.png') },
  { key: 'storage', label: 'Storage', glyph: require('@assets/images/fields/task-storage.png') },
  { key: 'weeding', label: 'Weeding', glyph: require('@assets/images/fields/task-weeding.png') },
];

export const whenDays = ['Today', 'Tomorrow'] as const;
export const whenOffsets = ['30 Min', '1 Hour', '2 Hours', '3 Hour', '4 Hour', '6 Hour'] as const;
export const repeatOptions = ['Daily', 'Weekly'] as const;

export const hours = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'];
export const minutes = Array.from({ length: 60 }, (_, i) => String(i).padStart(2, '0'));
export const periods = ['AM', 'PM'];

export const defaultSchedule = {
  day: null,
  offset: '2 Hours',
  hour: '9',
  minute: '00',
  period: 'AM',
  repeat: null,
} as const;
