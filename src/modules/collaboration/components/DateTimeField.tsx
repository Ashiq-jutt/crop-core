import { StyleSheet, Text, View } from 'react-native';
import { Calendar2 } from 'iconsax-react-native';

import { colors, fonts, palette } from '@/theme';

import type { WheelColumn } from '../data/collaboration';
import { collabColors } from '../theme';
import { TimeWheel } from './TimeWheel';

type DateTimeFieldProps = { label: string; date: string; columns: WheelColumn[] };

/** "Starting Date" label, grey date field with calendar glyph, and the time wheel below it. */
export function DateTimeField({ label, date, columns }: DateTimeFieldProps) {
  return (
    <View>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.field} accessibilityLabel={`${label} ${date}`}>
        <Text style={styles.date}>{date}</Text>
        <Calendar2 size={24} color={colors.textPrimary} />
      </View>
      <TimeWheel columns={columns} />
    </View>
  );
}

const styles = StyleSheet.create({
  label: {
    marginTop: 2,
    marginHorizontal: 20,
    fontFamily: fonts.regular,
    fontSize: 12.8,
    lineHeight: 20,
    color: palette.neutral30,
  },
  field: {
    marginTop: 1,
    marginHorizontal: 16,
    height: 48,
    borderRadius: 12,
    backgroundColor: collabColors.grey,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingLeft: 15,
    paddingRight: 17,
  },
  date: { fontFamily: fonts.semibold, fontSize: 14, lineHeight: 20, color: colors.textPrimary },
});
