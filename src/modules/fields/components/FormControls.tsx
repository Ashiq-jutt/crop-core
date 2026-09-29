import { Pressable, StyleSheet, Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { ArrowDown2 } from 'iconsax-react-native';

import { colors, palette } from '@/theme';

import { font, ink } from './text';

type SelectBoxProps = {
  label?: string;
  value: string;
  options: readonly string[];
  onChange: (value: string) => void;
  style?: StyleProp<ViewStyle>;
};

/** Grey 48pt select; tapping cycles through the options. */
export function SelectBox({ label, value, options, onChange, style }: SelectBoxProps) {
  const next = () => onChange(options[(options.indexOf(value) + 1) % options.length]);
  return (
    <View style={style}>
      {label ? <Text style={styles.label}>{label}</Text> : null}
      <Pressable accessibilityRole="button" accessibilityLabel={`${label ?? 'Select'}: ${value}`} onPress={next} style={styles.box}>
        <Text style={styles.value}>{value}</Text>
        <ArrowDown2 size={24} color={ink.title} />
      </Pressable>
    </View>
  );
}

export function SwitchToggle({ value, onChange, label }: { value: boolean; onChange: (v: boolean) => void; label: string }) {
  return (
    <Pressable
      accessibilityRole="switch"
      accessibilityState={{ checked: value }}
      accessibilityLabel={label}
      onPress={() => onChange(!value)}
      style={[styles.track, value ? styles.trackOn : styles.trackOff]}>
      <View style={[styles.knob, value ? styles.knobOn : styles.knobOff]} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  label: { ...font('regular', 12.5, 18, '#5C616B'), marginLeft: 4, marginBottom: 3 },
  box: {
    height: 48,
    borderRadius: 12,
    backgroundColor: palette.neutral95,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingLeft: 16,
    paddingRight: 16,
  },
  value: font('medium', 14.5, 22, ink.title),
  track: { width: 46, height: 26, borderRadius: 13, justifyContent: 'center', paddingHorizontal: 3 },
  trackOn: { backgroundColor: colors.primary },
  trackOff: { backgroundColor: palette.neutral90 },
  knob: { width: 20, height: 20, borderRadius: 10, backgroundColor: palette.neutral100 },
  knobOn: { alignSelf: 'flex-end' },
  knobOff: { alignSelf: 'flex-start' },
});
