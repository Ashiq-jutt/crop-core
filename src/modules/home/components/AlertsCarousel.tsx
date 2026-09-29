import { Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { Image } from 'expo-image';

import { AppText } from '@/components/ui';
import { colors } from '@/theme';

import { alerts } from '../data/home';
import { HomeMetaLine } from './HomeMetaLine';
import { homeStyles } from './homeStyles';

const GAP = 8;

export function AlertsCarousel({ onAction }: { onAction?: (id: string) => void }) {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      decelerationRate="fast"
      style={styles.scroller}
      contentContainerStyle={styles.content}>
      {alerts.map((a) => (
        <View key={a.id} style={[homeStyles.card, { width: a.width }]}>
          <Image source={a.icon} style={styles.icon} />
          <AppText variant="labelMediumStrong" numberOfLines={1} style={styles.title}>
            {a.title}
          </AppText>
          <View style={styles.meta}>
            <HomeMetaLine parts={a.subtitle} />
          </View>
          <Pressable
            accessibilityRole="button"
            accessibilityLabel={a.action}
            onPress={() => onAction?.(a.id)}
            style={styles.button}>
            <AppText variant="labelMediumStrong">{a.action}</AppText>
          </Pressable>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scroller: { marginHorizontal: 16 },
  content: { gap: GAP },
  icon: { width: 40, height: 40, alignSelf: 'center' },
  title: { marginTop: 8 },
  meta: { marginTop: 4 },
  button: {
    height: 32,
    marginTop: 8,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 12,
    backgroundColor: colors.surfaceMuted,
  },
});
