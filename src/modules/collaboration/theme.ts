import { StyleSheet, type TextStyle } from 'react-native';

import { colors, fonts, palette } from '@/theme';

/** Colours sampled from the "Colbrative Farming" frames that have no matching theme token. */
export const collabColors = {
  border: '#E7E8EB',
  headerDivider: '#F4F4F7',
  grey: palette.neutral95,
  greySurface: palette.neutral90,
  greyText: palette.neutral10,
  peach: palette.primary95,
  pending: colors.warning,
  pendingSurface: colors.warningSurface,
  blue: '#0086EC',
  blueSurface: '#E2F2FE',
  green: colors.success,
  greenSurface: colors.successSurface,
  red: colors.danger,
  redSurface: colors.dangerSurface,
  lavender: '#EFE8F7',
} as const;

/** Text styles shared by several components; sizes measured on the flattened frames. */
export const text = StyleSheet.create({
  section: { fontFamily: fonts.semibold, fontSize: 16.5, lineHeight: 24, color: colors.textPrimary },
  meta: { fontFamily: fonts.regular, fontSize: 13, lineHeight: 16, color: palette.neutralColor10 },
}) satisfies Record<string, TextStyle>;
