import { Pressable, ScrollView, StyleSheet } from 'react-native';

import { AppText } from '@/components/ui';
import { colors, fonts, palette } from '@/theme';

import { weekDays } from '../data/tasks';

type Props = { value: number; onChange: (index: number) => void };

/** Horizontally scrolling 64pt day tiles: weekday, date and task count. */
export function DateStrip({ value, onChange }: Props) {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      style={styles.scroller}
      contentContainerStyle={styles.content}>
      {weekDays.map((d, i) => {
        const selected = i === value;
        return (
          <Pressable
            key={d.id}
            accessibilityRole="button"
            accessibilityState={{ selected }}
            accessibilityLabel={`${d.label} ${d.date}`}
            onPress={() => onChange(i)}
            style={[styles.day, selected && styles.daySelected]}>
            <AppText style={styles.weekday}>{d.label}</AppText>
            <AppText style={styles.date}>{d.date}</AppText>
            <AppText style={styles.count}>{d.count}</AppText>
          </Pressable>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scroller: { flexGrow: 0, marginHorizontal: 16 },
  content: { gap: 16 },
  day: {
    width: 64,
    height: 80,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: palette.neutral95,
    borderRadius: 14,
    backgroundColor: palette.neutral95,
  },
  daySelected: { borderColor: '#ED6F26', backgroundColor: colors.primarySurface },
  weekday: { fontFamily: fonts.outfit, fontSize: 12, lineHeight: 16, letterSpacing: 0.25, color: colors.textPrimary },
  date: { fontFamily: fonts.semibold, fontSize: 17, lineHeight: 22, marginTop: 2, color: colors.textPrimary },
  count: { fontFamily: fonts.outfit, fontSize: 12, lineHeight: 16, marginTop: 3, color: colors.textPrimary },
});
