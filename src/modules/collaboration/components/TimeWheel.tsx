import { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { colors, fonts } from '@/theme';

import type { WheelColumn } from '../data/collaboration';
import { collabColors } from '../theme';

/** Left edge of each wheel column, measured from the frame (hour, minute, meridiem). */
const columnLeft = [130, 156, 191.5];
const ROW = 36;
const GAP = 4;
const PAD = 8;

/** Three-row time wheel: tap the value above or below the highlighted band to move it. */
export function TimeWheel({ columns }: { columns: WheelColumn[] }) {
  const [indexes, setIndexes] = useState(() => columns.map((c) => c.initial));

  const move = (col: number, delta: number) =>
    setIndexes((prev) => prev.map((v, i) => (i === col ? v + delta : v)));

  return (
    <View style={styles.wheel}>
      <View style={styles.band} />
      {columns.map((column, col) => {
        const index = indexes[col];
        return (
          <View key={col} style={[styles.column, { left: columnLeft[col] }]}>
            {[-1, 0, 1].map((offset) => {
              const value = column.items[index + offset] ?? '';
              const selected = offset === 0;
              return (
                <Pressable
                  key={offset}
                  accessibilityRole="button"
                  accessibilityLabel={selected ? `Selected ${value}` : `Select ${value}`}
                  disabled={selected || value === ''}
                  onPress={() => move(col, offset)}
                  style={styles.cell}>
                  <Text style={selected ? styles.selected : styles.value}>{value}</Text>
                </Pressable>
              );
            })}
          </View>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  wheel: {
    height: PAD * 2 + ROW * 3 + GAP * 2,
    marginHorizontal: 16,
    marginTop: 8,
    borderRadius: 12,
    backgroundColor: collabColors.grey,
  },
  band: {
    position: 'absolute',
    top: PAD + ROW + GAP,
    left: 98,
    width: 147,
    height: ROW,
    borderRadius: 8,
    backgroundColor: colors.surface,
  },
  column: { position: 'absolute', top: PAD, gap: GAP },
  cell: { height: ROW, justifyContent: 'center', minWidth: 24 },
  value: { fontFamily: fonts.regular, fontSize: 14, lineHeight: 20, color: '#8B909C' },
  selected: { fontFamily: fonts.semibold, fontSize: 14, lineHeight: 20, color: colors.primary },
});
