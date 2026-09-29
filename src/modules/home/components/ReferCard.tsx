import { Pressable, StyleSheet, View } from 'react-native';
import { Image } from 'expo-image';

import { AppText } from '@/components/ui';
import { colors, palette } from '@/theme';

import { referral } from '../data/home';

export function ReferCard({ onPress }: { onPress?: () => void }) {
  return (
    <View style={styles.card}>
      <Image source={referral.illustration} style={styles.illustration} contentFit="cover" />
      <View style={styles.text}>
        <AppText variant="labelLargeStrong">{referral.title}</AppText>
        <AppText variant="bodySmall" color={palette.neutral30} style={styles.subtitle}>
          {referral.subtitle}
        </AppText>
        <Pressable accessibilityRole="button" accessibilityLabel={referral.cta} onPress={onPress} style={styles.cta}>
          <AppText variant="labelMediumStrong" color={colors.primary} style={styles.ctaLabel}>
            {referral.cta}
          </AppText>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    height: 112,
    justifyContent: 'center',
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 12,
    backgroundColor: colors.surface,
  },
  illustration: { position: 'absolute', right: 0, top: 0, bottom: 0, width: 125 },
  text: { paddingLeft: 11 },
  subtitle: { marginTop: 3 },
  cta: {
    alignSelf: 'flex-start',
    height: 24,
    justifyContent: 'center',
    marginTop: 8,
    paddingHorizontal: 8,
    borderRadius: 8,
    backgroundColor: colors.primarySurface,
  },
  ctaLabel: { letterSpacing: 0.4 },
});
