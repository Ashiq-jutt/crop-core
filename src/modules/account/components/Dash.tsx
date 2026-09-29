import { StyleSheet, View, type StyleProp, type ViewStyle } from 'react-native';
import Svg, { Line } from 'react-native-svg';

import { accountColors } from './tokens';

type DashProps = { style?: StyleProp<ViewStyle>; color?: string };

/** 1pt dashed rule with the Figma 2-on / 2-off pattern. */
export function Dash({ style, color = accountColors.border }: DashProps) {
  return (
    <View style={[styles.wrap, style]}>
      <Svg width="100%" height={1}>
        <Line x1={0} y1={0.5} x2="100%" y2={0.5} stroke={color} strokeWidth={1} strokeDasharray="2 2" />
      </Svg>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { height: 1, alignSelf: 'stretch' },
});
