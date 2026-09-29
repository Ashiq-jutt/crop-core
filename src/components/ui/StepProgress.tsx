import { StyleSheet, View } from 'react-native';

import { colors, spacing } from '@/theme';

import { AppText } from './AppText';

type StepProgressProps = { step: number; total: number; label?: string };

/** "Step 2 of 4" label with a segmented progress bar, used in multi-step setup flows. */
export function StepProgress({ step, total, label }: StepProgressProps) {
  return (
    <View style={styles.root}>
      <AppText variant="labelMedium" color={colors.textTertiary}>
        {label ?? `Step ${step} of ${total}`}
      </AppText>
      <View style={styles.bar}>
        {Array.from({ length: total }, (_, i) => (
          <View key={i} style={[styles.seg, { backgroundColor: i < step ? colors.primary : colors.border }]} />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { gap: spacing.sm },
  bar: { flexDirection: 'row', gap: spacing.xs },
  seg: { flex: 1, height: 4, borderRadius: 2 },
});
