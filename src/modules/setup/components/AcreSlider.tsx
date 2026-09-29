import { useState } from 'react';
import { StyleSheet, View, type GestureResponderEvent } from 'react-native';

import { colors } from '@/theme';

import { setupColors } from '../data/setup';

type AcreSliderProps = { value: number; max: number; onChange: (value: number) => void; label: string };

const THUMB = 24;

/** 16pt orange track with a ringed thumb; drag or tap anywhere on it to set the acres. */
export function AcreSlider({ value, max, onChange, label }: AcreSliderProps) {
  const [width, setWidth] = useState(0);
  const fraction = max > 0 ? Math.min(1, Math.max(0, value / max)) : 0;
  const x = fraction * width;

  const update = (e: GestureResponderEvent) => {
    if (width === 0) return;
    const next = Math.min(1, Math.max(0, e.nativeEvent.locationX / width)) * max;
    onChange(Math.round(next * 10) / 10);
  };

  return (
    <View
      accessibilityRole="adjustable"
      accessibilityLabel={label}
      accessibilityValue={{ min: 0, max, now: value }}
      onLayout={(e) => setWidth(e.nativeEvent.layout.width)}
      onStartShouldSetResponder={() => true}
      onMoveShouldSetResponder={() => true}
      onResponderGrant={update}
      onResponderMove={update}
      style={styles.root}>
      <View style={styles.track} pointerEvents="none">
        <View style={[styles.fill, { width: x }]} />
      </View>
      <View style={[styles.thumb, { left: x - THUMB / 2 }]} pointerEvents="none" />
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, height: THUMB, justifyContent: 'center' },
  track: { height: 16, borderRadius: 8, overflow: 'hidden', backgroundColor: setupColors.sliderTrack },
  fill: { height: 16, backgroundColor: colors.primary },
  thumb: {
    position: 'absolute',
    top: 0,
    width: THUMB,
    height: THUMB,
    borderRadius: THUMB / 2,
    borderWidth: 2,
    borderColor: colors.primary,
    backgroundColor: '#FDDBC7',
  },
});
