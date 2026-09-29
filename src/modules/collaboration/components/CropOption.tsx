import { Pressable, StyleSheet, Text, View, type ImageSourcePropType } from 'react-native';

import { colors, fonts } from '@/theme';

import { collabColors } from '../theme';
import { IconCircle } from './IconCircle';
import { MetaLine } from './MetaLine';
import { Radio } from './Radio';

type CropOptionProps = {
  name: string;
  meta: string[];
  icon: ImageSourcePropType;
  iconBg: string;
  selected: boolean;
  onPress: () => void;
};

export function CropOption({ name, meta, icon, iconBg, selected, onPress }: CropOptionProps) {
  return (
    <Pressable
      accessibilityRole="radio"
      accessibilityState={{ selected }}
      accessibilityLabel={name}
      onPress={onPress}
      style={styles.card}>
      <IconCircle source={icon} size={40} background={iconBg} />
      <View style={styles.text}>
        <Text style={[styles.name, selected && styles.nameActive]}>{name}</Text>
        <MetaLine items={meta} textStyle={styles.meta} />
      </View>
      <Radio selected={selected} size={20} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    marginHorizontal: 16,
    height: 64,
    borderWidth: 1,
    borderColor: collabColors.border,
    borderRadius: 12,
    paddingLeft: 11,
    paddingRight: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  text: { flex: 1, gap: 2 },
  name: { fontFamily: fonts.semibold, fontSize: 14, lineHeight: 20, color: colors.textPrimary },
  nameActive: { color: colors.primary },
  meta: { fontSize: 13, lineHeight: 18, color: colors.textPrimary },
});
