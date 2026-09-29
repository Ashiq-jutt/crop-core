import { Pressable, ScrollView, StyleSheet, Text } from 'react-native';

import { colors, fonts, palette } from '@/theme';

type FilterChipsProps<T extends string> = {
  options: { value: T; label: string }[];
  value: T;
  onChange: (value: T) => void;
};

/** Horizontally scrolling filter pills; the active pill is peach with an orange outline. */
export function FilterChips<T extends string>({ options, value, onChange }: FilterChipsProps<T>) {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      style={styles.scroll}
      contentContainerStyle={styles.row}>
      {options.map((option) => {
        const active = option.value === value;
        return (
          <Pressable
            key={option.value}
            accessibilityRole="tab"
            accessibilityState={{ selected: active }}
            accessibilityLabel={option.label}
            onPress={() => onChange(option.value)}
            style={[styles.chip, active && styles.chipActive]}>
            <Text style={[styles.label, active && styles.labelActive]}>{option.label}</Text>
          </Pressable>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scroll: { flexGrow: 0 },
  row: { paddingHorizontal: 16, gap: 16 },
  chip: {
    height: 34,
    paddingHorizontal: 12,
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: palette.neutral95,
    backgroundColor: palette.neutral95,
    justifyContent: 'center',
  },
  chipActive: { backgroundColor: palette.primary95, borderColor: colors.primary },
  label: { fontFamily: fonts.regular, fontSize: 12, lineHeight: 16, letterSpacing: 0.8, color: palette.neutral0 },
  labelActive: { fontFamily: fonts.semibold },
});
