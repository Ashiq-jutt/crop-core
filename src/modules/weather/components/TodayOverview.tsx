import { StyleSheet, View } from 'react-native';
import { Image } from 'expo-image';

import { AppText } from '@/components/ui';
import { colors, fonts, palette } from '@/theme';

import { adviceIcon, today, weatherMetrics } from '../data/weather';

/** Date, illustration, big temperature, the four metric bubbles and the advice strip. */
export function TodayOverview() {
  return (
    <View>
      <AppText variant="titleMedium" align="center" style={styles.date}>
        {today.date}
      </AppText>
      <Image source={today.illustration} style={styles.hero} />
      <View style={styles.tempRow}>
        <AppText style={styles.temp}>{today.temperature}</AppText>
        <View style={styles.degree} />
        <AppText style={styles.temp}>C</AppText>
      </View>
      <AppText variant="bodySmall" align="center" style={styles.description}>
        {today.description}
      </AppText>

      <View style={styles.metrics}>
        {weatherMetrics.map((m) => (
          <View key={m.id} style={styles.metric}>
            <Image source={m.icon} style={styles.metricIcon} />
            <AppText variant="bodySmall" align="center" style={styles.metricValue}>
              {m.value}
            </AppText>
            <AppText variant="bodySmall" color={palette.neutral50} align="center">
              {m.label}
            </AppText>
          </View>
        ))}
      </View>

      <View style={styles.advice}>
        <Image source={adviceIcon} style={styles.bulb} />
        <AppText variant="labelMedium">{today.advice}</AppText>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  date: { marginTop: 14 },
  hero: { width: 110, height: 110, alignSelf: 'center', marginTop: 5 },
  tempRow: { flexDirection: 'row', justifyContent: 'center', marginTop: 3 },
  temp: { fontFamily: fonts.regular, fontSize: 34, lineHeight: 40, color: colors.textPrimary },
  degree: {
    width: 8,
    height: 8,
    marginTop: 0,
    marginHorizontal: 2,
    borderRadius: 4,
    borderWidth: 1.5,
    borderColor: colors.textPrimary,
  },
  description: { marginTop: 3 },
  metrics: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 21, paddingHorizontal: 16 },
  metric: { width: 79, alignItems: 'center' },
  metricIcon: { width: 40, height: 40 },
  metricValue: { marginTop: 8, letterSpacing: 0 },
  advice: {
    height: 40,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 19,
    marginHorizontal: 16,
    paddingLeft: 6,
    borderRadius: 8,
    backgroundColor: colors.warningSurface,
  },
  bulb: { width: 28, height: 28 },
});
