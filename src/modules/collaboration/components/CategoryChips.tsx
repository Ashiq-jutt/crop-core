import { Pressable, ScrollView, StyleSheet, Text } from 'react-native';
import { Image } from 'expo-image';

import { colors, fonts } from '@/theme';

import type { CategoryChip } from '../data/collaboration';
import { collabColors } from '../theme';

type CategoryChipsProps = { chips: CategoryChip[]; value: string; onChange: (id: string) => void };

export function CategoryChips({ chips, value, onChange }: CategoryChipsProps) {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      style={styles.scroll}
      contentContainerStyle={styles.row}>
      {chips.map((c) => {
        const active = c.id === value;
        return (
          <Pressable
            key={c.id}
            accessibilityRole="button"
            accessibilityState={{ selected: active }}
            onPress={() => onChange(c.id)}
            style={[styles.chip, active && styles.chipActive]}>
            <Image source={c.icon} style={{ width: c.iconWidth, height: 16 }} contentFit="contain" />
            <Text style={[styles.label, active && styles.labelActive]}>{c.label}</Text>
          </Pressable>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scroll: { marginTop: 15, flexGrow: 0 },
  row: { gap: 11, paddingHorizontal: 16 },
  chip: {
    height: 42,
    paddingHorizontal: 14,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: collabColors.border,
    backgroundColor: colors.surface,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
  },
  chipActive: { backgroundColor: colors.primarySurface, borderColor: colors.primary },
  label: { fontFamily: fonts.regular, fontSize: 13, lineHeight: 18, color: colors.textPrimary },
  labelActive: { fontFamily: fonts.medium },
});
