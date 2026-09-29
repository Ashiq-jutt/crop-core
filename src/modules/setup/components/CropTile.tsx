import { Pressable, StyleSheet, View } from 'react-native';
import { Image } from 'expo-image';
import { TickCircle } from 'iconsax-react-native';

import { AppText } from '@/components/ui';
import { colors, fonts } from '@/theme';

import type { CropOption } from '../data/setup';

type CropTileProps = { crop: CropOption; selected: boolean; onPress: () => void };

/** Multi-select crop tile: grey-bordered card that turns orange with a filled tick when chosen. */
export function CropTile({ crop, selected, onPress }: CropTileProps) {
  return (
    <Pressable
      accessibilityRole="checkbox"
      accessibilityState={{ checked: selected }}
      accessibilityLabel={crop.name}
      onPress={onPress}
      style={({ pressed }) => [styles.tile, selected && styles.tileSelected, pressed && styles.pressed]}>
      <View style={styles.check}>
        {selected ? (
          <TickCircle size={16} variant="Bold" color={colors.primary} />
        ) : (
          <View style={styles.radio} />
        )}
      </View>
      <View style={[styles.circle, selected && styles.circleSelected]}>
        <Image source={crop.icon} style={styles.icon} />
      </View>
      <AppText style={[styles.name, selected && styles.nameSelected]} color={selected ? colors.primary : colors.textPrimary}>
        {crop.name}
      </AppText>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  tile: {
    flex: 1,
    height: 96,
    alignItems: 'center',
    paddingTop: 23,
    borderRadius: 8,
    borderWidth: 1.5,
    borderColor: colors.border,
    backgroundColor: colors.surface,
  },
  tileSelected: { borderColor: colors.primary },
  pressed: { opacity: 0.85 },
  check: { position: 'absolute', top: 8, right: 8, width: 16, height: 16, alignItems: 'center', justifyContent: 'center' },
  radio: { width: 13, height: 13, borderRadius: 6.5, borderWidth: 1.5, borderColor: '#000000' },
  circle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.surfaceMuted,
  },
  circleSelected: { backgroundColor: colors.primarySurface },
  icon: { width: 40, height: 40 },
  name: { marginTop: 6, fontFamily: fonts.regular, fontSize: 12, lineHeight: 16, letterSpacing: 0.4 },
  nameSelected: { fontFamily: fonts.semibold },
});
