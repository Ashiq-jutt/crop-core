import { Pressable, StyleSheet, View } from 'react-native';
import { Image } from 'expo-image';

import { AppText } from '@/components/ui';
import { colors, palette } from '@/theme';

import type { ActiveCrop } from '../../data/tasks';
import { Radio } from './Radio';

type Props = { crop: ActiveCrop; selected: boolean; onPress: () => void };

export function CropOption({ crop, selected, onPress }: Props) {
  return (
    <Pressable
      accessibilityRole="radio"
      accessibilityState={{ checked: selected }}
      accessibilityLabel={crop.name}
      onPress={onPress}
      style={styles.card}>
      <Image source={crop.icon} style={styles.icon} />
      <View style={styles.flex}>
        <AppText variant="labelLargeStrong" color={selected ? colors.primary : colors.textPrimary}>
          {crop.name}
        </AppText>
        <View style={styles.meta}>
          <AppText variant="labelMedium" color={palette.neutral10}>
            {crop.area}
          </AppText>
          <View style={styles.separator} />
          <AppText variant="labelMedium" color={palette.neutral10}>
            {crop.field}
          </AppText>
        </View>
      </View>
      <Radio selected={selected} size={22} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    height: 64,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 11,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 12,
  },
  icon: { width: 40, height: 40, marginRight: 12 },
  flex: { flex: 1 },
  meta: { flexDirection: 'row', alignItems: 'center', marginTop: 3 },
  separator: { width: 1, height: 12, marginHorizontal: 8, backgroundColor: colors.border },
});
