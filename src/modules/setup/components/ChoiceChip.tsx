import type { ReactNode } from 'react';
import { Pressable, StyleSheet } from 'react-native';

import { AppText } from '@/components/ui';
import { colors, fonts } from '@/theme';

type ChoiceChipProps = {
  label: string;
  selected: boolean;
  onPress: () => void;
  leading?: ReactNode;
  /** Crop-category chips are 41pt tall with 8pt corners; stage / irrigation chips 40pt with 12pt. */
  compact?: boolean;
};

/** Outlined option chip; the selected one gets an orange border, tint and bold label. */
export function ChoiceChip({ label, selected, onPress, leading, compact = false }: ChoiceChipProps) {
  return (
    <Pressable
      accessibilityRole="radio"
      accessibilityState={{ selected }}
      accessibilityLabel={label}
      onPress={onPress}
      style={({ pressed }) => [
        styles.chip,
        compact ? styles.compact : styles.regular,
        { paddingLeft: leading ? 8 : compact ? 16 : 15 },
        selected && styles.selected,
        pressed && styles.pressed,
      ]}>
      {leading}
      <AppText style={[styles.label, selected && styles.labelSelected]} color={colors.textPrimary}>
        {label}
      </AppText>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    borderWidth: 1.5,
    borderColor: colors.border,
    backgroundColor: colors.surface,
  },
  compact: { height: 41, paddingRight: 16, borderRadius: 8 },
  regular: { height: 40, paddingRight: 15, borderRadius: 12 },
  selected: { borderColor: colors.primary, backgroundColor: colors.primarySurface },
  pressed: { opacity: 0.85 },
  label: { fontFamily: fonts.regular, fontSize: 12, lineHeight: 16, letterSpacing: 0.3 },
  labelSelected: { fontFamily: fonts.semibold },
});
