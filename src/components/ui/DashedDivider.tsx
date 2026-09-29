import { View, type StyleProp, type ViewStyle } from 'react-native';

import { colors } from '@/theme';

type DashedDividerProps = {
  color?: string;
  style?: StyleProp<ViewStyle>;
};

export function DashedDivider({ color = colors.divider, style }: DashedDividerProps) {
  return <View style={[{ borderTopWidth: 1, borderStyle: 'dashed', borderColor: color }, style]} />;
}
