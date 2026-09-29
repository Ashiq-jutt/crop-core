import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Image } from 'expo-image';

import { colors, fonts, palette } from '@/theme';

import type { SelectOption } from '../data/collaboration';
import { collabColors } from '../theme';
import { Radio } from './Radio';

type SelectTileProps = { option: SelectOption; selected: boolean; onPress: () => void };

export function SelectTile({ option, selected, onPress }: SelectTileProps) {
  return (
    <Pressable
      accessibilityRole="radio"
      accessibilityState={{ selected }}
      accessibilityLabel={option.label}
      onPress={onPress}
      style={[styles.tile, selected && styles.tileActive]}>
      <View style={styles.radio}>
        <Radio selected={selected} size={14} />
      </View>
      <Image
        source={option.icon}
        style={[styles.icon, { backgroundColor: selected ? colors.primarySurface : collabColors.grey }]}
      />
      <Text numberOfLines={1} style={[styles.label, selected && styles.labelActive]}>
        {option.label}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  tile: {
    width: 104,
    height: 96,
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: palette.neutral90,
    alignItems: 'center',
    paddingTop: 22.5,
  },
  radio: { position: 'absolute', top: 7, right: 7 },
  tileActive: { borderColor: colors.primary },
  icon: { width: 40, height: 40, borderRadius: 20 },
  label: {
    marginTop: 5,
    paddingHorizontal: 8,
    fontFamily: fonts.regular,
    fontSize: 13,
    lineHeight: 20,
    color: colors.textPrimary,
  },
  labelActive: { fontFamily: fonts.semibold, color: colors.primary },
});
