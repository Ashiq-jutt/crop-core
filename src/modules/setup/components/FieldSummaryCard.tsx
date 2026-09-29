import { Pressable, StyleSheet, View } from 'react-native';
import { Image } from 'expo-image';
import { router } from 'expo-router';
import { Edit2 } from 'iconsax-react-native';

import { AppText } from '@/components/ui';
import { colors, fonts } from '@/theme';

import { fieldSummary, setupColors } from '../data/setup';

/** Grey card summarising the mapped field, with an edit shortcut back to the field step. */
export function FieldSummaryCard() {
  return (
    <View style={styles.card}>
      <Image source={require('@assets/images/setup/field-thumb.png')} style={styles.thumb} contentFit="contain" />
      <View style={styles.text}>
        <AppText style={styles.title} color={colors.textPrimary}>
          {fieldSummary.title}
        </AppText>
        <AppText style={styles.subtitle} color={setupColors.mutedLabel}>
          {fieldSummary.subtitle}
        </AppText>
      </View>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel="Edit field"
        hitSlop={8}
        onPress={() => router.navigate('/setup/fields')}
        style={({ pressed }) => pressed && styles.pressed}>
        <Edit2 size={24} color="#000000" />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    height: 72,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingLeft: 14,
    paddingRight: 16,
    borderRadius: 8,
    backgroundColor: colors.surfaceMuted,
  },
  thumb: { width: 38, height: 52 },
  text: { flex: 1, gap: 4 },
  title: { fontFamily: fonts.semibold, fontSize: 14, lineHeight: 20 },
  subtitle: { fontFamily: fonts.regular, fontSize: 12, lineHeight: 16, letterSpacing: 0.4 },
  pressed: { opacity: 0.6 },
});
