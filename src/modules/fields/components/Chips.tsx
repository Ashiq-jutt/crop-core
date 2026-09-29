import type { ReactNode } from 'react';
import { Pressable, StyleSheet, Text, View, type StyleProp, type TextStyle, type ViewStyle } from 'react-native';
import { Edit2 } from 'iconsax-react-native';

import { colors, palette } from '@/theme';

import type { CropStatus } from '../data/fields';
import { font, ink } from './text';

type OptionChipProps = {
  label: string;
  selected?: boolean;
  onPress?: () => void;
  height?: number;
  /** Selected chips keep the neutral text but switch to a bolder weight. */
  labelStyle?: StyleProp<TextStyle>;
  selectedLabelStyle?: StyleProp<TextStyle>;
  style?: StyleProp<ViewStyle>;
  leading?: ReactNode;
};

/** Outlined selectable pill (soil type, stage, irrigation type, time offsets…). */
export function OptionChip({
  label,
  selected = false,
  onPress,
  height = 40,
  labelStyle,
  selectedLabelStyle,
  style,
  leading,
}: OptionChipProps) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ selected }}
      accessibilityLabel={label}
      onPress={onPress}
      style={[styles.option, { height, borderRadius: 12 }, selected && styles.optionSelected, style]}>
      {leading}
      <Text style={[styles.optionLabel, labelStyle, selected && styles.optionLabelSelected, selected && selectedLabelStyle]}>
        {label}
      </Text>
    </Pressable>
  );
}

/** Status pill: "Healthy ✅", "Irrigation Due 💧", "Moderate". */
export function StatusChip({ status, style }: { status: CropStatus; style?: StyleProp<ViewStyle> }) {
  const success = status.tone === 'success';
  const [, text, emoji] = /^(.*?)\s*(\p{Extended_Pictographic}\uFE0F?)?$/u.exec(status.label) ?? [];
  return (
    <View style={[styles.status, { backgroundColor: success ? ink.successSurface : ink.warningSurface }, style]}>
      <Text style={[styles.statusLabel, { color: success ? ink.success : ink.warning }]}>
        {text}
        {emoji ? <Text style={styles.statusEmoji}>{` ${emoji}`}</Text> : null}
      </Text>
    </View>
  );
}

type PillButtonProps = { label: string; onPress?: () => void; icon?: ReactNode; style?: StyleProp<ViewStyle> };

/** Vertical "more" dots drawn in the list cards (heavier than the iconsax glyph). */
export function MoreDots({ horizontal = false }: { horizontal?: boolean }) {
  return (
    <View style={[styles.dots, horizontal && styles.dotsRow]}>
      <View style={styles.dot} />
      <View style={styles.dot} />
      <View style={styles.dot} />
    </View>
  );
}

/** Small grey action pill with a trailing pencil ("Edit Field Info", "Add Crop", "Add Task"). */
export function PillButton({ label, onPress, icon, style }: PillButtonProps) {
  return (
    <Pressable accessibilityRole="button" accessibilityLabel={label} onPress={onPress} style={[styles.pill, style]}>
      <Text style={styles.pillLabel}>{label}</Text>
      {icon ?? <Edit2 size={18} color={ink.title} />}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingHorizontal: 14.5,
    borderWidth: 1.5,
    borderColor: ink.chipBorder,
    backgroundColor: palette.neutral100,
  },
  optionSelected: { borderColor: colors.primary, backgroundColor: palette.primary95 },
  optionLabel: font('regular', 12.5, 18, ink.title),
  optionLabelSelected: { fontFamily: font('semibold', 12.5, 18).fontFamily },
  status: { height: 32, borderRadius: 12, paddingHorizontal: 12, justifyContent: 'center', alignItems: 'center' },
  statusLabel: { ...font('regular', 12, 20), letterSpacing: 0.5 },
  statusEmoji: { fontSize: 11, letterSpacing: 0 },
  dots: { width: 24, height: 24, alignItems: 'center', justifyContent: 'center', gap: 2.5 },
  dotsRow: { flexDirection: 'row' },
  dot: { width: 5, height: 5, borderRadius: 2.5, backgroundColor: ink.title },
  pill: {
    height: 32,
    borderRadius: 16,
    paddingHorizontal: 8,
    paddingLeft: 8,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: palette.neutral95,
  },
  pillLabel: { ...font('medium', 12.5, 18, ink.title), letterSpacing: 0.3 },
});
