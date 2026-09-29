import { Pressable, StyleSheet, Text, type StyleProp, type ViewStyle } from 'react-native';

import { colors, fonts } from '@/theme';

type PrimaryButtonProps = {
  label: string;
  onPress: () => void;
  variant?: 'filled' | 'danger-outline';
  /** The design sets some CTA labels in Medium instead of SemiBold. */
  medium?: boolean;
  style?: StyleProp<ViewStyle>;
};

export function PrimaryButton({ label, onPress, variant = 'filled', medium = false, style }: PrimaryButtonProps) {
  const outline = variant === 'danger-outline';
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={label}
      onPress={onPress}
      style={({ pressed }) => [styles.base, outline ? styles.outline : styles.filled, pressed && styles.pressed, style]}>
      <Text style={[styles.label, outline ? styles.labelOutline : styles.labelFilled, medium && styles.labelMedium]}>{label}</Text>
    </Pressable>
  );
}

const DANGER = '#E21717';

const styles = StyleSheet.create({
  base: { height: 48, borderRadius: 16, alignItems: 'center', justifyContent: 'center' },
  filled: { backgroundColor: colors.primary },
  outline: { borderWidth: 1, borderColor: DANGER, backgroundColor: colors.surface },
  pressed: { opacity: 0.85 },
  label: { fontFamily: fonts.semibold, fontSize: 16, lineHeight: 24 },
  labelFilled: { color: colors.textOnPrimary },
  labelOutline: { fontFamily: fonts.regular, fontSize: 15, color: DANGER },
  labelMedium: { fontFamily: fonts.medium },
});
