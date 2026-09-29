import { StyleSheet, Text, View } from 'react-native';

import { colors, fonts } from '@/theme';

import { images, incomingTask } from '../data/collaboration';
import { collabColors } from '../theme';
import { IconCircle } from './IconCircle';
import { MetaLine } from './MetaLine';

/** Irrigation icon + "North Field | Wheat | Return the Favor". */
export function TaskSummary() {
  return (
    <View style={styles.row}>
      <IconCircle source={images.cardIrrigation} size={36} background={collabColors.blueSurface} />
      <View style={styles.text}>
        <Text style={styles.title}>{incomingTask.task}</Text>
        <MetaLine items={incomingTask.meta} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  text: { flex: 1, gap: 4, top: -1 },
  title: { fontFamily: fonts.semibold, fontSize: 13, lineHeight: 16, color: colors.textPrimary },
});
