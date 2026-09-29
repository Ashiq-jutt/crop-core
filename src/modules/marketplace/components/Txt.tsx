import { Text, type TextProps } from 'react-native';

import { fonts } from '@/theme';

import { mk } from './tokens';

type Weight = 'regular' | 'medium' | 'semibold' | 'bold';

type TxtProps = TextProps & {
  size: number;
  weight?: Weight;
  color?: string;
  lineHeight?: number;
  align?: 'left' | 'center' | 'right';
  strike?: boolean;
};

/** Text measured off the Figma frames: explicit size / weight / colour instead of theme variants. */
export function Txt({ size, weight = 'regular', color = mk.text, lineHeight, align, strike, style, ...rest }: TxtProps) {
  return (
    <Text
      {...rest}
      style={[
        {
          fontFamily: fonts[weight],
          fontSize: size,
          lineHeight: lineHeight ?? Math.round(size * 1.3),
          color,
          textAlign: align,
          textDecorationLine: strike ? 'line-through' : 'none',
        },
        style,
      ]}
    />
  );
}
