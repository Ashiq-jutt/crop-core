import type { ReactNode } from 'react';
import { Pressable, StyleSheet, View, type StyleProp, type ViewStyle } from 'react-native';
import { Image, type ImageSource } from 'expo-image';
import { Add, Back, Gps, Minus } from 'iconsax-react-native';

import { AppText } from '@/components/ui';
import { colors, fonts } from '@/theme';

type FieldMapProps = {
  /** Flattened map tile with the drawn field boundary. */
  source: ImageSource | number;
  zoom: number;
  onZoom: (zoom: number) => void;
  onUndo: () => void;
  onLocate: () => void;
  style?: StyleProp<ViewStyle>;
};

const MIN_ZOOM = 1;
const MAX_ZOOM = 2;
const ZOOM_STEP = 0.25;
const ICON_COLOR = '#000000';

/** Dark map with the field boundary, an Undo chip (top-right) and zoom / locate buttons (bottom-right). */
export function FieldMap({ source, zoom, onZoom, onUndo, onLocate, style }: FieldMapProps) {
  return (
    <View style={[styles.root, style]}>
      <Image
        source={source}
        style={[StyleSheet.absoluteFill, { transform: [{ scale: zoom }] }]}
        contentFit="cover"
        accessibilityLabel="Map with your field boundary"
      />
      <Pressable
        accessibilityRole="button"
        accessibilityLabel="Undo last boundary point"
        onPress={onUndo}
        style={({ pressed }) => [styles.undo, pressed && styles.pressed]}>
        <Back size={16} color={ICON_COLOR} />
        <AppText style={styles.undoText} color={ICON_COLOR}>
          Undo
        </AppText>
      </Pressable>
      <View style={styles.controls}>
        <MapButton label="Zoom out" onPress={() => onZoom(Math.max(MIN_ZOOM, zoom - ZOOM_STEP))}>
          <Minus size={24} color={ICON_COLOR} />
        </MapButton>
        <MapButton label="Zoom in" onPress={() => onZoom(Math.min(MAX_ZOOM, zoom + ZOOM_STEP))}>
          <Add size={24} color={ICON_COLOR} />
        </MapButton>
        <MapButton label="Go to my location" onPress={onLocate}>
          <Gps size={24} color={ICON_COLOR} />
        </MapButton>
      </View>
    </View>
  );
}

function MapButton({ label, onPress, children }: { label: string; onPress: () => void; children: ReactNode }) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={label}
      onPress={onPress}
      style={({ pressed }) => [styles.circle, pressed && styles.pressed]}>
      {children}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  root: { overflow: 'hidden', backgroundColor: '#282828' },
  undo: {
    position: 'absolute',
    top: 16,
    right: 16,
    height: 32,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingLeft: 10,
    paddingRight: 8,
    borderRadius: 8,
    backgroundColor: colors.surface,
  },
  undoText: { fontFamily: fonts.regular, fontSize: 12, lineHeight: 16, letterSpacing: 0.4 },
  controls: { position: 'absolute', right: 16, bottom: 16, gap: 16 },
  circle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.surface,
  },
  pressed: { opacity: 0.8 },
});
