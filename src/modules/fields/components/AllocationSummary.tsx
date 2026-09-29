import { Pressable, StyleSheet, Text, View } from 'react-native';
import { TickCircle } from 'iconsax-react-native';

import { DashedDivider } from '@/components/ui';
import { palette } from '@/theme';

import { formatAcres } from './AllocationCard';
import { font, ink } from './text';

type AllocationSummaryProps = { allocated: number; total: number; onReset: () => void };

/** "Total Allocated" card with the green progress bar and the voice tip. */
export function AllocationSummary({ allocated, total, onReset }: AllocationSummaryProps) {
  const ratio = total > 0 ? Math.min(1, allocated / total) : 0;
  return (
    <View style={styles.card}>
      <View style={styles.row}>
        <Text style={styles.label}>Total Allocated</Text>
        <View style={styles.valueRow}>
          <Text style={styles.label}>{`${formatAcres(allocated)} / ${formatAcres(total)}`}</Text>
          <TickCircle size={18} color={palette.success} variant="Bold" />
        </View>
      </View>
      <DashedDivider style={styles.rule} />
      <View style={styles.track}>
        <View style={[styles.fill, { width: `${ratio * 100}%` }]} />
      </View>
      <View style={[styles.row, styles.tipRow]}>
        <Text style={styles.tip}>Tip : Use Mic and Say “Equal Distribution”</Text>
        <Pressable accessibilityRole="button" accessibilityLabel="Reset allocation" onPress={onReset} style={styles.reset}>
          <Text style={styles.resetLabel}>Reset</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderWidth: 1,
    borderColor: '#E7E8EB',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingTop: 10,
    paddingBottom: 9,
    backgroundColor: palette.neutral100,
  },
  row: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  valueRow: { flexDirection: 'row', alignItems: 'center', gap: 5 },
  label: font('regular', 14.5, 20, ink.title),
  rule: { marginTop: 9 },
  track: { height: 18, borderRadius: 9, backgroundColor: palette.successSurface, marginTop: 7, overflow: 'hidden' },
  fill: { height: 18, borderRadius: 9, backgroundColor: palette.success },
  tipRow: { marginTop: 8 },
  tip: font('regular', 12.5, 16, ink.body),
  reset: { height: 24, borderRadius: 6, paddingHorizontal: 8, justifyContent: 'center', backgroundColor: palette.neutral95 },
  resetLabel: font('regular', 12.5, 16, ink.title),
});
