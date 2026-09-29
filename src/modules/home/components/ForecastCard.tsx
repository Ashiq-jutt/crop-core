import type { ReactNode } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { Image } from 'expo-image';
import { Calendar, Location, VolumeHigh } from 'iconsax-react-native';

import { AppText, DashedDivider } from '@/components/ui';
import { colors, palette } from '@/theme';

import { todayForecast } from '../data/home';
import { homeStyles } from './homeStyles';

function PillAction({ label, icon, onPress }: { label: string; icon: ReactNode; onPress?: () => void }) {
  return (
    <Pressable accessibilityRole="button" accessibilityLabel={label} onPress={onPress} style={styles.pill}>
      <View style={styles.pillIcon}>{icon}</View>
      <AppText variant="labelMedium" color={colors.textPrimary}>
        {label}
      </AppText>
    </Pressable>
  );
}

export function ForecastCard({ onWeeklyForecast }: { onWeeklyForecast?: () => void }) {
  const f = todayForecast;
  return (
    <View style={[homeStyles.card, styles.card]}>
      <View style={styles.top}>
        <View style={styles.pin}>
          <Location size={24} color={colors.textPrimary} />
        </View>
        <View style={styles.flex}>
          <AppText variant="labelLargeStrong">Today’s Forecast</AppText>
          <AppText variant="bodySmall" numberOfLines={1} style={styles.location}>
            {f.location}
          </AppText>
        </View>
        <View style={styles.condition}>
          <Image source={f.conditionIcon} style={styles.conditionIcon} />
          <AppText variant="labelLargeStrong">{f.condition}</AppText>
        </View>
      </View>

      <DashedDivider color={palette.neutral90} style={styles.divider} />

      <View style={styles.advice}>
        <AppText variant="labelLargeStrong" color={colors.success}>
          {f.advice}
        </AppText>
      </View>

      <View style={styles.metrics}>
        {f.metrics.map((m) => (
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

      <View style={styles.actions}>
        <PillAction label="Hear Weather" icon={<VolumeHigh size={16} color={colors.textPrimary} />} />
        <PillAction
          label="Weekly Forecast"
          onPress={onWeeklyForecast}
          icon={<Calendar size={16} color={colors.textPrimary} />}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: { paddingTop: 11, paddingBottom: 11 },
  top: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  flex: { flex: 1 },
  location: { marginTop: 3 },
  pin: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.surfaceMuted,
  },
  condition: { alignItems: 'center', marginRight: 4 },
  conditionIcon: { width: 24, height: 24 },
  divider: { marginTop: 11, marginBottom: 12 },
  advice: {
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 16,
    backgroundColor: colors.successSurface,
  },
  metrics: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 20 },
  metric: { width: 72, alignItems: 'center' },
  metricIcon: { width: 40, height: 40 },
  metricValue: { marginTop: 8, letterSpacing: 0 },
  actions: { flexDirection: 'row', gap: 14, marginTop: 20 },
  pill: {
    flex: 1,
    height: 40,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    borderRadius: 20,
    backgroundColor: colors.surfaceMuted,
  },
  pillIcon: {
    width: 24,
    height: 24,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: palette.neutral90,
  },
});
