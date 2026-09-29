import { Pressable, StyleSheet, View } from 'react-native';

import { colors, palette } from '@/theme';

type ToggleSwitchProps = { value: boolean; onChange: (value: boolean) => void; accessibilityLabel: string };

/** 44×24 pill switch drawn to match the Figma control (orange on, grey off). */
export function ToggleSwitch({ value, onChange, accessibilityLabel }: ToggleSwitchProps) {
  return (
    <Pressable
      accessibilityRole="switch"
      accessibilityState={{ checked: value }}
      accessibilityLabel={accessibilityLabel}
      hitSlop={8}
      onPress={() => onChange(!value)}
      style={[styles.track, value ? styles.on : styles.off]}>
      <View style={[styles.thumb, value ? styles.thumbOn : styles.thumbOff]} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  track: { width: 44, height: 24, borderRadius: 12, padding: 4, justifyContent: 'center' },
  on: { backgroundColor: colors.primary },
  off: { backgroundColor: palette.neutral90 },
  thumb: { width: 16, height: 16, borderRadius: 8, backgroundColor: colors.surface },
  thumbOn: { alignSelf: 'flex-end' },
  thumbOff: { alignSelf: 'flex-start' },
});
