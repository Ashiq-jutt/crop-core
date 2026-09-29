import Svg, { Polygon } from 'react-native-svg';

/** Solid five-point star with rounded corners (the Figma rating star). */
const POINTS = Array.from({ length: 10 }, (_, i) => {
  const r = i % 2 === 0 ? 11 : 4.6;
  const a = (Math.PI / 5) * i - Math.PI / 2;
  return `${(12 + r * Math.cos(a)).toFixed(2)},${(12.8 + r * Math.sin(a)).toFixed(2)}`;
}).join(' ');

export function StarIcon({ size, color }: { size: number; color: string }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24">
      <Polygon points={POINTS} fill={color} stroke={color} strokeWidth={2} strokeLinejoin="round" />
    </Svg>
  );
}
