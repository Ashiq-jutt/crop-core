import { StyleSheet, View } from 'react-native';

import { AppText } from '@/components/ui';
import { colors, fonts } from '@/theme';

import { SETUP_STEPS, setupColors } from '../data/setup';

/** Four 54pt progress pills with the "n/4" counter on the right, above a hairline. */
export function SetupSteps({ step }: { step: number }) {
  return (
    <View style={styles.root} accessibilityLabel={`Step ${step} of ${SETUP_STEPS}`}>
      <View style={styles.bars}>
        {Array.from({ length: SETUP_STEPS }, (_, i) => (
          <View key={i} style={[styles.bar, { backgroundColor: i < step ? colors.primary : setupColors.stepTrack }]} />
        ))}
      </View>
      <AppText style={styles.count} color="#000000">
        {`${step}/${SETUP_STEPS}`}
      </AppText>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 22,
    paddingBottom: 13,
    borderBottomWidth: 1,
    borderBottomColor: colors.surfaceMuted,
  },
  bars: { flexDirection: 'row', gap: 4 },
  bar: { width: 54, height: 8, borderRadius: 4 },
  count: { fontFamily: fonts.semibold, fontSize: 12, lineHeight: 20, letterSpacing: 0.5 },
});
