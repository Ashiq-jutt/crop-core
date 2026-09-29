import { Pressable, StyleSheet, Text, View } from 'react-native';

import { colors, fonts, palette } from '@/theme';

type ToggleRowProps = { label: string; value: boolean; onChange: (value: boolean) => void };

export function ToggleRow({ label, value, onChange }: ToggleRowProps) {
  return (
    <View style={styles.row}>
      <Text style={styles.label}>{label}</Text>
      <Pressable
        accessibilityRole="switch"
        accessibilityLabel={label}
        accessibilityState={{ checked: value }}
        onPress={() => onChange(!value)}
        style={[styles.track, value && styles.trackOn]}>
        <View style={[styles.knob, value && styles.knobOn]} />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    marginHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  label: { fontFamily: fonts.semibold, fontSize: 14, lineHeight: 20, color: colors.textPrimary },
  track: {
    width: 44,
    height: 24,
    borderRadius: 12,
    backgroundColor: palette.neutral90,
    padding: 3,
    justifyContent: 'center',
  },
  trackOn: { backgroundColor: colors.primary },
  knob: { width: 18, height: 18, borderRadius: 9, backgroundColor: colors.surface },
  knobOn: { alignSelf: 'flex-end' },
});
