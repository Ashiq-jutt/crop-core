import type { ReactNode } from 'react';
import { Pressable, StyleSheet, Text, type StyleProp, type TextStyle, type ViewStyle } from 'react-native';

import { colors, palette } from '@/theme';

import { font, ink } from './text';

type Variant = 'primary' | 'outlinePrimary' | 'muted' | 'outline';

const variants: Record<Variant, { bg: string; fg: string; border: string }> = {
  primary: { bg: colors.primary, fg: palette.neutral100, border: colors.primary },
  outlinePrimary: { bg: palette.neutral100, fg: colors.primary, border: colors.primary },
  muted: { bg: palette.neutral95, fg: ink.title, border: palette.neutral95 },
  outline: { bg: palette.neutral100, fg: ink.title, border: ink.chipBorder },
};

type ActionButtonProps = {
  label: string;
  onPress?: () => void;
  variant?: Variant;
  height?: number;
  radius?: number;
  icon?: ReactNode;
  leftIcon?: ReactNode;
  labelStyle?: StyleProp<TextStyle>;
  style?: StyleProp<ViewStyle>;
};

export function ActionButton({
  label,
  onPress,
  variant = 'primary',
  height = 48,
  radius = 12,
  icon,
  leftIcon,
  labelStyle,
  style,
}: ActionButtonProps) {
  const v = variants[variant];
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={label}
      onPress={onPress}
      style={({ pressed }) => [
        styles.base,
        { height, borderRadius: radius, backgroundColor: v.bg, borderColor: v.border, opacity: pressed ? 0.85 : 1 },
        style,
      ]}>
      {leftIcon}
      <Text style={[styles.label, { color: v.fg }, labelStyle]}>{label}</Text>
      {icon}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    borderWidth: 1,
    paddingHorizontal: 12,
  },
  label: font('semibold', 14.5, 24),
});
