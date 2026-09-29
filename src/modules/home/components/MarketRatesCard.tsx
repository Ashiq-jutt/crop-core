import { Pressable, StyleSheet, View } from 'react-native';
import { Image } from 'expo-image';
import { ArrowDown2, ArrowRight2 } from 'iconsax-react-native';
import Svg, { Path } from 'react-native-svg';

import { AppText } from '@/components/ui';
import { colors } from '@/theme';

import { marketRates } from '../data/home';
import { HomeButton } from './HomeButton';
import { homeStyles } from './homeStyles';

/** 9×6 zig-zag trend arrow drawn beside a price change. */
function TrendGlyph({ up, color }: { up: boolean; color: string }) {
  return (
    <Svg width={9} height={6} viewBox="0 0 9 6" fill="none" style={[styles.trend, up ? styles.trendUp : undefined]}>
      <Path d="M0.5 0.5L3.2 3.6L5 2L8.5 5.5M8.5 5.5V3.2M8.5 5.5H6.2" stroke={color} strokeWidth={1.1} strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  );
}

type Props = { onViewMarket?: () => void; onCompare?: () => void; onSelectMandi?: () => void };

export function MarketRatesCard({ onViewMarket, onCompare, onSelectMandi }: Props) {
  return (
    <View style={homeStyles.card}>
      <View style={styles.header}>
        <AppText variant="labelLargeStrong" style={styles.flex}>
          Today’s Market Rates
        </AppText>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Select mandi"
          onPress={onSelectMandi}
          style={styles.mandi}>
          <AppText variant="labelMediumStrong" style={styles.mandiLabel}>
            Mandi : {marketRates.mandi}
          </AppText>
          <ArrowDown2 size={24} color={colors.textPrimary} />
        </Pressable>
      </View>

      <View style={styles.list}>
        {marketRates.rates.map((r) => {
          const up = r.change >= 0;
          const tone = up ? colors.success : colors.danger;
          return (
            <Pressable key={r.name} accessibilityRole="button" accessibilityLabel={r.name} style={styles.row}>
              <Image source={r.icon} style={styles.icon} />
              <View style={styles.flex}>
                <AppText variant="labelMediumStrong">{r.name}</AppText>
                <View style={styles.priceRow}>
                  <AppText variant="labelMediumStrong" color={tone}>
                    {r.price}
                  </AppText>
                  <TrendGlyph up={up} color={tone} />
                  <AppText variant="labelMediumStrong" color={tone}>
                    {`${up ? '+' : ''}${r.change} %`}
                  </AppText>
                </View>
              </View>
              <ArrowRight2 size={24} color={colors.textPrimary} />
            </Pressable>
          );
        })}
      </View>

      <View style={homeStyles.buttonRow}>
        <HomeButton label="View Market" onPress={onViewMarket} />
        <HomeButton label="Compare" variant="secondary" onPress={onCompare} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  flex: { flex: 1 },
  mandi: {
    height: 32,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingLeft: 8,
    paddingRight: 6,
    borderRadius: 12,
    backgroundColor: colors.surfaceMuted,
  },
  mandiLabel: { letterSpacing: 0.4 },
  list: { gap: 12, marginTop: 15, marginBottom: 17 },
  row: { flexDirection: 'row', alignItems: 'center', gap: 16, height: 36 },
  icon: { width: 24, height: 24 },
  priceRow: { flexDirection: 'row', alignItems: 'center', marginTop: 4 },
  trend: { marginLeft: 8, marginRight: 4 },
  trendUp: { transform: [{ scaleY: -1 }] },
});
