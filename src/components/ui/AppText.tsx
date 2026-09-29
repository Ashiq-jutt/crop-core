import { Text, type TextProps } from 'react-native';

import { colors, typography, type TypographyVariant } from '@/theme';

export type AppTextProps = TextProps & {
  variant?: TypographyVariant;
  color?: string;
  align?: 'left' | 'center' | 'right';
};

export function AppText({
  variant = 'labelLarge',
  color = colors.textPrimary,
  align,
  style,
  ...rest
}: AppTextProps) {
  return <Text {...rest} style={[typography[variant], { color, textAlign: align }, style]} />;
}
