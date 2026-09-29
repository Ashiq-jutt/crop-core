import { StyleSheet, View } from 'react-native';

import { colors } from '@/theme';

/** Full-bleed hairline under the status chips. */
export function TaskBannerDivider() {
  return <View style={styles.line} />;
}

const styles = StyleSheet.create({
  line: { height: 1, marginTop: 14, backgroundColor: colors.border },
});
