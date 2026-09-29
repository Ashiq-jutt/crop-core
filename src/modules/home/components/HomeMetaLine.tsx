import { Fragment } from 'react';
import { StyleSheet, View } from 'react-native';

import { AppText } from '@/components/ui';
import { palette } from '@/theme';

/** "Wheat • North Fields" — 12pt muted parts split by a 4pt grey dot. */
export function HomeMetaLine({ parts }: { parts: string[] }) {
  return (
    <View style={styles.row}>
      {parts.map((p, i) => (
        <Fragment key={p}>
          {i > 0 ? <View style={styles.dot} /> : null}
          <AppText variant="bodySmall" color={palette.neutral30}>
            {p}
          </AppText>
        </Fragment>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  dot: { width: 4, height: 4, borderRadius: 2, backgroundColor: '#D5D5D5' },
});
