import { StyleSheet, View } from 'react-native';

import { Screen } from '@/components/ui';

import { AiTipCard } from '../components/AiTipCard';
import { HourlyForecastRow } from '../components/HourlyForecastRow';
import { TodayOverview } from '../components/TodayOverview';
import { WeatherHeader } from '../components/WeatherHeader';
import { WeatherSectionTitle } from '../components/WeatherSectionTitle';
import { WeeklyForecastRow } from '../components/WeeklyForecastRow';
import { aiTips } from '../data/weather';

export function WeatherScreen() {
  return (
    <Screen header={<WeatherHeader />} contentStyle={styles.content}>
      <TodayOverview />

      <WeatherSectionTitle title="Hourly Forecast" gapBelow={14} />
      <HourlyForecastRow />

      <WeatherSectionTitle title="Weekly Forecast" gapBelow={10} />
      <WeeklyForecastRow />

      <WeatherSectionTitle title="AI Tips" gapBelow={14} />
      <View style={styles.tips}>
        {aiTips.map((t) => (
          <AiTipCard key={t.id} text={t.text} icon={t.icon} />
        ))}
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  content: { paddingBottom: 24 },
  tips: { gap: 12, paddingHorizontal: 16 },
});
