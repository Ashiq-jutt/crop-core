import type { ImageSourcePropType } from 'react-native';

import { collabColors } from '../theme';

/* ─── Shared images ───────────────────────────────────────────────────── */

export const images = {
  davidMalan: require('@assets/images/collaboration/avatar-david.png'),
  michJohnson: require('@assets/images/collaboration/avatar-mich.png'),
  farmersGroup: require('@assets/images/collaboration/avatar-group.png'),
  cardIrrigation: require('@assets/images/collaboration/card-irrigation.png'),
  cardHarvesting: require('@assets/images/collaboration/card-harvesting.png'),
  cardSpray: require('@assets/images/collaboration/card-spray.png'),
  detailIrrigation: require('@assets/images/collaboration/detail-irrigation.png'),
  bannerIrrigation: require('@assets/images/collaboration/banner-irrigation.png'),
  requestSent: require('@assets/images/collaboration/request-sent.png'),
} satisfies Record<string, ImageSourcePropType>;

/* ─── Status ──────────────────────────────────────────────────────────── */

export type RequestStatus =
  | 'pending'
  | 'inProgress'
  | 'accepted'
  | 'suggested'
  | 'rejected'
  | 'expired'
  | 'completed';

export const statusStyles: Record<RequestStatus, { label: string; bg: string; fg: string }> = {
  pending: { label: 'Pending', bg: collabColors.pendingSurface, fg: collabColors.pending },
  inProgress: { label: 'In Progress', bg: collabColors.blueSurface, fg: collabColors.blue },
  accepted: { label: 'Accepted', bg: collabColors.greenSurface, fg: collabColors.green },
  suggested: { label: 'Suggested', bg: collabColors.blueSurface, fg: collabColors.blue },
  rejected: { label: 'Rejected', bg: collabColors.redSurface, fg: collabColors.red },
  expired: { label: 'Expired', bg: collabColors.greySurface, fg: collabColors.greyText },
  completed: { label: 'Completed', bg: collabColors.greenSurface, fg: collabColors.green },
};

/* ─── Dashboard (My Request / Incoming Request) ───────────────────────── */

export type DashboardTab = 'my' | 'incoming';

export type FilterChip = { id: 'all' | RequestStatus; label: string };

export const filterChips: FilterChip[] = [
  { id: 'all', label: 'All' },
  { id: 'pending', label: 'Pending (1)' },
  { id: 'inProgress', label: 'In Progress (1)' },
  { id: 'accepted', label: 'Accepted (1)' },
  { id: 'expired', label: 'Expired (1)' },
  { id: 'completed', label: 'Completed (1)' },
];

export type MyRequest = {
  id: string;
  task: string;
  icon: ImageSourcePropType;
  iconBg: string;
  meta: string[];
  status: RequestStatus;
  /** Statuses this card is listed under by the filter chips. */
  filters: RequestStatus[];
  date?: string;
  person?: { label: string; value: string; avatar: ImageSourcePropType; avatarWidth: number };
  message?: string;
  acceptedNote?: string;
};

export const myRequests: MyRequest[] = [
  {
    id: 'irrigation-pending',
    task: 'Irrigation',
    icon: images.cardIrrigation,
    iconBg: collabColors.blueSurface,
    meta: ['North Field', 'Cotton'],
    status: 'pending',
    filters: ['pending', 'accepted'],
    date: '10-6-2025',
    person: { label: 'Response', value: '3 Farmers', avatar: images.farmersGroup, avatarWidth: 41 },
    acceptedNote: 'David Malan Accept Your Help Request',
  },
  {
    id: 'harvesting-progress',
    task: 'Harvesting',
    icon: images.cardHarvesting,
    iconBg: collabColors.peach,
    meta: ['North Field', 'Cotton'],
    status: 'inProgress',
    filters: ['inProgress'],
    date: '10-6-2025',
    person: { label: 'Helper', value: 'Mich Johnson', avatar: images.michJohnson, avatarWidth: 24 },
  },
  {
    id: 'harvesting-expired',
    task: 'Harvesting',
    icon: images.cardHarvesting,
    iconBg: collabColors.peach,
    meta: ['North Field', 'Cotton'],
    status: 'expired',
    filters: ['expired'],
    message: 'No Farmer Will Accept the Request Before Schedule Time (15 Oct, 9:00 AM)',
  },
  {
    id: 'spray-completed',
    task: 'Spray',
    icon: images.cardSpray,
    iconBg: collabColors.lavender,
    meta: ['North Field', 'Groundnuts'],
    status: 'completed',
    filters: ['completed'],
    date: '10-6-2025',
    person: { label: 'Completed By', value: 'Mich Johnson', avatar: images.michJohnson, avatarWidth: 24 },
  },
];

