import { Pressable, StyleSheet, type StyleProp, type ViewStyle } from 'react-native';

import { AppText } from '@/components/ui';
import { colors, fonts } from '@/theme';

type PrimaryButtonProps = { label: string; onPress: () => void; disabled?: boolean; style?: StyleProp<ViewStyle> };

/** Full-width 50pt orange CTA with a DM Sans Medium label, as drawn on the onboarding & setup frames. */
export function PrimaryButton({ label, onPress, disabled, style }: PrimaryButtonProps) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={label}
      accessibilityState={{ disabled }}
      disabled={disabled}
      onPress={onPress}
      style={({ pressed }) => [styles.button, (pressed || disabled) && styles.dimmed, style]}>
      <AppText style={styles.label} color={colors.textOnPrimary}>
        {label}
      </AppText>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 12,
    backgroundColor: colors.primary,
  },
  dimmed: { opacity: 0.6 },
  label: { fontFamily: fonts.medium, fontSize: 16, lineHeight: 24, letterSpacing: 0.15 },
});
