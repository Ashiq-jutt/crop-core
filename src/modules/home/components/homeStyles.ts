import { StyleSheet } from 'react-native';

import { colors } from '@/theme';

/** Shared Home card chrome: 1pt neutral90 hairline, 12pt radius, 12pt inset (11 + border). */
export const homeStyles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 12,
    paddingHorizontal: 11,
    paddingVertical: 11,
  },
  buttonRow: { flexDirection: 'row', gap: 13 },
});