export type IncomingRequest = {
  id: string;
  status: RequestStatus;
  /** Pending requests show accept / reject buttons instead of a badge. */
  note?: { text: string; tone: 'blue' | 'red' | 'grey' };
  helpedNote?: string;
};

export const requester = {
  name: 'David Malan',
  distance: '2.1 KM Away',
  phone: 'tel:+919876543210',
  avatar: images.davidMalan,
};

export const incomingTask = {
  task: 'Irrigation',
  meta: ['North Field', 'Wheat', 'Return the Favor'],
  date: '15 Oct, 2025',
  time: '9:00 AM',
  duration: '2 Hours',
  note: 'Need Help With Wheat Harvesting..',
};

export const incomingRequests: IncomingRequest[] = [
  { id: 'in-pending', status: 'pending', helpedNote: 'David Malan Help You in Irrigation' },
  { id: 'in-suggested', status: 'suggested', note: { text: 'Your Suggested Time : 12:00 PM', tone: 'blue' } },
  { id: 'in-accepted', status: 'accepted' },
  { id: 'in-rejected', status: 'rejected', note: { text: 'Reason : Busy With Own Field', tone: 'red' } },
  {
    id: 'in-expired',
    status: 'expired',
    note: { text: 'Request is Expired Schedule Time is Passed', tone: 'grey' },
  },
];

/* ─── Add request (Field Help / Equipment Help) ───────────────────────── */

export type HelpType = 'field' | 'equipment';

export type CategoryChip = { id: string; label: string; icon: ImageSourcePropType; iconWidth: number };
export type SelectOption = { id: string; label: string; icon: ImageSourcePropType };

export const helpTypes: Record<
  HelpType,
  {
    tab: string;
    title: string;
    searchPlaceholder: string;
    sectionTitle: string;
    categories: CategoryChip[];
    defaultCategory: string;
    options: SelectOption[];
  }
