import type { ReactNode } from 'react';
import { StyleSheet, TextInput, View, type TextInputProps } from 'react-native';

import { colors, radius, spacing, typography } from '@/theme';

import { AppText } from './AppText';

type TextFieldProps = TextInputProps & {
  label?: string;
  right?: ReactNode;
  left?: ReactNode;
};

/** Filled text field (neutral95 surface, 8pt radius, 48pt tall). */
export function TextField({ label, right, left, style, ...inputProps }: TextFieldProps) {
  return (
    <View style={styles.wrapper}>
      {label ? (
        <AppText variant="bodySmall" color={colors.textTertiary} style={styles.label}>
          {label}
        </AppText>
      ) : null}
      <View style={styles.field}>
        {left}
        <TextInput
          placeholderTextColor={colors.textPlaceholder}
          {...inputProps}
          style={[styles.input, style]}
        />
        {right}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: { alignSelf: 'stretch' },
  label: { padding: spacing.xs },
  field: {
    height: 48,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingHorizontal: spacing.lg,
    borderRadius: radius.sm,
    backgroundColor: colors.surfaceMuted,
  },
  input: {
    flex: 1,
    ...typography.labelLargeStrong,
    color: colors.textPrimary,
    paddingVertical: 0,
  },
});
