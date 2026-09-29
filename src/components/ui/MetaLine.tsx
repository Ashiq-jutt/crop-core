import { Fragment } from 'react';
import { StyleSheet, View } from 'react-native';

import { AppText } from './AppText';
import { palette } from '@/theme';

/** "Wheat • North Fields" — muted parts separated by a small grey dot. */
export function MetaLine({ parts, color = palette.neutral30 }: { parts: string[]; color?: string }) {
  return (
    <View style={styles.row}>
      {parts.map((p, i) => (
        <Fragment key={p}>
          {i > 0 ? <View style={styles.dot} /> : null}
          <AppText variant="labelLarge" color={color}>
            {p}
          </AppText>
        </Fragment>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  dot: { width: 4, height: 4, borderRadius: 2, backgroundColor: palette.neutral90 },
});
