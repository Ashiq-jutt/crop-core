import Svg, { Path } from 'react-native-svg';

/** Bin with domed lid and two slots, as drawn on the task cards (not in iconsax). */
export function TrashIcon({ size = 24, color }: { size?: number; color: string }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M4.8 8.2h14.4M5.4 8.2c0-2 1.4-3.3 3.3-3.3h6.6c1.9 0 3.3 1.3 3.3 3.3M9.8 4.9c0-.9.6-1.5 1.5-1.5h1.4c.9 0 1.5.6 1.5 1.5M6.2 8.2l.9 11.4c.1 1.3 1.1 2.3 2.4 2.3h5c1.3 0 2.3-1 2.4-2.3l.9-11.4M10.2 12.6v5.4M13.8 12.6v5.4"
        stroke={color}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}
