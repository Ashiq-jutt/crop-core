import type { ReactNode } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { ArrowDown2 } from 'iconsax-react-native';

import { colors, fonts, radius, spacing } from '@/theme';

import { AppText } from './AppText';

type SelectFieldProps = {
  label?: string;
  value?: string;
  placeholder?: string;
  onPress?: () => void;
  leading?: ReactNode;
  trailing?: ReactNode;
};

/** Read-only field that opens a picker/sheet — same shell as TextField. */
export function SelectField({ label, value, placeholder, onPress, leading, trailing }: SelectFieldProps) {
  return (
    <View>
      {label ? (
        <AppText variant="bodySmall" color={colors.textTertiary} style={styles.label}>
          {label}
        </AppText>
      ) : null}
      <Pressable accessibilityRole="button" onPress={onPress} style={styles.field}>
        {leading}
        <AppText
          variant={value ? 'labelLargeStrong' : 'labelLarge'}
          color={value ? colors.textPrimary : colors.textPlaceholder}
          style={styles.value}
          numberOfLines={1}>
          {value ?? placeholder}
        </AppText>
        {trailing ?? <ArrowDown2 size={20} color={colors.textPrimary} />}
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  label: { fontFamily: fonts.outfit, padding: spacing.xs },
  field: {
    height: 48,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingHorizontal: spacing.lg,
    borderRadius: radius.sm,
    backgroundColor: colors.surfaceMuted,
  },
  value: { flex: 1 },
});
