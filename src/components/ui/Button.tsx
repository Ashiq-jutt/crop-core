import type { ReactNode } from 'react';
import { Pressable, StyleSheet, View, type StyleProp, type ViewStyle } from 'react-native';

import { colors, radius, spacing, type TypographyVariant } from '@/theme';

import { AppText } from './AppText';

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'tonal';
type ButtonSize = 'lg' | 'md' | 'sm';

export type ButtonProps = {
  label: string;
  onPress?: () => void;
  variant?: ButtonVariant;
  size?: ButtonSize;
  disabled?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  /** Overrides the size's default label style (the kit mixes weights on same-size buttons). */
  labelVariant?: TypographyVariant;
  fullWidth?: boolean;
  style?: StyleProp<ViewStyle>;
};

const variantStyles: Record<ButtonVariant, { bg: string; fg: string; border?: string }> = {
  primary: { bg: colors.primary, fg: colors.textOnPrimary },
  secondary: { bg: colors.surfaceMuted, fg: colors.textPrimary },
  outline: { bg: colors.surface, fg: colors.textPrimary, border: colors.border },
  tonal: { bg: colors.primarySurface, fg: colors.primary },
};

const sizeStyles: Record<ButtonSize, { paddingVertical: number; text: TypographyVariant; radius: number }> = {
  lg: { paddingVertical: spacing.md, text: 'titleMedium', radius: radius.md },
  md: { paddingVertical: 6, text: 'titleMedium', radius: radius.sm },
  sm: { paddingVertical: 6, text: 'labelLargeStrong', radius: radius.sm },
};

export function Button({
  label,
  onPress,
  variant = 'primary',
  size = 'lg',
  disabled,
  leftIcon,
  rightIcon,
  labelVariant,
  fullWidth = true,
  style,
}: ButtonProps) {
  const v = variantStyles[variant];
  const s = sizeStyles[size];
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ disabled }}
      disabled={disabled}
      onPress={onPress}
      style={({ pressed }) => [
        styles.base,
        {
          backgroundColor: v.bg,
          borderColor: v.border ?? v.bg,
          paddingVertical: s.paddingVertical,
          borderRadius: s.radius,
          alignSelf: fullWidth ? 'stretch' : 'flex-start',
          opacity: disabled ? 0.5 : pressed ? 0.85 : 1,
        },
        style,
      ]}>
      {leftIcon ? <View>{leftIcon}</View> : null}
      <AppText variant={labelVariant ?? s.text} color={v.fg}>
        {label}
      </AppText>
      {rightIcon ? <View>{rightIcon}</View> : null}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.sm,
    paddingHorizontal: spacing.lg,
    borderWidth: 1,
  },
});
