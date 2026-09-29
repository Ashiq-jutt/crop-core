import type { ReactNode } from 'react';
import { Pressable, type StyleProp, type ViewStyle } from 'react-native';

import { colors, radius } from '@/theme';

type IconButtonProps = {
  icon: ReactNode;
  onPress?: () => void;
  accessibilityLabel: string;
  /** Inner padding; Figma uses 8 for 24pt icons and 4 for 16pt icons. */
  padding?: number;
  background?: string;
  style?: StyleProp<ViewStyle>;
};

/** Circular icon container ("Iocn Container" in Figma). */
export function IconButton({
  icon,
  onPress,
  accessibilityLabel,
  padding = 8,
  background = colors.surfaceMuted,
  style,
}: IconButtonProps) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel}
      onPress={onPress}
      hitSlop={8}
      style={({ pressed }) => [
        { padding, borderRadius: radius.xl, backgroundColor: background, opacity: pressed ? 0.7 : 1 },
        style,
      ]}>
      {icon}
    </Pressable>
  );
}
