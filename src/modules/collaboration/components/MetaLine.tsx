import { Fragment } from 'react';
import { StyleSheet, Text, View, type TextStyle } from 'react-native';

import { collabColors, text } from '../theme';

/** "North Field | Cotton" — values separated by thin vertical rules. */
export function MetaLine({ items, textStyle }: { items: string[]; textStyle?: TextStyle }) {
  return (
    <View style={styles.row}>
      {items.map((item, i) => (
        <Fragment key={item}>
          {i > 0 ? <View style={styles.rule} /> : null}
          <Text style={[text.meta, textStyle]}>{item}</Text>
        </Fragment>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  rule: { width: 1, height: 12, backgroundColor: collabColors.border },
});
