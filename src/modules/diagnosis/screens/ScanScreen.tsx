import { useEffect } from 'react';
import { Pressable, StyleSheet, Text, useWindowDimensions, View } from 'react-native';
import { Image } from 'expo-image';
import { router } from 'expo-router';

import { Screen } from '@/components/ui';
import { font } from '@/modules/fields/components/text';
import { palette } from '@/theme';

import { SCAN_DURATION_MS } from '../data/diagnosis';

const preview = require('@assets/images/diagnosis/scan-preview.jpg');
const hourglass = require('@assets/images/diagnosis/hourglass.png');
const scanIcon = require('@assets/images/diagnosis/scan-icon.png');

/** Artboard the camera preview was drawn on (below the status bar). */
const ART_WIDTH = 375;
const ART_HEIGHT = 762;

/** Live-camera step: framed crop preview, "Please hold still…" and the capture button. */
export function ScanScreen() {
  const { width } = useWindowDimensions();
  const scale = width / ART_WIDTH;

  useEffect(() => {
    const timer = setTimeout(() => router.replace('/diagnosis/result'), SCAN_DURATION_MS);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Screen edges={['top']} scroll={false} background="#E2D2C3">
      <View style={styles.stage}>
        <View style={[styles.art, { width, height: ART_HEIGHT * scale }]}>
          <Image source={preview} style={StyleSheet.absoluteFill} contentFit="cover" />
          <View style={[styles.pill, { top: 578 * scale, left: 107 * scale, width: 182 * scale, height: 32 * scale }]}>
            <Image source={hourglass} style={styles.hourglass} />
            <Text style={styles.pillText}>Please hold still...</Text>
          </View>
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Capture photo"
            onPress={() => router.replace('/diagnosis/result')}
            style={[styles.capture, { top: 626.5 * scale, left: 148.5 * scale }]}>
            <Image source={scanIcon} style={styles.captureIcon} />
          </Pressable>
        </View>
      </View>
    </Screen>
  );
}

const CAPTURE = 78;

const styles = StyleSheet.create({
  stage: { flex: 1, justifyContent: 'flex-end', overflow: 'hidden' },
  art: { position: 'relative' },
  pill: { position: 'absolute', flexDirection: 'row', alignItems: 'center', paddingLeft: 11 },
  hourglass: { width: 17.5, height: 17.5, marginRight: 8.5 },
  pillText: font('regular', 14.5, 20, palette.neutral100),
  capture: {
    position: 'absolute',
    width: CAPTURE,
    height: CAPTURE,
    borderRadius: CAPTURE / 2,
    backgroundColor: palette.neutral100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  captureIcon: { width: 34, height: 34 },
});
