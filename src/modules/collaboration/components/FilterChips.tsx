import { Pressable, ScrollView, StyleSheet, Text } from 'react-native';

import { colors, fonts } from '@/theme';

import { collabColors } from '../theme';

type FilterChipsProps<T extends string> = {
  chips: { id: T; label: string }[];
  value: T;
  onChange: (id: T) => void;
};

export function FilterChips<T extends string>({ chips, value, onChange }: FilterChipsProps<T>) {
  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.scroll} contentContainerStyle={styles.row}>
      {chips.map((c) => {
        const active = c.id === value;
        return (
          <Pressable
            key={c.id}
            accessibilityRole="button"
            accessibilityState={{ selected: active }}
            onPress={() => onChange(c.id)}
            style={[styles.chip, active && styles.chipActive]}>
            <Text style={[styles.label, active && styles.labelActive]}>{c.label}</Text>
          </Pressable>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scroll: { marginHorizontal: 16, marginTop: 15, flexGrow: 0 },
  row: { gap: 15 },
  chip: {
    height: 34,
    paddingHorizontal: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: collabColors.grey,
    backgroundColor: collabColors.grey,
    justifyContent: 'center',
  },
  chipActive: { backgroundColor: colors.primarySurface, borderColor: colors.primary },
  labelActive: { fontFamily: fonts.medium },
  label: { fontFamily: fonts.regular, fontSize: 13, lineHeight: 18, color: colors.textPrimary },
});
