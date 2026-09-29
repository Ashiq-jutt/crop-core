import { Pressable, StyleSheet, View } from 'react-native';

import { AppText } from '@/components/ui';
import { colors, fonts, palette } from '@/theme';

type Column = { options: string[]; index: number; cyclic: boolean; onChange: (index: number) => void; label: string };

type Props = { hour: Column; minute: Column; period: Column };

const ROW = 40;

function neighbour(options: string[], index: number, step: number, cyclic: boolean) {
  const next = index + step;
  if (cyclic) return (next + options.length) % options.length;
  return next >= 0 && next < options.length ? next : null;
}

/** Three-row time wheel: tap the value above or below to step the column. */
function WheelColumn({ options, index, cyclic, onChange, label, width, strong }: Column & { width: number; strong: boolean }) {
  const prev = neighbour(options, index, -1, cyclic);
  const next = neighbour(options, index, 1, cyclic);
  const cell = (i: number | null, selected: boolean) => (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={i === null ? undefined : `${label} ${options[i]}`}
      disabled={i === null || selected}
      onPress={() => i !== null && onChange(i)}
      style={styles.cell}>
      <AppText
        style={[styles.value, selected && (strong ? styles.selectedStrong : styles.selected)]}
        color={selected ? colors.primary : i === next && !cyclic ? palette.neutral60 : palette.neutral50}>
        {i === null ? '' : options[i]}
      </AppText>
    </Pressable>
  );
  return (
    <View style={{ width }}>
      {cell(prev, false)}
      {cell(index, true)}
      {cell(next, false)}
    </View>
  );
}

export function TimeWheel({ hour, minute, period }: Props) {
  return (
    <View style={styles.box}>
      <View style={styles.highlight} />
      <View style={styles.columns}>
        <WheelColumn {...hour} width={30} strong />
        <WheelColumn {...minute} width={32} strong />
        <WheelColumn {...period} width={40} strong={false} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  box: { height: 132, justifyContent: 'center', borderRadius: 12, backgroundColor: palette.neutral95 },
  highlight: {
    position: 'absolute',
    left: 97,
    right: 97,
    top: 48,
    height: 36,
    borderRadius: 8,
    backgroundColor: colors.surface,
  },
  columns: { flexDirection: 'row', justifyContent: 'center' },
  cell: { height: ROW, alignItems: 'center', justifyContent: 'center' },
  value: { fontFamily: fonts.regular, fontSize: 14, lineHeight: 20 },
  selected: { fontFamily: fonts.medium },
  selectedStrong: { fontFamily: fonts.semibold },
});