> = {
  field: {
    tab: 'Field Help',
    title: 'Add Request',
    searchPlaceholder: 'Search Farming Task',
    sectionTitle: 'Select Task',
    defaultCategory: 'crop-care',
    categories: [
      {
        id: 'pre-planting',
        label: 'Pre-Planting',
        icon: require('@assets/images/collaboration/chip-pre-planting.png'),
        iconWidth: 16,
      },
      {
        id: 'crop-care',
        label: 'Crop Care',
        icon: require('@assets/images/collaboration/chip-crop-care.png'),
        iconWidth: 16,
      },
      {
        id: 'harvesting',
        label: 'Harvesting',
        icon: require('@assets/images/collaboration/chip-harvesting.png'),
        iconWidth: 16,
      },
    ],
    options: [
      { id: 'irrigation', label: 'Irrigation', icon: require('@assets/images/collaboration/task-irrigation.png') },
      { id: 'fertilizers', label: 'Fertilizers', icon: require('@assets/images/collaboration/task-fertilizers.png') },
      { id: 'spray', label: 'Spray', icon: require('@assets/images/collaboration/task-spray.png') },
      { id: 'weeding', label: 'Weeding', icon: require('@assets/images/collaboration/task-weeding.png') },
      { id: 'pruning', label: 'Pruning', icon: require('@assets/images/collaboration/task-pruning.png') },
      { id: 'other', label: 'Other', icon: require('@assets/images/collaboration/task-other.png') },
    ],
  },
  equipment: {
    tab: 'Equipment Help',
    title: 'Equipment Details',
    searchPlaceholder: "Search Equipment's",
    sectionTitle: "Select Equipment's",
    defaultCategory: 'primary-machinery',
    categories: [
      {
        id: 'primary-machinery',
        label: 'Primary Machinery',
        icon: require('@assets/images/collaboration/chip-primary-machinery.png'),
        iconWidth: 16,
      },
      {
        id: 'soil-preparation',
        label: 'Soil Preparation',
        icon: require('@assets/images/collaboration/chip-soil-preparation.png'),
        iconWidth: 16,
      },
      {
        id: 'harvesting',
        label: 'Harvesting',
        icon: require('@assets/images/collaboration/chip-harvesting.png'),
        iconWidth: 16,
      },
    ],
    options: [
      { id: 'tractor', label: 'Tractor', icon: require('@assets/images/collaboration/equipment-tractor.png') },
      { id: 'sprayer', label: 'Sprayer', icon: require('@assets/images/collaboration/equipment-sprayer.png') },
      {
        id: 'power-trailer',
        label: 'Power Trailer',
        icon: require('@assets/images/collaboration/equipment-power-trailer.png'),
      },
      { id: 'harrow', label: 'Harrow', icon: require('@assets/images/collaboration/equipment-harrow.png') },
      { id: 'plow', label: 'Plow', icon: require('@assets/images/collaboration/equipment-plow.png') },
      { id: 'trailer', label: 'Trailer', icon: require('@assets/images/collaboration/equipment-trailer.png') },
      { id: 'rotavator', label: 'Rotavator', icon: require('@assets/images/collaboration/equipment-rotavator.png') },
      {
        id: 'reversible-plow',
        label: 'Reversible Plow',
        icon: require('@assets/images/collaboration/equipment-reversible-plow.png'),
      },
      { id: 'other', label: 'Other', icon: require('@assets/images/collaboration/equipment-other.png') },
    ],
  },
};

export const isHelpType = (value: unknown): value is HelpType => value === 'field' || value === 'equipment';

/* ─── Request forms ───────────────────────────────────────────────────── */

export const activeCrops = [
  {
    id: 'groundnuts',
    name: 'Groundnuts',
    area: '1.3 Acers',
    field: 'North-fields',
    icon: require('@assets/images/collaboration/crop-groundnuts.png'),
    iconBg: collabColors.peach,
  },
  {
    id: 'cotton',
    name: 'Cotton',
    area: '1.0 Acers',
    field: 'North-fields',
    icon: require('@assets/images/collaboration/crop-cotton.png'),
    iconBg: collabColors.grey,
  },
  {
    id: 'mango',
    name: 'Mango',
    area: '1.0 Acers',
    field: 'South-fields',
    icon: require('@assets/images/collaboration/crop-mango.png'),
    iconBg: collabColors.peach,
  },
];

export type WheelColumn = { items: string[]; initial: number };

export const startDate = {
  label: 'Starting Date',
  date: '22-10-2025',
  columns: [
    { items: ['8', '9', '10'], initial: 1 },
    { items: ['59', '00', '01'], initial: 1 },
    { items: ['AM', 'PM'], initial: 0 },
  ] satisfies WheelColumn[],
};

export const endDate = {
  label: 'End Date',
  date: '22-10-2025',
  columns: [
    { items: ['5', '6', '6'], initial: 1 },
    { items: ['59', '00', '01'], initial: 1 },
    { items: ['AM', 'PM'], initial: 1 },
  ] satisfies WheelColumn[],
};

export const pickupOptions = [
  { id: 'collect', label: 'I Will Collect' },
  { id: 'delivery', label: 'Need Delivery' },
];

export type CompensationId = 'favor' | 'paid';

export const compensationOptions: { id: CompensationId; title: string; description: string }[] = [
  { id: 'favor', title: 'Return the Favor', description: 'You Need to Help Them When they Are Required' },
  { id: 'paid', title: 'Paid Help', description: 'Complaisant With Money' },
];

export const amountPlaceholder = 'Enter Complaisant Amount';
export const notePlaceholder = 'Add a short note (optional)...';

