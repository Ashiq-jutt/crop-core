import { Pressable, StyleSheet } from 'react-native';
import { Image } from 'expo-image';

import { AppText } from '@/components/ui';
import type { TypographyVariant } from '@/theme';

import { homeStyles } from './homeStyles';

type Props = { label: string; icon: number; labelVariant: TypographyVariant; onPress?: () => void };

/** Bordered tile: 40pt round illustration above a centred label. */
export function HomeTile({ label, icon, labelVariant, onPress }: Props) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={label}
      onPress={onPress}
      style={({ pressed }) => [homeStyles.card, styles.tile, pressed && styles.pressed]}>
      <Image source={icon} style={styles.icon} />
      <AppText variant={labelVariant} align="center" numberOfLines={1} style={styles.label}>
        {label}
      </AppText>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  tile: { flex: 1, alignItems: 'center', paddingHorizontal: 4 },
  pressed: { opacity: 0.7 },
  icon: { width: 40, height: 40 },
  label: { marginTop: 4 },
});
