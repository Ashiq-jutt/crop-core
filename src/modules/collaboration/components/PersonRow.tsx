import type { ReactNode } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Image } from 'expo-image';

import { colors, fonts, palette } from '@/theme';

import { requester } from '../data/collaboration';

/** Avatar + "David Malan / 2.1 KM Away" with optional trailing actions; the name column always starts 48pt in. */
export function PersonRow({ right, avatarSize = 36 }: { right?: ReactNode; avatarSize?: number }) {
  return (
    <View style={[styles.row, { gap: 48 - avatarSize }]}>
      <Image
        source={requester.avatar}
        style={{ width: avatarSize, height: avatarSize, borderRadius: avatarSize / 2 }}
      />
      <View style={styles.text}>
        <Text style={styles.name}>{requester.name}</Text>
        <Text style={styles.distance}>{requester.distance}</Text>
      </View>
      {right}
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'center' },
  text: { flex: 1, gap: 4 },
  name: { fontFamily: fonts.semibold, fontSize: 14, lineHeight: 18, color: colors.textPrimary },
  distance: { fontFamily: fonts.regular, fontSize: 13, lineHeight: 18, color: palette.neutral20 },
});
