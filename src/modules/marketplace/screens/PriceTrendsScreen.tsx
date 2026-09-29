import { useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import Svg, { Defs, Line, LinearGradient, Polygon, Polyline, Stop } from 'react-native-svg';
import { router, useLocalSearchParams } from 'expo-router';
import { ArrowRight2, InfoCircle } from 'iconsax-react-native';

import { Screen } from '@/components/ui';

import { CHART, ChartCard } from '../components/ChartCard';
import { PrimaryButton } from '../components/FooterButton';
import { MarketHeader } from '../components/MarketHeader';
import { ChangePill, ChangeText, CropHead, Dashed, DropdownRow, StatTriple } from '../components/RateParts';
import { SetAlertSheet } from '../components/SetAlertSheet';
import { Txt } from '../components/Txt';
import { mk } from '../components/tokens';
import { trendLine } from '../data/charts';
import { getCrop, homeMarket, insight, markets, trendHistory, units, type Crop } from '../data/rates';

const CHART_HEIGHT = 290;
const firstPoint = trendLine.split(' ')[0].split(',')[0];
const lastPoint = trendLine.split(' ').slice(-1)[0].split(',')[0];
const trendArea = `${firstPoint},${CHART.baseline} ${trendLine} ${lastPoint},${CHART.baseline}`;

function TrendPlot() {
  return (
    <>
      <Svg width={CHART.width} height={CHART_HEIGHT} style={StyleSheet.absoluteFill}>
        <Defs>
          <LinearGradient id="trendFill" x1="0" y1="177" x2="0" y2="239" gradientUnits="userSpaceOnUse">
            <Stop offset="0" stopColor="#F2955F" />
            <Stop offset="1" stopColor="#FFFFFF" />
          </LinearGradient>
        </Defs>
        <Line x1={101.5} x2={101.5} y1={100} y2={191} stroke="#D9DCE0" strokeWidth={1.5} strokeDasharray="3 3" />
        <Polygon points={trendArea} fill="url(#trendFill)" />
        <Polyline points={trendLine} fill="none" stroke="#EC6418" strokeWidth={2} strokeLinejoin="round" />
      </Svg>
      <View style={styles.tip}>
        <ChangeText text="$110.00" up size={14} />
      </View>
    </>
  );
}

export function PriceTrendsScreen() {
  const { crop: cropId, alert } = useLocalSearchParams<{ crop: string; alert?: string }>();
  const crop = getCrop(cropId);
  const [alertCrop, setAlertCrop] = useState<Crop | null>(alert ? crop : null);

  return (
    <Screen
      header={<MarketHeader title="Prize Trend" />}
      footer={
        <View style={styles.footer}>
          <PrimaryButton label="Compare Market" weight="semibold" onPress={() => router.push('/marketplace/compare')} style={styles.flex} />
          <PrimaryButton label="Set Prize Alert" weight="semibold" outline onPress={() => setAlertCrop(crop)} style={styles.flex} />
        </View>
      }>
      <View style={styles.drops}>
        <DropdownRow left={markets} right={units} />
      </View>
      <View style={styles.rule} />

      <View style={styles.card}>
        <View style={styles.row}>
          <CropHead crop={crop} />
          <ChangePill text={crop.change} up={crop.up} />
        </View>
        <Txt size={13} color="#353A3F" lineHeight={18} style={styles.updated}>
          {homeMarket.updated}
        </Txt>
        <Dashed style={styles.cardDash} />
        <View style={styles.stats}>
          <StatTriple crop={crop} />
        </View>
      </View>

      <Txt size={16.5} weight="semibold" color={mk.ink} lineHeight={24} style={styles.section}>
        Prize Trends
      </Txt>
      <View style={styles.history}>
        <Dashed />
        {trendHistory.map((h) => (
          <View key={h.date}>
            <View style={styles.historyRow}>
              <Txt size={14.5} color="#121315" lineHeight={20} style={styles.flex}>
                {h.date}
              </Txt>
              <Txt size={14.5} color="#121315" lineHeight={20}>
                {h.price}
              </Txt>
              <View style={styles.bar} />
              <ChangeText text={h.change} up={h.up} />
            </View>
            <Dashed />
          </View>
        ))}
      </View>
      <Pressable accessibilityRole="button" accessibilityLabel="View Prize History" style={styles.historyLink}>
        <Txt size={15} weight="medium" color={mk.orange} lineHeight={20}>
          View Prize History
        </Txt>
        <ArrowRight2 size={20} color={mk.orange} />
      </Pressable>

      <View style={styles.chart}>
        <ChartCard yLabels={['150', '100', '50', '25']} height={CHART_HEIGHT} plot={() => <TrendPlot />} />
      </View>

      <Txt size={16.5} weight="semibold" color={mk.ink} lineHeight={24} style={styles.sectionInsight}>
        Market Insight
      </Txt>
      <View style={styles.insight}>
        <InfoCircle size={24} color="#1B87D0" />
        <View style={styles.flex}>
          <Txt size={14} weight="semibold" color={mk.ink} lineHeight={20}>
            {insight.title}
          </Txt>
          <Txt size={12.5} color="#464D53" lineHeight={16} style={styles.insightBody}>
            {insight.body}
          </Txt>
        </View>
      </View>

      <SetAlertSheet crop={alertCrop} onClose={() => setAlertCrop(null)} />
    </Screen>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  drops: { marginTop: 24 },
  rule: { height: 1, backgroundColor: '#E6E8EA', marginTop: 15 },
  card: {
    marginTop: 16,
    marginHorizontal: 16,
    height: 168,
    borderWidth: 1,
    borderColor: mk.border,
    borderRadius: 12,
    paddingHorizontal: 11,
    paddingTop: 11,
  },
  row: { flexDirection: 'row', alignItems: 'center' },
  updated: { marginTop: 13 },
  cardDash: { marginTop: 13 },
  stats: { marginTop: 12 },
  section: { marginTop: 24, paddingHorizontal: 16 },
  sectionInsight: { marginTop: 26, paddingHorizontal: 16 },
  history: { marginTop: 12, paddingHorizontal: 28 },
  historyRow: { height: 43, flexDirection: 'row', alignItems: 'center' },
  bar: { width: 1, height: 16, backgroundColor: '#E3E5E8', marginHorizontal: 9 },
  historyLink: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 16, marginTop: 14 },
  chart: { marginTop: 24 },
  tip: {
    position: 'absolute',
    left: 60,
    top: 151,
    width: 102,
    height: 24,
    borderRadius: 8,
    backgroundColor: mk.gainSurface,
    alignItems: 'center',
    justifyContent: 'center',
  },
  insight: {
    marginTop: 12,
    marginHorizontal: 16,
    height: 100,
    borderRadius: 12,
    backgroundColor: '#EDF6FC',
    flexDirection: 'row',
    paddingLeft: 12,
    paddingRight: 12,
    paddingTop: 12,
    gap: 16,
  },
  insightBody: { marginTop: 7 },
  footer: {
    flexDirection: 'row',
    gap: 6,
    paddingHorizontal: 15,
    paddingTop: 25,
    paddingBottom: 23,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 2,
    borderTopColor: '#F3F4F6',
  },
});
