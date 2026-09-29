import { Pressable, StyleSheet } from 'react-native';
import { Image } from 'expo-image';

import { AppText } from './AppText';
import { colors, radius, spacing, type TypographyVariant } from '@/theme';

type Props = {
  label: string;
  icon: number;
  labelVariant?: TypographyVariant;
  onPress?: () => void;
};

/** Bordered tile with a 40pt round illustration above a centred label. */
export function IconTile({ label, icon, labelVariant = 'titleMedium', onPress }: Props) {
  return (
    <Pressable
      accessibilityRole="button"
      onPress={onPress}
      style={({ pressed }) => [styles.tile, pressed && { opacity: 0.7 }]}>
      <Image source={icon} style={styles.icon} />
      <AppText variant={labelVariant} align="center" numberOfLines={1}>
        {label}
      </AppText>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  tile: {
    flex: 1,
    alignItems: 'center',
    gap: spacing.sm,
    padding: spacing.md,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
  },
  icon: { width: 40, height: 40 },
});
