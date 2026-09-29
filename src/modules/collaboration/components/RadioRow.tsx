import { Pressable, StyleSheet, Text } from 'react-native';

import { colors, fonts } from '@/theme';

import { collabColors } from '../theme';
import { Radio } from './Radio';

type RadioRowProps = { label: string; selected: boolean; onPress: () => void };

export function RadioRow({ label, selected, onPress }: RadioRowProps) {
  return (
    <Pressable
      accessibilityRole="radio"
      accessibilityState={{ selected }}
      accessibilityLabel={label}
      onPress={onPress}
      style={styles.row}>
      <Text style={[styles.label, selected && styles.labelActive]}>{label}</Text>
      <Radio selected={selected} size={20} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  row: {
    marginHorizontal: 16,
    height: 48,
    borderWidth: 1,
    borderColor: collabColors.border,
    borderRadius: 12,
    paddingLeft: 11,
    paddingRight: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  label: { fontFamily: fonts.semibold, fontSize: 14, lineHeight: 20, color: colors.textPrimary },
  labelActive: { color: colors.primary },
});