export const fieldSummary = {
  rows: [
    { label: 'Crop', value: 'Cotton(North Field)' },
    { label: 'Task', value: 'Irrigation' },
    { label: 'Date', value: '15 Oct 2025' },
    { label: 'Schedule', value: '9:00 AM' },
    { label: 'Duration', value: '2 Hours' },
  ],
  note: 'Bring Water Pipes If you Have',
};

export const equipmentSummary = {
  rows: [
    { label: "Equipment's", value: 'Tractor' },
    { label: 'Date', value: '15 Oct 2025' },
    { label: 'Schedule', value: '9:00 AM' },
    { label: 'Duration', value: '2 Hours' },
  ],
  note: 'Need For Harvesting Wheat Before Rain',
};

export const equipmentNote = 'Need For Harvesting Wheat before Rain';
export const suggestedAmount = '$ 150';

/* ─── Request details ─────────────────────────────────────────────────── */

export type ResponseTab = 'accepted' | 'suggested' | 'rejected';

export type HelperResponse = { id: string; message: string };

export type RequestDetail = {
  id: string;
  status: RequestStatus;
  /** Task header card (field help) or selected-equipment card (equipment help). */
  kind: 'task' | 'equipment';
  title: string;
  meta: string[];
  icon: ImageSourcePropType;
  iconBg: string;
  start: string;
  end: string;
  note: string;
  amount: string;
  banner?: { text: string; tone: 'red' | 'green' };
  responses?: Record<ResponseTab, HelperResponse[]>;
  helperTitle?: string;
  cta: string;
};

const helpMessage = 'Happy to help! I have experience with Irrigation..';

const irrigationBase = {
  kind: 'task' as const,
  title: 'Irrigation',
  meta: ['Cotton', 'South-fields'],
  icon: images.detailIrrigation,
  iconBg: collabColors.blueSurface,
  start: '15 Oct, 2025 • 9:00 AM',
  end: '15 Oct, 2025 • 6:00 PM',
  note: 'Bring Water Pipe If you have',
  amount: '$ 100',
};

const fullResponses: Record<ResponseTab, HelperResponse[]> = {
  accepted: [
    { id: 'a1', message: helpMessage },
    { id: 'a2', message: helpMessage },
  ],
  suggested: [{ id: 's1', message: 'Suggested Time : 12:00 PM' }],
  rejected: [{ id: 'r1', message: 'Reason : Busy With Own Field' }],
};

export const requestDetails: Record<string, RequestDetail> = {
  'irrigation-pending': {
    ...irrigationBase,
    id: 'irrigation-pending',
    status: 'pending',
    responses: fullResponses,
    cta: 'Cancel Request',
  },
  'harvesting-progress': {
    ...irrigationBase,
    id: 'harvesting-progress',
    status: 'inProgress',
    helperTitle: 'Confirmed Helper',
    cta: 'Mark as Done',
  },
  'harvesting-expired': {
    ...irrigationBase,
    id: 'harvesting-expired',
    status: 'expired',
    banner: { text: 'Expired - No Helper Confirmed Before task Time', tone: 'red' },
    responses: { ...fullResponses, accepted: [] },
    cta: 'Edit & Repost',
  },
  'spray-completed': {
    ...irrigationBase,
    id: 'spray-completed',
    status: 'completed',
    meta: ['Cotton', 'North-fields'],
    banner: { text: 'Completed – Task finished and marked by requester', tone: 'green' },
    helperTitle: 'Helper',
    cta: 'Request Similar Help',
  },
  'tractor-pending': {
    ...irrigationBase,
    id: 'tractor-pending',
    kind: 'equipment',
    title: 'Tractor',
    meta: [],
    icon: require('@assets/images/collaboration/equipment-tractor.png'),
    iconBg: collabColors.peach,
    status: 'pending',
    note: 'Need For Harvesting Wheat',
    responses: fullResponses,
    cta: 'Cancel Request',
  },
};

export const incomingDetail = {
  start: '15 Oct, 2025 • 9:00 AM',
  end: '15 Oct, 2025 • 6:00 PM',
  note: 'Need For Harvesting Wheat',
  amount: '$ 100',
};
