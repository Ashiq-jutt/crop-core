import { StyleSheet, Text, View } from 'react-native';
import { Image } from 'expo-image';

import { fonts } from '@/theme';

import { images } from '../data/collaboration';
import { collabColors } from '../theme';

const tones = {
  red: { bg: '#FCE5E3', fg: collabColors.red },
  green: { bg: collabColors.greenSurface, fg: collabColors.green },
} as const;

export function StatusBanner({ text, tone }: { text: string; tone: keyof typeof tones }) {
  const t = tones[tone];
  return (
    <View style={[styles.banner, { backgroundColor: t.bg }]}>
      <Image source={images.bannerIrrigation} style={styles.icon} />
      <Text style={[styles.text, { color: t.fg }]}>{text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  banner: {
    marginHorizontal: 16,
    minHeight: 56,
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 8,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  icon: { width: 24, height: 24 },
  text: { flex: 1, fontFamily: fonts.semibold, fontSize: 13, lineHeight: 16 },
});
