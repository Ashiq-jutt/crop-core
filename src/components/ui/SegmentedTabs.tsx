import { Pressable, ScrollView, StyleSheet } from 'react-native';

import { colors, radius, spacing } from '@/theme';

import { AppText } from './AppText';

type SegmentedTabsProps<T extends string> = {
  options: { value: T; label: string }[];
  value: T;
  onChange: (value: T) => void;
  /** `pill` = scrollable filter chips, `segment` = equal-width segmented control. */
  variant?: 'pill' | 'segment';
};

export function SegmentedTabs<T extends string>({ options, value, onChange, variant = 'segment' }: SegmentedTabsProps<T>) {
  const items = options.map((o) => {
    const active = o.value === value;
    return (
      <Pressable
        key={o.value}
        accessibilityRole="tab"
        accessibilityState={{ selected: active }}
        onPress={() => onChange(o.value)}
        style={[
          variant === 'segment' ? styles.segment : styles.pill,
          active ? styles.active : variant === 'pill' ? styles.pillIdle : null,
        ]}>
        <AppText
          variant={active ? 'labelLargeStrong' : 'labelLarge'}
          color={active ? colors.textOnPrimary : colors.textPrimary}>
          {o.label}
        </AppText>
      </Pressable>
    );
  });

  if (variant === 'pill') {
    return (
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.pillRow}>
        {items}
      </ScrollView>
    );
  }
  return <ScrollView scrollEnabled={false} contentContainerStyle={styles.segmentRow}>{items}</ScrollView>;
}

const styles = StyleSheet.create({
  segmentRow: {
    flexDirection: 'row',
    padding: spacing.xs,
    borderRadius: radius.md,
    backgroundColor: colors.surfaceMuted,
  },
  segment: { flex: 1, alignItems: 'center', paddingVertical: spacing.sm, borderRadius: radius.sm },
  pillRow: { gap: spacing.sm },
  pill: { paddingHorizontal: spacing.lg, paddingVertical: spacing.sm, borderRadius: radius.pill },
  pillIdle: { backgroundColor: colors.surfaceMuted },
  active: { backgroundColor: colors.primary },
});
