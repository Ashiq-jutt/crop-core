import { Pressable, StyleSheet, View } from 'react-native';
import { router } from 'expo-router';
import { ArrowLeft, Edit2, Location } from 'iconsax-react-native';

import { AppText } from '@/components/ui';
import { colors } from '@/theme';

import { weatherLocation } from '../data/weather';

/** "← Wather" app bar followed by the green location strip. */
export function WeatherHeader() {
  return (
    <View>
      <View style={styles.bar}>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Go back"
          hitSlop={8}
          onPress={() => (router.canGoBack() ? router.back() : router.replace('/home'))}>
          <ArrowLeft size={24} color={colors.textPrimary} />
        </Pressable>
        <AppText variant="titleMedium">Wather</AppText>
      </View>
      <View style={styles.banner}>
        <View style={styles.pin}>
          <Location size={20} color={colors.textOnPrimary} />
        </View>
        <AppText variant="labelLargeStrong" color={colors.success} style={styles.location}>
          {weatherLocation}
        </AppText>
        <Pressable accessibilityRole="button" accessibilityLabel="Edit location" hitSlop={8}>
          <Edit2 size={24} color={colors.success} />
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  bar: {
    height: 56,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    paddingLeft: 23,
    borderBottomWidth: 1,
    borderBottomColor: '#F4F4F7',
  },
  banner: {
    height: 64,
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 14,
    paddingRight: 17,
    backgroundColor: colors.successSurface,
  },
  pin: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.success,
  },
  location: { flex: 1, marginLeft: 8 },
});
