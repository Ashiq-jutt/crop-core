import { ScrollView, StyleSheet, View } from 'react-native';
import { Image } from 'expo-image';

import { AppText } from '@/components/ui';
import { colors, fonts, palette } from '@/theme';

import { adviceIcon, weeklyForecast } from '../data/weather';

/** Day cards clipped to the page gutter. */
export function WeeklyForecastRow() {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      style={styles.scroller}
      contentContainerStyle={styles.content}>
      {weeklyForecast.map((d) => (
        <View key={d.id} style={styles.card}>
          <View style={styles.top}>
            <View style={styles.condition}>
              <Image source={d.icon} style={styles.icon} />
              <AppText variant="labelMediumStrong" style={styles.conditionLabel}>
                {d.condition}
              </AppText>
            </View>
            <View style={styles.separator} />
            <View style={styles.flex}>
              <AppText variant="labelMediumStrong">{d.day}</AppText>
              <AppText variant="bodySmall" color={palette.neutral30} style={styles.line2}>
                {d.date}
              </AppText>
            </View>
            <View style={styles.right}>
              <AppText variant="bodySmall" style={styles.range}>
                {d.range}
              </AppText>
              <AppText variant="labelMediumStrong" color={colors.primary} style={styles.line2}>
                {d.rain}
              </AppText>
            </View>
          </View>
          <View style={styles.advice}>
            <Image source={adviceIcon} style={styles.bulb} />
            <AppText variant="labelMedium" numberOfLines={1}>
              {d.advice}
            </AppText>
          </View>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scroller: { marginHorizontal: 16 },
  content: { gap: 13 },
  card: {
    width: 262,
    paddingTop: 10.5,
    paddingBottom: 10.5,
    paddingHorizontal: 10.5,
    borderWidth: 1.5,
    borderColor: colors.border,
    borderRadius: 12,
  },
  top: { flexDirection: 'row', alignItems: 'center' },
  condition: { alignItems: 'center', width: 44 },
  icon: { width: 28, height: 28 },
  conditionLabel: { marginTop: -3 },
  separator: { width: 1, height: 23, marginHorizontal: 8, backgroundColor: palette.neutral90 },
  flex: { flex: 1 },
  right: { alignItems: 'flex-end' },
  range: { fontFamily: fonts.medium },
  line2: { marginTop: 4 },
  advice: {
    height: 40,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 9,
    marginTop: 14,
    paddingLeft: 5.5,
    borderRadius: 8,
    backgroundColor: colors.warningSurface,
  },
  bulb: { width: 28, height: 28 },
});
