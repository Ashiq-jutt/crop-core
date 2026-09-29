import { StyleSheet, View } from 'react-native';

import { colors } from '@/theme';

/** Ring radio: 1.5pt black ring, or orange ring with an orange dot when selected. */
export function Radio({ selected, size = 20 }: { selected: boolean; size?: number }) {
  const dot = size * 0.5;
  return (
    <View
      style={[
        styles.ring,
        { width: size, height: size, borderRadius: size / 2, borderColor: selected ? colors.primary : colors.textPrimary },
      ]}>
      {selected ? <View style={{ width: dot, height: dot, borderRadius: dot / 2, backgroundColor: colors.primary }} /> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  ring: { borderWidth: 1.6, alignItems: 'center', justifyContent: 'center' },
});
