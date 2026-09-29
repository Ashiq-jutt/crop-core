import { Pressable, StyleSheet } from 'react-native';

import { AppText } from '@/components/ui';
import { colors } from '@/theme';

type Props = { label: string; selected: boolean; onPress: () => void; flex?: boolean };

/** 32pt bordered choice chip; selected = orange outline on peach. */
export function OptionChip({ label, selected, onPress, flex }: Props) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ selected }}
      accessibilityLabel={label}
      onPress={onPress}
      style={[styles.chip, flex && styles.flex, selected && styles.selected]}>
      <AppText variant={selected ? 'labelMediumStrong' : 'labelMedium'}>{label}</AppText>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  chip: {
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 15,
    borderWidth: 1.5,
    borderColor: '#E4E7EA',
    borderRadius: 10,
    backgroundColor: colors.surface,
  },
  flex: { flex: 1 },
  selected: { borderColor: '#ED6F26', backgroundColor: colors.primarySurface },
});
