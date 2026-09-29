import { palette } from '@/theme';

/** Colours sampled from the flattened Marketplace frames that have no exact theme token. */
export const mk = {
  ink: '#000000',
  text: palette.neutral0,
  muted: '#6D7380',
  subtle: '#A8B0B5',
  border: '#E7E8EB',
  surface: palette.neutral95,
  orange: '#E95201',
  orangeButton: '#EE5407',
  orangeSurface: palette.primary95,
  green: '#3CBF61',
  greenStrong: '#098A03',
  greenSurface: '#EDFEEC',
  gainSurface: palette.successSurface,
  red: '#E21717',
  loseSurface: '#FDE3E3',
  blueSurface: '#E1EBFF',
} as const;
