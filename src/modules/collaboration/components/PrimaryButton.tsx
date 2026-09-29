import type { ReactNode } from 'react';
import { Pressable, StyleSheet, Text, type StyleProp, type ViewStyle } from 'react-native';

import { colors, fonts } from '@/theme';

type PrimaryButtonProps = {
  label: string;
  onPress: () => void;
  variant?: 'filled' | 'outline';
  rightIcon?: ReactNode;
  style?: StyleProp<ViewStyle>;
};

export function PrimaryButton({ label, onPress, variant = 'filled', rightIcon, style }: PrimaryButtonProps) {
  const outline = variant === 'outline';
  return (
    <Pressable
      accessibilityRole="button"
      onPress={onPress}
      style={({ pressed }) => [styles.button, outline && styles.outline, pressed && styles.pressed, style]}>
      <Text style={[styles.label, outline && styles.outlineLabel]}>{label}</Text>
      {rightIcon}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    height: 50,
    borderRadius: 12,
    backgroundColor: colors.primary,
    borderWidth: 1,
    borderColor: colors.primary,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
  },
  outline: { backgroundColor: colors.surface },
  pressed: { opacity: 0.85 },
  label: { fontFamily: fonts.medium, fontSize: 16.5, lineHeight: 22, color: colors.textOnPrimary },
  outlineLabel: { fontSize: 15, color: colors.primary },
});
