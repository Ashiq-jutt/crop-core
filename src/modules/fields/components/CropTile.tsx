import { Pressable, StyleSheet, Text, View } from 'react-native';

import { colors, palette } from '@/theme';

import type { CropOption } from '../data/crops';
import { GlyphCircle } from './GlyphCircle';
import { font, ink } from './text';

type CropTileProps = {
  label: string;
  glyph: CropOption['glyph'];
  selected: boolean;
  onPress: () => void;
  height?: number;
};

export function RadioMark({ selected }: { selected: boolean }) {
  return <View style={[styles.radio, selected && styles.radioOn]}>{selected ? <View style={styles.radioDot} /> : null}</View>;
}

/** 3-up selectable tile (crop picker, task type picker). */
export function CropTile({ label, glyph, selected, onPress, height = 97 }: CropTileProps) {
  return (
    <Pressable
      accessibilityRole="checkbox"
      accessibilityState={{ checked: selected }}
      accessibilityLabel={label}
      onPress={onPress}
      style={[styles.tile, { height }, selected && styles.tileOn]}>
      <View style={styles.radioSlot}>
        <RadioMark selected={selected} />
      </View>
      <GlyphCircle source={glyph} size={40} background={selected ? palette.primary95 : palette.neutral95} />
      <Text style={[styles.label, selected && styles.labelOn]}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  tile: {
    flex: 1,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#E5E7E9',
    alignItems: 'center',
    paddingTop: 23,
    backgroundColor: palette.neutral100,
  },
  tileOn: { borderColor: colors.primary },
  radioSlot: { position: 'absolute', top: 7, right: 7 },
  radio: {
    width: 15,
    height: 15,
    borderRadius: 7.5,
    borderWidth: 1.5,
    borderColor: ink.title,
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioOn: { borderColor: colors.primary },
  radioDot: { width: 8, height: 8, borderRadius: 4, backgroundColor: colors.primary },
  label: { ...font('regular', 13, 20, '#2C2E32'), marginTop: 4 },
  labelOn: { fontFamily: font('medium', 13, 20).fontFamily, color: colors.primary },
});
