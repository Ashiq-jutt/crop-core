import { StyleSheet, Text, View } from 'react-native';
import { Image } from 'expo-image';

import { StatusChip } from '@/modules/fields/components/Chips';
import { font, ink } from '@/modules/fields/components/text';
import { palette } from '@/theme';

import { diagnosis } from '../data/diagnosis';

type DetectionCardProps = {
  detected: string;
  /** The Summary frame draws a stray caret after the timestamp; kept to match. */
  showCaret?: boolean;
};

/** "Cotton · Detected : …  82% ✅" card at the top of the result sheet and the summary. */
export function DetectionCard({ detected, showCaret = false }: DetectionCardProps) {
  return (
    <View style={styles.card}>
      <Image source={diagnosis.badge} style={styles.badge} />
      <View style={styles.flex}>
        <Text style={styles.name}>{diagnosis.crop}</Text>
        <View style={styles.row}>
          <Text style={styles.detected}>{detected}</Text>
          {showCaret ? <View style={styles.caret} /> : null}
        </View>
      </View>
      <StatusChip status={diagnosis.confidence} style={styles.chip} />
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    height: 72,
    borderWidth: 1.5,
    borderColor: '#E5E7E9',
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10.5,
    backgroundColor: palette.neutral100,
  },
  badge: { width: 48, height: 48, marginRight: 12 },
  flex: { flex: 1 },
  row: { flexDirection: 'row', alignItems: 'center', marginTop: 3 },
  name: font('semibold', 14.5, 20, ink.title),
  detected: font('regular', 13, 18, ink.title),
  caret: { width: 1, height: 16, backgroundColor: ink.cardBorder, marginLeft: 9 },
  chip: { width: 69, paddingHorizontal: 0 },
});
