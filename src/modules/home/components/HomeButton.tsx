import { Pressable, StyleSheet } from 'react-native';

import { AppText } from '@/components/ui';
import { colors } from '@/theme';

type Props = { label: string; variant?: 'primary' | 'secondary'; onPress?: () => void };

/** 36pt card action: orange (14 semibold, white) or grey (14 regular). */
export function HomeButton({ label, variant = 'primary', onPress }: Props) {
  const primary = variant === 'primary';
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={label}
      onPress={onPress}
      style={({ pressed }) => [styles.button, primary ? styles.primary : styles.secondary, pressed && styles.pressed]}>
      <AppText variant={primary ? 'labelLargeStrong' : 'labelLarge'} color={primary ? colors.textOnPrimary : colors.textPrimary}>
        {label}
      </AppText>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: { flex: 1, height: 36, alignItems: 'center', justifyContent: 'center', borderRadius: 10 },
  primary: { backgroundColor: colors.primary },
  secondary: { backgroundColor: colors.surfaceMuted },
  pressed: { opacity: 0.85 },
});
