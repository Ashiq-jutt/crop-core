import { Image, type ImageSource } from 'expo-image';

type SvgIconProps = {
  source: ImageSource | number;
  width: number;
  height?: number;
  tintColor?: string;
};

/** Renders an SVG/PNG asset exported from Figma at its native artboard size. */
export function SvgIcon({ source, width, height = width, tintColor }: SvgIconProps) {
  return <Image source={source} style={{ width, height }} tintColor={tintColor} contentFit="contain" />;
}
