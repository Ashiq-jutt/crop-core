import { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Image } from 'expo-image';
import { Add, Back, Gps, Minus } from 'iconsax-react-native';

import { palette } from '@/theme';

import { font, ink } from './text';

const mapImage = require('@assets/images/fields/map.png');

const MIN_ZOOM = 1;
const MAX_ZOOM = 2;

/** Satellite-style boundary map with Undo, zoom and locate controls. */
export function MapCard() {
  const [zoom, setZoom] = useState(MIN_ZOOM);
  const controls = [
    { label: 'Zoom out', icon: <Minus size={24} color={ink.title} />, onPress: () => setZoom((z) => Math.max(MIN_ZOOM, z - 0.25)) },
    { label: 'Zoom in', icon: <Add size={24} color={ink.title} />, onPress: () => setZoom((z) => Math.min(MAX_ZOOM, z + 0.25)) },
    { label: 'Locate me', icon: <Gps size={24} color={ink.title} />, onPress: () => setZoom(MIN_ZOOM) },
  ];
  return (
    <View style={styles.map}>
      <Image source={mapImage} style={[styles.image, { transform: [{ scale: zoom }] }]} contentFit="cover" />
      <Pressable accessibilityRole="button" accessibilityLabel="Undo last corner" onPress={() => setZoom(MIN_ZOOM)} style={styles.undo}>
        <Back size={16} color={ink.title} />
        <Text style={styles.undoLabel}>Undo</Text>
      </Pressable>
      <View style={styles.controls}>
        {controls.map((c) => (
          <Pressable key={c.label} accessibilityRole="button" accessibilityLabel={c.label} onPress={c.onPress} style={styles.control}>
            {c.icon}
          </Pressable>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  map: { height: 259, borderRadius: 12, overflow: 'hidden', backgroundColor: '#202020' },
  image: { width: '100%', height: '100%' },
  undo: {
    position: 'absolute',
    top: 16.5,
    right: 16.5,
    width: 70,
    height: 31,
    borderRadius: 8,
    backgroundColor: palette.neutral100,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  undoLabel: font('regular', 13, 20, ink.title),
  controls: { position: 'absolute', right: 16, top: 113.5, gap: 16 },
  control: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: palette.neutral100,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
