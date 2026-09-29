import type { ReactNode } from 'react';
import { Pressable, StyleSheet } from 'react-native';

import { collabColors } from '../theme';

type RoundIconButtonProps = { icon: ReactNode; accessibilityLabel: string; onPress: () => void; size?: number };

export function RoundIconButton({ icon, accessibilityLabel, onPress, size = 36 }: RoundIconButtonProps) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel}
      onPress={onPress}
      hitSlop={4}
      style={({ pressed }) => [
        styles.button,
        { width: size, height: size, borderRadius: size / 2, opacity: pressed ? 0.7 : 1 },
      ]}>
      {icon}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: { backgroundColor: collabColors.grey, alignItems: 'center', justifyContent: 'center' },
});
