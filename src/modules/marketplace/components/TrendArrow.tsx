import Svg, { Path } from 'react-native-svg';

/** Tiny zig-zag trend arrow used beside price changes (up = rising to the right). */
export function TrendArrow({ up, color }: { up: boolean; color: string }) {
  return (
    <Svg width={11} height={8} viewBox="0 0 11 8" style={up ? undefined : { transform: [{ scaleY: -1 }] }}>
      <Path d="M1 7 L3.8 4 L5.8 5.8 L8.6 2.6" stroke={color} strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" fill="none" />
      <Path d="M6.8 1 H10 V4.2 Z" fill={color} stroke={color} strokeWidth={0.8} strokeLinejoin="round" />
    </Svg>
  );
}
