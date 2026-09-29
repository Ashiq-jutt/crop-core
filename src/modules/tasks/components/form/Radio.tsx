import { StyleSheet, View } from 'react-native';

import { colors } from '@/theme';

/** Radio mark: orange ring + dot when selected, dark ring otherwise. */
export function Radio({ selected, size }: { selected: boolean; size: number }) {
  const ring = size <= 16 ? 1.5 : 2;
  return (
    <View
      style={[
        styles.ring,
        { width: size, height: size, borderRadius: size / 2, borderWidth: ring },
        selected ? styles.ringSelected : null,
      ]}>
      {selected ? <View style={[styles.dot, { width: size / 2, height: size / 2, borderRadius: size / 4 }]} /> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  ring: { alignItems: 'center', justifyContent: 'center', borderColor: '#222222' },
  ringSelected: { borderColor: colors.primary },
  dot: { backgroundColor: colors.primary },
});
