import { StyleSheet, View } from 'react-native';
import { Calendar2 } from 'iconsax-react-native';

import { colors } from '@/theme';

import { collabColors } from '../theme';

export function CalendarCircle({ size = 32, iconSize = 18 }: { size?: number; iconSize?: number }) {
  return (
    <View style={[styles.circle, { width: size, height: size, borderRadius: size / 2 }]}>
      <Calendar2 size={iconSize} color={colors.textPrimary} />
    </View>
  );
}

const styles = StyleSheet.create({
  circle: { backgroundColor: collabColors.grey, alignItems: 'center', justifyContent: 'center' },
});
