export type TaskKind = 'irrigation' | 'fertilizer' | 'pestSpray' | 'harvesting' | 'storage' | 'weeding';

export type TaskTypeOption = { id: TaskKind; label: string; icon: number };

export const taskTypes: TaskTypeOption[] = [
  { id: 'irrigation', label: 'Irrigation', icon: require('@assets/images/tasks/type-irrigation.png') },
  { id: 'fertilizer', label: 'Fertilizer', icon: require('@assets/images/tasks/type-fertilizer.png') },
  { id: 'pestSpray', label: 'Pest Spray', icon: require('@assets/images/tasks/type-pest-spray.png') },
  { id: 'harvesting', label: 'Harvesting', icon: require('@assets/images/tasks/type-harvesting.png') },
  { id: 'storage', label: 'Storage', icon: require('@assets/images/tasks/type-storage.png') },
  { id: 'weeding', label: 'Weeding', icon: require('@assets/images/tasks/type-weeding.png') },
];

export type ActiveCrop = { id: string; name: string; area: string; field: string; icon: number };

export const activeCrops: ActiveCrop[] = [
  {
    id: 'groundnut',
    name: 'Groundnuts',
    area: '1.3 Acers',
    field: 'North-fields',
    icon: require('@assets/images/tasks/crop-groundnut.png'),
  },
  {
    id: 'cotton',
    name: 'Cotton',
    area: '1.0 Acers',
    field: 'North-fields',
    icon: require('@assets/images/tasks/crop-cotton.png'),
  },
  {
    id: 'mango',
    name: 'Mango',
    area: '1.0 Acers',
    field: 'South-fields',
    icon: require('@assets/images/tasks/crop-mango.png'),
  },
];

export const dayOptions = ['Today', 'Tomorrow'] as const;
export type DayOption = (typeof dayOptions)[number];

export const durationOptions = ['30 Min', '1 Hour', '2 Hours', '3 Hour', '4 Hour'];

/** Time wheel columns; hours and minutes wrap around, AM/PM does not. */
export const hourOptions = Array.from({ length: 12 }, (_, i) => String(i + 1));
export const minuteOptions = Array.from({ length: 60 }, (_, i) => String(i).padStart(2, '0'));
export const periodOptions = ['AM', 'PM'];

export const repeatOptions = ['Daily', 'Weekly'] as const;
export type RepeatOption = (typeof repeatOptions)[number];

export type TaskDraft = {
  cropId: string;
  kind: TaskKind;
  customTask: string;
  day: DayOption;
  duration: string;
  /** Indexes into hourOptions / minuteOptions / periodOptions. */
  hour: number;
  minute: number;
  period: number;
  repeat: RepeatOption | null;
  notes: string;
};

export const defaultDraft: TaskDraft = {
  cropId: 'groundnut',
  kind: 'irrigation',
  customTask: '',
  day: 'Today',
  duration: '2 Hours',
  hour: 8,
  minute: 0,
  period: 0,
  repeat: null,
  notes: '',
};

export type TaskStatus = 'due' | 'completed' | 'overdue';

export type Task = {
  id: string;
  title: string;
  icon: number;
  crop: string;
  field: string;
  start: string;
  end: string;
  note: string;
  status: TaskStatus;
  /** Index into `weekDays`. */
  day: number;
  draft: TaskDraft;
};

const soilNote = 'Check soil moisture before starting. Use drip irrigation system.';

const fertilizerIcon = require('@assets/images/tasks/task-fertilizer.png');
const irrigationIcon = require('@assets/images/tasks/task-irrigation.png');
const harvestingIcon = require('@assets/images/tasks/task-harvesting.png');

export const seedTasks: Task[] = [
  {
    id: 'urea',
    title: 'Urea Fertilizer',
    icon: fertilizerIcon,
    crop: 'Wheat',
    field: 'North Fields',
    start: '12:00 PM',
    end: '1:00 PM',
    note: soilNote,
    status: 'due',
    day: 1,
    draft: { ...defaultDraft, kind: 'fertilizer', notes: 'Apply after Spray for better absorption' },
  },
  {
    id: 'irrigation',
    title: 'Irrigation',
    icon: irrigationIcon,
    crop: 'Wheat',
    field: 'North Fields',
    start: '9:00 AM',
    end: '11:00 AM',
    note: soilNote,
    status: 'due',
    day: 0,
    draft: { ...defaultDraft, notes: 'Apply after Spray for better absorption' },
  },
  {
    id: 'harvesting',
    title: 'Harvesting',
    icon: harvestingIcon,
    crop: 'Groundnuts',
    field: 'South Fields',
    start: '3:00 PM',
    end: '6:00 PM',
    note: soilNote,
    status: 'due',
    day: 0,
    draft: { ...defaultDraft, kind: 'harvesting', notes: 'Apply after Spray for better absorption' },
  },
  {
    id: 'weeding',
    title: 'Weeding',
    icon: harvestingIcon,
    crop: 'Cotton',
    field: 'North Fields',
    start: '7:00 AM',
    end: '8:00 AM',
    note: soilNote,
    status: 'completed',
    day: 2,
    draft: { ...defaultDraft, cropId: 'cotton', kind: 'weeding' },
  },
  {
    id: 'spray',
    title: 'Pest Spray',
    icon: fertilizerIcon,
    crop: 'Mango',
    field: 'South Fields',
    start: '5:30 PM',
    end: '6:30 PM',
    note: soilNote,
    status: 'completed',
    day: 2,
    draft: { ...defaultDraft, cropId: 'mango', kind: 'pestSpray' },
  },
];

/** `labelWidth` reproduces the design's fixed-width text box, which clips "Overdue (1)" to "Overdue (". */
export const statusTabs: { id: TaskStatus; label: string; heading: string; labelWidth?: number }[] = [
  { id: 'due', label: 'Due', heading: 'Due Task' },
  { id: 'completed', label: 'Completed', heading: 'Completed Task' },
  { id: 'overdue', label: 'Overdue', heading: 'Overdue Task', labelWidth: 60 },
];

/** Counts printed in the status chips exactly as in the design (they are not derived from the list). */
export const statusCounts: Record<TaskStatus, number> = { due: 3, completed: 2, overdue: 1 };

export const weekDays = [
  { id: 'mon', label: 'Mon', date: '18', count: '(3)' },
  { id: 'tue', label: 'Tue', date: '19', count: '(1)' },
  { id: 'wed', label: 'Wed', date: '20', count: '(2)' },
  { id: 'thu', label: 'Thu', date: '21', count: '-' },
  { id: 'fri', label: 'Fri', date: '22', count: '-' },
];

export const todayBanner = {
  date: 'Thursday, 10 Sep 2025',
  temperature: '29°C',
  icon: require('@assets/images/tasks/banner-weather.png'),
};

export const weatherAlert = {
  title: 'Rain Expected - Irrigation Need to be Postponed',
  body: 'Some attention needed. Monitor for pests and ensure adequate water and nutrients.',
  icon: require('@assets/images/tasks/alert-sprinkler.png'),
};

export const systemRecommendation = {
  title: 'Pest Spray Task Recommended For Wheat',
  icon: require('@assets/images/tasks/banner-spray.png'),
  draft: { ...defaultDraft, kind: 'pestSpray', notes: 'Apply after Spray for better absorption' } satisfies TaskDraft,
};
