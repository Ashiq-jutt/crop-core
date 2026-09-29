import { StyleSheet, Text, View } from 'react-native';
import { Calendar2 } from 'iconsax-react-native';

import { colors, fonts, palette } from '@/theme';

import { collabColors } from '../theme';

/** Read-only "Starting Date" / "End Date" row on the request details screens. */
export function DateTimeRow({ label, value, first }: { label: string; value: string; first?: boolean }) {
  return (
    <View style={first ? styles.first : styles.spaced}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.row}>
        <Calendar2 size={24} color={colors.textPrimary} />
        <Text style={styles.value}>{value}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  first: { paddingTop: 2 },
  spaced: { marginTop: 10 },
  label: { marginHorizontal: 20, fontFamily: fonts.regular, fontSize: 12.8, lineHeight: 20, color: palette.neutral30 },
  row: {
    marginTop: 6,
    marginHorizontal: 16,
    height: 48,
    borderWidth: 1,
    borderColor: collabColors.border,
    borderRadius: 12,
    paddingHorizontal: 11,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  value: { fontFamily: fonts.semibold, fontSize: 13, lineHeight: 20, color: colors.textPrimary },
});
