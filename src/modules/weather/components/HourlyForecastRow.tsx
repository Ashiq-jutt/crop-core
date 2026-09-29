import { ScrollView, StyleSheet, View } from 'react-native';
import { Image } from 'expo-image';

import { AppText, DashedDivider } from '@/components/ui';
import { colors, fonts, palette } from '@/theme';

import { hourlyForecast } from '../data/weather';

/** Full-bleed horizontal list of 100pt hourly cards. */
export function HourlyForecastRow() {
  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.content}>
      {hourlyForecast.map((h) => (
        <View key={h.id} style={styles.card}>
          <Image source={h.icon} style={styles.icon} />
          <AppText style={styles.rain} color={colors.primary}>
            {h.rain}
          </AppText>
          <DashedDivider color={palette.neutral90} style={styles.divider} />
          <AppText style={styles.temp}>{h.temperature}</AppText>
          <AppText variant="labelMedium" color={palette.neutral30} style={styles.time}>
            {h.time}
          </AppText>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  content: { gap: 12, paddingHorizontal: 16 },
  card: {
    width: 100,
    alignItems: 'center',
    paddingTop: 8.5,
    paddingBottom: 10.5,
    paddingHorizontal: 10.5,
    borderWidth: 1.5,
    borderColor: colors.border,
    borderRadius: 12,
  },
  icon: { width: 36, height: 36 },
  rain: { fontFamily: fonts.medium, fontSize: 14, lineHeight: 20, letterSpacing: 0.15, marginTop: 1 },
  divider: { alignSelf: 'stretch', marginTop: 8 },
  temp: { fontFamily: fonts.medium, fontSize: 14, lineHeight: 20, marginTop: 9, color: colors.textPrimary },
  time: { marginTop: 5 },
});
