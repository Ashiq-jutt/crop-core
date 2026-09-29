import { StyleSheet, View } from 'react-native';
import { router } from 'expo-router';

import { Screen } from '@/components/ui';

import { AlertsCarousel } from '../components/AlertsCarousel';
import { ForecastCard } from '../components/ForecastCard';
import { HomeHeader } from '../components/HomeHeader';
import { HomeSectionTitle } from '../components/HomeSectionTitle';
import { HomeTile } from '../components/HomeTile';
import { MarketRatesCard } from '../components/MarketRatesCard';
import { MyFieldsCard } from '../components/MyFieldsCard';
import { ReferCard } from '../components/ReferCard';
import { TodayTasksCard } from '../components/TodayTasksCard';
import { marketCategories, quickActions } from '../data/home';

export function HomeScreen() {
  return (
    <Screen edges={['top']} contentStyle={styles.content}>
      <HomeHeader />

      <View style={styles.forecast}>
        <ForecastCard onWeeklyForecast={() => router.push('/weather')} />
      </View>

      <View style={styles.gutter}>
        <HomeSectionTitle title="My Fields" actionLabel="View All" onAction={() => router.push('/fields')} />
        <MyFieldsCard onPress={() => router.push('/field/north')} />

        <HomeSectionTitle title="Today’s Task" />
        <TodayTasksCard onAddTask={() => router.push('/tasks/add')} onViewAll={() => router.push('/tasks')} />

        <HomeSectionTitle
          title="Alerts"
          actionLabel="View All"
          onAction={() => router.push('/account/notifications')}
        />
      </View>
      <AlertsCarousel onAction={(id) => router.push(id === 'a1' ? '/diagnosis' : '/tasks/system')} />

      <View style={styles.gutter}>
        <HomeSectionTitle title="Marketplace" />
        <View style={styles.tiles}>
          {marketCategories.map((c) => (
            <HomeTile
              key={c.id}
              label={c.label}
              icon={c.icon}
              labelVariant="labelLargeStrong"
              onPress={() => router.push(`/marketplace/category/${c.id}`)}
            />
          ))}
        </View>
        <View style={styles.rates}>
          <MarketRatesCard
            onViewMarket={() => router.push('/market')}
            onCompare={() => router.push('/marketplace/compare')}
            onSelectMandi={() => router.push('/marketplace/rates')}
          />
        </View>

        <HomeSectionTitle title="Quick Action" />
        <View style={styles.tiles}>
          {quickActions.map((a) => (
            <HomeTile
              key={a.id}
              label={a.label}
              icon={a.icon}
              labelVariant="labelMediumStrong"
              onPress={() => router.push(a.id === 'crop-care' ? '/diagnosis' : '/collaboration')}
            />
          ))}
        </View>
        <View style={styles.refer}>
          <ReferCard onPress={() => router.push('/account/refer')} />
        </View>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  // Leaves room for the tab bar's raised scan button.
  content: { paddingBottom: 56 },
  forecast: { paddingHorizontal: 16, marginTop: 32 },
  gutter: { paddingHorizontal: 16 },
  tiles: { flexDirection: 'row', gap: 8 },
  rates: { marginTop: 12 },
  refer: { marginTop: 16 },
});
