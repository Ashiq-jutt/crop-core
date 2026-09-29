import { StyleSheet, View } from 'react-native';
import { Image } from 'expo-image';
import { Calendar2 } from 'iconsax-react-native';

import { AppText } from '@/components/ui';
import { palette } from '@/theme';

import { todayBanner, weatherAlert } from '../data/tasks';

const INFO_SURFACE = '#EDF6FC';

/** Light-blue strip with today's date and the current temperature. */
export function TodayBanner() {
  return (
    <View style={styles.today}>
      <Calendar2 size={24} color="#1D89D1" />
      <AppText variant="labelLargeStrong" style={styles.todayDate}>
        {todayBanner.date}
      </AppText>
      <View style={styles.weather}>
        <Image source={todayBanner.icon} style={styles.weatherIcon} />
        <AppText variant="labelLargeStrong">{todayBanner.temperature}</AppText>
      </View>
    </View>
  );
}

/** Blue advisory card shown above the day's tasks. */
export function WeatherAlertCard() {
  return (
    <View style={styles.alert}>
      <Image source={weatherAlert.icon} style={styles.alertIcon} />
      <View style={styles.flex}>
        <AppText variant="labelLargeStrong">{weatherAlert.title}</AppText>
        <AppText variant="bodySmall" color={palette.neutral30} style={styles.alertBody}>
          {weatherAlert.body}
        </AppText>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  today: {
    height: 68,
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 20,
    paddingRight: 21,
    backgroundColor: INFO_SURFACE,
  },
  todayDate: { flex: 1, marginLeft: 11, letterSpacing: 0.15 },
  weather: { alignItems: 'center' },
  weatherIcon: { width: 20, height: 20 },
  alert: {
    flexDirection: 'row',
    marginHorizontal: 16,
    paddingTop: 10,
    paddingBottom: 11,
    paddingLeft: 10,
    paddingRight: 12,
    borderWidth: 1,
    borderColor: '#EEF7FC',
    borderRadius: 12,
    backgroundColor: INFO_SURFACE,
  },
  alertIcon: { width: 28, height: 28, marginRight: 10, marginTop: -1 },
  flex: { flex: 1 },
  alertBody: { marginTop: 3, lineHeight: 17 },
});
