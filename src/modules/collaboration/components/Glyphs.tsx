import Svg, { Circle, Path } from 'react-native-svg';

type GlyphProps = { size?: number; color: string; strokeWidth?: number };

/** Plain check mark (the frames use a bare tick, not the iconsax circled variants). */
export function CheckGlyph({ size = 18, color, strokeWidth = 2 }: GlyphProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path d="M5 12.5l4.6 4.5L19 7.5" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  );
}

export function CloseGlyph({ size = 18, color, strokeWidth = 2 }: GlyphProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path d="M6.5 6.5l11 11M17.5 6.5l-11 11" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" />
    </Svg>
  );
}

/** Three solid dots; horizontal in the details header, vertical on incoming request cards. */
export function DotsGlyph({ size = 24, color, vertical }: { size?: number; color: string; vertical?: boolean }) {
  const dots = [5, 12, 19];
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24">
      {dots.map((d) => (
        <Circle key={d} cx={vertical ? 12 : d} cy={vertical ? d : 12} r={2} fill={color} />
      ))}
    </Svg>
  );
}
