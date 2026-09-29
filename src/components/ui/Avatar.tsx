import { StyleSheet, View } from 'react-native';
import { Image, type ImageSource } from 'expo-image';

import { colors, fonts } from '@/theme';

import { AppText } from './AppText';

type AvatarProps = { name: string; source?: ImageSource | number; size?: number };

/** Round avatar; falls back to initials on primary95 when no photo is available. */
export function Avatar({ name, source, size = 40 }: AvatarProps) {
  const dim = { width: size, height: size, borderRadius: size / 2 };
  if (source) return <Image source={source} style={dim} accessibilityLabel={name} />;
  const initials = name
    .split(' ')
    .map((p) => p[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();
  return (
    <View style={[dim, styles.fallback]} accessibilityLabel={name}>
      <AppText style={{ fontFamily: fonts.semibold, fontSize: size * 0.38 }} color={colors.primary}>
        {initials}
      </AppText>
    </View>
  );
}

const styles = StyleSheet.create({
  fallback: { alignItems: 'center', justifyContent: 'center', backgroundColor: colors.primarySurface },
});
