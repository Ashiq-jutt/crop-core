import { StyleSheet, View, type ImageSourcePropType, type StyleProp, type ViewStyle } from 'react-native';
import { Image } from 'expo-image';

import { palette } from '@/theme';

type GlyphCircleProps = {
  source: ImageSourcePropType;
  size: number;
  background?: string;
  style?: StyleProp<ViewStyle>;
};

/** Round icon tile: a transparent glyph (cropped at circle size) on a flat circle. */
export function GlyphCircle({ source, size, background = palette.neutral95, style }: GlyphCircleProps) {
  return (
    <View style={[styles.circle, { width: size, height: size, borderRadius: size / 2, backgroundColor: background }, style]}>
      <Image source={source} style={{ width: size, height: size }} contentFit="contain" />
    </View>
  );
}

const styles = StyleSheet.create({
  circle: { overflow: 'hidden' },
});
