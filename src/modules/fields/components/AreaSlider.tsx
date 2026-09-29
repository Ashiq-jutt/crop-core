import { useState } from 'react';
import { StyleSheet, View, type GestureResponderEvent, type LayoutChangeEvent } from 'react-native';

import { colors, palette } from '@/theme';

type AreaSliderProps = {
  value: number;
  max: number;
  onChange: (value: number) => void;
  accessibilityLabel: string;
};

const THUMB = 22;
const STEP = 0.1;

/** Orange acreage slider: 16pt track, peach thumb with an orange ring. */
export function AreaSlider({ value, max, onChange, accessibilityLabel }: AreaSliderProps) {
  const [width, setWidth] = useState(0);

  const setFromTouch = (e: GestureResponderEvent) => {
    if (width <= 0) return;
    const ratio = Math.min(1, Math.max(0, e.nativeEvent.locationX / width));
    onChange(Math.round((ratio * max) / STEP) * STEP);
  };

  const ratio = max > 0 ? Math.min(1, value / max) : 0;
  const centre = width > 0 ? Math.min(width - THUMB / 2, Math.max(THUMB / 2, ratio * width)) : 0;

  return (
    <View
      accessible
      accessibilityRole="adjustable"
      accessibilityLabel={accessibilityLabel}
      accessibilityValue={{ min: 0, max: Math.round(max * 10), now: Math.round(value * 10) }}
      accessibilityActions={[{ name: 'increment' }, { name: 'decrement' }]}
      onAccessibilityAction={(e) =>
        onChange(Math.min(max, Math.max(0, value + (e.nativeEvent.actionName === 'increment' ? STEP : -STEP))))
      }
      onLayout={(e: LayoutChangeEvent) => setWidth(e.nativeEvent.layout.width)}
      style={styles.root}
      onStartShouldSetResponder={() => true}
      onMoveShouldSetResponder={() => true}
      onResponderTerminationRequest={() => false}
      onResponderGrant={setFromTouch}
      onResponderMove={setFromTouch}>
      <View pointerEvents="none" style={styles.track}>
        <View style={[styles.fill, { width: centre }]} />
      </View>
      {width > 0 ? <View pointerEvents="none" style={[styles.thumb, { left: centre - THUMB / 2 }]} /> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, height: THUMB, justifyContent: 'center' },
  track: { height: 16, borderRadius: 8, backgroundColor: palette.primary95, overflow: 'hidden' },
  fill: { height: 16, backgroundColor: colors.primary },
  thumb: {
    position: 'absolute',
    top: 0,
    width: THUMB,
    height: THUMB,
    borderRadius: THUMB / 2,
    borderWidth: 2,
    borderColor: colors.primary,
    backgroundColor: '#FDD9C4',
  },
});
