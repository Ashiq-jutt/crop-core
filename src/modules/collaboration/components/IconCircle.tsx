import { StyleSheet, View, type ImageSourcePropType } from 'react-native';
import { Image } from 'expo-image';

type IconCircleProps = { source: ImageSourcePropType; size: number; background: string };

/** Illustration glyph (cropped from the frames with a transparent background) on a tinted disc. */
export function IconCircle({ source, size, background }: IconCircleProps) {
  return (
    <View style={[styles.circle, { width: size, height: size, borderRadius: size / 2, backgroundColor: background }]}>
      <Image source={source} style={{ width: size, height: size }} contentFit="contain" />
    </View>
  );
}

const styles = StyleSheet.create({
  circle: { overflow: 'hidden' },
});
