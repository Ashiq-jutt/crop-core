import { StyleSheet, View } from 'react-native';

import { colors } from '@/theme';

type PageDotsProps = {
  count: number;
  active: number;
};

/** Onboarding "Slider": 16×4 pills, 4pt apart. */
export function PageDots({ count, active }: PageDotsProps) {
  return (
    <View style={styles.row} accessibilityLabel={`Page ${active + 1} of ${count}`}>
      {Array.from({ length: count }, (_, i) => (
        <View key={i} style={[styles.dot, { backgroundColor: i === active ? colors.primary : colors.surfaceMuted }]} />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', gap: 4 },
  dot: { width: 16, height: 4, borderRadius: 24 },
});
