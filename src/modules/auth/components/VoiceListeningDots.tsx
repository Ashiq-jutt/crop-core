import { useEffect, useState } from 'react';
import { Animated, StyleSheet, View } from 'react-native';

import { colors } from '@/theme';

/** Three 9pt dots in a 64×16 box; each briefly dims in turn while voice input is active. */
export function VoiceListeningDots() {
  const [values] = useState(() => [0, 1, 2].map(() => new Animated.Value(1)));

  useEffect(() => {
    const loops = values.map((v, i) =>
      Animated.loop(
        Animated.sequence([
          Animated.delay(1200 + i * 200),
          Animated.timing(v, { toValue: 0.4, duration: 200, useNativeDriver: true }),
          Animated.timing(v, { toValue: 1, duration: 200, useNativeDriver: true }),
          Animated.delay((2 - i) * 200),
        ]),
      ),
    );
    loops.forEach((l) => l.start());
    return () => loops.forEach((l) => l.stop());
  }, [values]);

  return (
    <View style={styles.row} accessibilityLabel="Listening">
      {values.map((opacity, i) => (
        <Animated.View key={i} style={[styles.dot, { opacity }]} />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  row: { width: 64, height: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingRight: 7 },
  dot: { width: 9, height: 9, borderRadius: 4.5, backgroundColor: colors.textPrimary },
});
